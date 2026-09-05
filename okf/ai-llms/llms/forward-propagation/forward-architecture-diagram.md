---
type: Section
title: Forward Architecture (Interactive)
description: Forward Propagation - Forward Architecture (Interactive)
tags: [forward-architecture-diagram,forward-propagation,llms]
timestamp: 2026-08-26T23:11:16.581Z
section: forward-architecture-diagram
guide: forward-propagation
phase: llms
icon: account_tree
order: 3
---

# Forward Architecture (Interactive)

**Icon:** account_tree

## Pipeline Diagram

```json
{
  "stages": [
    {
      "icon": "text_fields",
      "label": "Input Tokens",
      "note": "Token IDs and positions enter. For inference: prompt tokens plus any cached KV history."
    },
    {
      "icon": "grid_on",
      "label": "Embedding + Position",
      "note": "Token IDs become dense vectors. Positional encodings inject order so the model knows sequence."
    },
    {
      "icon": "mode_comment",
      "label": "Attention Layer",
      "note": "Q, K, V projections → scaled dot-product → weighted values. Output combines information from other tokens."
    },
    {
      "icon": "add",
      "label": "Add & Norm",
      "note": "Residual connection adds input back (gradient flow). LayerNorm stabilizes deep stacking."
    },
    {
      "icon": "layers",
      "label": "Feed-Forward (FFN)",
      "note": "Up-project (d → 4d), GELU non-linearity, down-project (4d → d). Position-wise MLP per token."
    },
    {
      "icon": "add",
      "label": "Add & Norm",
      "note": "Second residual + norm after FFN. Completes one Transformer block. Repeat N times."
    },
    {
      "icon": "functions",
      "label": "Output Logits",
      "note": "Final linear projection to vocabulary-sized logits — the raw scores for the next token."
    }
  ]
}
```
