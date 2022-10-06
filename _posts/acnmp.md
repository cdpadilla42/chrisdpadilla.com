---
title: I Made A Video Game - AC New Murder
tags:
  - Project
date: '2022-09-29T05:35:07.322Z'
---

# Overview

Bucket list item complete — for the past year and a half I've had the chance to develop a game with my sister Jenn!

![Home Screen](https://padilla-media.s3.amazonaws.com/blog/acnm/play.png)

A massive labor of love, AC: New Murder is a web-based visual novel where you are investigating the details of the almost-murder of a villager on the island. In classic Phoenix Wright style, you are helping clear the name of Ñenn, the initial suspect who claims to be innocent. By chatting with the islanders and visiting a real New Horizons island on the Nintendo Switch as a companion to the web app, you'll uncover clues that will help reveal who-dun-it! There are even trials for you to put your knowledge to the test, presenting evidence, and objecting to suspicious testimonies!

Jenn wrote the script, illustrated the characters, and handled all of the Animal Crossing customizations for the New Horizons island that players are encouraged to visit on their own copy of New Horizons. Her story and characters are dramatic, hilariously funny, and are overflowing with charm and personality!

![Ankha looking frustrated](https://padilla-media.s3.amazonaws.com/blog/acnm/Ankha.png)

My part was designing the application, developing the software, and creating a custom CMS to load in assets, story, and handling any story-related game logic. Also, I wrote some music for it!

This was a blast to work on! I had the chance to hone my web development chops, take an app from ideation to release, and collaborate on a massive project. Read on for the story of how this came to be!

# Application Features

When we started planning this in November 2020, we had played around with different ways that this could come to life. A full on web comic would have taken ages with creating individual art assets for the story she had in mind. Software like GameMaker were a viable option, but had limitations for how much genuine control we had over the feel of the game. We also wanted an experience where there were very few barriers to entry — nothing to download, just a link to visit, a la the web experiences we grew up with on sites like [Homestar Runner](https://homestarrunner.com/) or [Homestuck](https://www.homestuck.com/info-story).

Enter me and my skillset! Working primarily in React and web development technologies, this felt like the perfect opportunity to craft a web app for both the players as well as Jenn to be able to load her pages and pages of dialogue into, controlling also the emotions characters made with each phrase, who they were talking to, what evidence was required, and so on!

![Julian riddling you a riddle](https://padilla-media.s3.amazonaws.com/blog/acnm/Julian.png)

This project exists as two separate applications, similar to a blog: A client site and a backend portal for editing the application data.

Our most important features for the app were:

- Playable game that would save user data as they progressed
- Accessible from a web browser
- Allow for branching dialogue paths
- Handle storing and presenting evidence
- Showing different dialogue based on different game flags being fulfilled
- Allow a "Free Roam" mode to ask villagers questions about any item in the inventory

For the back end application, our CMS features:

- Intuitive interface of storing different types of data (text, images, and preferences)
- A way to referencing other documents
- Flexible UI for hiding any uneccesary fields when inputing game assets
- Ways of easily updating the schema as features were added without invalidating older documents

# The Tech Stack

Some tools familiar to me and some new!

## Front End (React, Styled Components, and SCSS)

My most fluent framework when I began the project. To accomplish that feeling of it being a game and not just a website, using **React** entirely for rendering pages, transitioning, and responding to state change was a natural choice.

Page level styling is done in SCSS and component level styles are done in styled components. This was more a change to match the workflow that worked best for me at whichever point I was developing the app.

## Data Layer (Redux)

I opted for another familiar friend **Redux** for managing application level state and data. While I investigated options like react-query for caching and making requests, it felt like an oversized solution for our use case. Each page would only need to load once and it was unlikely that players would return to those pages later, so I wasn't concerned about the built in caching. I was much more interested in having a fine-grained control over the structure of the data store and how individual requests and state updates were handled. Although it can be a more tedious solution in the short term, Redux served this end well.

User data is simultaneously updated in Redux and Local Storage. On load, the app checks for save data in local storage, and then loads it into the Redux store for use while playing the game.

![Agent S keeping it cool](https://padilla-media.s3.amazonaws.com/blog/acnm/bag+check.png)

## CMS (Sanity)

The project was complex enough to reach for a CMS instead of developing my own backend. We needed something flexible enough that would be able to handle our game logic (we weren't _just_ building a blog, after all.) I wanted something that came with an intuitive interface out of the box for Jenn to use. And, JavaScript being my language of choice, I wanted a service that allowed me to develop in my primary language. **Sanity** checked all of our boxes here!

With Sanity, Schema development was a breeze. There was plenty of flexibility to reffernce different documents, create unique document types, nest documents within other documents, the whole sha-bang! Querying the data on the client was elegent as well. Sanity uses their own language **GROQ**, which will feel familiar to anyone that's used **GraphQL**. All in all, for this project, we're pleased to have gone with Sanity!

## Hosting

Site hosting and building is done on **Netlify**. The code for the site is hosted on github. Every time changes are pushed, Netlify will take in the new code, build, and publish the updated site all in one go.

Sanity takes care of CMS hosting on their platform easily. For our scope, it was straightforward and cheap to implement.

# Collaborating — Left and Right Brain

It's an oversimplification to say that our roles were focused one hemisphere of the brain — Code is as creative as it is literal, as is illustration and story writing.

We were coming from different skillsets, though, and were both learning along the way how best to communicate the needs of our side of the project.

What got us through wasn't so much a particular tool, but more of a mindset of being open to finding creative solutions to walls, accepting limitations where we had them, and creating an accepting environment for ideation and flexibility. Thankfully, we're respectful, kind, and resilient in our lives as brother and sister outside of the project, so this was a natural flow to get into for us!

Our process for coming together involved meeting regularly to plan our next priorities together, work out what we needed to do individually, and getting feedback on recent steps.

Not to mention celebrating our wins! My favorite meetings were ones where I could say "I was testing this part of the site, and just saw your new illustrations for Katt! SO CUTE!!!"

# Project Management

We _did_ end up needing a tool for staying organized! We've been using **Notion** at work along with their Kanban Boards to keep track of projects at work.

![Pulling back the curtain to show an internal guide written in Notion](https://padilla-media.s3.amazonaws.com/blog/acnm/NotionGuide.png)

I created a board for our project to keep track of development tasks, and it soon expanded. At the end of development, we had a shared board, road map, and several Sanity guides that I wrote for Jenn to reference when she needed to add in some in-frequently used game logic to CMS

# Wrapping Up

Growing up, I really wanted my sister and I to collaborate on a big creative project together! I personally envisioned Jenn and I would start a virtual band similar to the Gorillaz, me making music while she illustrated band mates. BUT! This, I think, is even more fun than what I fantasized!

![Cool animal animations!](https://padilla-media.s3.amazonaws.com/blog/acnm/characterSwapAnimations.gif)

I had fun bringing life and interactivity to Jenn's story! It was rewarding to continue to learn and explore the technologies I was familiar with in a new way. We had ups and downs (and left and rights!) during development, but we were able to work through all of our blocks to create something really unique and special.

I hope you check out [AC: New Murder](https://acnewmurder.com)!

If you're interested in reading more about the nitty gritty of developing the tech or how I managed the project, you can read my deep dive on each below:

- [Developing a Game in React](/acnmfe)
- [Using Sanity as a Level Maker](/acnmbe)
- [Project Management for Game Development](/acnmpm)

You can also follow Jenn's art and work from her [site](https://www.jennpadilla.com/) or [twitter](https://twitter.com/jennpadillart).

[View the code on GitHub](https://github.com/cdpadilla42/AMM).
