---
type: Section
title: Transformer Architecture (Interactive)
description: Transformers - Transformer Architecture (Interactive)
tags: [transformer-architecture-diagram,transformers,llms]
timestamp: 2026-08-26T23:11:16.583Z
section: transformer-architecture-diagram
guide: transformers
phase: llms
icon: account_tree
---

# Transformer Architecture (Interactive)

**Icon:** account_tree

## Pipeline Diagram

```json
{
  "stages": [
    {
      "icon": "text_fields",
      "label": "Input Tokens",
      "note": "Raw text is tokenized into integer IDs. Each token becomes a dense vector via embedding."
    },
    {
      "icon": "grid_on",
      "label": "Token + Position Embedding",
      "note": "Token embeddings capture meaning; positional encodings inject order information. Since Transformers have no recurrence, position is essential."
    },
    {
      "icon": "mode_comment",
      "label": "Multi-Head Self-Attention",
      "note": "Each token computes Q, K, V and attends to every other token. Multiple heads run in parallel, each learning different relationships (syntax, semantics, coreference)."
    },
    {
      "icon": "add",
      "label": "Add & Norm (Residual)",
      "note": "Attention output is added to the original input (residual connection), then normalized. This stabilizes training and allows gradients to flow through deep stacks."
    },
    {
      "icon": "layers",
      "label": "Feed-Forward Network (FFN)",
      "note": "Position-wise MLP: up-project to 4× hidden size, apply GELU non-linearity, down-project back. Each token transformed independently — this is where \"knowledge\" is stored."
    },
    {
      "icon": "add",
      "label": "Add & Norm (Residual)",
      "note": "Second residual + LayerNorm after FFN. One complete Transformer block."
    },
    {
      "icon": "repeat",
      "label": "Repeat N times",
      "note": "Typical LLMs stack 12–96+ identical blocks. Deeper stacking = more capacity. The output of block L feeds block L+1."
    },
    {
      "icon": "functions",
      "label": "Final LayerNorm + LM Head",
      "note": "Final normalization, then linear projection to vocabulary size. Output: logits — raw scores for every possible next token."
    },
    {
      "icon": "tune",
      "label": "Sampling → Output",
      "note": "Convert logits to probabilities via softmax, then sample (greedy, temperature, top-p, top-k). Emit token, append to sequence, repeat for autoregressive generation."
    }
  ]
}
```
