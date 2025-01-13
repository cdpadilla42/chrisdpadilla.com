---
title: Smoother MongoDB ObjectID Handling in Web Applications
tags:
  - Tech
  - MongoDB
  - Database
  - JavaScript
  - TypeScript
date: '2024-12-27T11:35:07.322Z'
---

Documents in MongoDB automatically generate a unique key on the `_id` field. The value is an `ObjectId`, a byte data type that is very lightweight. (More details in [the docs](https://www.mongodb.com/docs/manual/reference/bson-types/#std-label-objectid).)

When querying your DB, you'll be returned an `ObjectID` data type. There are several scenarios in a web application where that can become cumbersome:

- Converting your data to JSON
- Passing the ID as a query param
- Comparing between the string representation of the ID and the `ObjectID` data type

To navigate around it, you can project the value to a string any time you query the db.

Here's an initial example of querying a collection in an API method:

```TypeScript
export async function getPeople(query = {}): Promise<Person[]> {
  const client = await clientPromise;
  const collection = client.db('your-db').collection('people');
  const people = await collection
    .find<People>(query)
    .toArray();

  return people;
}
```

To convert the `_id` value, we'll create an aggregation step to make the conversion with the `$toString` operator

```TypeScript
  const addFieldAggregation = {
    $addFields: {
      _id: { $toString: '$_id' },
    }
  };
```

Now, when querying from your application, you can convert the string value back to an `ObjectId` to query the intended document. I'll just convert our query to an aggregation to accomplish this:

```TypeScript
import { ObjectId } from 'mongodb';

export async function getPeople(query = {}): Promise<Person[]> {
  const client = await clientPromise;
  const collection = client.db('your-db').collection('people');
  const person = (await collection
    .aggregate([
      {
        $match: query,
      },
      addFieldAggregation
    ])
    .toArray()) as Person[];

  return person;
}
```

Voilà!
