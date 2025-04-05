---
title: Animated Gifs on Android with Expo and React Native
tags:
  - Tech
  - Mobile
  - React Native
date: '2025-04-04T10:35:07.322Z'
---

Gifs work great out of the box in React Native using expo... _except!_ When building to android.

On Android natively, this is accomplishes with Fresco. However, to use this package in Expo with React Native, we have to do [a bit more work](https://github.com/s3131212/expo-gif/pull/1/files).

Cedric van Putten has thankfully already done the heavy lifting. The meaningful config file setup is demonstrated in [this PR](https://github.com/s3131212/expo-gif/pull/1).
