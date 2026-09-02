---
title: Vector Databases
tags:
  - Tech
  - AI
date: '2026-09-02T10:02:01.322Z'
---

When initially digging into developing a [RAG app](/airag), I was introduced to vector databases. It ultimately wasn't the tool for the job at the time, but I've since grown curious about their use and setup.

It's clear to see why these are useful in the context of AI integration (and beyond!) These are specifically designed to store highly dimensional data, where relationships can span many different attributes across entries. 

<figure>
![2D graph of 4 points, two couples which are related.](https://padilla-media.s3.amazonaws.com/blog/images/VectorGraphCapitals.png)
<figcaption>Courtesy of [Wikipedia](https://en.wikipedia.org/wiki/Word_embedding#/media/File:Word_embedding_illustration.svg)</figcaption>
</figure>

Visualization is the fun part. Here is a simplified visual of points on a two dimensional graph. The points have embedded such that "France" and "Paris" are positioned closely together due to their relationship. They are closer than "France" is to "Berlin." Along another dimension, "Paris" is closer to "Berlin" than "France" because they share a relationship of being capitals of their countries.

That's two dimensions. We could easily leap to three dimensions. BUT! Vector databases have anywhere between 128 to over 4,000!! Unless you are a quantum space creature, that gets tricker to visualize. But, the example is similar. Items that have a similar relationship based on their point in this impossible graph are identified as highly related.

An example of a vector:

```json
[
  0.0432, -0.1285, 0.8931, 0.1102, -0.5541, 0.0023, 0.4120, -0.0984,
  0.2215, -0.3342, 0.7612, 0.0543, -0.1120, 0.4901, -0.2234, 0.1089,
  ... 
  /* MANY more floating point values in between */
  ...
  -0.0124, 0.3312, -0.1543, 0.0891, 0.4412, -0.2210, 0.0045, -0.7712
]
```

Vector DB's work thanks to specialized models that are able to convert human recognizable data into vectors. Deciding on the embedding model is just as important as selecting your database, as they can be specialized for certain mediums and datasets.

When adding data, you pass an entry through the embedding model. That gets stored in the DB. When you query your db, that query itself is ran through the embedding model, compared, then returns a number of entries returned based on their proximity.

An additional consideration is what distance calculation algorithm you chose. This is something that's configured at collection creation, so it's worth some thought ahead of time. Options include:

- Euclidean: a common choice, the straight line distance between two points
- Cosine: Measure the cosine (angle of divergence of points)
- Inner Product: Factors in length and direction (distance from 0,0 and angle)

Usefulness of a vector database go beyond RAG. Semantic search is a maturation of keyword search that allows for finding results based on relevance of simple string matching. Multimodal search also allows queries to span across text, images, and audio. Plenty of flexible use cases.

Why it ultimately wasn't the fit for the project at the time: maintenance. It takes experimentation to find the right embedding approach, adjusting size of embeds and meta-data, and gathering user feedback on search effectiveness. Full Text Search in less complex cases may get you most of the way there without all of this. Still, contextual search can be combines with FTS and for the best of both for rich searching features.
