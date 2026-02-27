---
title: Caching Strategies
tags:
  - Tech
  - System Design
date: '2026-02-26T09:59:56.322Z'
---

The difference in speed between accessing data from disc and accessing from an in-memory cache is significant, by the magnitude of 10-100 in some cases. When serving data in our applications that is frequently accessed, we want to place a cache in front of the DB to increase speed and lighten up read access to disc.

How that cache is populated & read, however, takes careful consideration of requirements and trade-offs. Is it important for the cache to be highly consistent with the DB? Of the two, is it permissible for one to be eventually consistent? Do we want our application to manually manage write and read access to both data sources?

Following is an exploration of several strategies with their strengths and considerations:

## Cache Aside (Lazy Loading)

Perhaps the most common pattern is to manage the cache strategy ourselves in the application with this gradual building of the cache. When requesting data, the cache is checked first for a given value. On a cache-miss, the application will then query the DB, and update the cache with the result.

Several fine benefits here: We have a high degree of control in the caching strategy — setting different TTL's based on certain parameters, custom caching keys, and our cache only contains data that is actually requested. With that control comes overhead — we will need to manage invalidation ourselves and, additionally, we must accept that the first request for a piece of data may be slow before the cache is populated with it. The tradeoff for an individual request having higher latency, however, is often worth it for overall higher throughput across the system.

## Write Through

Here, if we wanted our application to allow for abstraction of our data writes, we could encapsulate that logic in the services that are responsible for our DB and cache interactions.

One such way is a write-through strategy. Here, we have separate services for the DB and cache. Our application is writing to the cache, which then updates the DB synchronously. This has a few tradeoffs: Slower writes since we are waiting for both the DB and the cache to finish their writes, and we may be storing data to the cache that is never read. The benefit, however, is that the cache is never stale, and the data is highly consistent. Ideal for financial applications where consistency is a requirement.

## Write Behind

Similar to the above strategy, we are writing to the cache, and the database is updated from the cache. However, this is done asynchronously. This change will reduce the latency of our writes, though we are then at risk of potential data loss if the cache is down before a write completes to the database. This strategy is well-suited for logging systems and metrics where occasional data loss is acceptable in exchange for a high volume of fast writes.

## Write Around

This is similar to our Cache Aside strategy, except our database service manages the writes to cache. We gain the benefits of simplicity while maintaining flexibility with what we cache. Ideal for rarely-read data such as historical logs.

## Refresh Ahead

If your application is in a situation where you can predict spikes in traffic, a refresh-ahead strategy is advantageous. Here, this read strategy proactively refreshes data before it expires, rather than waiting for a miss to trigger a reload. The cache will monitor the TTL, and when reaching a certain threshold, it automatically fetches a fresh value in the background. If traffic spikes are predictable, a warm-up time can be set. This is also advantageous if it is very expensive to calculate the result, such as with dashboard data.

## When To Use Which Strategy

Most API's can benefit from a cache aside strategy that allows for a high level of control and flexibility. Exploring which alternative is suitable is dictated by the requirements — Write through for high consistency financial apps, write behind for metrics monitoring, write around for archival applications, and refresh ahead for computation-heavy data such as financial aggregations. In many cases — an app will employ different strategies for different portions of the application depending on the services provided.
