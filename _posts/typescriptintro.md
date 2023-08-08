---
title: Migrating a React App To TypeScript
tags:
  - Tech
  - TypeScript
date: '2023-07-27T10:35:07.322Z'
---

After 10 years on the scene, TypeScript has become an essential tool in many codebases.

The benefits are primarily static testing: Similar to C#, you'll get compile time errors regarding type-mismatches.

Though, most folks I know that use it love it for the DX. VS Code has first class support for TypeScript, providing stellar autocomplete for all objects and classes that are typed in your codebase. Likely, you've already enjoyed the benefits of autocomplete for methods from external libraries that ship with Types.

## Migrating Create React App to TypeScript

There was a time when getting the tooling for TypeScript up and running was a headache. Not anymore! Many modern frameworks can initialize a project with TypeScript using a simple options flag in the CLI.

If working with Create React App, [migrating is wildly easy](https://create-react-app.dev/docs/adding-typescript/). Simply install typescript dependencies, then restart your dev server.

```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

## Opt In

It's easy to dip your toes into TypeScript because it's an opt in system. The same TypeScript project can have as many JS files in your /src.

So to get started, simply convert a `file.js` to `file.tsx` for react and you're off and running!

A note here: your bundler may support JS imports without the file name, but you may need to be explicit with TypeScript imports.

```
// JS File
import EditAuthors from './components/EditAuthors';

// TSX Files, will not compile without file extension
import EditBook from './components/EditBook.tsx';
import Books from './components/Books.tsx';
import Book from './components/Book.tsx';
```

## Package Types

Again — there was a time where not all packages shipped with Types. Long gone are those days now! When using an external library, you should be able to find info in their documentation about supported types. [Here's Formik](https://formik.org/docs/guides/typescript) as an example.

```
import { Formik, FormikErrors } from 'formik';
import { BookSubmitObject } from '../types';

 <Formik
    initialValues={initialValues}
    validate={(values: BookSubmitObject) => {
      const errors: FormikErrors<BookSubmitObject> = {};
      // Validate Errors
      if (values.rating > 5 || values.rating < 1) {
        errors.rating = 'Must be within 1 and 5';
      }
      return errors;
    }}
    ...
  >
```

So that's getting setup! More on how to actually write with TypeScript another time. 👋
