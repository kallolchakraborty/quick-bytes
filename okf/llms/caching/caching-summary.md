---
type: Section
title: Caching Summary
description: Caching - Caching Summary
tags: [caching-summary,caching,llms]
timestamp: 2026-08-26T23:11:16.584Z
section: caching-summary
guide: caching
phase: llms
icon: summarize
order: 6
---

# Caching Summary

**Icon:** summarize

Caching transforms the O(n³) attention computation across tokens into O(n) per step — the single biggest performance win in modern LLMs. It enables everything from real-time chat to billion-parameter model serving.

**The three caching pillars:**
1. **KV Cache:** attention keys and values (the heavyweight, stable data).
2. **Prompt Cache:** static embedding components (the repeatable input).
3. **Model Cache:** intermediate representations (the reusable computations).

**Key insights:**
- Caching is always beneficial: it trades memory for compute.
- The right cache strategy depends on latency, memory, and cost constraints.
- Advanced techniques (quantization, offloading, attention variants) keep pushing the frontier.

**Golden rule:** start simple (full KV cache). Optimize based on bottlenecks: sliding window for memory, quantization for cost, offloading for scale. Measure cache hit rates — they tell you exactly where optimization is needed.
