---
title: TypedDicts in Python
tags:
  - Tech
  - Python
date: '2024-10-25T10:35:07.322Z'
---

So much of JavaScript/TypeScript is massaging data returned from an endpoint through JSON. TypeScript has the _lovely_ ability to type the objects and their properties that come through. 

While Python is not as strongly typed as TypeScript, we have this benefit built in to the type hinting system.

It's easier shown than explained:

```python
from typing import Union, TypedDict
from datetime import datetime


class Concert(TypedDict):
    """
    Type Dict for concert dictionaries.
    """

    id: str
    price: int
    artist: str
    show_time: Union[str, datetime]

```

All pretty straightforward. We're instantiating a class, inheriting from the `TypedDict` base class. Then we set our expected properties as values on that class.

It's ideal to store a class like this in its own types directory in your project.

A couple of nice ways to use this:

First, you can use this in your methods where you are expecting to receive this dictionary as an argument:

```python
def get_concert_ticket_details(
        self, concert: UnitDict = None
    ) -> tuple(list[str], set[str]):
    // Do work
```

You can also directly create a dictionary from this class through instantiation.

```python
concert = Concert({
	"id": "28",
	"price": 50,
	"artist": "Prince",
	"show_time": show_time
})
```

The benefit of both is, of course, the suggestion in your editor letting you know that a property does not match the expected shape.

More details on [Python typing in this previous post](/pythontypehinting). Thorough details available in [the official docs](https://docs.python.org/3/library/typing.html).

