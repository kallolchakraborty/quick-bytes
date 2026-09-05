---
type: Section
title: Examples of Prompts
description: Prompt - Examples of Prompts
tags: [examples-of-prompts,prompt,llms]
timestamp: 2026-08-26T23:11:16.580Z
section: examples-of-prompts
guide: prompt
phase: llms
icon: apps
order: 5
---

# Examples of Prompts

**Icon:** apps

**1. Zero-shot classification**
> Classify the sentiment of this review as Positive, Negative, or Neutral: "The battery died after two weeks." → Answer:

**2. Few-shot extraction (JSON)**
> Extract entities as JSON.
> Example: "Apple bought a startup in Seattle." → {"org":"Apple","city":"Seattle"}
> Text: "OpenAI hired a researcher from London." →

**3. Chain-of-Thought math**
> A train travels 60 km in 45 minutes. What is its speed in km/h? Think step by step.

**4. RAG grounded answer**
> Using the provided policy document, answer: what is the refund window? Only use the document.

**5. System + negative constraint**
> You are a senior Rust reviewer. Explain the bug. Do NOT rewrite the whole file; only show the minimal fix.

**Golden rule:** show, don't just tell — few-shot examples and explicit output formats beat long paragraphs of instructions.
