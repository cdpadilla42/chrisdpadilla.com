---
title: Testing Software for the Same Reason You Write Notes
tags:
  - Tech
  - Testing
date: '2022-12-29T05:35:07.322Z'
---

My work as of right now isn't largely Test Driven. The scale I work at isn't as dependent on tests, the codebases are small enough where I'm not as concerned about on glossing over any unwanted side effects.

_However_, I can't deny the benefits of testing.

Of course, having tests in place help solidify the sturdiness of your application. There's a certain reassurance that comes with shipping code that is backed by working tests. Then also while developing, there's a much tighter feedback loop for the coverage areas of your code when refactoring.

Dave Thomas and Andy Hunt in [The Pragmatic Programmer](/pragmaticprogramer) make a much more interesting case: Writing tests leads to writing better code. The gist being that testable code is well-organized and thought-out code.

I think, largely, there's a parallel here with writing blogs/articles/notes as a mode of thinking.

I mentioned in my [2022 reflection](/2022) that "Articles help solidify knowledge." Put another way, they bring an organization to the otherwise sloshy thought process that our human brain operates under.

A quote of a quote: [Chris Coyier](https://chriscoyier.net/2022/12/13/writing-is-the-ticket-to-a-clear-understanding/) links [Mark Brooker](https://brooker.co.za/blog/2022/11/08/writing.html#foot1) on the Magic of Writing with this gist:

> I find, more often than not, that I understand something much less well when I sit down to write about it than when I’m thinking about it in the shower. In fact, I find that I change my own mind on things a lot when I try write them down. It really is a powerful tool for finding clarity in your own mind.

So here's my understanding:

Even if you aren't dependent on the tool of running tests locally and in a CI/CD integration, there are still design benefits to writing tests. Code that doesn't have tests may not be testable, which lends itself to a more interdependent design rather than a modular one.
