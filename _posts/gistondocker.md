---
title: The Gist on Docker
tags:
  - Tech
  - Docker
date: '2023-03-07T10:35:07.322Z'
---

> "As for me, I am tormented with an everlasting itch for things remote. I love to sail forbidden seas, and land on barbarous coasts." - Herman Melville, Moby Dick

We're learning about Docker this week at work! 🐳

Here's what I can tell you so far:

## Why Use it?

Two big reasons:

1. Consistency of dependencies (namely, node versions in web development)
2. Easy onboarding for new devs

To the first point: Node versioning can be a hassle. Even if your application isn't reliant on a specific version of node, perhaps an NPM package you are using _is_. Any difference between your environment and your hosts could lead to strange issues.

To the second: swapping between local versions of node or python can also be tricky. And then say you start working on an app where you need to download a specific version. All doable, but Docker can make this smoother.

## Hosts Handle This Usually

To run your server on another machine, if you were to do it yourself, you would need:

1. To install an OS
2. Install your runtime (Node, Python, etc)
3. Upload you app directory
4. Initialize the run command

Vercel, Netlify, Render, even AWS essentially eliminate all the steps except for the third one. You simply send your files up, and these services will take care of the rest in most cases successfully.

When you need greater flexibility, or your application is more complicated and fussy with it's versioning, Docker can be the tool to reach for.

## Image? Container?

A Container is a lighter version of a Virtual Machine.

A **virtual machine** is what it sounds like. On a computer, you can simulate a full blown PC by using the hardware on the one you're running it on. Think using Bootcamp to run Windows on a Mac.

A **container** is a level lower than that. Containers will share the same OS, but will still have separate, self contained resources and file directories. I can have two different containers running different versions of node.

An **image** is the recipe for a specific container's environment. Docker takes an image and creates a container with the given OS, runtime environment, packages, and environment variables. You'll set all this up in a `Dockerfile` in your application.
