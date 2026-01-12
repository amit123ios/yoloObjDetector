# Object Detector

A React Native mobile application that performs real-time object detection using YOLOv8n (YOLO v8 Nano) model. The app can detect and visualize objects like persons, laptops, cell phones, and books in images.

## Features

- 📸 Image selection from device gallery
- 🤖 AI-powered object detection using YOLOv8n
- 📊 Real-time performance metrics (latency tracking)
- 🎯 Accurate bounding box visualization
- 📱 Modern, production-ready UI
- ⚡ Optimized for iOS devices

## Getting Started

### Prerequisites

- Node.js >= 20
- React Native development environment set up
- iOS: Xcode and CocoaPods
- Android: Android Studio (optional, currently iOS-focused)

### Installation

1. Install dependencies:

```sh
npm install
# or
yarn install
```

2. For iOS, install CocoaPods dependencies:

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

3. Start Metro bundler:

```sh
npm start
# or
yarn start
```

4. Run the app:

```sh
# iOS
npm run ios
# or
yarn ios

# Android (if configured)
npm run android
# or
yarn android
```

## Architecture & Approach

### High-Level Architecture

The application follows a **layered architecture** with clear separation of concerns:

```
┌─────────────────────────────────────┐
│      React Native UI Layer          │
│  (Components, Screens, Hooks)        │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      TypeScript Bridge               │
│  (Native Module Interface)          │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Native iOS Layer                │
│  (Swift: YoloModule, YoloDetector)  │
└──────────────┬──────────────────────┘
               │
┌──────────────▼──────────────────────┐
│      Core ML / Vision Framework      │
│  (YOLOv8n Model Inference)          │
└──────────────────────────────────────┘
```

### Code Organization

The codebase is structured for maintainability and scalability:

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx
│   ├── PickImageButton.tsx
│   ├── BoundingBox.tsx
│   ├── ImageWithDetections.tsx
│   ├── StatsCard.tsx
│   └── EmptyState.tsx
├── hooks/              # Custom React hooks
│   └── useObjectDetection.ts
├── screens/            # Screen components
│   └── HomeScreen.tsx
├── types/              # TypeScript type definitions
│   └── detection.ts
├── utils/              # Utility functions
│   └── boxScaling.ts
└── native/             # Native module bridge
    └── yolo.ts

ios/
├── YoloModule.swift     # React Native bridge module
├── YoloDetector.swift   # Core ML inference wrapper
└── yolov8n.mlpackage/   # YOLOv8n model
```

### Key Design Decisions

1. **Native Module Bridge**: Uses React Native's native module system to bridge JavaScript and Swift, enabling direct access to Core ML and Vision frameworks.

2. **Coordinate System Handling**: Implements proper coordinate system conversion from Core Graphics (bottom-left origin) to UIKit (top-left origin) for accurate bounding box positioning.

3. **Aspect Ratio Preservation**: Calculates bounding box scaling based on actual displayed image dimensions, accounting for `resizeMode: 'contain'` to ensure accurate overlay positioning.

4. **Async Processing**: Inference runs on a background queue (`DispatchQueue.global(qos: .userInitiated)`) to prevent UI blocking.

5. **Component-Based Architecture**: UI is broken down into small, reusable components following single responsibility principle.

## Performance Observations

### Inference Performance

- **Average Latency**: ~30-50ms on modern iOS devices (iPhone 12 and newer)
- **Model**: YOLOv8n (nano variant) - optimized for mobile inference
- **Compute Units**: Configured to use all available units (CPU, GPU, Neural Engine) for optimal performance

### Performance Characteristics

1. **First Inference**: Slightly slower (~100-150ms) due to model initialization and warm-up
2. **Subsequent Inferences**: Consistent ~30-50ms latency
3. **Image Size Impact**: Larger images (4032x3024) process in similar time due to Vision framework's internal optimization
4. **Memory Usage**: Minimal memory footprint with YOLOv8n model (~6MB model size)

### Optimization Strategies

- **Model Selection**: YOLOv8n chosen for balance between accuracy and speed
- **Background Processing**: Inference runs off main thread to maintain 60fps UI
- **Efficient Coordinate Scaling**: Normalized coordinate calculations prevent unnecessary re-renders
- **Image Normalization**: Handles image orientation automatically

## Known Limitations

### Model Limitations

1. **Supported Object Classes**: Currently limited to 4 classes:
   - Person
   - Cell phone
   - Laptop
   - Book
   
   Other objects detected by YOLO are filtered out.

2. **Confidence Threshold**: Set to 0.25 (25%) - lower confidence detections are filtered. This may miss some valid detections in challenging conditions.

3. **Model Accuracy**: YOLOv8n is optimized for speed over accuracy. For higher accuracy, consider using YOLOv8s or YOLOv8m variants (with trade-off in inference time).

### Platform Limitations

1. **iOS Only**: Currently implemented for iOS only. Android support would require:
   - TensorFlow Lite or ML Kit integration
   - Separate model conversion
   - Different native module implementation

2. **Image Format**: Supports standard image formats (JPEG, PNG) but may have issues with:
   - Very large images (>10MP may cause memory issues)
   - Unusual color spaces
   - Corrupted image files

### Technical Limitations

1. **Coordinate Precision**: Bounding boxes may have slight misalignment with very small objects or objects near image edges due to coordinate scaling calculations.

2. **Multiple Objects**: When multiple objects of the same class are detected, they may overlap or be difficult to distinguish visually.

3. **Real-time Processing**: Not optimized for real-time video processing - designed for single image analysis.

4. **Model Loading**: Model is loaded at app initialization, which may cause slight delay on first launch.

### UI/UX Limitations

1. **Image Selection**: Only supports gallery selection - no camera capture functionality currently.

2. **Error Handling**: Limited error messages for edge cases (corrupted images, permission denials).

3. **Loading State**: No cancellation mechanism during inference - user must wait for completion.

## Future Improvements

- [ ] Add camera capture functionality
- [ ] Support for more object classes
- [ ] Android platform support
- [ ] Real-time video processing
- [ ] Batch image processing
- [ ] Export detection results
- [ ] Adjustable confidence threshold
- [ ] Model selection (nano/small/medium variants)

## Technical Stack

- **Framework**: React Native 0.83.1
- **Language**: TypeScript, Swift
- **ML Framework**: Core ML (iOS)
- **Model**: YOLOv8n
- **Vision Framework**: Apple Vision (for object detection)
- **Image Picker**: react-native-image-picker
- **Safe Area**: react-native-safe-area-context

## License

This project is private and proprietary.

## Troubleshooting

### Common Issues

1. **Model not loading**: Ensure `yolov8n.mlpackage` is properly included in the iOS project bundle.

2. **Bounding boxes misaligned**: Check that image layout callback is firing correctly. Try selecting a new image.

3. **Slow performance**: Ensure device has sufficient resources. Close other apps and try again.

4. **No detections**: Verify image contains supported object classes and has adequate lighting/quality.

For more React Native troubleshooting, see the [official troubleshooting guide](https://reactnative.dev/docs/troubleshooting).
