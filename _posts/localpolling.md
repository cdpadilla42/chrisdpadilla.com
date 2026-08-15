---
title: Local Polling
tags:
  - Tech
date: '2026-08-11T16:27:35.322Z'
---

I have a rare process that needs to run on a physical machine rather than via a cloud server. Let's say it's report generation. It ultimately has similar responsibility to a cloud worker — the local machine is meant to be on standby, waiting for requests to come in. But, what I've been doing instead is manually spinning the process up via CLI. The ideal, though, is for it to not need my oversight. Even better if it runs when there's been a change in the reporting data it's based on.

Polling unlocks this. This past week, I've spun up a few pieces:

- A queue for holding job requests
- An adjustment to the report data update that submits a request to the job queue
- A daemon on the local machine that polls at an interval for jobs waiting to be picked up.

```python
def run(self):
  try:
      msg = self.store.queue.receive(wait_seconds=20)
      if msg is None:
          continue
      self.handle(msg)
  except Exception as e:
      logger.error(f"Daemon loop error (continuing): {e}")
      time.sleep(LOOP_ERROR_BACKOFF_SECONDS)
```

In this model, it's ultimately up to the daemon to be responsible for progressing the queue. The daemon can read the first _n_ messages based on the load it can carry. Once a job completes, it is then responsible for deleting the message from the queue, or marking failed otherwise. On crashing, a queue such as SQS will handle replacing the message in the queue after timeout to be handled again later.

An interesting bit of glue, I thought. Perhaps it speaks to the ubiquity of cloud compute that I find this novel. All the same, there was a magic to seeing the process spin up on my machine automatically when polled!
