---
type: Section
title: Architecture (Interactive Pipeline)
description: Inference - Architecture (Interactive Pipeline)
tags: [inference-architecture,inference,llms]
timestamp: 2026-08-26T23:11:16.578Z
section: inference-architecture
guide: inference
phase: llms
icon: account_tree
order: 3
---

# Architecture (Interactive Pipeline)

**Icon:** account_tree

## Pipeline Diagram

```json
{
  "stages": [
    {
      "icon": "text_fields",
      "label": "Input Prompt",
      "note": "Raw, untokenized user text enters the system. For example, a prompt like Translate to French: Hello is still just a string of characters here, with no tokenization yet."
    },
    {
      "icon": "token",
      "label": "Tokenizer",
      "note": "Splits text into subword tokens (e.g. BPE). Each token maps to an integer ID. Roughly 1 token ≈ 4 characters of English."
    },
    {
      "icon": "grid_on",
      "label": "Embedding",
      "note": "Token IDs are mapped to dense vectors that capture meaning. Positional encodings are added so token order is preserved."
    },
    {
      "icon": "account_tree",
      "label": "Transformer (Prefill + Decode)",
      "note": "Prefill: process the whole prompt in parallel and fill the KV cache. Decode: generate one token at a time, reusing the cache (see the KV Cache guide)."
    },
    {
      "icon": "functions",
      "label": "LM Head / Logits",
      "note": "The final layer outputs a logit vector over the vocabulary — a raw score for every possible next token."
    },
    {
      "icon": "tune",
      "label": "Sampling",
      "note": "Logits become probabilities via softmax, then a token is chosen: greedy (argmax), or temperature / top-p / top-k for controlled diversity."
    },
    {
      "icon": "output",
      "label": "Output Token → Loop",
      "note": "The chosen token is emitted, appended to the sequence, and fed back in for the next decode step until an end token or max length."
    }
  ]
}
```
