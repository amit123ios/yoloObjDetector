export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface Detection {
    label: string;
    confidence: number;
    boundingBox: BoundingBox;
}

export interface ImageLayout {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface ImageDimensions {
    width: number;
    height: number;
}

export interface ScaledBox {
    left: number;
    top: number;
    width: number;
    height: number;
}

