---
title: Testing Chat Bots with Personas
tags:
  - Tech
  - AI
date: '2026-07-18T16:00:09.322Z'
---

Conversational AI can be tricky to integrate with an application due to the variability of response and, as a result, how slippery it is to have generative responses in tandem with an adherence to tone and an array of desired responses. The continual tuning and refinement is an ongoing task!

Even before launch, developing a conversational flow requires regular feedback across multiple scenarios is necessary in the same way that developing an application requires a suite of tests, from unit tests to integration and end-to-end tests. 

One solution is [evals](https://docs.langchain.com/langsmith/evaluation), which alows us to measure what we anticipate as being critical requirements. Even so, it still takes a humans reviewer to verify if we are getting the response we're looking for. And yet — how tedious is it to manually write out a conversation after every change to the prompt?

Enter — Personas! Not by any means a spec or an official design, but in my own work I've seen the need to have a quick way to generate a simulated conversation.

The aim here is somewhat different from evals, even multi-turns that will measure responses across multiple messages. Namely that the LLM is not the judge. When prototyping, I needed a way to review the output myself cheaply and refine from there.

---

The gist is not too different from actually developing a conversational AI. You give it a persona: An aim in their conversation and predefined intentions for how to respond to follow up questions. 

Why an AI? For the variety of response and the ability to dynamically respond to shifts in how the actual conversational bot conversed. Though, there are cases for hardcoding responses as well, such as a when trying to make a forbidden request.

In my use so far, these are largely throw-aways. So my prompts are not too detailed. Here's an example of one that is meant to go off the rails:

> _"You are a grocery shop customer who just finished placing an online order for food delivery. You tend to over-share and go off-topic — mention your day, your dog, your commute. You did enjoy the application but you bury that in tangential details. Keep responses 2-3 sentences."_

Here's an example of the output, where the goal is to see if the conversational AI continues to try to bring the tangents back into focus:

> **AI Chatbot:** Hey, just wanted to check in — how did your grocery order go?
> 
> **Client:** Hey! Just got everything unpacked, and it was quite a trip — my dog kept nosing into every bag looking for treats while I was putting things away. Anyway, I'd love to hear what your go-to order is or any tips you might have!
>
> **AI Chatbot:** Sounds like quite the adventure. I'm curious — did anything about the ordering experience stand out in a positive way?
>
> **Client:** Oh, definitely! The produce was so fresh it reminded me of that farmers market by the park where I walk my dog; the tomatoes actually smelled like tomatoes. But honestly, I was half-distracted keeping my little guy from stealing the baguette, so I might have missed some of the details — my mind was all over the place today!
>
> **AI Chatbot:** That's helpful context! Besides the produce, was there anything else about the order that caught your attention?
>
> **Client:** Yeah, I also noticed the substitutions were handled really quickly, which is a plus since I've been trying to cook more at home — though my dog gave me the side-eye when...

---

The benefit of setting this up is that then, after any meaningful change, I could fire multiple personas to walk through many different conversational scenarios. I could tweak the response for one in particular, or I could review them all in search for patterns. 

Of course, this has limited use. For one, it risks creating your own [moltbook](https://www.moltbook.com/) where, if you're not careful, you're only measuring synthetic scenarios instead of what would actually transpire when a user interfaces with the app. The primary benefit is in initial development, iterating quickly so that the obvious errors are taken care of before bringing in outside testers.
