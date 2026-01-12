import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Detection } from '../types/detection';
import { ScaledBox } from '../types/detection';

interface BoundingBoxProps {
    detection: Detection;
    scaledBox: ScaledBox;
}

export const BoundingBox: React.FC<BoundingBoxProps> = ({ detection, scaledBox }) => {
    const formattedLabel = detection.label.charAt(0).toUpperCase() + detection.label.slice(1);
    const confidence = (detection.confidence * 100).toFixed(0);

    return (
        <View
            style={[
                styles.box,
                {
                    left: scaledBox.left,
                    top: scaledBox.top,
                    width: scaledBox.width,
                    height: scaledBox.height,
                },
            ]}
        >
            <View style={styles.labelContainer}>
                <Text style={styles.label}>
                    {formattedLabel} {confidence}%
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        position: 'absolute',
        borderWidth: 3,
        borderColor: '#FF3B30',
        backgroundColor: 'transparent',
        zIndex: 10,
        borderRadius: 4,
    },
    labelContainer: {
        position: 'absolute',
        top: -24,
        left: 0,
        zIndex: 11,
    },
    label: {
        backgroundColor: '#FF3B30',
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        overflow: 'hidden',
        textAlign: 'center',
        letterSpacing: 0.3,
    },
});

