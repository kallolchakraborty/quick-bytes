---
type: Section
title: Prompt Architecture (Interactive)
description: Prompt - Prompt Architecture (Interactive)
tags: [prompt-architecture,prompt,llms]
timestamp: 2026-08-26T23:11:16.579Z
section: prompt-architecture
guide: prompt
phase: llms
icon: account_tree
order: 4
---

# Prompt Architecture (Interactive)

**Icon:** account_tree

## Pipeline Diagram

```json
{
  "stages": [
    {
      "icon": "shield_person",
      "label": "System Message",
      "note": "Sets the model role/persona and global rules (tone, safety, constraints). Persists across the conversation."
    },
    {
      "icon": "history",
      "label": "Context",
      "note": "Retrieved documents or prior conversation turns (RAG). Grounds the answer in real, current data."
    },
    {
      "icon": "list_alt",
      "label": "Instruction",
      "note": "The actual task: what to do, step by step. The clearest instruction wins even on a weak model."
    },
    {
      "icon": "format_quote",
      "label": "Few-shot Examples",
      "note": "Demonstration input→output pairs that show the desired pattern and format. Powerful for structured tasks."
    },
    {
      "icon": "chat",
      "label": "User Input",
      "note": "The live query. Combined with everything above, this is what the model actually responds to."
    },
    {
      "icon": "code",
      "label": "Output Format",
      "note": "Constraints on the response: JSON schema, length, style, or citation rules. Forces machine-readable, parseable output."
    }
  ]
}
```
