---
title: Filter for the First Match in Python
tags:
  - Tech
date: '2024-04-12T10:35:07.322Z'
---	
```python
match = next(x for x in db_data if x["PropertyId"] == parsed_incoming_data["PropertyId"])
```

Breaking it down:

- `next()` returns the first value of an iterator. In subsequent calls, it would return the following item.
- `next` requires an iterator. An iterator yields number of objects on the fly. This is different from a list which contains and stores values. Lists and tuples can be converted to iterators with the `iter()` method.
- In my example above, the list comprehension `x for x in db_data` above yields an iterator, covering our type requirement for next.
- We're filtering by matching another value: `if x['PropertyId'] == parsed_incoming_data['propertyId]`

Voilà! Filtering for a match in one line.