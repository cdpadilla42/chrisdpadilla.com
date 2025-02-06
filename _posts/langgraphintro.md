---
title: Getting Started with LangGraph
tags:
  - Tech
  - AI
  - TypeScript
  - JavaScript
  - LangGraph
date: '2024-12-17T10:35:07.322Z'
---

[LangChain](https://www.langchain.com/) is emerging as a popular choice for Reactive AI applications. However, when you need a higher degree of control and flexibility in a project, [LangGraph](https://www.langchain.com/langgraph) offers exactly that. All the while, still providing guide rails and tooling for quick iteration and development.

Below, I'll share the absolute essentials needed to get started with LangGraph! With this toy app, we'll cover all the major concepts for developing a graph. Here, I'll do so with a Joke Telling AI application. While it's a simple app, this should demonstrate a foundation for developing [your own RAG applications](/airag).

## Setting Annotations

LangGraph is really a state machine at the end of the day. To get started, you'll want to define the state that will persist and change through your graph. These defenitions are referred to as Annotations in LangGraph.

Below, I'm creating an Annotation with two pieces of state: `messages` and `selectedModel`. I want to be able to add and keep track of messages. Additionally, I want to be able to select which model to invoke.

```TypeScript
import {Annotation} from "@langchain/langgraph";
import {BaseMessage, HumanMessage, SystemMessage} from "@langchain/core/messages";

export const GraphAnnotation = Annotation.Root({
    messages: Annotation<BaseMessage[]>({
        reducer: (current, update) => current.concat(update as BaseMessage[]),
        default: () => [],
    }),
    selectedModel: Annotation<string>({
        reducer: (current, update) => update,
        default: () => "",
    }),
});
```

## Defining the Workflow

Once you have defined your Annotation, you can then outline the flow of your graph. Graphs are composed of two elements: Nodes and Edges. A Node is a function that will run. An Edge is the direction taken following a Node's completion.

Additionally, we can define Conditional Edges. These are steps in the graph that will assess which Node to access next.

Before getting into the details, let's outline a simple graph:

```
import {StateGraph} from "@langchain/langgraph";

const workflow = new StateGraph(GraphAnnotation)
    .addNode("OpenAI", callOpenAI)
    .addNode("Anthropic", callAnthropic)
    .addConditionalEdges("__start__", selectModel)
    .addEdge("OpenAI", "__end__")
    .addEdge("Anthropic", "__end__");
```

My graph here defines two Nodes, each invoking a 3rd party LLM. Below that, I'm defining a Conditional Edge. And below that, I'm adding simple Edges to the end of the application.

## Creating the Nodes

Nodes are simply functions that are called. Their expected output is the state we want to change in the graph. For example, when calling a model, I want the AI response to be added to my array of messages. Here's what both of those Nodes will look like:

```
import {ChatOpenAI} from "@langchain/openai";
import {ChatAnthropic} from "@langchain/anthropic";

const callOpenAI = async (state: typeof GraphAnnotation.State) => {
    const model = new ChatOpenAI({temperature: 0});

    const messages = state.messages;
    messages.splice(messages.length - 2, 0, new SystemMessage(prompt));
    const response = await model.invoke(messages);

    return {messages: [response]};
};

const callAnthropic = async (state: typeof GraphAnnotation.State) => {
    const model = new ChatAnthropic({temperature: 0});

    const messages = state.messages;
    messages.splice(messages.length - 2, 0, new SystemMessage(prompt));
    const response = await model.invoke(messages);

    return {messages: [response]};
};
```

Notice that I'm adding a `SystemMessage` before invoking each model. This is where I can provide my prompt:

```
const prompt = "You are a hilarious comedian! When prompted, tell a joke.";
```

## Routing With the Conditional Edge

Earlier we defined in our Annotation a `selectedModel` state. In our Conditional Edge, we'll make use of it to route to the preffered model:

```
const selectModel = async (state: {selectedModel: string}) => {
    if (state.selectedModel === "OpenAI") {
        return "OpenAI";
    }

    return "Anthropic";
};
```

Note that I'm returning the name of the Node that I'd like the graph to traverse to next.

## Persistence

Persistence is [a larger topic](https://langchain-ai.github.io/langgraph/concepts/persistence/) in LangGraph. For today, we'll be making use of the in-memory saver. Know, here, that you can use your own plugin for strategies that utilize SQL Databases, MongoDB, Redis, or any custom solution:

```
import {MemorySaver} from "@langchain/langgraph";

const checkpointer = new MemorySaver();
```

## Calling the Graph

With all of this set, we're ready to use the graph!

Below, I'll compile the graph with the checkpointer I created above. Once I've done that, I'll create a config object (the `thread_id` is a unique identifier for a conversation had with the user and graph. It's hardcoded here for simplicity.) With both of these, I'll invoke the graph, passing the initial state as well as my config object.

```
import {RunnableConfig} from "@langchain/core/runnables";


export const compiledGraph = workflow.compile({checkpointer});

const runGraph = async () => {
    const config = {configurable: {thread_id: "123"}} as RunnableConfig;
    const {messages} = await compiledGraph.invoke(
			// Initial updates to State
			{selectedModel: "OpenAI", messages: [new HumanMessage("Tell me a joke!")]},
			// RunnableConfig
			config,
    );
    console.log(messages[messages.length - 1].content);
};

runGraph();

// Logs the following:
// Why couldn't the bicycle stand up by itself?
//
// Because it was two tired!

```

There you have it! With that, you're off and away on developing with AI! 🚴
