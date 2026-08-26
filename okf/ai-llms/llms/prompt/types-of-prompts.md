---
type: Section
title: Types of Prompts
description: Prompt - Types of Prompts
tags: [types-of-prompts,prompt,llms]
timestamp: 2026-08-26T23:11:16.579Z
section: types-of-prompts
guide: prompt
phase: llms
icon: category
---

# Types of Prompts

**Icon:** category

Prompts come in families. Know the main ones:

| Type | What it is | When to use |
|---|---|---|
| **Zero-shot** | Ask directly, no examples | Simple, well-defined tasks |
| **Few-shot** | Give 1+ input→output examples | When format/style must be demonstrated |
| **System / Role** | Set persona + rules up front | Define behavior across a session |
| **Instruction** | Step-by-step commands | Multi-step or precise tasks |
| **Chain-of-Thought** | "Think step by step" | Reasoning, math, logic |
| **Contextual / RAG** | Inject retrieved docs | Grounding on private/live data |
| **Negative** | State what NOT to do | Avoid known failure modes |

**Zero-shot vs few-shot:** zero-shot relies on the model's priors; few-shot *shows* the pattern, which dramatically improves consistency on structured or unusual tasks.

**Golden rule:** start zero-shot, add few-shot examples when the format is fragile, and use Chain-of-Thought only when reasoning is the bottleneck.
