---
type: Section
title: Forward vs Backprop
description: Forward Propagation - Forward vs Backprop
tags: [forward-vs-backpropagation,forward-propagation,llms]
timestamp: 2026-08-26T23:11:16.581Z
section: forward-vs-backpropagation
guide: forward-propagation
phase: llms
icon: swap_vert
---

# Forward vs Backprop

**Icon:** swap_vert

A simple comparison of the two core phases in training:

| | Forward Propagation | Backward Propagation |
|---|---|---|
| Direction | Input → output | Output → input |
| Computes | Predictions, loss | Gradients of loss w.r.t. weights |
| Updates weights? | No | Yes (via optimizer) |
| Runs during | Inference AND training | Training only |
| Relative cost | ~1× | ~2–3× (forward + backward) |

**Why you mostly care about forward:** in production you only run forward passes. Optimizing forward latency, memory, and KV cache reuse (see the Inference guide) is what makes LLMs fast and cheap.

**Key insight:** the weights learned during training define the *forward function* that gives the model its abilities. Inference just applies that function.

**Golden rule:** forward = predict, backward = learn. Ship fast forward passes; training happens offline.
