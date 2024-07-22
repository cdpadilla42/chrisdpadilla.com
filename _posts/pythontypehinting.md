---
title: Type Hinting in Python
tags:
  - Tech
  - Python
date: '2024-07-22T10:35:07.322Z'
---

After spending some time in [Java](/blog/java), [TypeScript](blog/typeScript), and [C#](blog/cSharp), I've started to miss typing when it's not there. 

While Python won't keep from compiling if there's a type issue, the autocomplete and clarity that comes with **Type Hinting** is a boon to productivity and clarity. 

## The Basics

A quick, simple example:

```Python
def say_name(name: str) -> str:
    return "My name is " + name
```

`name: str` is declaring that name is the built-in string type. The `-> str` denotes that we are returning a string.

## Not Fool-Proof

Say that there are some conditions to the function:

```Python
def say_name_if_starts_with_j(name: str) -> str:
	if name[0] is 'J':
		return "My name is " + name
	else:
		return False
```

I've said this method will return a string, but in some cases it returns a boolean. In statically typed languages, this would raise an error at compile time, and/or my editor may alert me to the issue. In Python, however, these are only hints. So this code flies.

Let's fix it before moving on:

```Python
from typing import Union

def say_name_if_starts_with_j(name: str) -> Union[str, bool]:
	if name[0] is 'J':
		return "My name is " + name
	else:
		return False
```

## Why It's Called Type _Hinting_

The main benefit here comes later as I'm calling the function. Say I'm in the middle of writing this code:

```Python
name = say_name_if_starts_with_j("Jake The Dog")
name.capitalize()
# autocomplete suggests string methods, such as "capitalize"

```

Because we've gone through the trouble of typing our return value, my code editor knows to suggest string methods (as well as boolean methods!) 

Hovering over the `say_name_if_starts_with_j` method now also includes a line recreating my defenition:

```Python
(method) def say_name_if_starts_with_j(
    name: str
) -> str
```

We're missing some of the compiling and linting benefits of statically typed languages out of the box with Type Hinting. However, it's a feature of the language that still has value in communication! 

Typing here allows for me to be intentional with my methods and allows for an opportunity to communicate clearly the expected inputs and outputs of my function. One less trip to another tab in my code editor or browser can go a long way for keeping the flow going.