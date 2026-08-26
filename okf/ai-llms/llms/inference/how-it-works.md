---
type: Section
title: How it works?
description: Inference - How it works?
tags: [how-it-works,inference,llms]
timestamp: 2026-08-26T23:11:16.578Z
section: how-it-works
guide: inference
phase: llms
icon: sync
---

# How it works?

**Icon:** sync

LLM inference is a two-phase loop driven by the **Transformer forward pass**:

**1. Prefill (prompt processing):** the whole input prompt is fed through the model in parallel (one batched forward pass). The model computes the Key/Value vectors for every prompt token and stores them in the **KV cache**. Output: the logits for the first generated token.

**2. Decode (token generation):** the model generates **one token at a time**. Each step:
- reads the *last* token + the cached K/V of all previous tokens,
- computes new K/V (cached),
- produces logits → samples the next token,
- appends it and repeats until an end-of-sequence token or max length.

**Prefill vs decode at a glance:**

| | Prefill | Decode |
|---|---|---|
| Compute | Parallel over all prompt tokens | Sequential, one token per step |
| KV cache | Filled here | Read + extended here |
| Bottleneck | Compute-bound (big matmuls) | Memory-bandwidth-bound (reads weights + cache) |

**Batching:** in production, many requests are batched together (continuous / batch scheduling) so the GPU stays busy during both phases. This is the single biggest throughput lever.

**Golden rule:** prefill is compute-bound, decode is memory-bound. Good serving stacks optimize each phase separately and batch across requests.
