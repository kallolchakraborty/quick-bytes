---
type: Section
title: Compression & Optimization
description: Prompt - Compression & Optimization
tags: [prompt-compression-optimization,prompt,llms]
timestamp: 2026-08-26T23:11:16.580Z
section: prompt-compression-optimization
guide: prompt
phase: llms
icon: compress
---

# Compression & Optimization

**Icon:** compress

As prompts grow, they cost tokens, latency, and context-window space — and the KV cache (see the KV Cache guide) grows with every token. **Compression** shrinks the prompt; **optimization** makes it cheaper and more reliable.

**Compression techniques:**
- **Truncation / windowing:** keep only the most recent N turns or characters.
- **Summarization:** compress old context into a rolling summary instead of raw history.
- **Selective context:** retrieve only the documents or facts actually needed (RAG), not the whole corpus.
- **Semantic compression:** replace verbose text with dense embeddings or learned summaries the model can expand.
- **Prompt caching:** mark the stable prefix (system prompt, few-shot examples) as cacheable so repeated calls reuse the KV cache instead of recomputing it.

**Optimization techniques:**
- **Few-shot pruning:** keep only the examples that actually move the output; drop the rest.
- **Instruction tightening:** shorter, explicit instructions beat long paragraphs.
- **Template & variable reuse:** fixed templates plus minimal per-request variables reduce tokens and drift.
- **Deferred / lazy context:** load heavy context only when the task needs it.
- **Batching:** group independent prompts to amortize model overhead.

**Others to know:**
- **Evaluation & A/B testing:** measure task success before and after changes — optimize what you can measure.
- **Versioning:** treat prompts like code; track changes and roll back.
- **Guardrails & validation:** validate the output (schema, filters) rather than stuffing more instructions into the prompt.

**Golden rule:** shrink what is stable (and cache it), retrieve only what is needed (do not dump everything), and measure — most "better prompting" is really better compression and better evaluation.
