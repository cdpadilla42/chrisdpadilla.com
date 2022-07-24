---
title: Storing Keyword Arguments in Python Class Instantiation
tags:
  - Tech
  - Python
date: '2022-09-12T05:35:07.322Z'
---

Here's the sitch: We recently had an all hands project in Python where we needed to create a pretty flexible internal package.

Part of that flexibility means not always knowing all the arguments we're instantiating with, but knowing that if certain arguments are available, we want to use them in our methods.

Here's what I mean:

```
class PizzaOven(object):
	def __init__(self, **kwargs):
		# Take in toppings and store for later.

	def bake(number):
		for x in range(number):
			if self.pineapple and self.ham:
				print('Here's one Hawaiian Pizza')
			else:
				print('Here's your tasty pizza')
```

We have a class that will receive toppings as keyword arguments, and our method later on may need to extract those arguments to know if it's a Hawaiian Pizza. In another case, if we're dealing with a third party api, we may need to plug those values into a method in a certain order, or only use them if they're provided, like an options dictionary.

# Static Dict Property

When constructing classes, python stores it's writable attributes to the `__dict__` class attribute.

Doing this:

```
class PizzaOven(object):
	def __init__(self, **kwargs):
		self.ham = kwargs.ham
```

Is somewhat like doing this:

```
class PizzaOven(object):
	def __init__(self, **kwargs):
		self.__dict__["ham"] = kwargs.ham
```

The code above would error out since that's _simply not how we do things around here!_ But we'll cover how this concept helps out with keyword arguments below.

# Updating Dict with Keyword Arguments

By using the `update` dictionary method, we can take in an object that instantiates the class with our toppings and store them as instance variables.

```
class PizzaOven(object):
	def __init__(self, **kwargs):
		self.__dict__.update(kwargs)
```

Then our toppings are made available later:

```
class PizzaOven(object):
	def __init__(self, **kwargs):
		self.__dict__.update(kwargs)

dominos = PizzaOven(pepperoni=True, ham=True)

dominos.bake(1) # "Here's one Hawaiian Pizza"
```

Bon Appétit!
