---
title: Symbolic Links
tags:
  - tech
  - linux
date: '2022-05-30T05:35:07.322Z'
---

## The Sitch

I'm in a spring cleaning state of mind with my data!

I keep a bunch of text files in a `Journal/` folder on my computer. It's pretty similar to the hierarchy Derek Sivers lists in [this post on writing in plain text](https://sive.rs/plaintext).

And then separately I have this blog where I store articles as markdown files in the codebase itself.

```
personalBlog/
|- _posts/
|- components/
|- util/
etc...
```

It's all on my computer, of course — but it feels strange to _write_ in prose in a text editor like VS Code. It even feels strange to store article drafts in the same place as the code for the site.

They are only a few clicks away, but they feel like far flung and very different spaces. So how do I handle keeping published articles and drafts both near each other and organized, but spacially being sourced somewhere that my blog has access?

## Symbolic Links

Alex Payne mentions in [this article](https://www.al3x.net/blog/2009/01/31/the-case-against-everything-buckets) using Symlinks.

Creating one looks like this:

```
$  ln -s source symlinkDestination
```

A very elegant and easy solution! The idea is that you can have a link to another file or directory within a completely different place. Like a regular URL link, but for local files.

My original idea was to have a symlink in the repo for this codebase and have all my writing stored in the Journal folder, included published pieces. The issue is that symlinks are just that - links. When storing them in git and publishing on Github, the files themselves are not pulled in.

So I swapped the direction. The symlink lives in my `Journal` directory, and the actual files are in the codebase. When I publish this article, I'm moving the file from `Journal/blog/drafts`
into the symlink `Journal/blog/_posts`, which then moves it over to the appropriate folder in the code repo.

It works beautifully on the command line.

A nitty, gritty, small tool - but one that makes me unreasonably happy to use!

## A Side Note on Aliases

Mac's have Aliases, which work in a very similar way. They are restricted to finder, though. I'm working mostly on the command line when I'm writing and working on code, and symbolic links are recognized both by finder and by linux systems.
