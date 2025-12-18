---
title: Critical Thinking and Coding Agents
tags:
  - Tech
  - AI
date: '2025-12-12T11:00:23.322Z'
---

I've gone the Agentic-AI coding way for the past couple of months. My initial responses to it may mirror your own:

- Earlier this year, after using inline suggestions for some time, the jump to prompting an agent that then writes multiple files' worth of code was shocking! The feeling of it running away conjured images from [the Sorcerer's Apprentice](https://video.disney.com/watch/sorcerer-s-apprentice-fantasia-4ea9ebc01a74ea59a5867853).
- Returning to the approach several months later, trying it in my own projects, the results were suddenly thrilling! With the right wrangling, what was previously tedious to implement became trivial. The possibility of accelerated speed was intoxicating.

Depending on your bent towards pessimism and optimism, the order of events may be different for you. Programmers, as those who now largely work with AI closely in our daily work, have been getting a very pragmatic understanding of the tool as it's emerging, finding its edges and where it can improve our work. So, naturally, consensus is between the two extremes of rejection and hype. This is a powerful tool, and it takes a separate skill to fully understand where it's appropriate to use and how to get the results you're looking for. Here are some thoughts as I've been getting up to speed on using coding agents:

## Vibe Coding Vs. AI Assisted Coding

It's worth knowing the difference. Similar to how there is a spectrum between scenarios where you are comfortable using a package and scenarios where your team develops your own solution for a problem, there's a range between letting the coding agent have free rein and integrating with that process heavily.

[Birgitta Böckeler has a great exploration](https://martinfowler.com/articles/exploring-gen-ai/to-vibe-or-not-vibe.html) outlining formally what is really an intuitive process. Prototypes, proof-of-concept, and throw-away code are an easy choice for letting the agent take the wheel. Anything beyond that takes a consideration of the tradeoffs between [speed, quality, and cost](https://en.wikipedia.org/wiki/Project_management_triangle). (Cost, interestingly, is spread across a few different currencies here: Cost of context in your agent, cost of mental resources you have available, cost of digging through the docs, etc.) For most daily work, debugging and producing production-level code, you'll learn best how to _integrate_ it as part of your process instead of a replacement.

## Engaging Critical Thinking

While still in the early days of mass access to integrated LLM usage, we're seeing that the tool is overly eager to be useful. Responses to user queries from the major AI players are long-winded. Coding agents aim for verbose solutions. And speed is the preferred default over what we're now seeing in "reasoning" or "thinking" modes.

The speed and length are somewhat alluring. While getting familiar with these tools, it's easy to pass over much of the reasoning to the tool, but we have to be careful there.

There are a few studies already underscoring the hypothesis that we are thinking less when using these AI tools. You can find them in Maggie Appleton's [A Treatise on AI Chatbots Undermining the Enlightenment](https://maggieappleton.com/ai-enlightenment/). There you'll also find a compelling solution to this issue through your own prompt engineering. If the AI tool tends towards flattery and confirmation, tell it to do otherwise.

So our aim is clearly for deep involvement in the process while using these tools, but we have to be mindful that the tool itself may not be working in that interest out of the box. Restraint, practice, and perhaps a different framework of interacting with the agents are required.

## The Chat Interface

I think this is also partly due to the UI here.

Agents, be they general-user-facing or, now, IDE integrations, are engaged with through a chat interface. Think of where else this interface exists: Discord, Slack, your favorite social media's direct messages, sms text clients, those finicky chat bubbles on portfolio websites, and, for old-time's sake, AOL Instant Messenger.

You get the idea — these are not interfaces for writing prose, editing and refining a document, and going at a steady pace. This is a space for quick responses and moving the conversation forward. Even the ping-pong of question and answer implies that we should move on with haste.

For a technology whose domain language is... language! It certainly is intuitive. However, for software development in particular, we need to ensure the tool is not so over-eager to spin out the solution that we are then racing to keep up. A thoughtful UI can help encourage this.

## Superpowers and Spec Driven Development

Much of this is to say that my sweet spot for AI-assisted coding has been with the aid of a couple of different tools that help mitigate the major concerns above.

For a broad exploration of what's out there in the Spec Driven Development space, Birgitta Bockeler [returns with a thoughtful article here](https://martinfowler.com/articles/exploring-gen-ai/sdd-3-tools.html).

My favorite at the time of writing has been [Superpowers by Jesse Vincent](https://github.com/obra/superpowers). The technology underneath this is not overly complex: The heart of it is a series of prompts that you can read on the github page.

The framework encourages you to work in phases: First, brainstorming high-level considerations and edge cases, then writing an implementation plan with code samples, and then implementing the plan sequentially with quality checks along the way. A massive improvement in thoroughness from even Claude Code's planning mode alone.

Even better is that markdown files are generated as artifacts along the way. This serves a couple of different purposes: You can limit the context provided to an agent, externalizing it from the current agent's memory and allowing you to spin up another agent to handle the next phase. And, from a user standpoint, we then have the opportunity to step away from the chat interface and thoroughly review the plan thoughtfully.

As an aside — the markdown files are, largely, disposable. Perhaps part of the idea of having these files written is that they can then serve as reference documentation down the line. Unfortunately, change happens quickly, and it then becomes an issue of keeping multiple documents in sync. So, thus far, I've tossed these files after a given phase of a feature is complete.

The primary benefit in my own use is that any feature of medium complexity is now something that I have the chance to think through thoroughly from high-level design to implementation details, all while also appreciating the benefit of a tool that can type much faster than I can.

## Raising Our Gaze

We are still in the wild west. Practices are continuing to evolve. For medium-sized features, Superpowers, along with similar frameworks, are aiding in ensuring that we are using the tools and not the other way around.

Our role is to continue to be the primary holder of context: Only you fully understand the full logistical needs of the project, what sort of tradeoffs you want to make, and the long-term infrastructure work that will keep your application continually extendable.

With that intent in mind, I optimistically see a novel way of development emerging. Another layer of abstraction is being built, where we can continue to move our gaze a bit further from syntax and tedium, and focus on the design aspects of our work that truly matter.
