---
title: Credentials Authentication in Next.js
tags:
  - Tech
  - React
  - Next
  - Authentication
date: '2023-12-15T10:35:07.322Z'
---

Taking an opinionated approach, Next Auth intentionally limits the functionality available for using credentials such as email/password for logging in. The main limit is that this forces a JWT strategy instead of using a database session strategy.

Understandably so! The number of data leaks making headlines, exposing passwords, has been a major security issue across platforms and services.

*However*, the limitation takes some navigating when you are migrating from a separate backend with an existing DB and need to support older users that created accounts with the email/password method.

Here's how I've been navigating it:

## Setup Credentials Provider

Following [the official docs](https://next-auth.js.org/providers/credentials) will get you most of the way there. Here's the setup for my authOptions in `app/api/auth/[...nextAuth]/route.js`:


```JavaScript
import CredentialsProvider from "next-auth/providers/credentials";
...
providers: [
  CredentialsProvider({
	name: 'Credentials',
	credentials: {
		username: {label: 'Username', type: 'text', placeholder: 'your-email'},
		password: {label: 'Password', type: 'password', placeholder: 'your-password'},
	},
	async authorize(credentials, req) {
		...
	},
}),
```

## Write Authorization Flow

From here, we need to setup our authorization logic. We'll:

1. Look up the user in the DB
2. Verify the password
3. Handle Matches
4. Handle Mismatch

```
async authorize(credentials, req) {
	try {
		// Add logic here to look up the user from the credentials supplied
		const foundUser = await db.collection('users').findOne({'unique.path': credentials.email});

		if(!foundUser) {
			// If you return null then an error will be displayed advising the user to check their details.
			return null;
			// You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
		}

		if(!foundUser.unique.path) {
			console.error('No password stored on user account.');
			return null;
		}

		const match = checkPassword(foundUser, credentials.password);

		if(match) {
			// Important to exclude password from return result
			delete foundUser.services;

			return foundUser;
		}
	} catch (e) {
		console.error(e);
	}
	return null;

},
```
## PII

The comments explain away most of what's going on. I'll explicitly note that here I'm using a try/catch block to handle everything. When an error occurs, the default behavior is for the error to be sent to the client and displayed. Even an incorrect password error could cause a Personally Identifiable Information (PII) error. By catching the error, we could log it with our own service and simple return null for a more generic error of "Failed login."

## Custom DB Lookup

I'll leave explicit details out from here on how a password is verified for my use case. But, a general way you may approach this when migration:

1. Verify with the previous framework/library the encryption method
2. If possible, transfer over the code/libraries used
3. Wrap it in a `checkPassword()` function.

## Sending Passwords over the Wire?

A concern that came up for me: We hash passwords to the database, but is there an encryption step needed for sending it over the wire?

Short answer: No. [HTTPS covers it](https://security.stackexchange.com/questions/133453/is-encryption-of-passwords-needed-for-an-https-website) for the most part. 

Additionally, Next auth already takes many security steps out of the box. [On their site](https://next-auth.js.org/getting-started/introduction), they list the following:

> - Designed to be secure by default and encourage best practices for safeguarding user data
> - Uses Cross-Site Request Forgery Tokens on POST routes (sign in, sign out)
> - Default cookie policy aims for the most restrictive policy appropriate for each cookie
> - When JSON Web Tokens are enabled, they are encrypted by default (JWE) with A256GCM
> - Auto-generates symmetric signing and encryption keys for developer convenience

CSRF is the main concern here, and they have us covered!

