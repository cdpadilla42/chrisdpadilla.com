---
title: Deploy New Projects Before Development (.NET Core & Azure)
tags:
  - Tech
  - .NET
  - CSharp
  - React
date: '2023-06-02T10:35:07.322Z'
---

That's a great bit of advice I got from a friend early on as a developer. This is especially true if your app goes beyond the _hello world_ boilerplate.

For example, a couple of years ago I needed this advice because I was looking to create a MERN stack app with Express and React hosted on different services.

This week, I was in the same situation. I wanted to deploy a ASP.NET Core application that serves React on the client to Azure.

The road there involved starting projects with different versions of .NET Core, adding a missing config file, and finding the correct region and OS settings to get my app up on Azure.

By the way, the sweet spot for my solution was:

- Use ASP.NET Core 6
- The West US region wasn't available on Azure, so I went with East US
- To get CI going, I had to select Windows as the server's operating system on Azure
- For Linux, the Github Action Azure uses will generate a web.config file. In my case, I had to add it myself to avoid IIS errors
- My project template uses a `DateOnly` class, which needed converting for .NET Core 6. Here's what I added to get things going:

```
// web.config

<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet"
                  arguments=".\MyApp.dll"
                  stdoutLogEnabled="false"
                  stdoutLogFile=".\logs\stdout"
                  hostingModel="inprocess" />
    </system.webServer>
  </location>
</configuration>
```

```
// WeatherForecast.cs

public sealed class DateOnlyJsonConverter : JsonConverter<DateOnly>
{
    public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        return DateOnly.FromDateTime(reader.GetDateTime());
    }

    public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
    {
        var isoDate = value.ToString("O");
        writer.WriteStringValue(isoDate);
    }
}

```

```
// Program.cs

builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.Converters.Add(new DateOnlyJsonConverter());
                });
```

You can imagine that, after putting hours into an application, only to realize that all of a sudden it's not finding its way on the web — that can be a major hassle. So getting the simplest version of the app possible, but with all the key components still in play, is a great first step in an iterative process.
