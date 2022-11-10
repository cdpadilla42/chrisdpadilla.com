---
title: Building a Proxy with AWS Lambda Functions and CORS
tags:
  - Tech
date: '2022-11-10T05:35:07.322Z'
---

For those times you just need a sip of backend, Lambda functions serve as a great proxy.

For my situation, I needed a way for a client to submit a form to an endpoint, use a proxy to access an API key through environment variables, and then submit to the appropriate API. The proxy is still holding onto sensitive data, so in lieu of storing an API key on the client (no good!), I'm using [CORS](https://www.chrisdpadilla.com/diyanalytics) to keep the endpoint secure.

# Handling Pre-Flight Requests:

[This article by Serverless](https://www.serverless.com/blog/cors-api-gateway-survival-guide/) is a nice starting place. Here are the key moments for setting up cors:

```
# serverless.yml

service: products-service

provider:
  name: aws
  runtime: nodejs6.10

functions:
  getProduct:
    handler: handler.getProduct
    events:
      - http:
          path: product/{id}
          method: get
          cors: true # <-- CORS!
  createProduct:
    handler: handler.createProduct
    events:
      - http:
          path: product
          method: post
          cors: true # <-- CORS!

```

The key config, `cors: true` is a good start, but is the equivalent of setting our header to `'Access-Control-Allow-Origin': '*'`. Essentially, this opens our endpoint up to any origin. So we'll need to find a way to secure this to only a couple of urls.

Serverless here recommends handling multiple origins in the request itself:

```
// handler.js
const ALLOWED_ORIGINS = [
	'https://myfirstorigin.com',
	'https://mysecondorigin.com'
];

module.exports.getProduct = (event, context, callback) => {

  const origin = event.headers.origin;
  let headers;

  if (ALLOWED_ORIGINS.includes(origin) {
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    },
  } else {
      headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }

  . . .
}
```

This alone would work fine for simple GET and POST requests, however, more complex requests will send a [Preflight OPTIONS request](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests). I _am_ sending a POST request, but it would have to be an html form submission to qualify as "simple." Since I'm sending JSON, it's considered complex and a preflight request is sent.

A little more looking in [serverless docs](https://www.serverless.com/framework/docs/providers/aws/events/apigateway#http-endpoint-with-extended-options) shows us how we can approve multiple origins for our preflight requests:

```
# serverless.yml

cors:
  origins:
    - http://www.example.com
    - http://example2.com
```

# Server response with Multiple Origins

When allowing multiple origins, the response needs to return a single origin in the header, matching the request origin. If we send a comma delineated string with all our origins, the response will not be accepted.

In our server code above, we did handled this with the logic below:

```
 const origin = event.headers.origin;
  let headers;

  if (ALLOWED_ORIGINS.includes(origin) {
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Credentials': true,
    },
  }
```

We grab the origin from our request headers, match it with our approved list, and then send it back in the response headers.

# Lambda & Lambda Proxy

To have access to our request headers, we need to ensure we are using the correct integration.

**Lambda Proxy integration** is the default with serverless and the one that will include the headers.

So why am I pointing this out?

Some Lambdas you work with may include `integration: lambda` in their config file:

```
functions:
  create:
    handler: posts.create
    events:
      - http:
          path: posts/create
          method: post
          integration: lambda
```

These are set to launch the function as **Lambda integrations**.

The general idea is that Lambda Proxy integrations are easier to set up while Lambda integrations offer a bit more control. The only extra bit of work required for Lambda proxy is handling your own status codes in the response message, as we did above. Lambda integrations may be more suitable in situations where you need to modify a request before sent to the lambda or a response after. (A really nice overview of the [difference is available in this article](https://medium.com/@lakshmanLD/lambda-proxy-vs-lambda-integration-in-aws-api-gateway-3a9397af0e6d).)

So, if you're setting up your own lambda, no need to do anything different to access the headers. If working with an already established set of APIs, keep an eye out for `integration: lambda`. Accessing headers will take some extra considerations in that case.
