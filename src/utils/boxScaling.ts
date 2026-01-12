import { Detection, ImageLayout, ImageDimensions, ScaledBox } from '../types/detection';

export const calculateScaledBox = (
    detection: Detection,
    imageLayout: ImageLayout | null,
    imageDimensions: ImageDimensions | null
): ScaledBox => {
    if (!imageLayout || !imageDimensions || !detection.boundingBox) {
        return { left: 0, top: 0, width: 0, height: 0 };
    }

    const { width: imgWidth, height: imgHeight } = imageDimensions;
    const { width: containerWidth, height: containerHeight, x: containerX, y: containerY } = imageLayout;

    // Bounding box coordinates are in pixels relative to original image
    let rawX = detection.boundingBox.x || 0;
    let rawY = detection.boundingBox.y || 0;
    let rawWidth = detection.boundingBox.width || 0;
    let rawHeight = detection.boundingBox.height || 0;

    // Clamp coordinates to valid image bounds
    rawX = Math.max(0, Math.min(rawX, imgWidth));
    rawY = Math.max(0, Math.min(rawY, imgHeight));
    rawWidth = Math.max(0, Math.min(rawWidth, imgWidth - rawX));
    rawHeight = Math.max(0, Math.min(rawHeight, imgHeight - rawY));

    // Normalize coordinates (0-1 range)
    const normalizedX = rawX / imgWidth;
    const normalizedY = rawY / imgHeight;
    const normalizedWidth = rawWidth / imgWidth;
    const normalizedHeight = rawHeight / imgHeight;

    // Calculate the actual displayed image size with resizeMode: 'contain'
    const imageAspectRatio = imgWidth / imgHeight;
    const containerAspectRatio = containerWidth / containerHeight;

    let actualDisplayWidth: number;
    let actualDisplayHeight: number;
    let actualDisplayX: number;
    let actualDisplayY: number;

    if (imageAspectRatio > containerAspectRatio) {
        // Image is wider - fit to width
        actualDisplayWidth = containerWidth;
        actualDisplayHeight = containerWidth / imageAspectRatio;
        actualDisplayX = containerX;
        actualDisplayY = containerY + (containerHeight - actualDisplayHeight) / 2;
    } else {
        // Image is taller - fit to height
        actualDisplayWidth = containerHeight * imageAspectRatio;
        actualDisplayHeight = containerHeight;
        actualDisplayX = containerX + (containerWidth - actualDisplayWidth) / 2;
        actualDisplayY = containerY;
    }

    // Scale normalized coordinates to display coordinates
    const scaledX = normalizedX * actualDisplayWidth + actualDisplayX;
    const scaledY = normalizedY * actualDisplayHeight + actualDisplayY;
    const scaledWidth = normalizedWidth * actualDisplayWidth;
    const scaledHeight = normalizedHeight * actualDisplayHeight;

    return {
        left: scaledX,
        top: scaledY,
        width: scaledWidth,
        height: scaledHeight,
    };
};

