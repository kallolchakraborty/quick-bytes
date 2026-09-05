---
type: Section
title: KV Cache Overview
description: Caching - KV Cache Overview
tags: [kv-cache-overview,caching,llms]
timestamp: 2026-08-26T23:11:16.583Z
section: kv-cache-overview
guide: caching
phase: llms
icon: layers
order: 2
---

# KV Cache Overview

**Icon:** layers

The **KV cache** (Key-Value cache) is the most critical caching mechanism in Transformers for autoregressive generation. It stores the Q, K, and V projections computed during the attention operation.

**How it works:**
1. During prefill (prompt processing), compute K and V for each prompt token.
2. During decode (generation), compute K and V for each new token.
3. All K and V pairs are stored in the cache for future steps.

**Attention step with cache:**
> Output = softmax(Q · Kᵀ / √dₖ) · V
> Where K and V come from the cache, not recomputed.

**KV cache size:**
> cache_size = 2 (K + V) × sequence_length × num_layers × num_heads × head_dim

**What gets cached:**
- Keys and values are the *heavy* parts to compute (O(n²) attention complexity).
- They are *stable* across generation steps (once computed, they never change).
- Embedding lookups and FFN computations are cheaper (O(n) per token).

**Golden rule:** the KV cache trades *memory* for *compute*. It's why decoding a 1000-token response uses far less compute than recomputing everything from scratch each step.
