---
title: Mocking Packages in Jest
tags:
  - Tech
  - Testing
date: '2023-02-10T10:35:07.322Z'
---

# Compile Error

[Last time when running my jest tests](/jesttest), I got an error, but it's not related to the test. The gist of the error was:

```
Cannot use import statement outside of a module.
```

—in relation to a package I'm importing called [remark](https://remark.js.org/).

Initially, I assumed it was a transpile error. Thus ensued a run down the rabbit hole of configuring Jest to transpile ESM files to CommonJS.

I could say there were some interesting finds from that tangent:

- [This Github conversation](https://github.com/facebook/jest/issues/11753) highlights why Jest finds an issue with compiling a seemingly unrelated package, which was my case. Remark was not used in my test directly.
- I found that Jest actually has [an experimental native solution](https://jestjs.io/docs/ecmascript-modules) for using ECMAScript Modules
- I spent a great deal of time playing with the Jest and Babel Config, trying to get babel to [transpile Remark](https://jestjs.io/docs/configuration#transformignorepatterns-arraystring).

All dead ends for me.

The [final recommendation](https://github.com/facebook/jest/issues/11753) I came across was to give up and find a better package.

An unsatisfactory solution at first, but it got me thinking about how I was **very likely** overlooking a simple solution.

# Mocking

I learned first hand, logistically, the benefit of mocking to solve an implementation error. But that limitation also highlights why you mock. It's to isolate your tests to your own systems.

_Nowhere_ along the journey of setup was there an issue with my code. It was with how the package was bundled.

But that's not even my domain to test!

This is the principle behind mocking. You want to abstract away the implementation of outside modules, packages, and systems so you can focus specifically on what unit or internal systems you're trying to test.

# Implementing in Jest

Thankfully, the application of this is very straightforward with Jest.

```
import { getAlbums, getAllPosts } from '../lib/api';
import { remark } from 'remark';
import html from 'remark-html';

jest.mock('remark', () => ({
  remark: jest.fn(() => ''),
}));

jest.mock('remark-html', () => '');

test('Verify no conflicting slugs', () => {...}

```

In the same test file, we:

1. Import the dependencies
2. wrap both in a `jest.mock` method
3. Return the mocked result of those calls.

Remark is a library that my function calls don't really even need access to, so returning empty strings should do just fine.

And there we go! Jest is smart enough to know now that it doesn't even need to _look_ inside either of my remark modules now that we have mocked versions of them.

I can now go along happily testing my slugs with each blog post and album release.
