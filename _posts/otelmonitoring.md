---
title: Application Monitoring with Open Telemetry
tags:
  - Tech
  - Python
  - OpenTelemetry
date: '2024-08-05T10:35:07.322Z'
---

I've been spending time diving into instrumenting our serverless apps with Open Telemetry. 

The situation: We've previously used a custom logging solution to monitor a few cron jobs. It's worked well for a time. As we scale, though, we've started looking for another solution.

An issue with most off-the-shelf monitoring services is the amount of vendor lock in you set yourself up for. Thus, the [Open Telemetry protocol](https://opentelemetry.io/) came about.

The gist is that it's a standardized way your application can emit:

- **Traces**: Path of a request through your app. Think multiple lambda functions. Broken up into individual spans
- **Metrics**: Measurement captured at runtime. Anything you'd like to quantify.
- **Logs**: What you emit from your logger. Can be tied to a trace.

These data points are then sent from the application to a collector that can send these to your backend of choice. Many vendors have supporting libraries, including big players like [Data Dog](https://www.datadoghq.com/) and [New Relic](https://newrelic.com/).

## Concepts

There are a few concepts to understand before getting started. You'll likely be setting up several services to instrument your application.

The pieces are:

- **Instrumented App**: Your code wrapped in an SDK to create traces, metrics, and logs.
- **Exporter**: Responsible for sending your data to the collector. Can exist within your application.
- **Collector**: Can receive and send Open Telemetry data. This is where you will point your application to.
- **Back End**: Your vendor or self hosted solution specific service for storing and rendering your data.

## Instrumenting The App

The fastest way to get started is with a zero code instrumentation. There are slick ways for the Open Telemetry (OTel) SDK's to integrate with a web server like Flask.

For an application without a framework, though, there's a bit of manual work to do:

The [official OTel docs outline the packages to import](https://opentelemetry.io/docs/languages/python/instrumentation/). You'll have to choose between gRPC or http protocol as your means of exporting. (Though, it seems the gRPC implementation is mostly a dressed up HTTPS protocol.)

Once you have it setup, emitting traces is straightforward:

```python
with tracer.start_as_current_span(fn.__name__, links=links) as span:
	span.add_event(f"{fn.__name__}() started")
	
	# Do work
		
	span.add_event(f"{fn.__name__}() complete")
	return result

```

## Setting Up the Collector

You could point your OTel config directly to your backend. Much of the benefit, though comes from using this in a distributed system. Here, a dedicated collector comes in handy.

If you're in an AWS environment, you can take advantage of the [AWS Open Telemetry Collector](https://aws-otel.github.io/docs/introduction). Setup here is primarily a bit of configuration.

My OTel project is still a work in progress, so that's all for now! I'll leave the nitty gritty for another post.