---
title: Claude Code Sound Effects
tags:
  - Tech
  - AI
date: '2025-12-19T16:12:15.322Z'
---

A riff on [Claude Code Muzak](/agenteleveatormusic). Using the same hooks interface to play a system sound on task completion and when asking a follow-up question. Simply add this to your .claude/settings.json:

```
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Hero.aiff"
          }
        ]
      }
    ],
    "PermissionRequest": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "afplay /System/Library/Sounds/Funk.aiff"
          }
        ]
      }
    ]
  },
}
```

🔔
