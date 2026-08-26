---
type: Section
title: What is Caching?
description: Caching - What is Caching?
tags: [what-is-caching,caching,llms]
timestamp: 2026-08-26T23:11:16.583Z
section: what-is-caching
guide: caching
phase: llms
icon: memory
---

# What is Caching?

**Icon:** memory

Caching is the storage of intermediate computations or results to avoid redundant work. In LLMs, caching is crucial for performance and cost optimization.

**Why caching matters:**
- **Speed:** skip repeated computation, get instant results on cache hits.
- **Cost:** fewer GPU cycles = lower electricity and compute dollars.
- **Scalability:** enables serving many concurrent requests efficiently.

**Golden rule:** cache what is expensive to compute and stable across requests. Never cache what changes frequently.

**Types of caching in LLMs:**
- **KV cache:** keys/values from attention layers during generation (the most impactful).
- **Prompt cache:** embeddings of static prompt components.
- **Model cache:** intermediate layers or weights for fast inference.
- **Tokenizer cache:** tokenization results for repeated text segments.
