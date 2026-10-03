---
title: Context Manager in Python
tags:
  - Tech
  - Python
date: '2026-10-03T10:25:20.322Z'
---

One of the first Python lines I learned was opening files using the `with` keyword:

```python
with open("example.txt", "r") as file:
    content = file.read()
    print(content)

# Automatically close file after the above block
print("File closed")
```

The neat thing is that you can use the file within `with` and it will automatically close down once exiting the block. A simple way to teach an approach that's just as useful with db connections and other clients.

Today I happened upon `@contextmanager`, an elegent way to implement this type of behavior with your own classes and methods:

```python

@contextmanager
def datastore():
    try:
        client = ds.connect()
        # Implement logic in the while block
        yield
        
    # proceed after the while block concludes
    finally:
        client.disconnect()
```

This simple decorator then allows usage in a with block:

```python
with datastore() as dsc:
    dsc.get(...)

# Closed

```

That encapsulates up what otherwise would be a great deal of setup.

The elegance is, quite simply, very Pythonic!
