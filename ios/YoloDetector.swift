//
//  YoloDetector.swift
//  ObjDetector
//
//  Created by Amit Kumar on 11/01/26.
//


import Foundation
import Vision
import CoreML
import UIKit

struct DetectionResult {
    let label: String
    let confidence: Float
    let boundingBox: CGRect   // pixel-based
}

final class YOLODetector {

    private let model: VNCoreMLModel
    private let confidenceThreshold: Float = 0.25

    init() throws {
        let config = MLModelConfiguration()
        config.computeUnits = .all

        let mlModel = try yolov8n(configuration: config).model
        self.model = try VNCoreMLModel(for: mlModel)
    }

    func detect(image: UIImage) throws -> ([DetectionResult], TimeInterval) {
        guard let cgImage = image.cgImage else {
            throw NSError(domain: "InvalidImage", code: -1)
        }

        let request = VNCoreMLRequest(model: model)
        request.imageCropAndScaleOption = .scaleFit   

        let start = CFAbsoluteTimeGetCurrent()
        let handler = VNImageRequestHandler(cgImage: cgImage)
        try handler.perform([request])
        let latency = CFAbsoluteTimeGetCurrent() - start

        let observations =
            request.results as? [VNRecognizedObjectObservation] ?? []

        let allowedLabels: Set<String> = [
            "person",
            "cell phone",
            "laptop",
            "book"
        ]

        let imageWidth = CGFloat(cgImage.width)
        let imageHeight = CGFloat(cgImage.height)

        let detections: [DetectionResult] = observations.compactMap { obs in
            guard let topLabel = obs.labels.first,
                  allowedLabels.contains(topLabel.identifier),
                  topLabel.confidence >= confidenceThreshold else {
                return nil
            }

            // VNImageRectForNormalizedRect returns coordinates in Core Graphics coordinate system
            // (origin at bottom-left), but we need UIKit coordinates (origin at top-left)
            let cgRect = VNImageRectForNormalizedRect(
                obs.boundingBox,
                Int(imageWidth),
                Int(imageHeight)
            )
            
            // Convert from bottom-left origin to top-left origin
            let uiKitRect = CGRect(
                x: cgRect.origin.x,
                y: imageHeight - cgRect.origin.y - cgRect.height,
                width: cgRect.width,
                height: cgRect.height
            )

            return DetectionResult(
                label: topLabel.identifier,
                confidence: topLabel.confidence,
                boundingBox: uiKitRect
            )
        }

        for d in detections {
            print("Detected:", d.label, d.confidence, d.boundingBox)
        }

        return (detections, latency)
    }
}
