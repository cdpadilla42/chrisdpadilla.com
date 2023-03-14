---
title: Starting a Development Environment from the Command Line
tags:
  - Tech
  - Linux
date: '2023-03-14T10:35:07.322Z'
---

I have a _need_ for _speed_ when developing. That goes for starting up all of my development applications.

Here's what needs to happen before I start coding:

1. Open my repo in VS Code
2. Load in any environment variables
3. Start the local server
4. Open up chrome
5. Visit localhost:3000

A short list. But it takes a few key strokes and mouse clicks to get there. I think I can do better!

**Linux Alias Commands** are the answer.

I have a few set up for a few different use cases. Here's the one the runs the recipe for the steps above:

```
alias cap="cd /Users/cpadilla/code/my-repo && code . && open http://localhost:3000 && source settings.sh && npm run dev
```

I'm adding this to my .zshrc file at the root of my account.

That turns all five steps into one:

```
$ cap
```

Another use case: I keep a list of todos in markdown on my computer. Files are named by the current date. I could do it by hand every time, but there's a better way:

```
alias dsmd="touch $(date +%F).md && open $(date +%F).md"
alias todo="cd /Users/cpadilla/Documents/Todos && dsmd"
```

There we go! `$(date +%F)` is a command for delivering a specific date format. The `todo` alias navigates to the correct folder and then uses `dsmd` to create and open the file.

Small quality of life changes! They add up when you do the same commands every day. 🙂
