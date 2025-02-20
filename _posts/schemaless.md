---
title: Are Document Databases Schemaless?
tags:
  - Tech
  - Database
  - Architecture
date: 2025-03-04T10:35:07.322Z
bookshelf:
  - DesigningDataIntensiveApplications
---

From "Designing Data-Intensive Applications" by Martin Kleppmann:

> Document databases are sometimes called _schemaless_, but that's misleading, as the code that reads the data usually assumes some kind of structure—i.e., there is an implicit schema, but it is not enforced by the database. A more accurate term is _schema-on-read_,... in contrast with _schema-on_write_ (the traditional approach of relational databases, where the schema is explicit and the database ensures all written data conforms to it).

An interesting point that plays devil's advocate to one of the most popular features of choosing a document-based db solution such as MongoDB. I have yet to work in a data scenario where there's not a schema being set either by the relational database, the ORM, or through validation methods such as Zod or types.

When we hear schemaless, the main benefit we're looking for is the ease of adjusting the schema as the application evolves.

However, Martin goes on to highlight that both document and relational databases are capable of adjusting their schemas. Application devs will be familiar with simply adjusting the code for different scenarios at data read time. (For example: A new field is added to the schema. Code can ignore documents that are missing the field.) To accomplish this, relational databases perform _migrations_ to convert all entries to the new schema. Either one can suit the needs of your application and its data.

All this certainly doesn't mean document DB's are a bad choice. It's just worth highlighting that, unless you truly are storing documents with a non-uniform data structure within a given collection, the schemaless nature is not a primary benefit of document DB's for you. Perhaps it's simply that you prefer adjusting the schema in the application code rather than migrating the DB schemas.
