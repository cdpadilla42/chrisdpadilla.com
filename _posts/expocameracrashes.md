---
title: Debugging React Native App Crashes While Using Expo Camera
tags:
  - Tech
  - Mobile
  - React Native
date: '2025-11-09T10:35:07.322Z'
---

I'm spinning up a React Native app that needs to use the device's built-in camera. Not something that is often required in my day-to-day work in web development, but something I figured would be straightforward in 2025!

_So I thought!_

My jumping off point is Expo's example repo showing how to use expo-camera in your app. Full example file is [here](https://github.com/expo/examples/blob/master/with-camera/App.tsx). Below, I'll show the relevant code:

```TypeScript
export default function App() {
	const [uri, setUri] = useState<string | null>(null);
	const ref = useRef<CameraView>(null);

	const renderPicture = () => {
		// . . .
	}

	const renderCamera = () => {
	    return (
	      <CameraView
	        ref={ref}
	        mode={mode}
	        facing={facing}
	      >
	        <View style={styles.shutterContainer}>

	        </View>
	      </CameraView>
	    );
	  };

	return (
		<View style={styles.container}>
			{uri ? renderPicture() : renderCamera()}
		</View>
	);
}
```

Our app has two views: The camera and the picture display. Once you take a photo from the camera, the picture display shows the photo. After closing that, you return to the camera.

I'm starting with iOS, since that's what I use. Camera functionality is not available on the device simulator on Mac, so I'm reaching for my own iPhone SE 2.

After playing around with the example in Expo Go, the app crashes.

At first, I didn't think much of it. It could have been a number of small things! Perhaps the code needs refactoring, the render functions broken out to components, the state management being optimized, the camera ref being converted to state that's cleared on unmount.

Needless to say, dear reader, _none of that_ did the trick.

Below, I'll outline the methods I tried out. If you're experiencing the same issue, one may work for you. At the end, we'll discover a big ol' twist as far as how I resolved it.

## Preview

I began to think it was an issue with the Camera preview. Perhaps, when leaving the page, the preview was running in the background, and returning to it caused the crash.

The camera instance has methods for pausing and resuming the preview. I chose to handle this in a useEffect: resuming on component mount and pausing on unmounting.

```TypeScript
  useEffect(() => {
    ref.current?.resumePreview();
    return () => {
      ref.current?.pausePreview();
    }
  }, [ref.current]);
```

Alas, no luck.

## Focused

As per the [expo-camera docs](https://docs.expo.dev/versions/latest/sdk/camera/#usage), it's important that only one instance of the camera be available at any given time. This apparently can be tricky with multi-screened apps. Not all components may fully unmount, say, when you open up a modal, for example.

The way to handle this is to render your camera behind a check for if the page is focused. Thankfully, there's a hook available for this:

```TypeScript
import { useIsFocused } from '@react-navigation/native';

export default function Index() {
	const isFocused = useIsFocused();
	if (isFocused) return <Camera />;
}
```

No dice in my case. Crashes continued.

## Reloading The App

I'll truncate the rest of the story to say I tried several hacky solutions. I was starting to get desperate!

I'd narrowed it down to being related to the expo-camera component and remounting it after an initial load. However, it was never a problem on first load. So what if I could reload the app?

Thankfully, there's a programmatic way to do it. So, after sending a picture, I set the app to reload.

```TypeScript
export default function ImagePreview({ uri }: ImagePreviewProps) {
	const handleSend = async () => {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => {
        if (Platform.OS === 'ios') {
          console.log('iOS detected');
          reloadAppAsync();
        } else {
          router.back();
        }
      }, 2000);
    }, 4000);
  };
}
```

You'll notice I'm only doing this on iOS. By this point, I discovered the issue was not present in my Android simulator.

It's an ugly solution. I couldn't wrap my mind around how I was getting such spotty performance here. Though the Android success started to get me thinking about another angle to take.

## Testing Multiple Devices

As mentioned, my tests were on an iPhone SE 2. What I soon realized is that I was _only_ testing on that phone.

I picked up an iPad and ran my app. I reverted back to the original example code. After some testing, I didn't experience any crashes.

A bitter-sweet victory! Relieved that the problem was device-specific, and stunned that I spent so much time trying to handle what was largely a non-issue on most devices!

## Device Specific Code

Thankfully, from here on out, the solution was simple. I already had a hack that seemed to mitigate the issue on my iPhone. And I have a couple of examples of the original code working seamlessly.

The solution then was to do what I'm sure takes up a major part of a React Native app: device-specific code!

I'll have to gather results on more devices as I continue. But, it seemed a safe bet that there was an issue with my phone's OS version. With my phone on version 16 and iPad on 17, I decided to use the reload hack only on iOS version 16 devices.

```TypeScript
const isMajor16 = (ver: string | null) => ver && /^16\./.test(ver);

// . . .

if (Platform.OS === 'ios' && isMajor16(osVersion)) {
  console.log('iOS 16 detected');
  reloadAppAsync();
} else {
  router.back();
}

```

## 👋

In the world of web development, we're fortunate to have fairly unified environments. Developing across mobile environments is a bit messier. On top of differences between OS's, version differences caught me off guard.

So, if you're jumping into mobile dev, have multiple devices handy, friends!
