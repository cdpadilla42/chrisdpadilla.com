---
title: Next Auth Custom Session Data
tags:
  - Tech
  - React
  - JavaScript
  - Next
date: '2023-12-01T10:35:07.322Z'
---

I've been tinkering with [Next Auth](https://next-auth.js.org/) lately, getting familiar with the new [App Router](https://nextjs.org/docs/app) and [React Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components). Both have made for a big paradigm shift, and a really exciting one at that!

With all the brand new tech, and with many people hard at work on Next Auth to integrate with all of the new hotness, there's still a bit of transition going on. For me, I found I had to do a bit more digging to really setup Next Auth in my project, so here are some of the holes that ended up getting filled:

## Getting User Data from DB through JWT Strategy

When you use a database adapter, Next auth automates saving and update user data. When migrating an existing app and db to Next auth, you'll likely want to handle the db interactions yourself to fit your current implementation.

Here's what the authOptions looked like for an OAuth provider:

```
export const authOptions = {
	// adapter: MongoDBAdapter(db),
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			session: {
				jwt: true,
				maxAge: 30 * 24 * 60 * 60,
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
};
```

Notice that I'm leaving the adapter above out and using the jwt strategy here.

There's a bit of extra work to be done here. The session will save the OAuth data and send it along with the token. But, more than likely, you'll have your own information about the user that you'd like to send, such as roles within your own application.

To do that, we need to add a callbacks object to the authOptions with a `jwt` and `session` methods:

```
async jwt({token, user}) {
		if(user) {
			token.user = user;
			const {roles} = await db.users.findOne(query)
			token.roles = roles;
		}
		return token;
	},
		
async session({session, token}) {
		if(token.roles) {
			session.roles = token.roles;
		}

		return session;
	},
```

So there's a bit of hot-potato going on. On initial sign in, we'll get the OAuth user data, and then reference our db to find the appropriate user. From there, we pass that to the token, which is then extracted into the session later on.

Once that's set, you'll want to pass these `authOptions` in every time you call `getServerSession` so that these callbacks are used to grab the `dbUser` field. Here's an example in a server action:

```
import React from 'react';
import {getServerSession} from 'next-auth';
import { authOptions } from '@api/[...nextauth]/route';
import Button from './Button';

export default async function ServerActionPage() {
	const printName = async () => {
		'use server';

		const session = await getServerSession(authOptions);
		console.log(session);
		return session?.user?.name || 'Not Logged In';
	};

	return (
		<div className="m-20">
			<Button action={printName} />
		</div>
	);
}


```


When that's logged, we'll get the OAuth user info and the roles we passed in from our db:

```
{
	user: {...}
	roles: [...]
}
```
