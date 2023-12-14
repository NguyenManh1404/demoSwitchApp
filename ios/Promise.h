//
//  Promise.h
//  BeautySalon
//
//  Created by manh.nguyen on 13/12/2023.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

@interface Promise: NSObject {
}

@property RCTPromiseRejectBlock reject;
@property RCTPromiseResolveBlock resolve;


- (instancetype)initWithResolve: (RCTPromiseResolveBlock)resolve reject: (RCTPromiseRejectBlock)reject;
@end
