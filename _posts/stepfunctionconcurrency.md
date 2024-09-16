---
title: Orchestrating Concurrent Tasks in AWS Step Functions
tags:
  - Tech
  - AWS
  - Architecture
date: '2024-09-16T05:35:07.322Z'
---

The straight ahead way of using AWS step functions is to daisy chain lambda after lambda to accomplish a task. 

Naturally, apps and workflows can get more complex. There can be a need to limit the number of concurrent tasks. Or, inversely, the need to run massively concurrent tasks at once and then resolve them.

Below are a few tools to orchestrate workflows with added complexity.


## SQS

AWS Simple Queue Service is just that: A message queueing system that can hold messages for you and send off data when resources are made available. You can tie a lambda function to an SQS as a trigger. In that case, when a message comes through and is ready for consumption, the lambda function can take the message and do work from there.

An important piece here is that you can limit the number of concurrent functions at any given time while also holding on to impending tasks. If you need to limit a task to 100 concurrent calls, this is where you can do it.

## Distributed Map

One possible state type in Step Functions is "Map". Map allows your step function to take a piece of data and iterate over it with an assigned process. 

Previously, inline maps had a limit of 40 methods at a time. For a much more powerful implementation, switching to the distributed mode allows for up to 10,000 parallel executions. 

The key role a distributed map step will play is in allowing for the whole computational process to still be contained within the step function. 

Since I introduced the SQS above, one possible solution is simply to pop my list of data into an SQS without the concurrent limit. However, if you need to finalize and process the result from those individual computations, coordinating their completion and status manually can become complex.

With Distributed Maps, you still have the benefit of massive concurrent computation, while also having the benefits of efficient resolution and simple orchestration.

## Callback with Task Tokens

While distributed maps allow controlled parallelism of a dynamic number of functions, introducing SQS adds an extra layer of variability. We don't know when our message sent to SQS will be fired and concluded.

Say I send a message to SQS in the middle of my step function and am dependent on the returned results. How can I instruct my step function to wait for those results?

Callbacks with Task Tokens are the answer. The idea is that by setting our state resource to `arn:aws:states:::sqs:sendMessage.waitForTaskToken`, we can instruct our step function to pause here. When sending a task token to SQS along with our payload, on completion, we can send a success or failure message back to our step function. When it comes with the original task token, AWS knows to then continue the initial step function with the returned results.

## Putting It Together

With all of the above, you can handily stitch together a workflow that:

- fires of concurrent tasks through a Distributed Map
- Siphon off select tasks to an SQS for a separate, limited process.
- Return the SQS results to the original step function with a task token.

