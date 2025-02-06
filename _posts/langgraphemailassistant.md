---
title: LangGraph Email Assistant
tags:
  - Tech
  - AI
  - LangGraph
  - Clippings
date: '2025-02-06T10:35:07.322Z'
---

Harrison Chase with LangChain released [a walkthrough](https://www.youtube.com/watch?v=1A79eYjiBvo&ab_channel=LangChain) of an AI app that handles email triage. For those who have already gotten their hands dirty with the Lang ecosystem, the structure of the graph is most interesting.

On a high level, there's a succinct handling of tool calling. First, A message is drafted in response to an email. From there, a tool may be invoked (find meeting time, mark as read, etc.). Then, the graph can traverse to the appropriate tool.

`draft_message` seems to be the heavy lifter. Tool calls often return to the `draft_message` node. Not unlike other software design, a parent component is ultimately responsible for multiple iterations and linking between child components.

A few other observations:

1. The graph entry point is through a triage node. Their example uses an LLM to determine the next steps based on message context. This can be error-prone, but is likely mitigated by the fact that this app uses human-in-the-loop.
2. There’s a pattern for recovering from bad calls from the LLM. In this case, there is a `bad_tool_call` node that is responsible for rerouting to the `draft_response` node in the event that the agent hallucinates a tool. Another point of recovery!
3. Rewrite Node: Message generation follows two different passes to an LLM. One to write an initial draft (“What do I need to respond with?"), and then a rewrite node. (“What tone do I need to respond with?“) A useful pattern for message refinement.

You can find the [graph code here](https://github.com/langchain-ai/executive-ai-assistant/blob/main/eaia/main/graph.py). And [here is the walkthrough](https://www.youtube.com/watch?v=1A79eYjiBvo&t=1029s&ab_channel=LangChain), starting at the explanation of the graph structure.
