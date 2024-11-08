---
title: Extending Derived Class Methods in Python
tags:
  - Tech
  - Python
  - OOP
  - Polymorphism
date: '2024-11-08T10:35:07.322Z'
---

Polymorphism! A sturdy pillar in the foundation of Object Oriented Programming. At it's simplest, it's the ability to change the implementation of specific methods on derived classes. 

At face value, that could mean entirely rewriting the method. But what if we want a bit more nuance? What if we want to _extend_ instead of replace the method entirely.

I'll continue on my Vehicle example from my previous post on [polymorphism](/abstractsincs), this time in Python:

```Python
from abc import ABC

class Vehicle(ABC):
    def __init__(self, color: str):
    
        if not color:
            raise ValueError("Color string cannot be null")
            
        self._passengers = []
        self.color = color

    def load_passenger(self, passenger: str):
        # Logic to load passenger

    def move(self):
		# Some default code for moving
		print("Moving 1 mile North")

```

I've created an **Abstract Base Class** that serves as a starting point for any derived classes. Within it, I've defined a method `move()` that moves the vehicle North by 1 mile. All children will have this class available automatically.

Now, if I want to override that method, it's as simple as declaring a method of the same name in my child classes:

```Python
class Car(Vehicle):
    def move(self):
        print("Driving 1 mile North")


class Boat(Vehicle):
    def move(self):
        print("Sailing 1 mile North")
```

In the case that I want to extend the functionality, we can use Super() to do so:

```Python
class Car(Vehicle):
    def move(self):
    	super().move()
    	print("Pedal to metal!")


class Boat(Vehicle):
    def move(self):
    	super().move()
    	print("Raising the sail!")
```


The benefit here is I can pass all the same arguments I'm receiving in the method call on either child instance to the default implementation in the parent. They can then be used in my own custom implementation in the child class. 

```Python
car = Car()
car.move()
# Moving 1 mile North
# Pedal to metal!

```