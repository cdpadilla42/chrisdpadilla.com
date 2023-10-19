---
title: An Intro to Redis
tags:
  - Tech
  - Redis
date: '2023-10-19T10:35:07.322Z'
---

I had the pleasure of taking a look at the Redis server at work this week! So here are some notes from my own exploration —

## What is Redis?

Redis is a fully fledged database for storing and persisting various types and shapes of data. The name is short for "Remote Dictionary Server"

A few key features:

- Redis stores data in-memory. RAM is used instead of disc space to store data
- It is a NoSQL Key/Value Store
- Redis has a built in master/replica pattern. Replica servers can defer to changes in master

The in-memory approach to storing data, in addition to its ability to maintain a master/replica patterns makes it a great fit for being the cache server for applications. 

Redis can support multiple database forms by expanding on the "Core" format of key-value pairs. Plugins such as RediSearch, RediGraph, RedisJSON, and RedisTimeseries can support other database models like those used by Elastisearch, Graph based such as Neo4J, and MongoDB.

In a microservice environment, Redis can shine as a cache for multiple databases that have varied data models. Latency is often introduced when multiple services rely on multiple connections to different datasources on top of communicating with one another. Using Redis as a cache on request, then updating the cache if the data differs, can keep a group of microservices lean and quick. 

## How Does Data Persist?

If you opt to use Redis as a primary database, it begs the question: What happens when the server fails?

The safest way is through replicas. Similar to using Redis as a distributed cache, you can use replicas as back ups. But then again, what if ALL of these fail?

There are a couple of ways this is mitigated:

1. Snapshotting (dump.rdb files)
- Can be stored on a disc at intervals of 5 minutes or an hour
- These are good for backups and disaster recovery
- You would lose an data stored between the last backup and the failure
2. Append Only File
- Logs every write operation continuously to the disk
- When restarting, it will use the AOF to rebuild the DB
- Slower restarts
- Potential for bugs in the AOF engine.
 
The best approach is to use both. Redis recommends a mixed approach and goes into great detail on persistence [in their documentation](https://redis.io/docs/management/persistence/).

From here, you can store those persisted files in a cloud environment separate from Redis. The multiple-location approach firms up the reliability of the system.

## Setting Values With an Expiration

Most of the juicy details are in how Redis is implemented in your application or cloud environment. The actually interface from the application is pretty simple.

Here's an example of setting a value with an expiration of 6 hours in Python:

```python
import redis

redis_client = redis.Redis(...options)

namespace = "comments"
user = "Chris"
message = "I love Redis!"
target = f'{namespace}:{user}'

r.set(target, value= message, ex=60*60*6)

# Do more work...

user_comment = r.get(target) # "I love Redis!"
```

After 6 hours, if we were to try and get the value, there would be none since it would be cleared from the cache.