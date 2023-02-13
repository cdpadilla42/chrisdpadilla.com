---
title: Caught In the ESM Migration
tags:
  - Tech
date: '2023-02-13T10:35:07.322Z'
---

I was [having issues with integrating packages in Jest last week](/mockingpackages) and realized it's partly due to being caught in the great migration from CommonJS to ESM support:

This [ESM FAQ](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c) and discussion was listed on Remark's readme. Clearly, the topic is a hot button one.

Same day, I happened to listen to [Syntax's episode on ESM](https://syntax.fm/show/570/node-js-cjs-esm).

Wes and Scott highlight that, for a large part, writing ESM has been the norm for many devs thanks to build tools. Yet, technically we're still shipping CommonJS once Webpack/Babel/Parcel transpile the code.

The burden, then, is on maintainers of open source packages to wrestle with this overhead. I can see why some would opt to take the leap for simplicity and moving the language forward.

With Jest, I had my work [confirmed](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c#im-having-problems-with-esm-and-jest) in another way — handling this is largely a config issue.

Take aways? Why am I writing about this? Partly to document my learning, and also to share that if anyone else is trying to get up to speed in the current testing tooling, mind the gap of getting the tooling to play nice!

All said, I feel a lot _less_ crazy knowing that it's because of a broad, industry wide gradual migration. 🙃

P.S.: Mocking **is** also probably the best answer to this issue from a testing methodology standpoint. It works for [Uncle Dave](https://daverupert.com/2023/01/using-ai-to-appease-jest/).
