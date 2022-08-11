---
title: Keeping it 200 — HTTP Status Codes
tags:
  - Tech
date: '2022-09-28T05:35:07.322Z'
---

I was getting a 503 waiting for my Gmail to load, so I decided to learn more about status codes while I waited!

# Response Classes

1. **100-199**: Informational Responses
2. **200-299**: Successful Responses
3. **300-399**: Redirection Messages
4. **400-499**: Client Error Responses
5. **500-599**: Server Error Responses

# Noteworthy Codes

- **418: I'm a teapot** [Short and stout](https://www.google.com/teapot)

- **302: Found** For _temporary_ changes in URI, as opposed to the more permanent 301.

- **300: Multiple Choices** Where there's more than one possible redirect. The best way to handle this is to send an HTML page with possible choices for handling the response. But then, at that point, wouldn't you just sent a 200 status code with a landing page? I could see this being more useful with APIs than webpages.

- **202: Accepted** The request is received but not acted upon. Interestingly, HTTP doesn't have a way to handle an asynchronous response that ties itself to the delayed response to the request. I'm thinking of AWS batch uploading here - where the API accepts the data, but then needs to take however long to actually process the request.

- **502: Bad Gateway** Technically the appropriate response if the server gets an invalid response when waiting on an external request.

- **404: Not Found** Had to finish with [my favorite](https://homestarrunner.com/404).
