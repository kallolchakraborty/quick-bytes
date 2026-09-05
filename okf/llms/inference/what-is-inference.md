---
type: Section
title: What is an Inference?
description: Inference - What is an Inference?
tags: [what-is-inference,inference,llms]
timestamp: 2026-08-26T23:11:16.578Z
section: what-is-inference
guide: inference
phase: llms
icon: bolt
order: 1
---

# What is an Inference?

**Icon:** bolt

**Inference** is the phase where a trained model actually *produces output* from new input — as opposed to **training**, where the model *learns* weights. For an LLM, inference means: take a prompt, run it through the Transformer, and generate tokens.

**Training vs inference:**

| | Training | Inference |
|---|---|---|
| Goal | Learn weights from data | Produce output from input |
| Runs | Once, offline, expensive | Repeatedly, per request |
| Needs | Labels, gradients, backward pass | Only forward pass |
| Memory | Gradients + optimizer state | Activations + KV cache |
| Output | Updated model | Generated tokens |

**Why it matters:** inference is where the model meets users. Its cost, latency, and throughput — not training — determine the real-world bill and experience. Everything from batching to quantization exists to make inference cheaper and faster.

**Golden rule:** training builds the model; inference *runs* it. Optimizing inference (not training) is what makes an LLM usable in production.
