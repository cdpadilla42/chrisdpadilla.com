---
title: Handling Dot Notation in MongoDB
tags:
  - Tech
  - TypeScript
  - MongoDB
date: '2025-01-06T10:35:07.322Z'
---

There's quite a dance that needs to happen when sending data to a document in MongoDB.

Say that your document takes this shape:

```TypeScript
import { z } from 'zod';

const userSchema = z.object({
  _id: z.string(),
  profile: UserProfileSchema,
  email: z.array(UserEmailSchema),
  calculated: CalculatedUserSchema.optional(),
  system: SystemUserSchema.optional()
});

const userProfileSchema = z.object({
  firstName: z.string().min(2).trim(),
  lastName: z.string().min(2).trim(),
  image: z.string().optional()
});

const userEmailSchema = z.object({
  address: z.string().email(),
  verified: z.boolean().default(false)
});

// etc...
```

Note that there is an `email` field with an array of objects.

If I wanted to update the address of the first email object in that array, my path object would look like this:

```TypeScript
const patch = {
	'email.0.address': "hey@chris.com",
}

```

Here's what you get back from `dirtyFields` when you're using a form library on the client such as [react-hook-form](https://react-hook-form.com/):

```TypeScript
{
	email: [
		{
			address: address,
		}
	]
}
```

That would essential replace the entire email field in the db.

There are a few steps to take to handle this:

First, let's pull in a library to handle converting the object to dot notation:

```TypeScript
import { dot } from 'dot-object';

const dirtyFieldsDotNotation = dot(dirtyFields);
// {
//     "email[0].address": true
// }
```

Then, we can pass in the actual form value to the results object:

```TypeScript
const updatedValues = dirtyFieldsKeys.reduce(
  (acc: Record<string, any>, key: string) => {
    const regex = new RegExp(/\[|(\]\.)/, 'g');
    const parsedKey = key.replaceAll(regex, '.');
    acc[parsedKey] = get(parsedUpdatedValues, key);
    return acc;
  },
  {}
);

// {
//     "email.0.address": hi@chris.net
// }
```

Here, I've added a step to replace all angle brackets `[]` with a period `.` to conform with the expected array access syntax for mongo.

With that, our object is now safe to send to our api and pass to our patch call to Mongo:

```TypeScript
  const client = await clientPromise;
  const collection = client.db('project').collection('users');
  const result = await collection.updateOne(
    { _id: id },
    { $set: patch },
    { upsert: true }
  );
```
