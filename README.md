# 🎨 React Native Template DTW

> Clean and minimalist React Native template for any project!

## :star: Features

- Elegant usage directly within the [React Native CLI](https://github.com/react-native-community/cli)
- Consistent with the default React Native template
- Minimal additional dependencies
- Expo batteries included
- SSH client

## :arrow_forward: Usage

### only compatible with `react-native@0.61.0` or higher

```sh
npx react-native init MyApp --template react-native-template-dtw
```

## :computer: Contributing

Contributions are very welcome. Please check out the [contributing document](CONTRIBUTING.md).

## :bookmark: License

This project is [MIT](LICENSE) licensed.

---

## 📚 How did I make this?

### Installation

Node & Watchman

```bash
# install nvm first
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v<latest-version>/install.sh | bash

nvm install --lts # install latest lts

brew install yarn --ignore-dependencies # because you're using nvm

brew install watchman
```

Ruby for Cocoapods

```bash
brew install rbenv
rbenv init
rbenv install 2.6.5
```

Install Cocoapods

```bash
gem install cocoapods # do no use sudo! bad!
```

Bootstrap using typescript template

```bash
# npx is https://www.npmjs.com/package/npx which should come default installed with Node.js
npx react-native init "<your-app-name-here>" --template react-native-template-typescript
```

### Up and Running

patch the host port to your liking

```bash
yarn add --dev react-native-port-patcher

react-native-port-patcher --new-port 3000
```

package.json scripts

```json
...
    "scripts": {
        "ios:sim": "RCT_METRO_PORT=3000 node node_modules/react-native/local-cli/cli.js run-ios --simulator=\"iPhone 11 Pro\"",
        "link": "node node_modules/react-native/local-cli/cli.js link",
        "start": "RCT_METRO_PORT=3000 node node_modules/react-native/local-cli/cli.js start",
        "test": "jest",
    },
...
```

### Expo Compatibility

```bash
yarn add react-native-unimodules
```

modify `./ios/Podfile` to look like the following

```pod
# "DoingMyThing" is the app name here, replace it with your own, of course

platform :ios, '10.0'
require_relative '../node_modules/@react-native-community/cli-platform-ios/native_modules'
require_relative '../node_modules/react-native-unimodules/cocoapods.rb'

target 'DoingMyThing' do
  # Pods for DoingMyThing
  pod 'React', :path => '../node_modules/react-native/'
  pod 'React-Core', :path => '../node_modules/react-native/React'
  pod 'React-DevSupport', :path => '../node_modules/react-native/React'
  pod 'React-RCTActionSheet', :path => '../node_modules/react-native/Libraries/ActionSheetIOS'
  pod 'React-RCTAnimation', :path => '../node_modules/react-native/Libraries/NativeAnimation'
  pod 'React-RCTBlob', :path => '../node_modules/react-native/Libraries/Blob'
  pod 'React-RCTImage', :path => '../node_modules/react-native/Libraries/Image'
  pod 'React-RCTLinking', :path => '../node_modules/react-native/Libraries/LinkingIOS'
  pod 'React-RCTNetwork', :path => '../node_modules/react-native/Libraries/Network'
  pod 'React-RCTSettings', :path => '../node_modules/react-native/Libraries/Settings'
  pod 'React-RCTText', :path => '../node_modules/react-native/Libraries/Text'
  pod 'React-RCTVibration', :path => '../node_modules/react-native/Libraries/Vibration'
  pod 'React-RCTWebSocket', :path => '../node_modules/react-native/Libraries/WebSocket'

  pod 'React-cxxreact', :path => '../node_modules/react-native/ReactCommon/cxxreact'
  pod 'React-jsi', :path => '../node_modules/react-native/ReactCommon/jsi'
  pod 'React-jsiexecutor', :path => '../node_modules/react-native/ReactCommon/jsiexecutor'
  pod 'React-jsinspector', :path => '../node_modules/react-native/ReactCommon/jsinspector'
  pod 'yoga', :path => '../node_modules/react-native/ReactCommon/yoga'

  pod 'DoubleConversion', :podspec => '../node_modules/react-native/third-party-podspecs/DoubleConversion.podspec'
  pod 'glog', :podspec => '../node_modules/react-native/third-party-podspecs/glog.podspec'
  pod 'Folly', :podspec => '../node_modules/react-native/third-party-podspecs/Folly.podspec'

  target 'DoingMyThingTests' do
    inherit! :search_paths
    # Pods for testing
  end

  use_native_modules!
  use_unimodules!
end

target 'DoingMyThing-tvOS' do
  # Pods for DoingMyThing-tvOS

  target 'DoingMyThing-tvOSTests' do
    inherit! :search_paths
    # Pods for testing
  end

end
```

double check we're all set with

```bash
cd ./ios && pod install
```

### Editing `AppDelegate`

`AppDelegate.h` edit to be

```objc
#import <UIKit/UIKit.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>
#import <React/RCTBridgeDelegate.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate, RCTBridgeDelegate>

@property (nonatomic, strong) UMModuleRegistryAdapter *moduleRegistryAdapter;
@property (nonatomic, strong) UIWindow *window;

@end
```

and private `AppDelegate.m` implementation

```objc
#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>

#import <UMCore/UMModuleRegistry.h>
#import <UMReactNativeAdapter/UMNativeModulesProxy.h>
#import <UMReactNativeAdapter/UMModuleRegistryAdapter.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleRegistryAdapter = [[UMModuleRegistryAdapter alloc] initWithModuleRegistryProvider:[[UMModuleRegistryProvider alloc] init]];
  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge moduleName:@"<YOUR-APP-NAME-HERE>"initialProperties:nil];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge
{
  NSArray<id<RCTBridgeModule>> *extraModules = [_moduleRegistryAdapter extraModulesForBridge:bridge];
  // You can inject any extra modules that you would like here, more information at:
  // https://facebook.github.io/react-native/docs/native-modules-ios.html#dependency-injection
  return extraModules;
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge {
#ifdef DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
@end
```

don't forget to replace your app name

### Misc Issues

need to setup linker to see swift shared lib
- [objective c - Why linker link static libraries with errors? iOS - Stack Overflow](https://stackoverflow.com/questions/52536380/why-linker-link-static-libraries-with-errors-ios)

need to add non-auto linked xcode projects like `react-native-ssh-sftp`

```
1. In XCode, in the project navigator, right click Libraries ➜ Add Files to [your project's name]
2. Go to node_modules ➜ react-native-ssh-sftp and add RNSSHClient.xcodeproj
3. In XCode, in the project navigator, select your project. Add libRNSSHClient.a to your project's Build Phases ➜ Link Binary With Libraries
```

### Conclusion

Yeehaw, this should now mean you can use all the latest and greatest of the React Native ecosystem. Please feel free to drop a comment if you have more!
