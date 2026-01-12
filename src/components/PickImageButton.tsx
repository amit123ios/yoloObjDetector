import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface PickImageButtonProps {
    onPress: () => void;
    hasImage: boolean;
}

export const PickImageButton: React.FC<PickImageButtonProps> = ({ onPress, hasImage }) => {
    return (
        <TouchableOpacity
            style={styles.button}
            onPress={onPress}
            activeOpacity={0.8}
        >
            <Text style={styles.buttonText}>
                {hasImage ? '📷 Pick Another Image' : '📷 Pick Image'}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#007AFF',
        marginHorizontal: 24,
        marginTop: 24,
        marginBottom: 16,
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#007AFF',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 17,
        fontWeight: '600',
    },
});

