---
type: Section
title: System vs User Prompt
description: Prompt - System vs User Prompt
tags: [system-vs-user-prompt,prompt,llms]
timestamp: 2026-08-26T23:11:16.579Z
section: system-vs-user-prompt
guide: prompt
phase: llms
icon: swap_horiz
order: 3
---

# System vs User Prompt

**Icon:** swap_horiz

In chat-style LLM APIs, a prompt is usually split into **message roles**. The two you interact with most are the **system prompt** and the **user prompt** (alongside the assistant's own replies).

| | System prompt | User prompt |
|---|---|---|
| Set by | The developer / app | The end user |
| When | Once, at the start of a session | Every turn |
| Purpose | Persona, rules, global behavior | The actual question or task |
| Persistence | Stays for the whole conversation | Varies per message |
| Example | "You are a concise SQL expert." | "List the top 5 customers by revenue." |

**System prompt:** developer-supplied instructions that shape *how* the model behaves for the entire session — tone, persona, guardrails, output format. It is typically not shown to the end user.

**User prompt:** the input the person types each turn — the question, command, or data the model should act on.

**Why the split matters:** keeping behavior (system) separate from content (user) makes the same assistant reusable across users and tasks, and lets you update guardrails without rewriting every request.

**Golden rule:** put stable behavior and constraints in the system prompt; put the task and data in the user prompt.
