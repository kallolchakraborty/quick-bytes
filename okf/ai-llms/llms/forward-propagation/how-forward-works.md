---
type: Section
title: How Forward Propagation Works
description: Forward Propagation - How Forward Propagation Works
tags: [how-forward-works,forward-propagation,llms]
timestamp: 2026-08-26T23:11:16.580Z
section: how-forward-works
guide: forward-propagation
phase: llms
icon: sync
---

# How Forward Propagation Works

**Icon:** sync

A single layer transforms its input as:

> z = W × x + b      (linear: weight matrix × input + bias)  
> a = activation(z)  (non-linear: ReLU, GELU, softmax)

After the first layer's activation becomes the input to the second layer, and so on until the final output.

**In a Transformer block** (the architecture used by every modern LLM), one forward step does:

1. **Multi-Head Attention:** compute queries (Q), keys (K), values (V) for all tokens, apply scaled dot-product attention, then concatenate heads. Output = attention weights × V.
2. **Add & Norm:** add the residual (original input) to the attention output, then apply layer normalization.
3. **Feed-Forward Network (FFN):** apply a small MLP — up-project (W₁), non-linearity (GELU), down-project (W₂). Position-wise: each token transformed independently.
4. **Add & Norm:** another residual connection + normalization.

**Stacking layers:** N identical blocks are stacked. The output of block L feeds block L+1. This depth is what gives transformers their representational power.

**Cost:** each layer performs O(seq_len² × d) for attention (with seq_len = token count, d = hidden size) and O(seq_len × d × 4) for the feed-forward. Why compute-bound prefill vs memory-bound decode.
