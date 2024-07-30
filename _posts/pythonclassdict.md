---
title: Passing State in Python with the Special Dictionary Attribute & the Classmethod decorator
tags:
  - Tech
  - Python
  - OOP
date: '2024-07-30T10:35:07.322Z'
---

I found myself in a situation where I had constructed a `ProcessState` class for storing the results of a cron job that runs on AWS. Passing the instance of `ProcessState` works just fine when it all happens in a single package. _But_ then I needed to store the state in our database temporarily while the lambda kicks over to another procedure within a step function.

I needed two things:

1. A succinct way to export the state.
2. A way to load the state from the db and re-instantiate my `ProcessState` class

Two built-in Python methods did the trick: the `__dict__` Special Attribute and the `@classmethod` decorator.

## Starting File

Here's `ProcessState`:

```
import logging
from logging import Logger
import datetime
from .types.unit_dict import UnitDict


class ProcessState:
    """
    Object for storing and formatting Process State
    """

    def __init__(
        self,
        result: list[UnitDict] = [],
        complete: bool = False,
        errors: list[str] = [],
    ):
        self.result = result
        self.complete = complete
        self.errors = errors
        self.logger = logging.getLogger("ProcessLogger")

    def __repr__(self):
        return f"ProcessState('{self.result}', {self.complete}, {self.errors}"
        
    # Methods for updating and formatting date here.

```

From the type hints, you'll see that we're dealing here with properties of basic types: lists and a boolean. I've also instantiated the class with a logger.

## Exporting with the Dict Attribute

If I want to get all of those properties, I can simply call the `__dict__` attribute directly:

```python
ps = ProcessState()

# Update the state here.

# Get the dictionary
dict = ps.__dict__
```

If I'm only storing values I want to pass along, this works great!

The wrinkle comes with the logger. I'm not interested in passing that along outside of my application. But the result will include reference to the logger.

So I'll have to handle filtering it out with a few helper functions:


```python
class ProcessState:
    """
    Object for storing and formatting Process State
    """
    
    ...

    def get_dict_from_state(self):
        result = {k: v for k, v in self.__dict__.items() if self._is_value_property(v)}
        result["created_at"] = datetime.datetime.now().isoformat()

        return result

    def _is_value_property(self, v):
        if isinstance(v, Logger):
            return False
        return True
```

I've also gone ahead and added a "created_at" property.

Now, calling `ps.get_dict_from_state()` would provide only the errors, complete state, and result. _Excellent!_

## Loading a Dictionary Into Our Class

Say I pass the result off to my DB. I then query the db for those values again. 

Looking at my `__init__` method above, I could _almost_ get away with passing in the dictionary as-is with a spread operator like so:

```
ps = ProcessState(**dict)
```

_However_, my `dict` now includes a `created_at` property which I haven't included in the `__init__` function!

If it were important to persist that field, I could add it to my init function. Or I could make use of an extra `**kwargs` at then end of my init signiture to catch any arguements not already defined.

_BUT_ say that I also need to do some data massaging, such as instantiating another class within `ProcessStates` own initialization?

`@classmethod` is the answer. 

I'll show how I'm using it, then how to construct it:

```python
ps = ProcessState.from_dict(dict)
```

very similar to calling the `__init__` method, though we're not tied to one signature. In fact, we could have multiple `@classmethods` for different scenarios, lending more flexibility to our instance construction.

The simplest way to implement thiswould be to pass everything in:

```
class ProcessState:
    """
    Object for storing and formatting Process State
    """
    
    . . . 
    
    @classmethod
    def from_dict(cls, values: dict) -> "CollectionState":
        return cls(**values)
```

However, as I mentioned, we have an unwanted attribute. Here I'll filter it out with list comprehension:

```
    @classmethod
    def from_dict(cls, values: dict) -> "CollectionState":
    	filtered values = [x for x in values if x in ["errors", "results", "complete"]] 
    	return cls(**values)
```

With that, we're back up and running, ready to use `ProcessState` in our function!
