import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useObjectDetection } from '../hooks/useObjectDetection';
import { Header } from '../components/Header';
import { PickImageButton } from '../components/PickImageButton';
import { ImageWithDetections } from '../components/ImageWithDetections';
import { StatsCard } from '../components/StatsCard';
import { EmptyState } from '../components/EmptyState';

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    const {
        uri,
        detections,
        latency,
        loading,
        imageLayout,
        imageDimensions,
        pickImage,
        onImageLayout,
    } = useObjectDetection();

    return (
        <View style={[styles.safeArea, { paddingTop: insets.top, paddingLeft: insets.left, paddingRight: insets.right }]}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                <Header
                    title="Object Detector"
                    subtitle="Choose Image For Object Detection"
                />

                <PickImageButton onPress={pickImage} hasImage={!!uri} />

                {uri && (
                    <ImageWithDetections
                        uri={uri}
                        detections={detections}
                        loading={loading}
                        imageLayout={imageLayout}
                        imageDimensions={imageDimensions}
                        onLayout={onImageLayout}
                    />
                )}

                {uri && !loading && (
                    <StatsCard
                        detectionCount={detections.length}
                        latency={latency}
                    />
                )}

                {!uri && <EmptyState />}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F7',
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 32,
    },
});
