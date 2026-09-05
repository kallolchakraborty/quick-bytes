---
type: Section
title: Caching Strategies
description: Caching - Caching Strategies
tags: [cache-strategies,caching,llms]
timestamp: 2026-08-26T23:11:16.583Z
section: cache-strategies
guide: caching
phase: llms
icon: layers_clear
order: 4
---

# Caching Strategies

**Icon:** layers_clear

Different caching approaches optimize for speed, memory, or cost:

**1. Full KV Cache**
- Store ALL keys and values for the entire sequence.
- **Pros:** fastest generation, simplest implementation.
- **Cons:** memory-heavy; O(n) memory growth per generated token.

**2. Sliding Window Cache**
- Keep only the most recent N tokens in cache.
- **Pros:** constant memory regardless of sequence length.
- **Cons:** cannot attend to tokens older than window (loss of long context).

**3. Block-wise / Paged Cache**
- Partition cache into blocks; evict least-recently-used.
- **Pros:** fine-grained control over memory budget.
- **Cons:** more complex eviction logic, higher overhead.

**4. Grouped-Query Attention (GQA)**
- Share keys/values across multiple attention heads.
- **Pros:** reduces KV cache memory by factor of heads.
- **Cons:** trades off expressivity; heads compete for same information.

**5. Multi-Head Latent Attention (MLA)**
- Compress K and V representations; store compressed versions.
- **Pros:** drastically smaller cache footprint.
- **Cons:** extra compression/decompression cost; approximation error.

**Golden rule:** choose cache strategy based on your use case:
- **Real-time chat:** full KV cache (speed is king).
- **Long-context summarization:** sliding window + attention mechanisms.
- **Cost-sensitive deployment:** GQA/MLA with careful tuning.
- **Research/innovation:** experiment with new cache eviction policies.
