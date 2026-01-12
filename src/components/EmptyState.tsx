import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const EmptyState: React.FC = () => {
    return (
        <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>🔍</Text>
            <Text style={styles.emptyStateText}>
                Select an image to detect objects
            </Text>
            <Text style={styles.emptyStateSubtext}>
                Supports: Person, Laptop, Cell Phone, Book
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 32,
    },
    emptyStateIcon: {
        fontSize: 64,
        marginBottom: 16,
    },
    emptyStateText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 8,
        textAlign: 'center',
    },
    emptyStateSubtext: {
        fontSize: 15,
        color: '#8E8E93',
        textAlign: 'center',
        lineHeight: 22,
    },
});

