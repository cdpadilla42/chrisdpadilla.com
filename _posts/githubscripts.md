---
title: Triggering Notifications through Github Actions
tags:
  - Tech
  - Architecture
date: '2024-02-23T10:35:07.322Z'
---

My Mom and Dad are not on RSS (surprising, _I know!_) Nor are they on Instagram or Twitter or anywhere! But, naturally, they want to stay in the loop with [music](/music) and [art](/blog/art)!

I've done a bit of digging to see how I could set up a notification system. Here's what I've got:

This blog is updated through pushing markdown files to the GitHub repo. That triggers the build over on Vercel where I'm hosting things. So, the push is the starting point. I can:

1. Call a script with [github-script](https://github.com/actions/github-script)
2. From said script, scan for the latest post.
3. Grab the relevant content (an image or video link)
4. Integrate with my messaging system of choice, either:
	- Twilio to send a text
	- Amazon Simple Email Service

The config for github scripts is very straightforward:


```
name: Hey Mom

on: [push]

jobs:
  hey-mom:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/github-script@v7
        with:
          script: |
            const script = require('./.github/scripts/heyMom.js')
            console.log(script({github, context}))

```
<figcaption>./.github/workflows/heymom.yml</figcaption>



The one concern I have here is external dependencies. From my preliminary research, it's best to keep the GitHub Action light without any dependencies. Mostly, I want it to find the content quickly, and send it off so the website can finish up the deploy cycle.

This would be a great case for passing that off to AWS Lambda. The lambda can take in the link and message body, load in dependencies for integrating with the service, and send it off from there. 

Though, as I write this now, I'm forgetting that Vercel, of course, is actually handling the build CI. This GitHub action would be separate from that process. 

Well, more to research! No code ready for this just yet, but we'll see how this all goes. Maybe the first text my folks get will be the blog post saying how I developed this. 🙂