---
title: Dependency Injection and Logging in .NET
tags:
  - Tech
  - CSharp
  - .NET
date: '2023-06-30T10:35:07.322Z'
---

Buy in large, server logs come out of the box with .NET Core. Setting up logging for you controllers, however, takes just a little bit of setup.

In console applications, logging is straightforward:

```
System.Console.WriteLine("Hello World");
```

In a .NET application, though, you'll likely need to pipe your logs through the logger class from your [Dependency Injection](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection).

Here's a look at a bare bones Controller:

```
using Microsoft.AspNetCore.Mvc;
namespace Bookshelf_cs.Controllers;
using Bookshelf_cs.Data;
using Bookshelf_cs.Models;


public class AuthorController : ControllerBase
{

    private readonly ILogger<AuthorController> _logger;

    public AuthorController(ILogger<AuthorController> logger)
    {
        _logger = logger;
    }

}

```

In the constructor, we're constructing our controller with a `_logger` attribute.

## An aside on Dependency Injection

So why is this better than just instantiating a logger class directly? Like so:

```
private readonly ILogger<AuthorController> _logger = new Logger();
```

The short answer is to avoid tight coupling. By using the `ILogger` interface, you can swap out the default Microsoft logger with a custom logger so long as it shares the same interface. More details with examples on [MSDN](https://learn.microsoft.com/en-us/dotnet/core/extensions/dependency-injection).

That swapping out happens at your app building stage in your Program.cs file. If we wanted to customize the logger, it would look like this:

```
// Program.cs

var builder = WebApplication.CreateBuilder(args);

ConfigurationManager configuration = builder.Configuration;

builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();
builder.Logging.AddConfiguration(configuration.GetSection("Logging"));

var app = builder.Build();
```

Very DRY. If you need to make changes, it's all done at the application level. From there, the builder injects your logger of choice into your classes that accept a logger in their constructors.

## Logging

Once it's instantiated in your class, you can log directly from the `_logger` attribute:

```
_logger.LogInformation(1001, "Author passed");
_logger.LogWarning(1001, obj.ToString());

```

For any custom changes for what level of logs are displayed, you can tweak the appsettings.json file:

```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning",
      "Microsoft.AspNetCore.SpaProxy": "Information",
      "Microsoft.Hosting.Lifetime": "Information"
    }
  }
}

```
