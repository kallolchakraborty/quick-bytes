---
type: Section
title: What is Forward Propagation?
description: Forward Propagation - What is Forward Propagation?
tags: [what-is-forward-propagation,forward-propagation,llms]
timestamp: 2026-08-26T23:11:16.580Z
section: what-is-forward-propagation
guide: forward-propagation
phase: llms
icon: forward
order: 1
---

# What is Forward Propagation?

**Icon:** forward

A **forward pass** (or forward propagation) is the computation of output data through a neural network when given an input. It proceeds layer by layer — from input to output — applying each layer's weights and activation functions, but **never updating any parameter**: it only computes predictions.

**Why it matters:**
- **Inference is 100% forward.** Every time you query an LLM, it runs a forward pass over the prompt (plus cached KV states for prior tokens).
- **Training needs two phases:** first forward (to get the loss) then backward (to compute gradients). Forward alone does nothing to learn.

> In a transformer:  
> Input → Embedding → Attention → FFN → LayerNorm → Output

**Golden rule:** forward propagation is a *deterministic pipeline*. Same input + same weights = same output. No learning happens during the forward pass itself.
