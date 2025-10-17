---
title: Handling Errors in LangGraph (and Other State Machines)
tags:
  - Tech
  - AI
  - TypeScript
date: '2025-10-17T10:35:07.322Z'
---

LangGraph is largely a state machine — a series of processes that are guided by changes to state. It's great for Agentic style apps.

When something goes wrong — _especially_ if you are having the LLM handle api post requests. — It's good to have a fallback plan.

In my example, I'm wrapping every node with a try-catch that then saves an errorMessage to state:

```
// handleError.ts

import {logger} from "#lib/logger";

export const handleError = (error: unknown) => {
    if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.trace(error.stack);
        return {errorMessage: error.message};
    }

    if (typeof error === "string") {
        logger.error(error);
        return {errorMessage: error};
    }

    throw new Error(`An unknown error occurred while handling the error: ${error}`);
};
```

```
// sampleNode.ts

import {handleError} from "#graphs/jobs/recommendationsGenerator/util/handleError";
import type {MyGraphState} from "./annotation";

export const generateEmailNode = async (state: MyGraphState) => {
    try {
		// Do your thing and error
    } catch (error) {
        return handleError(error);
    }
};

```

We can then see how I'm structuring the graph. Here, you'll notice that all of my edges are conditional. I'm giving an opportunity at each step to check if an error was raised, and then giving my graph the opportunity to handle the error:

```
// graph.ts

const buildGraph = () => {
    const graph = new StateGraph(MyGraphState)
        .addNode("startGraph", startGraph)
        .addNode("secondNode", middleNode)
        .addNode("handleErrorNode", handleErrorNode)
        .addEdge(START, "startGraph")
        .addConditionalEdges("startGraph", (state) => conditionalEdgeRouter(state, "secondNode"))
        .addConditionalEdges("secondNode", END)
        .compile();

    return graph;
};
```

```
// conditionalEdgeRouter.ts

import {MyGraphState} from "//annotation";

export const conditionalEdgeRouter = (state: RecommendationGeneratorState, nextNode: string) => {
    return checkForErrors(state) || nextNode;
};

const checkForErrors = (state: MyGraphState): "handleErrorNode" | undefined => {
    if (state.errorMessage) {
        return "handleErrorNode";
    }
};

```

From here, I can construct my `hadleErrorNode` to log the error. I can then set up a process to implement **Compensating Transactions** where I reverse the effects of successful transactions.
