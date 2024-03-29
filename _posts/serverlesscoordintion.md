---
title: Coordinating Multiple Serverless Functions on AWS Lambda
tags:
  - Tech
  - AWS
  - Architecture
date: '2024-03-29T10:35:07.322Z'
---

Sharing a bit of initial research for a serverless project I'm working on.

I've been wrestling this week with a challenge to coordinate a cron job on AWS Lambda. The single script running on Lambda is ideal. There's no server overhead, the service is isolated and easy to debug, and it's cost effective. The challenge, though, is how to scale the process when the run time increases.

Lambda's runtime limit at this moment is 15 minutes. Fairly generous, but it is still a limiter. My process will involve web scraping, which if done sequentially, could easily eat those 15 minutes if I have several processes to run.

The process looks something like this so far:

1. Initial function start, get a list of pages to crawl.
2. Sequentially crawl those pages. (separate lambda function called sequentially)
3. After page crawl, send an update on the status of the crawl and update the DB with results.

Simple when it's 3 or 5 pages to crawl for a minute each. But an issue when that scales up. Not to mention the inefficiency of waiting for all processes to end before sending results from the crawl.

This would be a great opportunity to lean on the power of the microservice structure by switching to concurrent tasks. The crawls are already able to be sequentially called, the change would be figuring out how to send the notification after the crawl completes.

To do this, each of those steps above can be broken up into their own separate lambda functions. 

Once they're divided into their own serverless functions, the challenge is too coordinate them.

## Self Orchestration

One option here would be to adjust my functions to pass state between functions. Above, the 1st lambda would grab the list of pages, and fire off all instances of the 2nd lambda for each page. The crawler could receive an option to notify and update the db. 

It's a fine use case for it! With only three steps, it wouldn't be overly complicated. 

To call a lambda function asynchronously, it simply needs to be marked as an "Event" type.


```
import boto3

lambda_client = boto3.client('lambda', region_name='us-east-2')

page = { ... }

lambda_client.invoke(
  FunctionName=f'api-crawler',
  InvocationType="Event",
  Payload=json.dumps(page=page)
)
```

## Step Functions

Say it *were* more complicated, though! 3 more steps, or needing to handle fail conditions!

Another option I explored was using Step Functions and a state machine approach. AWS allows for the ability to orchestrate multiple lambda functions in a [variety of patterns](https://docs.aws.amazon.com/lambda/latest/dg/stepfunctions-patterns.html#stepfunctions-application-patterns) such as Chaining, branching, and parallelism. "Dynamic parallelism" is a patern that would suit my case here. Though, I may not necessarily need the primary benefit of shared and persistent state. 

## The Plan

For this use case, I'm leaning towards the self orchestration. The level of state being passed is not overly complex: A list of pages from step 1 to 2, and then a result of success or failure from step 2 to 3. The process has resources in place to log errors at each step, and there's no need to correct at any part of the step. 

Next step is the implementation. To be continued!
