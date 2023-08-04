---
title: NVM, Next 13, and the "Latest" Package Version, OH MY!
tags:
  - Tech
  - JavaScript
  - React
  - Next
date: '2023-08-04T10:35:07.322Z'
---

I received notice from Vercel, the host of this very website, that [Node 14 and 16 were being deprecated](https://vercel.com/changelog/node-js-14-and-16-are-being-deprecated). This very website was developed with a local version of *Node 12*! 😱 

I didn't anticipate any breaking changes with Node, I'm not using edge case functions here for this website, but I wanted to do my due diligence for Vercel.

What started as a harmless updated nearly ended in a nightmare for me. Come along as I regale the tale of NVM, Next 13, and npm package versions!

## NVM

[Node Version Manager](https://github.com/nvm-sh/nvm) is exactly that — a utility for loading multiple versions of Node on your machine and switching between them. I'm already using multiple versions of Python, so I decided it was time to give NVM a whirl.

Installation was pretty straight forward [following Digital Ocean's guide](https://www.digitalocean.com/community/tutorials/nodejs-node-version-manager). 

So the switch is made: Node 12 updated to version 18.

## NPM

On to testing my site locally with `npm run dev`. Doing so alerted me to a few conflicting dependencies, which was a surprise. Seems nvm also manages npm versions as well, which is great! This new version was catching potential issues in my packages. The conflict was mainly between react testing library and react.

Easy enough, I adjusted the version numbers and ran `npm i`

## Next Version 13

Suddenly, **surprise**!! My starter project that this is based on left this in the `package.json`:

```
  "dependencies": {
      "next": "latest",
   },
```

I've *never* seen that before, and with good reason. Latest will upgrade the major version when available, bringing breaking changes along with it! Suddenly, my Next `<Image />` elements weren't sizing correctly, and my `<Link />` tags were deprecated.

All fine and well if this were a production site I had ample time to maintain. But, that, this is not.

Long story short — a dive into trying to upgrade to version 13 ultimately ended with me setting my next version to `"^12.0.0"` for simplicity's sake. 

## Deployed Build

Surprisingly, I only ran into this issue locally. It lead me to wonder why I wasn't seeing the same errors from Next 13 on the live site.

I thought that it might be because the Next version is set through the CLI or on Vercel, but [neither are true](https://github.com/vercel/next.js/discussions/35794).

It seems that it's likely actually dependent on the node version. Here's [Vercel's upgrading guide](https://nextjs.org/docs/pages/building-your-application/upgrading/version-13) on the matter:


>The minimum Node.js version has been bumped from 12.22.0 to 14.18.0, since 12.x has reached end-of-life.
>
>The minimum React version has been bumped from 17.0.2 to 18.2.0.

I'm just shy on both of those, so I imagine there were some checks that fell back to a previous version of Next in those cases.

Moral of the story: beware of "Latest" versions in your package.json files! 