---
title: Font-Display and CLS
tags:
  - Tech
  - Core Web Vitals
date: '2023-01-04T05:35:07.322Z'
---

# Overview

I've written before on [how tricky it can be dealing with external fonts and maintaining a healthy CLS score](/fontcls). This week, I had the chance to revisit it with the suggestion of exploring the particular load settings.

# The Fastest Google Fonts

Below I'm snipping [Chris Coyier's](https://css-tricks.com/the-fastest-google-fonts/) sample from Harry Roberts' [amazingly thorough analysis on font performance](https://csswizardry.com/2020/05/the-fastest-google-fonts/). The idea is that you can render text immediately and load fonts quickly by adding preload and preconnect link attributes to your sources.

```
<link rel="preconnect"
      href="https://fonts.gstatic.com"
      crossorigin />

<link rel="preload"
      as="style"
      href="$CSS&display=swap" />

<link rel="stylesheet"
      href="$CSS&display=swap"
      media="print" onload="this.media='all'" />
```

In my use case, this is exactly what was already in place.

# Variables - Preload and Font-Display

Breaking down the different parts, we have a few variables to play with:

1. Links with and without "Preloading"
2. `Font-Display` settings "Block" and "Swap"

**Preloading** does not block, but marks the asset as a high priority and schedules it early on in the page lifecycle. [More details available on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types/preload)

**Preconnect** is similar. It lets the browser know that resources will be needed from this source early on.

As per [Google's Definition](https://developer.chrome.com/blog/font-display/):

**Block**, the browser default, leaves a 3 second window for the font to be fetched and loaded before "inking" the text. (Text is rendered, but in "invisible ink")

**Swap** renders text immediately and then swaps the font style on load.

# Experimenting

Even with preloading and preconnecting in place, there's still enough delay where the CLS score was catching the "swap" on the page.

So I toyed around with the above variables, mixing and matching preloading with block and swap.

Here's what I found: There was a noticeable drop in both of the options that use the `font-display: block;` setting! From a 0.003 range to a 0.002 range on page with mostly hero and navigation text.

Of course, there's a tradeoff: The CLS score here is improved as a result of delaying text rendering. It's only a 3 second window, but it's common practice now to be aiming for 2 second load times for webpages. At the very least, in this case, a backup font is loaded after that time elapses.

I'm waiting to hear back on what the field data reports with this change, but I'm hoping this is a move in the right direction!
