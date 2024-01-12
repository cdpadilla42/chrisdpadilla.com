---
title: Setting Up OAuth and Email Providers for Next Authentication
tags:
  - Tech
  - Next
  - React
  - Node
date: '2024-01-12T10:35:07.322Z'
---

Continuing the journey of [setting up Authentication with Next.js](/nextauthcredentials)! Last time I walked through the email/password approach. I'll touch on setting up OAuth and email link sign in, mostly looking at how to coordinate multiple sign in providers for single user accounts.


## Provider Setup

[Email](https://next-auth.js.org/configuration/providers/email) and [OAuth](https://next-auth.js.org/configuration/providers/oauth) setup is fairly straightforward and is best done as outlined in the docs.

One exception: I'm going to flip on `allowDangerousEmailAccountLinking` in my email and OAuth provider settings

```
EmailProvider({
	server: process.env.EMAIL_SERVER,
	from: process.env.EMAIL_FROM,
	allowDangerousEmailAccountLinking: true,
```

Reason being: our users are likely to use OAuth logins for one instance, but then be required to use email for other cases. By default, Next Auth won't link those separate logins with the same account. Here, we're able to do so without getting an error on login. I'll walk through handling account creation for existing users below:

## Traffic Control

Much of the magic for customizing our login will happen in the `signIn()` callback provided to our `authOptions`

```
callbacks: {
		signIn: async ({user, account}) => {...},
}
```

Here, we'll have access to the user provided by our db adapter or from the OAuth provider. 

Inside, I'll have a try / catch block handling different login cases:

```
try {
	if(account?.provider === 'google') {
		...
	} else if(account.provider === 'credentials') {
		...
	} else if(account.provider === 'email') {
		...
	}

} catch (e) {
	console.error(e);
}
```

I'll leave out explicit details for our particular application out, but I'll show how we're creating that account for OAuth login if the account does not already exist:

```
	if(!foundUser) {
		// User does not exist! Can't login
		return false;
	} else {
		// User exists! We can log the user in
		// Check if user account exists
		const existingAccount = await db.collection('accounts').findOne({
			...query
		}, {
			projection: {_id: 1},
		});

		// If no account exists, create it
		if(!existingAccount) {
			const accountObject = {
				...account,
				user: {
					connect: {
						email: user.email ?? '',
					},
				},
				userId: foundUser._id,
			};

			const setRes = await db.collection('accounts').insertOne(accountObject);

			if(!setRes.insertedId) {
				throw new Error('Error saving new Google Provider Account into DB.');
			}
		}

		return true;
	}
```
So we've ensured next auth won't throw the error of an email already existing with another provider. Now, if the account doesn't already exist for this provider, we're ensuring there's not a lookup error by manually adding it ourselves. 

Same logic works in the email provider flow.

From there, returning `true` signals to Next Auth that the user can sign in safely. 