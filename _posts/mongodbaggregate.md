---
title: Aggregation in MongoDB
tags:
  - Tech
  - MongoDB
  - Database
date: '2022-10-10T05:35:07.322Z'
---

Earlier [I wrote](diyanalytics) on getting a quick bare-bones analytics feature running for a project.

Now that we're recording data, I want to take a look at actually analyzing what we save.

Knowing just enough about database aggregation goes a long way in providing insight into the data we're collecting! I'll dive into what things look like on the Mongodb side of things:

# Data Model

My use case is pretty simple. All I need to know is how many users have played a game since it's release.

So, our data model is similarly simple. Here's what a log for starting the game looks like:

```
{
  "_id": {
    "$oid": "633eceff9b5e4de"
  },
  "date": {
    "$date": {
      "$numberLong": "1665060607623"
    }
  },
  "type": "play"
}
```

`type` here is the type of event that we're logging. "Play" marks the start of the game, "complete" when they finish, and a few in between.

# Aggregation

When fetching the data, I want the Database to do the heavy lifting of sorting the documents and counting how many have played the game, finished it, and all the points in between. Mondodb's aggregation language makes this a really easy task:

```
 const aggregation = [
    {
    	// Find documents after a certain date
      $match: {
        date: {
          $gte: new Date('Fri, 30 Sep 2022 01:15:01 GMT'),
        },
      },
    },
    // Count and group by type
    {
      $group: {
        _id: '$type',
        count: {
          $sum: 1,
        },
      },
    },
  ];

```

Here's what that returns (with fake data):

```
{
"play": 100000000, // Wishful thinking!
"start act 3": 136455,
"complete": 8535,
"start trial": 1364363
}

```

The `$group` operator is pretty flexible. With a little more elbow grease, you could also aggregate counts from month to month, and display a very slick line chart. 📈

Coming back to [the point from my last article](/diyanalytics), since we're measuring a game, the interaction is more important to us. This data is [more reliable](/analytics) and so closely integrated with our application since it relies on actions that, more than likely, bots and crawlers won't engage with as often. It's still likely not a perfect representation, but it provides enough data to gauge impact and see where the bottlenecks are in the game flow.
