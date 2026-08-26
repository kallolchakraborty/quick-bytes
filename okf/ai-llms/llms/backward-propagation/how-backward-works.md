---
type: Section
title: How Backward Propagation Works
description: Backward Propagation - How Backward Propagation Works
tags: [how-backward-works,backward-propagation,llms]
timestamp: 2026-08-26T23:11:16.581Z
section: how-backward-works
guide: backward-propagation
phase: llms
icon: sync
---

# How Backward Propagation Works

**Icon:** sync

Given a loss L (e.g., cross-entropy), backprop computes ∂L/∂θ for every weight θ in the network.

**The chain rule in action:**
For a multi-layer network, denote Layer ℓ's output as aℓ, weight as Wℓ, activation as σ (e.g., ReLU):

> zℓ = Wℓ · aℓ₋₁ + bℓ                (linear forward)
> aℓ = σ(zℓ)                           (activation)

The gradient w.r.t. aℓ is:
> δℓ = ∂L/∂aℓ = δℓ₊₁  Wℓ₊₁ᵀ  σ'(zℓ)    (propagate from next layer)

Then the gradients for the weights:
> ∂L/∂Wℓ = δℓ  aℓ₋₁ᵀ                   (outer product)

**Backprop algorithm (high level):**
1. **Forward pass:** compute all activations a₀, a₁, ..., aₙ; compute loss L.
2. **Backward pass:** compute δₙ = ∂L/∂aₙ, then δℓ = δℓ₊₁ Wℓ₊₁ᵀ σ'(zℓ) for ℓ = n-1 down to 1.
3. **Gradient accumulation:** ∂L/∂Wℓ = δℓ aℓ₋₁ᵀ.
4. **Update:** Wℓ ← Wℓ - η ∂L/∂Wℓ (gradient descent step, η = learning rate).

**In a Transformer block:**
- Attention: gradients flow through softmax and dot-product; must remember QKᵀ scale.
- KV cache: during backprop, gradients accumulate for all positions (no caching benefits).
- The backward pass is why Transformers are memory-heavy: we need to store all activations for the gradient computation.
