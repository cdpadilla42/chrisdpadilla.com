---
title: Cleaning Local Branches
tags:
  - Tech
  - Git
date: '2022-09-19T05:35:07.322Z'
---

It's not spring, but it is time for cleaning! Here's a pretty simple way to clear up local git branches.

```
$ git branch -d $(git branch | grep -v "^develop|master")
```

# Breaking It Down

```
$ git branch -d <branch>
```

This deletes the branch locally. To delete remotely, this command does the trick:

```
$ git push origin --delete <branch>
```

To fill in multiple arguments, there's a few pieces of glue needed:

- We'll use the `$()` command substitution syntax in Linux to fill in our list of branches
- Within it, we'll pipe all the branch names from `git branch`
- That will filter through our regex search through `grep` of all branches that aren't develop or master.
- "^develop|master" matches all branches that aren't develop or master.

# Testing the Regex

To make sure the right branches are being grabbed, removing the outer delete command will return the list of branches:

```
$ git branch | grep -v "^develop|master"
```

# Pruning Deleted Remote Branches

Removed remote branches can be cleared from your local computer with this command:

```
git fetch -p
```
