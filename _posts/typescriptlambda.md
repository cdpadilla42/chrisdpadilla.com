---
title: Deploying TypeScript to AWS Lambda
tags:
  - Tech
  - TypeScript
  - JavaScript
  - CI/CD
date: '2024-11-26T10:35:07.322Z'
---

In the early days of TypeScript, one of the larger barriers to entry was the setup required. Setting your configuration and checking if external packages ship with types took upfront work. On top of it all, neither Node nor the browser reads TypeScript directly, so transpiling to JavaScript is required for those environments. 

Much has improved since. Libraries ship with types and spinning up a project has been streamlined. 

Below I'll share some of the tooling that's helped simplify TypeScript setup.

## The Project

I'll be working on setting up a TypeScript project that will deploy to AWS Lambda. I'll skip [the details](/stepfunctionconcurrency) that are specific to Lambda setup and focus on TypeScript itself.

For this to work, there are a few things we'll want to make happen:

1. Setup Type Checking
2. Setup a Build Process
3. Optionally: Select a TypeScript Runtime

## Type Checking

The biggest benefit of TypeScript comes from... well, _the static type checking!_ An editor such as VS Code can lint these for you while you develop. Though, the intended safeguarding comes from compile time type checking.

TypeScript comes with this out of the box. Here's how you can set it up:

First, we'll install TypeScript globally through npm:

```
npm install -g typescript
```

With that comes `tsc`, the TypeScript Compiler. 

If you haven't already, you'll want to initialize your project with a `tsconfig.json` file. This command gets you started:

```
tsc --init
```

Here's a starting place for your ts config:

```JSON
{
  "compilerOptions": {
    "target": "es2020",
    "module": "es2020",
    "strict": true,
    "skipLibCheck": true,
  },
  "ts-node": {
    "compilerOptions": {
      "module": "commonjs"
    }
  },
  "exclude": ["node_modules", "**/*.test.ts"]
}

```

Lastly, to compile, it's as simple as this command:

```
tsc index.ts
```

This will spit out a corrseponding JavaScript file in your project with the types stripped out.

Worth noting: You can also check for types without compiling with the `--noEmit` flag.

```
tsc index.ts --noEmit
```


## Testing Locally

You may notice above the `ts-node` option in my config. [ts-node](https://github.com/TypeStrong/ts-node) is an engine for executing TS files using the node runtime — _without_ having to transpile your code first.

What we would have to do without `ts-node` is generate our JS files as we did above, such as with `tsc index.ts`. An index.js file would then be generated. From there, we would run `node index.js`.

Instead, with `ts-node`, we would simply call `ts-node index.ts`. 

`ts-node` comes with many more features, but a single-command way of running TS files from the CLI is the quickest benefit.


## Bundling with ESBuild

Typically, we reach for bundling solutions with client side JavaScript and TypeScript to minimize our file sizes, speeding up site load times. While you wouldn't normally need to bundle server side code, the current AWS Lambda limit is 250 MBs. The `node_modules` directory would easily eat that up without a bundling strategy!

The library of choice today is [ESbuild](https://esbuild.github.io/), which handles TypeScript, JSX, ESM & CommonJS modules, and more.

You might ask: If you're going to bundle your code, why did we bother looking at compiling with `tsc`?

There are several tools that will run and build TypeScript without actually validating your types, and ESBuild is one of them! When developing your build pipeline, it's likely that you'll need a separate step to validate the types with `tsc`.

Here is what the build script looks like using ESBuild:

```
esbuild ./src/index.ts --bundle --sourcemap --platform=neutral --target=es2020 --outfile=dist/index.js
```
A couple of options to explain:

- `sourcemap`: This generates a .map.js file which is used for error handling. This makes sane debugging possible even after bundling and minifying.
- `platform=neutral`: Sets default output to `esm`, using the `export` syntax.
- `target=es20202`: Targets a specific JS spec, also including `esm` modules.

## Picking a Runtime

If including `esm` modules in your generated JS files, be sure you're using a runtime that supports them. For example, Node 13 can handle them out of the box, while earlier versions require an experimental flag.

When deploying to Lambda, Node is a first class citizen when it comes to support. While not quite as blazingly fast as Rust, a Lambda function running node [will still be highly performant](https://maxday.github.io/lambda-perf/).

If you're interested in delightful DX and native TypeScript support however, you may reach for Deno or Bun. 

I'll baton pass this portion of the article to two relevant docs: The AWS Lambda Developer Guide on [Building with TypeScript](https://docs.aws.amazon.com/lambda/latest/dg/lambda-typescript.html) and the [Bun Lambda Layer package](https://github.com/oven-sh/bun/blob/main/packages/bun-lambda/README.md). Whichever you chose, both should be great starting places for deploying your runtime of choice.