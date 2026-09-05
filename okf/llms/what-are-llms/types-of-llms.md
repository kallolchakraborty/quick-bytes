---
type: Section
title: Types of LLMs
description: What is LLMs, Types & Examples - Types of LLMs
tags: [types-of-llms,what-are-llms,llms]
timestamp: 2026-08-26T23:11:16.577Z
section: types-of-llms
guide: what-are-llms
phase: llms
icon: schema
order: 5
---

# Types of LLMs

**Icon:** schema

Within generative AI, LLMs are categorized by their **transformer architecture** and training objective.

| Type | Architecture | Strengths | Weaknesses | Examples |
|---|---|---|---|---|
| **Decoder-only (Autoregressive)** | GPT-style, causal attention | Text generation, dialogue, code, reasoning | No explicit encoding step | GPT-4, Llama 3, Claude |
| **Encoder-only (Autoencoding)** | BERT-style, bidirectional attention | Understanding, classification, NER | Poor at generation | BERT, RoBERTa, DistilBERT |
| **Encoder-Decoder (Seq2Seq)** | Full encoder + decoder | Translation, summarization, structured I/O | Larger, slower than decoder-only | T5, BART, FLAN-T5 |

**Decoder-only** — the standard for generative AI. Process text left-to-right, excel at open-ended generation.

**Encoder-only** — read input bidirectionally; ideal for deep *understanding* of fixed input (sentiment, search ranking).

**Encoder-Decoder** — encoder captures context, decoder generates; best for input→output mapping (translation, summarization).

**Golden rule:** decoder-only for generation, encoder-only for understanding, encoder-decoder when you need both.
