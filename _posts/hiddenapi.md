---
title: Navigating NPM Package Changes
tags:
  - Tech
date: '2022-10-04T05:35:07.322Z'
---

Subtitled: **The Case of the Hidden API! 🔍**

An interesting mystery came up with work recently.

**The Gist:** A library we were using started behaving strangely. After doing some digging, I found out it was because the devs quietly changed their API with a minor release. Here's the detective work that was involved in sniffing this info out:

# The Problem

We use [Keen-Slider](https://keen-slider.io/) for all of our sliding needs. I wrote a bit of custom code on top of the react library. We needed the slider to render part of a slide's text if the string length exceeded a certain amount. We could then show the rest with a "Read More" button.

One day, out of the blue, this behavior started to act wonky. And it had something to do with a set of options I passed in.

# Looking back to September 2021

A completely separate bug came up as I was developing this "Read More" feature back in September. To make a long story short, I ended up finding a solution with [this issue ticket on Keen-Slider's Github Repo](https://github.com/rcbyr/keen-slider/issues/143). The main fix being setting a specific option:

> the `autoAdjustSlidesPerView` property is not described in the doc. You need to set it to false.

`autoAdjustSlidesPerView` is indeed nowhere to be found in the docs, but it was in the codebase at the time and solved my problem like a charm. So I tossed it into our solution as well.

All was well worth the world.

# Quiet Deprecation

That is **UNTIL** we fast forward to where we left off in the story!

I get word that the source is a set of options, including `autoAdjustSlidesPerView`.

My first thought was "Ok, let me see if I can understand exactly what `autoAdjustSlidesPerView` is doing." So I look to the docs to find out.

But they're not in the docs.

No sweat! Let me just look at the source code.

But there's no sign of it in Keen-Slider's source code.

Looking back at the issue ticket, an update came in a few months after from the library's maintainer:

> This problem is gone with the new major version.

As simple as that. No mention of the `autoAdjustSlidesPerView`.

But I realized something: More than likely, that change likely included removing `autoAdjustSlidesPerView` from the API.

It was never in the docs, just a secret fix for particular edge cases. It makes sense why there would be no word about it.

The comment above states the change was with a major version update, but it was likely taken out with minor patches.

(An aside on versioning: our NPM versioning for this package is with the carrot `^5.3.0`. This means we wouldn't have automatically bumped up to the major version mentioned. Hence why I believe the change likely happened incrementally with a minor version change.)

# Informed Changes with GitHub

Ok! Problem sourced. So we just need to take the option out, maybe write some new custom logic to handle the original problem, and be on our way.

Our company is not on a scale that justifies writing out extensive tests, so I didn't have that to fall back on when I pulled out the `autoAdjustSlidesPerView` option. I had to make sure myself I wasn't undoing what ever I was trying to fix in the first place back in September!

Thankfully, Git and GitHub make it incredibly easy to source exactly _when_ I added this line of code. Good git hygiene on my part informed me _why_ I made the change.

At the time of adding the code, I was committing code frequently. My methodology: If I could explain what changed in one sentence, I have a commit. If it takes two sentences, then it's two commits and I need to commit more frequently.

Here's the commit message for when I added `autoAdjustSlidesPerView` into the codebase:

> Correct forced slider view in reviews widget when slidesPerView matches number of cards.

Great! I know exactly what I was trying to solve with this code, and I can see all the relating code around the change.

With all of this information, I was able to ensure both the bug from September and this new bug was fixed!
