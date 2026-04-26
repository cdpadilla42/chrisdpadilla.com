---
title: AI Feature Application Layer
tags:
  - Tech
  - AI
date: '2026-04-26T16:19:50.322Z'
---

A curious thing about AI apps, given that there is minimal UI, and that largely the UI of an AI app is through text, is that from a user standpoint in this new world, it’s not clear what the business app is, and what the AI technology is. At the very least, it’s easy to conflate the two if you’re unfamiliar. The LLM, vendor, be it OpenAI, Anthropic, Gemini. And the logic that sits on top that makes it work to accomplish whatever business-specific goal needs accomplishing.

An interesting illustration for this would be looking at the difference between LangGraph and LangChain’s ReAct Agent.

The LangChain Reacts Agent is a quick wiring up of a few different things. A system, prompt, which guides the vendor’s LLM on what is trying to be accomplished. A series of tools, typically API interactions that the LLM can invoke if needed. And then the user prompt, of course. The actual input provided by your user.

In LangGraph, unless you use this package, you don’t have access to this. What you’re doing instead is creating a series of nodes, edges, and logic, for how to incorporate all these pieces.

As an example, say I want to know how the Houston Astros are doing during their game today. I ask my Astros AI app if there’s a game going on, and what the current score is.

Here’s what needs to happen. This is all hypothetical, so we’ll walk through a few scenarios of how this could move around. My message is received by the application, let’s say the application is built with LangGraph. We may want to decipher the intent of the message, one way or another. Say that this AI is responsible for a number of things, sports scores for the Astros only being one of them. We may have our first node triaging what the question is that’s being asked. Once we ascertain that it’s about the score for the Astros, we can pass this along to the appropriate node for this. It’s best that we give each node individual responsibilities, in the same way that we have classes and components in our code bases individual responsibilities. Worth noting that we can have parent and child relationships here as well. Nodes can contain graphs within them.

It gets tricky from here to have an example, because much of how we structure this is partly dependent on the supporting API. Let’s assume that I have an endpoint where I can simply pass in a sports team and a date of a game — getting a score back. Once we’ve brought these details our score node, I can then call the appropriate API. This is either accomplished manually there, by extracting the team at a previous point, and then passing it to my API, or it is provided as a tool when we insert a React agent.

Once I get the score back, then I want to generate a human-readable message from the JSON. Perhaps there’s a separate node specifically for this once we have all the pertinent details. We navigate to that node, and another LLM is responsible for receiving a prompt specifically for turning the information we’ve gathered into a human-readable message. This could be a single-shot or a multi-shot interaction. Perhaps we generate an initial message as a draft, and then we clean it up with any communication policies. It’s at this point that we can then send the information off.

It gets more sophisticated from here. Say that the user includes multiple requests within one message. There’s been a need for an iterative approach to this. Perhaps a paragraph is responsible for creating a to-do list based on the user’s input, and then cycling through indications of notes and subgraphs to check off each item on the list. And then a summarizing message can be formed and cleaned up at the end.

A great deal of piping! But the development work doesn’t stop there. Given that these applications are famously non-deterministic, the amount of testing that goes into building these is high. There’s automated testing that can be done: unit, integration, graph traversal. For LLM-generated responses, evals will need to be put into place, and even so, these need manual review and iteration to match tone and catch hallucination.

In the same swoop that AI assistant coding tools are becoming really sophisticated, so is the bar for the AI applications that we’re developing. The point of all this being that, even in what seems like simple requests, there’s still a heavy amount of engineering and iteration to get to these places. Some would argue that it turns out that the LLM is not actually the most interesting part. It’s the many ways that we can develop an application on top of these. Much like any typical backend feature, a great deal of magic to the user, an interesting puzzle to all the teams that are bringing these new features to life.
