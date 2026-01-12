//
//  YoloModule.swift
//  ObjDetector
//
//  Created by Amit Kumar on 11/01/26.
//

import Foundation
import React
import UIKit

@objc(YoloModule)
final class YoloModule: NSObject {

    private let detector: YOLODetector

    override init() {
        do {
            self.detector = try YOLODetector()
        } catch {
            fatalError("Failed to load YOLO model: \(error)")
        }
        super.init()
    }

    @objc
    func runInference(
        _ imagePath: String,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {
        DispatchQueue.global(qos: .userInitiated).async {

            guard let image = UIImage(contentsOfFile: imagePath)?.normalized() else {
                reject("IMAGE_ERROR", "Invalid or unreadable image", nil)
                return
            }

            do {
                let (results, latency) = try self.detector.detect(image: image)

                let imageWidth = image.size.width
                let imageHeight = image.size.height

                let detections = results.map {
                    [
                        "label": $0.label,
                        "confidence": $0.confidence,
                        "boundingBox": [
                            // Bounding box is already in pixel coordinates from YoloDetector
                            "x": $0.boundingBox.origin.x,
                            "y": $0.boundingBox.origin.y,
                            "width": $0.boundingBox.width,
                            "height": $0.boundingBox.height
                        ]
                    ]
                }

                resolve([
                    "latencyMs": latency * 1000,
                    "imageWidth": imageWidth,
                    "imageHeight": imageHeight,
                    "detections": detections
                ])

            } catch {
                reject("INFERENCE_ERROR", error.localizedDescription, error)
            }
        }
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
        false
    }
}

extension UIImage {
    func normalized() -> UIImage {
        if imageOrientation == .up {
            return self
        }

        UIGraphicsBeginImageContextWithOptions(size, false, scale)
        draw(in: CGRect(origin: .zero, size: size))
        let normalizedImage = UIGraphicsGetImageFromCurrentImageContext()
        UIGraphicsEndImageContext()

        return normalizedImage ?? self
    }
}
