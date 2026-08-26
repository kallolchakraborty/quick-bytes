---
type: Section
title: What is Backward Propagation?
description: Backward Propagation - What is Backward Propagation?
tags: [what-is-backward-propagation,backward-propagation,llms]
timestamp: 2026-08-26T23:11:16.581Z
section: what-is-backward-propagation
guide: backward-propagation
phase: llms
icon: arrow_back
---

# What is Backward Propagation?

**Icon:** arrow_back

Backward propagation (backprop) is the algorithm that computes gradients of the loss function with respect to every weight in the neural network. It runs *after* the forward pass and enables the model to learn by updating its weights via gradient descent.

**Why it exists:** an LLM (or any neural net) has billions of parameters. To make those parameters useful, they must be updated based on how wrong the forward pass was. Backprop tells us precisely how much to change each weight.

**Key facts:**
- **Efficient via dynamic programming:** chains gradients backward through the computational graph, reusing intermediate results (no recomputation).
- **Chain rule everywhere:** the gradient of a composite function is the product of gradients at each step. This is why we store activations during the forward pass.
- **Works for any differentiable function:** ReLU, GELU, softmax, attention — all have known gradients.

**Golden rule:** you can only backpropagate through operations whose gradients are defined (no non-differentiable jumps like if-statements on values).

**Why the term "backprop":** gradients flow backward through the network (from loss to input layer), but the weight updates improve the forward pass for future data.
