---
type: Section
title: What is a Prompt?
description: Prompt - What is a Prompt?
tags: [what-is-prompt,prompt,llms]
timestamp: 2026-08-26T23:11:16.579Z
section: what-is-prompt
guide: prompt
phase: llms
icon: chat
order: 1
---

# What is a Prompt?

**Icon:** chat

A **prompt** is the input you give an LLM to elicit a desired response — natural-language (and sometimes structured) instructions, context, and examples. Prompting is how you *steer* a model without retraining: the model's behavior is largely determined by what you put in the prompt.

**Why prompting matters:** an LLM is a frozen, next-token predictor. The prompt is the only live lever you have at inference time to control task, format, tone, and correctness. Small prompt changes can mean the difference between a useless answer and a great one.

**Key concepts:**
- **Prompt ≠ fine-tuning:** prompting changes input, not weights.
- **Context window:** everything you put in consumes tokens (and memory via the KV cache).
- **Determinism vs sampling:** same prompt + low temperature → stable output; high temperature → varied.

**Golden rule:** a prompt is a contract with the model. Be explicit about role, task, format, and constraints, and the model will meet you halfway.
