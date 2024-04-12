---
title: Comparison Sorting in Python
tags:
  - Tech
  - Python
date: '2024-04-12T10:35:07.322Z'
---

Of all the pages of official docs in Python, [the page on sorting by Andrew Dalke and Raymond Hettinger](https://docs.python.org/3/howto/sorting.html) may be my favorite. Clear, gradually continues on in complexity, and provides ample examples along the way. 

Here's my situation this week: Simple enough, I needed to sort a list of dictionaries by a property on those dictionaries:

```python
data = [
	{
		'name': 'Chris',
		'count': 5,
	},
	{
		'name': 'Lucy',
		'count': 3,
	},
	{
		'name': 'Clyde',
		'count': 3,
	},
	{
		'name': 'Miranda',
		'count': 10,
	},
]
```

To sort by the count, I could pass a lambda to access the property on the dict:

```python
sorted(data, key=lambda x: x['count'])
```

Say that the counts are equal as it is with Lucy and Clyde in my example. If so, I would want to sort by the name.

Returning a tuple covers that:

```python
sorted(data, key=lambda x: (x['count'], x['name']))
```

To reverse the order, there's a named property for that:

```python
sorted(data, key=lambda x: (x['count'], x['name']), reverse=True)
```

Problem all sorted out!
