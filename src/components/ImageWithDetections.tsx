import React from 'react';
import { View, Image, ActivityIndicator, Text, StyleSheet, Dimensions } from 'react-native';
import { Detection } from '../types/detection';
import { ImageLayout } from '../types/detection';
import { BoundingBox } from './BoundingBox';
import { calculateScaledBox } from '../utils/boxScaling';

const { width } = Dimensions.get('window');

interface ImageWithDetectionsProps {
    uri: string;
    detections: Detection[];
    loading: boolean;
    imageLayout: ImageLayout | null;
    imageDimensions: { width: number; height: number } | null;
    onLayout: (event: any) => void;
}

export const ImageWithDetections: React.FC<ImageWithDetectionsProps> = ({
    uri,
    detections,
    loading,
    imageLayout,
    imageDimensions,
    onLayout,
}) => {
    return (
        <View style={styles.imageSection}>
            <View style={styles.imageWrapper}>
                {loading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#007AFF" />
                        <Text style={styles.loadingText}>Analyzing image...</Text>
                    </View>
                )}
                <Image
                    key={uri}
                    source={{ uri }}
                    style={styles.image}
                    onLayout={onLayout}
                    resizeMode="contain"
                />

                {imageLayout &&
                    imageDimensions &&
                    detections.map((detection, index) => {
                        const scaledBox = calculateScaledBox(detection, imageLayout, imageDimensions);
                        return (
                            <BoundingBox
                                key={index}
                                detection={detection}
                                scaledBox={scaledBox}
                            />
                        );
                    })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    imageSection: {
        marginHorizontal: 24,
        marginTop: 8,
    },
    imageWrapper: {
        position: 'relative',
        backgroundColor: '#000000',
        borderRadius: 16,
        overflow: 'hidden',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 12,
        elevation: 8,
        minHeight: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: width - 48,
        height: width - 48,
        resizeMode: 'contain',
    },
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        borderRadius: 16,
    },
    loadingText: {
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 12,
        fontWeight: '500',
    },
});

