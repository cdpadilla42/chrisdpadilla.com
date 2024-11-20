---
title: The Retrieval-Augmented Generation patern for AI Development
tags:
  - Tech
  - AI
date: '2024-11-20T10:33:07.322Z'
---

Yes ladies and gentleman, a post about developing with **AI**! 

If you're team is looking to incorporate an LLM into your services, the first challenge to overcome is how to do so in a cost effective way.

Chances are, your business is already focused on a specific product domain, with resources targeted towards building that solution. This already is going to point you towards finding an off the shelf solution to integrate with an API.

With your flavor of LLM picked, the next set of challenges center around getting it to respond to questions in a way that meaningfully provides answers from your business data. LLM's need to be informed on how to respond to requests, what data to utilize when considering their answers, and even what to do if they're tempted to guess.

The way forward is through prompt engineering, with the help of **Retrieval-Augmented Generation**

## Retrieval-Augmented Generation

The simplified procedure for RAG goes as follows:

1. Request is made to your app with the message "How many Tex-Mex Restaurants are in Dallas?"
2. Your application gathers context. For example, we may make a query to our DB for a summary of all restaurants in the area.
3. We'll provide a summary of the context and instructions to the LLM with a prompt.
4. We send along the response to the user.

That's an overly simplified walk through, but it should already get you thinking about the details involved in those steps depending on your use case.

Another benefit to this is that requests to an API are not inherently stateful. The chat window of an AI app will remember our previous messages. But my API request to that third party does not automatically. We have to store and retrieve that context.

## AI Agents

It's worth noting that step 2 may even require an LLM to parse the question and then interact with an API to gather data. There's a fair amount of complexity to still parse in developing these solutions. This is where you may be leaning on an **AI Agent**. An agent is an LLM that will parse a result and determine if a tool is required, such as pinging your internal APIs.

Prompt Engineering is emerging as a role and craft all of it's own, and there are [many nuances to doing it well](https://medium.com/@springs_apps/prompt-engineering-examples-and-best-practices-82b1da724643).

## LangChain

The workflow is already so common that there's a framework at the ready to spin up and take care of the heavy lifting for you. [LangChain](https://www.langchain.com/langchain) (stylized as 🦜⛓️‍💥) is just that tool. 

For a hands on experience building a RAG application on rails, their docs on [building a chatbot](https://python.langchain.com/docs/tutorials/chatbot/) are a good starting place.

For a more complex agentive tool, [LangGraph](https://www.langchain.com/langgraph) opens up the hood on LangChain for more control and plays nicely with LangChain when needed.
