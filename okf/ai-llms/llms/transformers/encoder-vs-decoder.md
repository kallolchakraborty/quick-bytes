---
type: Section
title: Encoder vs Decoder Architectures
description: Transformers - Encoder vs Decoder Architectures
tags: [encoder-vs-decoder,transformers,llms]
timestamp: 2026-08-26T23:11:16.583Z
section: encoder-vs-decoder
guide: transformers
phase: llms
icon: compare
---

# Encoder vs Decoder Architectures

**Icon:** compare

Transformers come in three architectural flavors, each suited to different tasks:

**1. Encoder-only (e.g., BERT, RoBERTa)**
- Processes input bidirectionally — each token attends to ALL other tokens (both left and right).
- No generation capability (no autoregressive decoding).
- **Best for:** classification, sentiment analysis, named entity recognition, search ranking.
- **How it works:** input → Transformer encoder stack → [CLS] token or pooled output → task head.

**2. Decoder-only (e.g., GPT, Llama, Claude)**
- Processes tokens left-to-right (causal attention). Each token can only attend to previous tokens.
- Autoregressive: generates one token at a time, feeding output back as input.
- **Best for:** text generation, dialogue, code completion, open-ended tasks.
- **How it works:** input → Transformer decoder stack → logits → sample next token → append → repeat.

**3. Encoder-Decoder (e.g., T5, BART)**
- Full encoder (bidirectional) processes input, then full decoder (causal) generates output.
- Cross-attention connects encoder output to decoder layers.
- **Best for:** translation, summarization, structured input→output tasks.
- **How it works:** input → encoder → context vectors → decoder (with cross-attention) → output tokens.

**Golden rule:** decoder-only for generation, encoder-only for understanding, encoder-decoder when you need both. Most modern LLMs use decoder-only because generation is the dominant use case.
