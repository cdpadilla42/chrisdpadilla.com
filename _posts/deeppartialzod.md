---
title: Deeply Partial Zod Schemas
tags:
  - Tech
  - TypeScript
date: '2025-01-16T10:35:07.322Z'
---

It's not uncommon to set up a schema with nested properties. In [Zod](https://zod.dev/), it could look something like this:

```TypeScript
export const userSchema = z.object({
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

// etc...
```

This is great for verifying a type has all the required properties. It gets tricky when I want to set all the values as optional, as I might in a `$set` object [for MongoDB](/objectidconversion).

Previous versions of Zod had a method `deepPartial` that handled just that. It's since been deprecated, but no library replacement has been provided.

In the meantime, you can pull in the original logic into your project to implement the previous logic. It's handily available on [this GitHub thread](https://github.com/colinhacks/zod/issues/2854#issuecomment-2350046127).
