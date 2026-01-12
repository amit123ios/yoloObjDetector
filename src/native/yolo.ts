import { NativeModules } from 'react-native';

export const Yolo = NativeModules.YoloModule as {
    runInference(imagePath: string): Promise<{
        latencyMs?: number;
        latency?: number;
        imageWidth: number;
        imageHeight: number;
        detections?: {
            label: string;
            confidence: number;
            boundingBox: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
        }[];
        Objectdetections?: {
            label: string;
            confidence: number;
            boundingBox: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
        }[];
    }>;
};
