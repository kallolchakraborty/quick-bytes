---
type: Section
title: AI Model Landscape (Tree View)
description: What is LLMs, Types & Examples - AI Model Landscape (Tree View)
tags: [ai-landscape-tree,what-are-llms,llms]
timestamp: 2026-08-26T23:11:16.577Z
section: ai-landscape-tree
guide: what-are-llms
phase: llms
icon: account_tree
---

# AI Model Landscape (Tree View)

**Icon:** account_tree

## Tree Data

```json
{
  "label": "AI Model",
  "note": "A system that learns patterns from data to perform intelligent tasks.",
  "children": [
    {
      "label": "Symbolic / Rule-based",
      "note": "Expert systems, deterministic",
      "icon": "rule"
    },
    {
      "label": "Statistical / Discriminative",
      "note": "Classifiers, SVM, BERT",
      "icon": "category"
    },
    {
      "label": "Generative",
      "note": "Creates new data",
      "icon": "auto_awesome",
      "children": [
        {
          "label": "LLM (Language)",
          "note": "GPT, Llama, Claude",
          "icon": "chat_bubble"
        },
        {
          "label": "Diffusion",
          "note": "Images, audio",
          "icon": "image"
        },
        {
          "label": "GAN",
          "note": "Synthetic media",
          "icon": "movie"
        }
      ]
    },
    {
      "label": "Predictive",
      "note": "Forecasting, time-series",
      "icon": "trending_up"
    },
    {
      "label": "Reinforcement Learning",
      "note": "Reward-driven, RLHF",
      "icon": "casino"
    },
    {
      "label": "Neuro-symbolic",
      "note": "Hybrid reasoning",
      "icon": "hub"
    }
  ]
}
```
