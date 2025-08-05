#import "AppDelegate.h"
#import "RCTAppleHealthKit.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridge.h>
#import <TSBackgroundFetch/TSBackgroundFetch.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [[TSBackgroundFetch sharedInstance] didFinishLaunching];

  self.moduleName = @"Decima";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  RCTBridge *bridge = [self bridge];

    /* Add Background initializer for HealthKit  */
  [[RCTAppleHealthKit new] initializeBackgroundObservers:bridge];
 
  [[UIApplication sharedApplication] setMinimumBackgroundFetchInterval:UIApplicationBackgroundFetchIntervalMinimum]; 

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
  return [self bundleURL];
}

- (NSURL *)bundleURL
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
