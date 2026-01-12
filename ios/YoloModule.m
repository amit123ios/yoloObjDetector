//
//  YoloModule.m
//  ObjDetector
//
//  Created by Amit Kumar on 11/01/26.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(YoloModule, NSObject)

RCT_EXTERN_METHOD(
  runInference:(NSString *)imagePath
  resolver:(RCTPromiseResolveBlock)resolve
  rejecter:(RCTPromiseRejectBlock)reject
)

@end
