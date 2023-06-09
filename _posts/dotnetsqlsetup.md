---
title: Database Setup and Migrations for Microsoft SQL Server and ASP.NET Core MVC
tags:
  - Tech
  - CSharp
  - .NET
  - SQL
date: '2023-06-09T10:35:07.322Z'
---

I know this is old news at this point, but using Microsoft products on Mac (let alone an M1 machine!) is a wild concept to me! It's in the same vein as Superman & Batman in the same movie, or Mario and Sonic in the same game.

I'm getting familiar with ASP.NET Core 6.0 MVC. I've been able to get things up and running with primarily native solutions, much to my surprise! There are a few different paths I've had to take to get all the way, though.

The tl;dr: For .NET, favor the `dotnet` CLI over the Visual Studio GUI. For SQL, Docker is your friend.

To expand on it, here's how I handled getting my local environment set up to run a local Microsoft SQL Server for my web app:

## Overview

The ultimate goal here is:

1. Run a DB locally
2. Setup our DB Schema through the Models of our application, not in SQL
3. Setup migrations for our application to keep the SQL Schema in sync with our models

Here we go!

## Running Microsoft SQL Server Locally

The solution on Windows for interacting with the Database is Microsoft's [SQL Server Management Studio (SSMS)](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver16). For Mac and Linux, we'll have to opt for [Azure Data Studio](https://learn.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio?view=sql-server-ver16&tabs=redhat-install%2Credhat-uninstall).

That takes care of the GUI.

For running a server, [this guide](https://setapp.com/how-to/install-sql-server) gets you most of the way there.

The caveat is that on M1, there's not great support for the image ` mcr.microsoft.com/mssql/server:2022-latest`.

Instead, grab the Azure image:

```

$ docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=YOURGENERATEDPASSWORD" -p 1433:1433 -d mcr.microsoft.com/azure-sql-edge:latest
```

The `-e "ACCEPT_EULA=Y"` is important for accepting the terms and conditions before running.

The rest of the guide will take you through connecting to Azure Data Studio!

## Creating Models

Assuming you [already have an app template running](https://learn.microsoft.com/en-us/aspnet/core/tutorials/first-mvc-app/start-mvc?view=aspnetcore-7.0&tabs=visual-studio), we'll add a new Model called "Book" to our project:

```
// Book.cs

using System;
using System.ComponentModel.DataAnnotations;

namespace LibraryMVC.Models
{
	public class Book
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		public int isbn { get; set; }
		public DateTime CreatedDateTime { get; set; } = DateTime.Now;

		public Category(string name)
		{
			Name = name;
		}
	}
}

```

A quick run down of some interesting points:

- `[Key]` is a Data Annotation that lets Entity Framework know that this is our Primary Key in SQL
- `[Required]` does as you'd expect. One thing worth noting: to avoid a non-null error, set the Name value in the constructor.

That's all there is to setting up the Schema!

## Migrations

If you're used to MongoDB, this is where you would call it a day for setting up the schema. MongoDB doesn't require any enforced schema at the database level.

With SQL, however, we do have more setup to do there.

The excellent thing about this approach, coming from Express and Mongo, is that largely, the source of truth is still in our application. We'll simply setup a migration for SQL to mirror the schema from our Model.

A deeper [Migrations Overview from MS](https://learn.microsoft.com/en-us/ef/core/managing-schemas/migrations/?tabs=dotnet-core-cli) is available on their site. For us, let's get into the quick setup:

First, ensure you have the `dotnet` CLI [installed](https://learn.microsoft.com/en-us/dotnet/core/tools/).

We'll use it to install the Entity Framework tool globally:

```
dotnet tool install --global dotnet-ef --version 6.0.16
```

With that, you can then run this command to migrate:

```
dotnet ef migrations add AddBookToDatabase
```

`AddBookToDatabase` is what the migration will be named. You can call it whatever you like.

You may need to install extra Nuget packages before the command goes through:

```
Your startup project 'LibraryMVC' doesn't reference Microsoft.EntityFrameworkCore.Design. This package is required for the Entity Framework Core Tools to work. Ensure your startup project is correct, install the package, and try again.
```

With the SQL server connected, Entity Framework will look at the models in your app, compare what's in the DB, and create the DB with appropriate tables and columns based on your models directory.

To verify all worked, you can check Azure Data Studio for the data, and look for a "Migrations" folder at the root of your application.

And that's it! All set to fill this library up with books! 📚
