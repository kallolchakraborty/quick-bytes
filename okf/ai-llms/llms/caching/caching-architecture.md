---
type: Section
title: Caching Architecture (Interactive)
description: Caching - Caching Architecture (Interactive)
tags: [caching-architecture,caching,llms]
timestamp: 2026-08-26T23:11:16.583Z
section: caching-architecture
guide: caching
phase: llms
icon: account_tree
---

# Caching Architecture (Interactive)

**Icon:** account_tree

## Pipeline Diagram

```json
{
  "stages": [
    {
      "icon": "text_fields",
      "label": "Input Tokens",
      "note": "Raw text is tokenized. For each token: compute embedding + position encoding."
    },
    {
      "icon": "mode_comment",
      "label": "Compute Q, K, V",
      "note": "Projection matrices W_Q, W_K, W_V applied to embeddings. Expensive matrix multiplies (O(n²))."
    },
    {
      "icon": "memory",
      "label": "KV Cache Storage",
      "note": "Store computed K and V pairs per layer. Grows linearly with sequence length, quadratically with model size."
    },
    {
      "icon": "repeat",
      "label": "Prefill Phase",
      "note": "All prompt tokens processed in one batched forward pass. Fill entire KV cache up front. Heavy compute, one-time cost."
    },
    {
      "icon": "repeat",
      "label": "Decode Phase",
      "note": "Each generation step: compute fresh K,V for NEW token → append to cache. Subsequent steps read from cache only."
    },
    {
      "icon": "bolt",
      "label": "Attention with Cache",
      "note": "QKᵀ uses cached keys; softmax weighted sum uses cached values. No recomputation of prompt token K/V pairs."
    },
    {
      "icon": "functions",
      "label": "Output + Cache Growth",
      "note": "Generate next token → append its K,V to cache. Cache size increases by one slot per generated token."
    }
  ]
}
```
