---
title: MVC in ASP.NET Core
tags:
  - Tech
  - CSharp
  - .NET
date: '2023-06-16T10:35:07.322Z'
---

This week's edition of ASP.NET adventures: kick starting an MVC app with ASP.NET Core!

On the front-end side of things: Two things that make this a really delightful and smooth process are Razor Pages and Tag Helpers.

My MVC experience up to this point has been with templating engines in Express. What they do well in my experience is making it dead simple to get data into the template. The limitation is flexibility and reactivity. (Especially coming from working mostly in React.)

ASP.NET MVC apps have a really nice in between through these two tools.

I'll show the setup with Models and Controllers first, then on to views in action!

(Code samples and all of my info here are coming from [this great introductory video to MVC in ASP.NET Core 6](https://youtu.be/hZ1DASYd9rk))

## Models

Here's a look at the model I'm using:

```
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace BulkyBookWebDotNet6MVC.Models
{
	public class Category
	{
		[Key]
		public int Id { get; set; }
		[Required]
		public string Name { get; set; }
		[DisplayName("Display Order")]
		[Range(1, 100, ErrorMessage = "Display Order must be between 1 and 100")]
		public int DisplayOrder { get; set; }
		public DateTime CreatedDateTime { get; set; } = DateTime.Now;
	}
}

```

Nothing fancy! The code in square brackets are used by Entity Framework for field validation. `DisplayName` will affect what's rendered in the view.

## Controller

Setting up controllers is a straight-shot. Grab what's needed from the Database and send it the view.

```
// GET: /<controller>/
public IActionResult Edit(int? id)
{
    if (id == null || id == 0)
    {
        return NotFound();
    }

    var CategoryFromDb = _db.CategorySet.Find(id);
    //var CategoryFromDb = _db.CategorySet.FirstOrDefault(u=>u.Id == id);
    //var CategoryFromDb = _db.CategorySet.SingleOrDefault(u=>u.Id == id);

    if (CategoryFromDb == null)
    {
        return NotFound();
    }

    return View(CategoryFromDb);
}

// Post: /<controller>/
[HttpPost]
[ValidateAntiForgeryToken]
public IActionResult Edit(Category obj)
{
    if (obj.Name == obj.DisplayOrder.ToString())
    {
        ModelState.AddModelError("name", "Display order cannot match the name.");
    }

    if (ModelState.IsValid)
    {
        _db.CategorySet.Update(obj);
        _db.SaveChanges();
        TempData["success"] = "Category updated successfully";
        return RedirectToAction("Index");
    }

    return View(obj);
}

```

## View

Here's an example of a "Create Category" page for an app:

```
@model Category


<h1>Create</h1>

<form method="post">
    <div class="border p-3 mt-4">
        <h2 class="text-primary">Create Category</h2>
        <div asp-validation-summary="All"></div>
        <div class="row pb-2">
            <label asp-for="Name"></label>
            <input asp-for="Name" class="form-control" />
            <span class="text-danger">@Html.ValidationMessageFor(m => m.Name)</span>
        </div>
        <div class="row pb-2">
            <label asp-for="DisplayOrder"></label>
            <input asp-for="DisplayOrder" class="form-control" />
            <span class="text-danger">@Html.ValidationMessageFor(m => m.DisplayOrder)</span>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 150px;">Create</button>
        <a asp-controller="Category" asp-action="Index" class="btn btn-secondary" style="width: 150px;">
            Back To List
        </a>
    </div>
</form>

@section Scripts{
    @{
        <partial name="_ValidationScriptsPartial" />
    }

}

```

At the top, we're bringing in my Category model with `@model Category`. The controller takes care of sending this to the view both on GET and POST requests:

For the most part, I'm just writing regular html. If I needed to include anything from the model, I could throw `@Category.Name` anywhere and it will render to the page.

## Tag Helpers

The killer part of the example for me are the `asp-` attributes. These are Tag Helpers that inject a lot of functionality automatically.

Take a look at the name field:

```
<div class="row pb-2">
    <label asp-for="Name"></label>
    <input asp-for="Name" class="form-control" />
    <span class="text-danger">@Html.ValidationMessageFor(m => m.Name)</span>
</div>
```

`asp-for` on the label and input will know to populate the name input with the value from name, as well as pull from it when the form is submitted. Also included is client side validation _automatically_. When an error is found, the message is then passed to the `@Html.ValidationMessageFor(m => m.Name)`

_That's it!_ It's a fair dose of magic, but it saves a lot of code that would normally be done by hand in JavaScript, or requiring a heavy library.
