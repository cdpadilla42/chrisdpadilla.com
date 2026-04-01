---
title: Monotasking with AI Agents
tags:
  - Tech
  - AI
date: '2026-04-01T12:37:41.322Z'
---

I've been seeing great gains in one open window for AI coding assistant like Claude Code, but then heard that the _real_ productivity boost was to have multiple in-flight. The velocity gains seemed exciting, and there was ample downtime between prompt and response. So I decided to give it a whirl over a couple of weekends.

I tried this with terminal tabs first, then dabbled in UI's that build around this philosphy such as [Conductor](https://docs.conductor.build/), and even ogled at the wildness that is [Gas Town](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04). ([Maggie Appleton](https://maggieappleton.com/gastown) is recommended reading on this wild speculative experiment towards agent orchestration).

If you haven't given this workflow a go, I have to warn you that it is initially _exhilarating_. The jumping back and forth between tasks and typing into being solutions and features is addictive. There's an intoxication to see work that took ages being trivialized in parallel.

Naturally, though, this way of working has tremendous tradeoffs. First — throughput becomes the priority over quality. When there are other tasks waiting to be addressed, a given task that requires pause leads to impatience, making it all the more tempting to skim code generated, gloss over details, and obviously make mistakes. So more is done, but worse than before.

There's, of course, our mental wiring as well. There is plenty of research out there supporting that our minds are terrible multitaskers. We do not truly run multiple threads — it's all one thread, but with the ability to be interrupted and switch tasks quickly to give the illusion of multitasking. This can be stimulating (hello social media), but it is also incredibly expensive. So this mode of working is actually more demanding, not less — a complete reversal to how AI products get marketed. This means being absolutely _exhausted_ quickly. But, because the next prompt always contains the chance of a high reward with low effort, you want to keep going. Then, much like above, you are pressured into poor choices and skimming because of the fatigue on top of the throughput prioritization.[^1]

I found myself especially susceptible to this — when looking for more to put in flight, I ended up adding tasks and features that were low impact. So I might have a medium-priority task in flight, and be working on a smaller feature on the side. But, eventually, that small feature that was only supposed to take a few minutes ballooned into a larger problem that spiraled. Now I'm stuck working on both, and that additional feature likely didn't even need to be on my plate in the first place. The cost to onramp is low, so the complexities were underestimated against the more trivial priority.

So, when working with AI coding agents in this way, I was developing brittle features and fixes, spending more time on low-priority tasks that took away from my high-priority ones, _and_ I was more exhausted than ever before from development. This experiment was clearly a failure.

A major concern many engineers have around developing with AI assistance is a less thorough understanding of what they are developing. Hence the term vibe coding. This approach only exacerbates the issue. Forget being rusty with JavaScript — I wasn't retaining the attributes of the features I was working on as a result of this practice. A scary position!

This is not all that different from work modes before agentic coding tools. Monotasking and Deep Work are long-advocated principles that have always worked, and the introduction of the shiny new tool makes no difference here.

The alternate title to this would be "I Tried Multitasking Developing With Claude Code So You Don't Have To". So beware the temptation! The time when the tools are processing your prompt is better spent thinking further on the problem. These tools, while trying to lead with generation, are still most useful to me when I spend ample time using them to [think more deeply and efficiently](/claudecodeusage) around a problem rather than over-delegating to them.

Even further still — it's better to ignore the hype of 10X productivity that's seen buzzing around, and instead aim for _just a bit_ more efficient for greater sanity and ownership over the work at hand.

---

[^1] Steve Yegge, developer of Gas Town, returns to warn of this exact thing in [The AI Vampire](https://steve-yegge.medium.com/the-ai-vampire-eda6e4f07163).
