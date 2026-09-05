---
type: Section
title: Backward Architecture (Interactive)
description: Backward Propagation - Backward Architecture (Interactive)
tags: [backward-architecture-diagram,backward-propagation,llms]
timestamp: 2026-08-26T23:11:16.581Z
section: backward-architecture-diagram
guide: backward-propagation
phase: llms
icon: account_tree
order: 3
---

# Backward Architecture (Interactive)

**Icon:** account_tree

## Pipeline Diagram

```json
{
  "stages": [
    {
      "icon": "functions",
      "label": "Loss L",
      "note": "The objective function (e.g., cross-entropy). Higher loss = more wrong predictions."
    },
    {
      "icon": "sync",
      "label": "Upstream Gradient",
      "note": "∂L/∂logits flows backward from the loss into the network."
    },
    {
      "icon": "layers",
      "label": "Layer N (FFN)",
      "note": "Apply chain rule: d = d_past * W^T * ReLU(z). Compute gradients for weights and bias."
    },
    {
      "icon": "add",
      "label": "Add & Norm",
      "note": "Gradients split: one for residual path, one for LayerNorm. Sum and normalize."
    },
    {
      "icon": "mode_comment",
      "label": "Attention Block",
      "note": "Backprop through softmax (softmax × (input - sumsoftmax)). Compute QK/V gradients."
    },
    {
      "icon": "grid_on",
      "label": "Embedding",
      "note": "Embedding gradients sum over all token positions they appear in. Rare tokens get bigger updates."
    },
    {
      "icon": "text_fields",
      "label": "Input Tokens",
      "note": "Final gradient w.r.t. input tokens. Used in adversarial training, gradient-based attacks, or input embedding analysis."
    }
  ]
}
```
