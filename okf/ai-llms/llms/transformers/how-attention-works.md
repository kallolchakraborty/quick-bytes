---
type: Section
title: How Self-Attention Works
description: Transformers - How Self-Attention Works
tags: [how-attention-works,transformers,llms]
timestamp: 2026-08-26T23:11:16.582Z
section: how-attention-works
guide: transformers
phase: llms
icon: sync
---

# How Self-Attention Works

**Icon:** sync

Self-attention is the core mechanism of the Transformer. It allows each token to dynamically focus on relevant tokens in the sequence.

**The three vectors:**
For each token, the model computes three vectors:
- **Query (Q):** "What am I looking for?"
- **Key (K):** "What do I contain?"
- **Value (V):** "What information do I offer?"

**Attention formula:**
> Attention(Q, K, V) = softmax(QKᵀ / √dₖ) V

Where:
- **QKᵀ:** measures similarity between every query and every key
- **√dₖ:** scaling factor (prevents dot products from growing too large)
- **softmax:** converts similarities to probabilities (weights)
- **V:** weighted sum of values (the actual output)

**Step by step:**
1. Compute Q, K, V for every token via learned linear projections.
2. Compute attention scores: Q × Kᵀ for every pair of tokens.
3. Scale scores by 1/√dₖ.
4. Apply softmax to get attention weights (probabilities).
5. Multiply weights by V and sum — each token's output is a weighted mix of all tokens' values.

**Multi-head attention:** instead of one attention function, run h parallel "heads" with different learned projections, then concatenate and project. Each head can learn different relationships — one might track subject-verb agreement, another might resolve pronouns.

**Golden rule:** attention is a *weighted average*. Every token's output is a blend of information from the entire sequence, weighted by relevance. The model learns what to attend to.
