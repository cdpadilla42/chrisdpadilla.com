---
title: Git Hygiene
tags:
  - Tech
  - Git
date: '2022-08-29T05:35:07.322Z'
---

My recent projects have involved a fair amount of disposable code. I'll write a component for an A/B test, and then it needs to be ripped out after the experiment closes.

Git has simplified this process beautifully!

I _could_ manually handle the files, deleting line by line myself. But git makes it so that I can run a few commands in the CLI to revert everything.

Here's my workflow for it:

# Modular Commits

I've been guilty of mega commits that look something like this:

```
git commit -m "render revenue data to pie chart AND Connect ID to Dashboard AND move tiers to constants file AND ..."
```

I've recently made the switch to breaking out any instance where I would want to put an "and" in my explanation of the change into its own commit. So now my commits will look more like this:

```
$ git commit -m "render revenue data to pie chart"
$ git commit -m "Connect ID to Dashboard"
$ git commit -m "Move tiers to constants file"
```

There are loads of benefits to this. To anyone reviewing my code, it's far easier to follow the story told by my commits. Isolating a breaking change is much easier.

The best, though, is that it's **WAY** easier to isolate a commit or few that needs to be thrown out later.

# Revert Commits

The word comes back from marketing: The first A/B test was a success, but the second needs taking out.

If a single commit needs changing, it's as easy as this:

```
$ git revert 9425e670e9425e66d61c8201...
```

`git revert` will then create a commit with the inverse of those changes.

Usually, I need to do this with multiple files. The workflow isn't too different:

```
$ git revert --no-commit 820154...
$ git revert --no-commit 425e66...
$ git revert --no-commit 9425e6...
$ git commit -m "the commit message for all of them"``

```

Push and merge from there!
