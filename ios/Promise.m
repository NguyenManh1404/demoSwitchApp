//
//  Promise.m
//  BeautySalon
//
//  Created by manh.nguyen on 13/12/2023.
//

#import <Foundation/Foundation.h>
#import "Promise.h"

@implementation Promise

-(instancetype)initWithResolve:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject {
    self = [super init];
    self.reject = reject;
    self.resolve = resolve;
    return self;
}

@end
