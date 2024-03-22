---
title: SSL Certifications in Python on Mac
tags:
  - Tech
  - Python
date: '2024-03-22T10:35:07.322Z'
---

Busy week, but I have a quick edge case to share:

We've upgraded to a newer version of Python for our microservices at work. While making the transition, I bumped into an error sending http requests through urllib3:

```
SSL: CERTIFICATE_VERIFY_FAILED
```

I've come across this issue before, having to manually add certs. The solution involved low level work and was gnarly to handle! Thankfully, though, with Python 3.6 and higher, the solution is more straightforward.

It's largely outlined in this [Stack Overflow post by Craig Glennie](https://stackoverflow.com/a/42334357/14101718). The gist is that on Mac, you actually have to run a post install script located in your `Applications/Python` folder.

If you follow along with Craig's post, you'll find that the documentation for it is even there in the Python README. Always good to read the manual!
