import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatsCardProps {
    detectionCount: number;
    latency: number;
}

export const StatsCard: React.FC<StatsCardProps> = ({ detectionCount, latency }) => {
    return (
        <View style={styles.statsCard}>
            <View style={styles.statItem}>
                <Text style={styles.statValue}>{detectionCount}</Text>
                <Text style={styles.statLabel}>Objects Detected</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
                <Text style={styles.statValue}>
                    {typeof latency === 'number' ? latency.toFixed(0) : '--'}
                </Text>
                <Text style={styles.statLabel}>ms</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statsCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        marginHorizontal: 24,
        marginTop: 24,
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 16,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statItem: {
        flex: 1,
        alignItems: 'center',
    },
    statValue: {
        fontSize: 32,
        fontWeight: '700',
        color: '#007AFF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 14,
        color: '#8E8E93',
        fontWeight: '500',
    },
    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: '#E5E5EA',
        marginHorizontal: 24,
    },
});

