---
title: The Gist on Authentication
tags:
  - Tech
  - JavaScript
  - Architecture
date: '2022-10-20T05:35:07.322Z'
---

Leaving notes here from a bit of a research session on the nuts-and-bolts of authentication.

There are cases where packages or frameworks handle this sort of thing. And just like anything with tech, knowing what's going on under the hood can help with when you need to consider custom solutions.

# Sessions

The classic way of handling authentication. This approach is popular with server-rendered sites and apps.

Here, A user logs in with a username and password, the server cross references them in the DB, and handles the response. On success, a session is created, and a cookie is sent with a session id.

The "state" of sessions are stored in a cache or on the DB.

Session Cookies are the typical vehicles for this approach. They're stored on the client and automatically sent with any request to the appropriate server.

## Pros

For this approach, it's nice that it's a passive process. Very easy to implement on the client. When state is stored in a cache of who's logged in, you have a more control if you need to remotely log a user out. Though, you have less control over the cookie that's stored in the client.

## Cons

The lookup to your DB or cache can be timely here. You take a hit in performance on your requests.

Cookies are also more susceptible to Cross-Site Request Forgery (XSRF).

# JWT's

Two points of distinction here: When talking about a session here, we're talking about that stored on the server, not session storage in the client.

Cookies hypothetically could be used to store a limited amount of data, but for JWT's typically need another method, since cookies have a small size limit.

Well, what are JWT's? Jason Web Tokens are a popular alternative to sessions and cookie based authentication.

On successful login, a JWT is returned with the response. It's then up to the client to store it for future requests, working in the same way as sessions here.

The major difference, though, is that the token is verified on the server through an algorithm, not by DB lookup of a particular ID. There's a major prop of JWT's! It's a stateless way of handling authentication.

Options for storing this on the client include local storage, indexedDB, and some would say, depending on the size of your token, cookies.

## Pros

As mentioned, it's stateless. No need to maintain sessions in your cache or on your DB.

More user-related information can be stored with the token. Details on authorization level is common ("admin" vs "user" permissions.)

This approach is also flexible across platforms. You can use JWT's with mobile applications or, say, a smart TV application.

## Cons

Because this approach is stateless, unfortunately you have limited control in logging out individual users remotely. It would require changing your entire algorithm, logging _all_ of your users out.

Depending on how you store the token, there are security concerns here, too. It's best to avoid local storage, in particular, as you are open to XSRF - Cross site request forgery. If you accept custom inputs from users, beware also of XSS - Cross Site Scripting, where malicious code could be ran on your site.

# Who Wins?

Depending on your situation, you may just need the ease of setup provided by session storage. For an API spanning multiple devices, JWT's may seem appealing. There is also the option to blend the approaches: Using JWT's while also storing session logic in a cache or DB.

Some handy libraries for implementing authentication includes Passport.js and auth0. For integrated authentication with Google, Facebook, etc., there's also OAuth2.0. A tangled conversation on its own! And, admittedly, one that's best implemented alongside a custom authentication feature, rather than as the only form of authentication.
