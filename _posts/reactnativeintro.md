---
title: A Beginner's Intro to React Native in One Component
tags:
  - Tech
  - React Native
  - TypeScript
  - JavaScript
  - React
  - Mobile
date: '2025-03-14T11:35:07.322Z'
---

Both [React Native](https://reactnative.dev/docs/getting-started) and [Expo](https://docs.expo.dev/tutorial/create-your-first-app/) have great quick start guides for getting your hands dirty.

If you're _really_ in a rush to see what developing with React Native looks like, I've boiled it all down to one file for you!

```
import React, { useEffect, useState } from 'react';
import { View, Button, StyleSheet, Platform } from 'react-native';
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

type SampleComponentProps = {
  soundSource: any; // an MP3 File
};

export default function SampleComponent({ soundSource }: SampleComponentProps) {
  // React hooks work as expected
  const [sound, setSound] = useState<Sound>();

  useEffect(() => {
    const loadSound = async () => {
      // Handle mobile device interactions with expo libraries
      const { sound } = await Audio.Sound.createAsync(soundSource);
      setSound(sound);
    };
    loadSound();
  }, [soundSource]);

  async function playSound() {
    if (sound) {
      // Run certain logic on specific platforms
      if (Platform.OS === 'ios') {
        await sound.setPositionAsync(0);
      }
      await sound.playAsync();
    }
  }

  // Use core library components to render elements
  return (
    <View style={[styles.container]}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}

// Style components with CSS-like properties
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});


```

Let's dig in:

**State Management**: For the most part, you're writing React code. Hooks such as `useEffect` and `useState` work just as they do when writing for the web.

**Core Components**: A big difference, though, is that you'll be using React Native's Core Components instead of HTML elements. This ensures smooth transitions between the different platform environments. You can see me using `Button` and `View` as replacements for html `button` and `div` elements.

**Expo Libraries**: Expo comes with some great handlers for interfaces such as zooming and touch interactions. In my example, I'm using the [expo-av library](https://docs.expo.dev/versions/latest/sdk/audio-av/) to handle playing a sound on button click.

**Styling**: Very familiar to anyone who's used style objects in React. Knowledge of CSS translates largely here.

**Platform Exceptions**: Naturally, some devices handle logic differently. You'll see that I've added a check `if (Platform.OS === 'ios')`. Here, if running on an Apple device, I'm going to set the audio position back to the beginning of the track before playing again.

That's it! Once this renders out, we'll have a button playing the audio file passed into this component.
