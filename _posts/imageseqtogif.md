---
title: Converting Image Sequences to Gifs
tags:
  - Tech
date: '2025-04-04T12:35:07.322Z'
---

Writing to scratch my own itch: I know I'll forget how to do this in the future if I don't write this down. 😅 Why not make it public while I'm at it!

Programs such as Krita and Blender spit out image sequences as part of their animation process. If you want to target the gif file format, it gets tricky. Blender does not support gif output. And Krita's gif rendering, based on [ffmpeg](https://www.ffmpeg.org/), will not support transparency data when outputting to gif.

The way to handle this is to spit out your image sequence, then use the CLI tool [ImageMagick](https://imagemagick.org/). Here's the prompt that got me to the finish line:

```
magick -delay 100 -loop 0 -dispose previous *.png  MyCoolAnimation.gif
```

A breakdown of options:

- `delay` is the time between frames. If you only have a two frame image, 100 will be a 1 second difference between the two.
- `loop` set loop to 0 for infinite loops.
- `dispose` setting this to previous will remove previous frames. Otherwise, you may get a smeared effect.

Violà!

![🦜](https://padilla-media.s3.amazonaws.com/blog/art/BirdBoxAnimationTransparent.gif)
