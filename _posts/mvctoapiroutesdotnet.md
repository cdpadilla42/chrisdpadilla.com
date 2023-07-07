---
title: From MVC to API Routes in ASP.NET Core
tags:
  - Tech
  - CSharp
  - .NET
date: '2023-07-07T10:35:07.322Z'
---

MVC patterns make for quick and easy development in .NET Core. This week, I'm switching over to an API servicing a React application, and there are a couple of small differences in getting started with serving up API endpoints:

## ApiController Attribute

In MVC, all we needed to setup a controller was inherit from the controller class:

```
namespace BulkyBookWebDotNet6MVC.Controllers
{
    public class CategoryController : Controller
    {
    . . .
    }
}
```

For API's, we need to go up the family tree to `ControllerBase`, which controller inherits from:

```
namespace BulkyBookWebDotNet6MVC.Controllers
{
    public class CategoryController : ControllerBase
    {
    . . .
    }
}
```

## Attributes

In addition, we need a few different attributes:

```
[ApiController]
[Route("[controller]")]
public class BookController : ControllerBase
{
	. . .
}
```

`[ApiController]` will give goodies specific to APIs, such as specifying routes and more detailed error responses.

Since we have to specify routes, we're doing so with the next attribute `[Route("[controller]")]` We're defaulting to the controller based routing, but we could just as well define our own route such as `[Route("/users")]`

## Return

Of course, since we're working with an API returning data and not a View from an MVC, the return methods will be slightly different. `[ApiController]` provides methods that are analogous to Status codes:

```
if (BookFromDb == null)
{
	// Status: 404
    return NotFound();
}

// Status: 200 with created object
return Ok(BookFromDb);
```

And that should be enough to get started! More details are available on [MSDN](https://learn.microsoft.com/en-us/aspnet/core/web-api/).
