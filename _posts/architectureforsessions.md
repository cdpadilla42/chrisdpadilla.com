---
title: JWTs and Database Sessions from an Architecture Standpoint
tags:
  - Tech
  - Architecture
  - Authentication
date: '2024-01-19T10:35:07.322Z'
---

This week: A quick look at two session persistence strategies, JWT's and Database storage.

I'm taking a break from the specific implementation details of [OAuth login](/nextauthemailandoauth) and [credentials sign in](/nextauthcredentials) with Next Auth. Today, a broader, more widely applicable topic.

## Remember Me

In the posts linked above, we looked at how to verify a user's identity. Once we've done that, how do we keep them logged in between opening and closing their browser tab?

There are different ways to manage the specifics of these approaches, but I'll be referencing how it's handled in Next Auth since that's where my head has been!

With that in mind, the two that are todays topic are storing authentication status in a JWT or storing session data on the Database.

## Database

More conventional in a standalone application, database sessions will sign the user in, store details about their session on the database, and store a session id in a cookie. That cookie is then sent between the server and client for free with every request without any additional logic written by the client or server side code.

Once the user has stored the cookie in their browser, they have the session id for each page request across tabs and windows. With each request, the server will verify the session by looking up the record in the database. Any changes made to the user (permissions, signing out) are handled on the db. 

The pros:

- Centralized source of truth for session data.
- Seamless update when user role or permissions change.
- Light on application logic needing to be written on the client.
- Easy management: can clear session in the event of logging out on all devices or a suspended account.

The cons:

- Limited in a distributed system. All session checks *must* go through the main site and db.
- Storage costs: db usage scales with active users.
- DB access costs: requires a roundtrip to DB for every request just to verify session.
- A DB breach means this information is compromised.

## JWT

The JWT can be implemented in a similar way: Cookies can be used to transport the identifier. However, the difference here is that session data is stored in the Jason Web Token, with no database backing the session. Instead, an encrypted token along with a unique secret with hashing can be used to verify that a token is signed by your application's server. 

So, instead of database lookups with a session id, your application's secret is used to verify that this is a token administered by your application.

The pros:

- Has potential to be a "stateless" login mechanism, allowing for light overhead.
- Lower DB and access cost.
- In a distributed system, so long as you verify the secret, it's possible to verify the user across a cloud infrastructure.

The cons:

- Added app infrastructure needs to be written to handle token expiration, refreshing, etc.
- Should the token be compromised, extra steps need to be taken to invalidate the user. 
- A popular approach is to include user permissions with the token. If that's the case, there needs to be logic written to handle the case where there is an update and the token needs re-encoding

## Conclusion

The cons for JWT are mostly added architecture, while the cons of the database are storage and db request related. If using a distributed, highly scaled system: JWT's lend several strengths to mitigate the cost of complex systems interacting together as well as a high volume of data. For more stand alone applications, however, perhaps the added overhead of managing a JWT strategy is outweighed by the benefits of a simple DB strategy

### PS

I just realized I've written on this exact subject before! D'oh! 

[In The Gist on Authentication](/authentication), I wrote about authentication methods from a security standpoint, highlighting best practices to avoid XSRF attacks. 

Well, over a year later, I'm thinking more here about performance and scalability. So this one's a keeper. If [playing the blues](/hundreddegreeblues) has taught me anything, it's that we're all just riffin' on three chords, anyway!