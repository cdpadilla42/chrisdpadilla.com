---
title: Functional vs. Object Oriented Programming
tags:
  - Tech
  - OOP
date: '2024-08-15T10:35:07.322Z'
---

I've been between projects in Python, Java, and JavaScript. Aside from the syntax differences, I've been pausing to wonder why the context switch takes time.

The answer has to do largely with the programming paradigm these languages tackle programming challenges. 

There's a spectrum here between Functional Programming and Object Oriented Programming. While all three can manage both paradigms in this day and age, their communities favor being on different poiints along the spectrum:

- JavaScript leaning heavily towards functional programming
- Java towards Object Oriented Programming
- Python sitting in the middle with great support for both paradigms

If you've started in web development, more than likely functional programming is very familiar. So here I'll explore how to make the switch in thinking in an OOP way coming from that perspective.

## Functional Programming

At the risk of stating the obvious: FP is built around functions. These individual functions are not tied to an object. They take inputs, process those inputs, and return a result. 

```JavaScript

const add_then_multiply = (a, b, c) => {
	let res = a;
	res += b;
	res *= c;
	return res;
}

```

What my silly example demonstrates is how a function takes in a handful of arguments, calculates through them, and returns the result. Side effects are possible, but not desirable. This paradigm fits nicely with unit testing and TDD because it's simple to test. If I put in 1, 2, 3, I expect to get 9.

JavaScript takes this a step further by treating functions as first class citizens. A function can be passed into another function (referred to as a callback) and then call that function within its own procedural process.

To oversimplify the pros — we are namely looking at a process that thrives on specific calculations and processes. This can lend short programs to be easy to read and unambiguous. When avoiding side effects, there's no confusion around what the program is doing. 


## Switching to Object Oriented Programming

Functions exist in OOP, but the major difference is that they are tied to data. I'll sum up my case right here: If you're looking to switch your thinking between the two, start thinking about how groups of data need to operate and can interact with each other. This is different from thinking of only the functionality that needs to occur.

In Python, say that I have a representation of a web page. I want to encapsulate the data and some functionality around it in a class:

```python

class WebPage():
	def __init__(url: str, name: str):
		self.url = url
		self.name = name
		self.visits = 0
		
	def visit_url(self):
		# Open url
		
	def print_webpage_details(self):
		print(f'{self.name} at {self.url}')
		
	def add_visit(self):
		self.visits += 1

```

This simple example demonstrates the shift. Not only have I defined some functionality, but that functionality is primarily centered around manipulating and using the data that's present on the instance.

Imagine it multiplied by dozens of classes then. All with their own state and functionality.

In fact, if you've been writing React, you've likely already been thinking in a moderately OOP way! The execution is largely functional. Hooks are primarily event driven. But it's the encapsulation with state and methods that also blends a bit of OOP into the way React is written.

There's more complexity that can naturally be held this way. And the power comes from having some flexibility to employ both. A procedural script employing functional programming that leans on Objects to encapsulate large amounts of data and complexity is what most apps realistically employ. So it's not a matter of one or the other, but understanding what problem you're trying to solve and picking the right paradigm for the job.

