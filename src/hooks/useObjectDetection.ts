import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import { Yolo } from '../native/yolo';
import { Detection } from '../types/detection';
import { ImageLayout } from '../types/detection';

export const useObjectDetection = () => {
    const [uri, setUri] = useState<string | null>(null);
    const [detections, setDetections] = useState<Detection[]>([]);
    const [latency, setLatency] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);
    const [imageLayout, setImageLayout] = useState<ImageLayout | null>(null);
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

    const pickImage = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (result.assets?.[0]?.uri) {
            const path = result.assets[0].uri.replace('file://', '');

            // Reset all state first
            setDetections([]);
            setImageLayout(null);
            setImageDimensions(null);
            setLatency(0);
            setLoading(true);

            // Set new URI (this will trigger Image remount with new key)
            setUri(result.assets[0].uri);

            try {
                const res = await Yolo.runInference(path);
                console.log('YOLO result', res);

                // Handle both response formats for compatibility
                const detectionResults = res.detections || res.Objectdetections || [];
                const latencyValue = res.latencyMs ? res.latencyMs : (res.latency || 0);

                // Set image dimensions and detections
                setImageDimensions({
                    width: res.imageWidth || 0,
                    height: res.imageHeight || 0,
                });

                setDetections(detectionResults);
                setLatency(latencyValue);
            } catch (error) {
                console.error('Error running inference:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const onImageLayout = (event: any) => {
        const { x, y, width: layoutWidth, height: layoutHeight } = event.nativeEvent.layout;
        if (layoutWidth > 0 && layoutHeight > 0) {
            setImageLayout({ x, y, width: layoutWidth, height: layoutHeight });
        }
    };

    return {
        uri,
        detections,
        latency,
        loading,
        imageLayout,
        imageDimensions,
        pickImage,
        onImageLayout,
    };
};

