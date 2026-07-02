const QUICK_BYTES = {
  site: {
    name: 'Quick Bytes',
    tagline: 'Software engineering — from fundamentals to staff+.',
    description: 'Concise technical references, system design guides, and engineering career resources for developers at every level.',
    url: 'https://kallolchakraborty.github.io/quick-bytes/',
    author: 'Kallol Chakraborty',
    authorUrl: 'https://www.linkedin.com/in/kallol-chakraborty-9728a699/',
  },
  stats: {
    guides: 1,
    phases: 1,
    platform: 'Engineering',
  },
  phases: [
    {
      id: 'foundations',
      title: 'Core Foundations',
      level: 'L3',
      description: 'Essential programming concepts, tooling, and debugging skills every engineer should master.',
      guides: [
        {
          id: 'large-language-models',
          title: 'Large Language Models (LLMs)',
          description: 'Comprehensive guide to LLMs — from Transformer architecture internals to model taxonomy, deep-dives on GPT-4, Claude, Gemini, LLaMA 3, Mistral, BERT, and T5, and a detailed production comparison across all major models.',
          sections: [
            {
              id: 'what-is-an-llm',
              title: 'What is an LLM?',
              content: `A **Large Language Model (LLM)** is a neural network trained on massive text corpora to model and generate human-like language. At their core, LLMs are next-token predictors: given a sequence of tokens, they predict the most probable next token. Through this simple objective, scaled across billions of parameters and trillions of training tokens, they exhibit emergent abilities including reasoning, translation, code generation, summarization, and in-context learning.

**Evolution**

<object data="assets/diagrams/llm-evolution.svg" type="image/svg+xml" width="520" height="640" class="w-full my-8 rounded-xl shadow-lg" aria-label="LLM Evolution Timeline"></object>

**Key Properties**

- **Scale:** 7B to 1.7T+ parameters, trained on 1T–15T tokens.
- **Emergence:** Abilities not explicitly trained for appear at scale (arithmetic, theory of mind, multilingual translation).
- **In-Context Learning:** Ability to perform tasks from examples in the prompt without weight updates.
- **Autoregressive Generation:** Tokens are generated one at a time, each conditioned on all previous tokens.

LLMs are not "intelligent" in the human sense — they are statistical pattern matchers with no ground truth understanding. Their outputs reflect training data distributions, including its biases, errors, and limitations. Engineering with LLMs requires understanding where they excel (generation, summarization, code) and where they fail (factual accuracy, multi-step reasoning, rare domains).`
            },
            {
              id: 'detailed-architecture',
              title: 'Detailed Architecture',
              content: `The modern LLM is built on the **Transformer** architecture. Below is the complete architecture end-to-end, from raw text to output.

<object data="assets/diagrams/transformer-architecture.svg" type="image/svg+xml" width="900" height="1160" class="w-full my-8 rounded-xl shadow-lg" aria-label="Transformer Architecture Data Flow"></object>

### 1. Tokenization

Raw text is split into tokens — subword units that balance vocabulary size and coverage. Common algorithms:

- **BPE (Byte-Pair Encoding):** Used by GPT, LLaMA, Mistral. Iteratively merges most frequent byte pairs. Vocabulary: 32K–128K tokens.
- **WordPiece:** Used by BERT. Greedily builds tokens from most probable subwords.
- **SentencePiece / Unigram:** Used by T5, Gemma. Language-agnostic, operates on raw bytes without pre-tokenization.

Example: "Transformer" → ["Transform", "er"] or ["Trans", "former"] depending on tokenizer.

<object data="assets/diagrams/tokenization.svg" type="image/svg+xml" width="900" height="620" class="w-full my-8 rounded-xl shadow-lg" aria-label="BPE Tokenization Process"></object>

### 2. Embeddings

Each token is mapped to a dense vector via a learned embedding matrix \`E ∈ ℝ^(V×d)\` where V = vocabulary size, d = model dimension (e.g., 4096 for 7B models). These embeddings capture semantic similarity — similar tokens have nearby vectors.

**Positional Encoding:** Since self-attention is permutation-invariant, position information must be injected:

- **Sinusoidal (original Transformer):** Fixed frequency-based encoding. Used in BERT, T5.
- **RoPE (Rotary Position Embedding):** Applies rotation to query and key vectors based on position. Used in LLaMA, Mistral, Gemini. Enables relative position awareness and better length generalization.
- **ALiBi (Attention with Linear Biases):** Adds a position-proportional bias to attention scores. Used in Bloom, MPT. Allows extrapolation to longer sequences than trained on.

### 3. Self-Attention Mechanism

The core innovation. Each token "attends" to every other token, computing contextualized representations.

<object data="assets/diagrams/self-attention.svg" type="image/svg+xml" width="900" height="750" class="w-full my-8 rounded-xl shadow-lg" aria-label="Self-Attention Mechanism"></object>

**QKV Computation:**
- Input X ∈ ℝ^(n×d) is linearly projected to three matrices:
  - Query Q = XW_Q
  - Key K = XW_K
  - Value V = XW_V
- Attention scores: A = softmax(QK^T / √(d_k))
- Output: Attention(Q,K,V) = AV

The √(d_k) scaling prevents dot products from growing too large, which would push softmax into regions of extremely small gradients.

**Multi-Head Attention (MHA):**
Instead of one attention computation, h parallel heads run independently, each with different learned projections. Outputs are concatenated and projected back:
- MultiHead(Q,K,V) = Concat(head_1, ..., head_h) W_O
- Each head learns to attend to different relationships (syntax, semantics, coreference, etc.).

**Attention Variants:**

| Variant | Description | Used By |
|---------|------------|---------|
| **MHA** | Full multi-head, each head has separate K,V | Original Transformer, BERT |
| **MQA (Multi-Query)** | All heads share same K,V — faster decoding, slight quality drop | PaLM, Falcon |
| **GQA (Grouped-Query)** | Heads are divided into g groups sharing K,V — middle ground | LLaMA 2/3, Mistral, Gemma |

**KV-Cache (Inference):** During autoregressive generation, previously computed K,V projections are cached, avoiding recomputation. This trades memory for speed — at O(n × d × layers) memory per sequence.

### 4. Feed-Forward Network (FFN)

Each attention output passes through a two-layer MLP with a non-linear activation:

- FFN(x) = W_2 · σ(W_1 · x + b_1) + b_2
- Inner dimension is typically 4× the model dimension (e.g., 4096 → 11008 for LLaMA 7B).

**Activation Functions:**

- **ReLU:** GPT-1/2
- **GELU:** BERT, GPT-3
- **SwiGLU:** LLaMA, Mistral, PaLM — a gated variant: SwiGLU(x) = (x · W_1) ⊙ SiLU(x · W_3) · W_2. Requires 3 weight matrices instead of 2, but empirically outperforms.

### 5. Normalization & Residual Connections

**Layer Normalization (LN):**
- Normalizes across the feature dimension: μ = mean(x), σ = std(x), y = (x − μ) / σ · γ + β
- **Pre-LN** (applied before sublayer): Used in GPT-3, LLaMA, Mistral. More stable training.
- **Post-LN** (applied after sublayer): Used in original Transformer, BERT. Less stable, requires warmup.
- **RMSNorm:** A simplified LN that omits mean subtraction. y = x / RMS(x) · γ. Used in LLaMA, Mistral. ~5% faster.

**Residual Connections:** x ← x + Sublayer(x). Enables gradients to flow directly through the network, mitigating vanishing gradients in deep (32–80+ layer) models.

### 6. Full Transformer Block

Each decoder layer follows:
\`\`\`
x → RMSNorm → Self-Attention (GQA) → Residual +
  → RMSNorm → FFN (SwiGLU) → Residual +
\`\`\`

Encoder-only models (BERT) use bidirectional attention. Decoder-only models (GPT, LLaMA) use **causal masking** — each token can only attend to itself and earlier tokens. Encoder-decoder models (T5) use a cross-attention layer between encoder and decoder.

### 7. Training Pipeline

<object data="assets/diagrams/training-pipeline.svg" type="image/svg+xml" width="900" height="800" class="w-full my-8 rounded-xl shadow-lg" aria-label="LLM Training Pipeline"></object>

1. **Pretraining:** Next-token prediction (causal LM) or masked LM on web-scale corpora (CommonCrawl, The Pile, C4, GitHub). Loss = cross-entropy over vocabulary.
2. **Instruction Tuning (SFT):** Fine-tune on (instruction, response) pairs to align with human intent. Teaches format following, helpfulness.
3. **RLHF (Reinforcement Learning from Human Feedback):** Train a reward model on human preferences, then optimize the LLM via PPO (Proximal Policy Optimization) to maximize reward. Used by GPT-4, Claude.
4. **DPO (Direct Preference Optimization):** Alternative to RLHF that directly optimizes on preference pairs without a separate reward model. Used by some open models.

### 8. Inference Optimizations

- **KV-Cache:** Store K,V from previous tokens — reduces compute from O(n²) to O(1) per new token but costs O(n × d × layers) memory.
- **Speculative Decoding:** A smaller "draft" model generates candidate tokens; the large model verifies them in parallel. 2–3× speedup.
- **Quantization:** FP16 → INT8 (weight-only or activation-aware) reduces memory 2× with minimal quality loss. GPTQ, AWQ, GGUF formats.
- **Flash Attention:** Fuses attention computation with tiling, avoiding O(n²) memory writes. 2–4× training and inference speedup on long sequences.
- **Continuous Batching:** Serves multiple requests in a single forward pass, maximizing GPU utilization. Implemented in vLLM, TGI, TensorRT-LLM.`
            },
            {
              id: 'types-of-llms',
              title: 'Types of LLMs',
              content: `LLMs can be categorized along several axes: architecture, parameter density, accessibility, and modality.

### 1. By Architecture

#### Encoder-Only (BERT-style)
- **Mechanism:** Bidirectional self-attention — each token attends to all tokens (left and right). Trained via Masked Language Model (MLM): randomly mask 15% of tokens, predict them.
- **Output:** Contextualized token embeddings (not generative).
- **Strengths:** Deep bidirectional understanding — best-in-class for classification, named entity recognition, question answering, sentence similarity.
- **Limitations:** Cannot generate text natively. Requires task-specific heads for downstream tasks.
- **Scaling:** Diminishing returns past ~1B params. Larger encoders don't show emergence like decoders.
- **Examples:** BERT, RoBERTa, ALBERT, DistilBERT, ELECTRA.

#### Decoder-Only (GPT-style)
- **Mechanism:** Causal (unidirectional) self-attention — each token attends only to itself and preceding tokens. Trained via next-token prediction.
- **Output:** Autoregressive text generation.
- **Strengths:** Generative capabilities, in-context learning, emergent reasoning at scale. Scales effectively with parameters (scaling laws hold).
- **Limitations:** No bidirectional context (though deep layers approximate it). Decoding is sequential (though KV-cache helps).
- **Examples:** GPT-4, LLaMA 3, Mistral, Claude 3, Gemini, Qwen, DeepSeek.

#### Encoder-Decoder (T5-style)
- **Mechanism:** Encoder processes input with bidirectional attention; decoder generates output with causal attention + cross-attention to encoder.
- **Training:** Span corruption — mask contiguous spans, predict them as sequences.
- **Strengths:** Best for sequence-to-sequence tasks (translation, summarization, text-to-SQL). Cross-attention provides explicit alignment between input and output.
- **Limitations:** More parameters per compute (two full stacks). Fine-tuning often required for specific tasks; less effective for pure chat.
- **Examples:** T5, PaLM (decoder-only variant but with encoder-like prefix tuning), BART, mT5, ByT5.

| Property | Encoder-Only | Decoder-Only | Encoder-Decoder |
|----------|-------------|--------------|-----------------|
| Attention | Bidirectional | Causal (unidirectional) | Both |
| Generative | No | Yes | Yes |
| Best for | Understanding | Generation + Chat | Seq2seq |
| Scaling | Diminishing | Strong emergence | Moderate |
| Inference | One forward pass | Autoregressive (n passes) | Autoregressive |

### 2. By Parameter Density

#### Dense Models
- Every parameter is active for every token.
- **Pros:** Simple architecture, full model capacity used, predictable performance.
- **Cons:** Full compute cost per token, lower parameter count for same FLOPs budget.
- **Examples:** LLaMA 3 (8B, 70B, 405B), Mistral 7B, BERT, T5.

#### Sparse Models (Mixture of Experts / MoE)
- Only a subset of parameters (experts) is activated per token. A learned router selects the top-k experts (typically top-2).
- **Effective params:** Total = sum of all expert params. Active = k × expert params per token. Typically ~15–30% of total.
- **Pros:** More total capacity for same compute budget. Higher quality per FLOP.
- **Cons:** Memory proportional to total params (all experts must be loaded). MoE-specific training challenges (load balancing, expert collapse). Routing overhead.
- **Examples:** GPT-4 (~1.7T total, ~280B active), Mixtral 8x7B (~47B total, ~12.9B active), Gemini 1.5, DeepSeek V2.

### 3. By Accessibility

#### Open-Weight
- Weights publicly released for download and self-hosting.
- **Pros:** Full control, no data sent to third parties, customizable, no API dependency.
- **Cons:** Requires infrastructure (GPUs), no API-level SLAs, community vs corporate support varies.
- **Examples:** LLaMA 3, Mistral, Gemma, Qwen, Falcon, DeepSeek.

#### Closed API
- Accessible only through paid API endpoints. Architecture, weights, and training data are proprietary.
- **Pros:** No infrastructure, enterprise SLAs, continuous updates, usually strongest performance.
- **Cons:** Cost scales with usage, data leaves your network, vendor lock-in, no fine-tuning of base model.
- **Examples:** GPT-4, Claude 3, Gemini 1.5, Grok.

### 4. By Modality

- **Text-only:** LLaMA 3, Mistral, MPT.
- **Multimodal (Text + Vision):** GPT-4V, Claude 3, Gemini 1.5, LLaVA.
- **Multimodal (Text + Vision + Audio + Video):** Gemini 1.5 Pro, GPT-4o.
- **Natively Multimodal:** Gemini was trained multimodal from scratch. Others bolt a vision encoder onto a text LLM.

### 5. By Context Window

- **Standard (4K–8K):** GPT-3.5, BERT (512 tokens).
- **Long (32K–128K):** GPT-4, LLaMA 3, Claude 2, Mistral.
- **Ultra-long (200K–2M):** Claude 3 (200K), Gemini 1.5 Pro (1M+), GPT-4-128K.

Longer context windows enable reasoning over large documents, codebases, and conversation histories, but attention cost grows quadratically with sequence length (unless optimized with Flash Attention or sparse attention patterns).`
            },
            {
              id: 'model-deep-dives',
              title: 'Examples & Architectures',
               content: `### GPT-4

| Property | Detail |
|----------|--------|
| **Family** | Decoder-only |
| **Architecture** | Mixture of Experts (MoE) — 8 experts, top-2 routing |
| **Total Params** | ~1.7 trillion (rumored) |
| **Active Params** | ~280B per token |
| **Layers** | ~120 |
| **Hidden Dim** | ~16,384 |
| **Context** | 8K (base), 32K/128K (extended variants) |
| **Vocabulary** | ~100K tokens |
| **Training** | Pretraining → SFT → RLHF + instruction tuning |
| **Modality** | Text + Vision (GPT-4V, GPT-4o) |
| **Tokenization** | BPE (tiktoken) |

**Architectural highlights:**
- MoE enables far more total capacity than a dense model at equivalent inference cost. The router learns to specialize experts to different domains (code, math, poetry, factual knowledge).
- Grouped-Query Attention for efficient inference.
- Speculative decoding for faster generation.
- Alignment via RLHF with a preference reward model.

**Use cases:** Complex reasoning, code generation, creative writing, multimodal analysis, agentic workflows.

---

### Claude 3

| Property | Detail |
|----------|--------|
| **Family** | Decoder-only (dense) |
| **Architecture** | Transformer with dense layers |
| **Sizes** | Haiku (small), Sonnet (medium), Opus (large) |
| **Context** | 200K tokens (standard) |
| **Training** | Pretraining → Constitutional AI (SFT + RLHF via AI feedback, not human) |
| **Modality** | Text + Vision (Claude 3.5 Sonnet) |

**Architectural highlights:**
- **Constitutional AI:** Model is guided by a written constitution during RLHF, reducing reliance on extensive human labeling. Principles include harmlessness, honesty, and helpfulness.
- Extended context via efficient attention mechanisms — can process large documents in a single pass.
- Emphasis on factual recall and reduced hallucination relative to GPT-4 in several benchmarks.
- Opus model demonstrates strong reasoning, comparable to GPT-4 in most evaluations.

**Use cases:** Long document analysis, safe/regulated domains, enterprise chat, summarization.

---

### Gemini 1.5 Pro

| Property | Detail |
|----------|--------|
| **Family** | Decoder-only (MoE) |
| **Architecture** | Mixture of Experts, natively multimodal |
| **Context** | 1M+ tokens (experimental 10M) |
| **Modality** | Text, Image, Audio, Video (natively trained on all) |
| **Training** | Multimodal pretraining → instruction tuning → RLHF |
| **Infrastructure** | Trained on TPU v5p pods (Google TPUs) |

**Architectural highlights:**
- **Natively multimodal:** Unlike GPT-4V (which bolts a vision encoder onto a text model), Gemini was trained from scratch on interleaved text, image, audio, and video. This enables cross-modal reasoning that separate encoders may miss.
- **Ultra-long context:** 1M+ tokens via a combination of Flash Attention, sparse attention patterns, and possibly recurrent memory mechanisms.
- **MoE architecture** similar to but distinct from GPT-4 — Google's routing and expert design is optimized for TPU execution.
- **Tool use native:** Gemini can call Google Search, execute code, and interact with APIs as part of its generation process.

**Use cases:** Video summarization, multimodal search, long-document analysis, tool-use agents.

---

### LLaMA 3

| Property | Detail |
|----------|--------|
| **Family** | Decoder-only (dense) |
| **Sizes** | 8B, 70B, 405B |
| **Architecture** | Decoder-only with GQA, RoPE, SwiGLU, RMSNorm |
| **Context** | 128K (8K in base) |
| **Vocabulary** | 128K tokens (BPE, tiktoken-based) |
| **Training Data** | ~15T tokens (quality-filtered, heavily deduplicated) |
| **License** | Open-weight (custom commercial license) |

**Architectural highlights:**
- **Grouped-Query Attention (GQA):** 8 key-value heads per 32 query heads (70B). Reduces KV-cache memory ~4× vs full MHA with minimal quality loss.
- **RoPE:** Rotary Position Embeddings enable better length generalization.
- **SwiGLU activation** in FFN — gated variant with SiLU, empirically outperforms ReLU/GELU.
- **RMSNorm** for faster normalization.
- **Scaling laws driven:** 405B model trained with careful scaling law analysis — Chinchilla-optimal for its compute budget.
- Instruction-tuned variants via SFT + DPO (not RLHF).

**Impact:** At release, LLaMA 3 70B was competitive with GPT-3.5 and Gemini Pro. 405B approaches GPT-4 quality. The open-weight release made it the foundation for countless fine-tunes (Llama-Chat, Code Llama, Med Llama, etc.).

**Use cases:** Self-hosted chat, fine-tuning for domain-specific tasks, research, cost-sensitive deployments.

---

### Mistral

| Property | Detail |
|----------|--------|
| **Family** | Decoder-only (dense + MoE variants) |
| **Models** | Mistral 7B (dense), Mixtral 8x7B (MoE), Mistral Large (API) |
| **Architecture** | GQA, sliding window attention, RoPE, SwiGLU, RMSNorm |
| **Context** | 32K (standard) |
| **License** | Apache 2.0 (Mistral 7B, Mixtral) |

**Architectural innovations:**
- **Sliding Window Attention (Mistral 7B):** Each token attends to only W surrounding tokens (W=4096) instead of the full sequence. Memory cost is O(n·W) instead of O(n²). For long sequences, this is a dramatic reduction. Information propagates across the window through layered stacking.
- **Grouped-Query Attention** with efficient KV-cache.
- **Mixtral 8x7B:** MoE variant with 8 feed-forward experts, top-2 routing. Total params = ~47B, active = ~12.9B. Outperforms LLaMA 2 70B on most benchmarks with ~6× faster inference.
- **Apache 2.0 license** made Mistral one of the most permissive open-weight options.

**Use cases:** Open-source deployments, fine-tuning, edge devices (7B), high-efficiency MoE (Mixtral), API for Mistral Large.

---

### BERT

| Property | Detail |
|----------|--------|
| **Family** | Encoder-only |
| **Sizes** | BERT-base (110M), BERT-large (340M) |
| **Architecture** | Bidirectional Transformer encoder, Post-LN, GELU |
| **Context** | 512 tokens |
| **Training** | Masked LM (15% mask) + Next Sentence Prediction |
| **Vocabulary** | 30K (WordPiece) |

**Architectural highlights:**
- **Bidirectional attention:** Unlike decoder models, BERT attends to both left and right context. This gives richer representations per token but makes it non-generative.
- **Masked Language Model:** Randomly mask 15% of tokens — predict from context. Forces bidirectional understanding.
- **Next Sentence Prediction:** Binary classification — does sentence B follow sentence A? Teaches sentence-level relationships (though later work questioned its value).
- **Fine-tuning paradigm:** Pre-train on large corpus → fine-tune with task-specific heads on small labeled datasets. This was revolutionary at the time — GLUE, SQuAD, and other benchmarks saw massive improvements.

**Limitations:**
- Cannot generate text (no autoregressive capability).
- Fixed 512-token context limit.
- Larger encoder variants show diminishing returns — BERT-large was near the plateau.

**Legacy & Current Use:** BERT is still widely used for embeddings (sentence-transformers), search (Google Search uses BERT for query understanding), classification, NER, and as the encoder in retrieval-augmented generation pipelines. The architecture has been largely superseded by decoder-only models for generative tasks, but remains optimal for pure understanding tasks.

---

### T5 (Text-to-Text Transfer Transformer)

| Property | Detail |
|----------|--------|
| **Family** | Encoder-Decoder |
| **Sizes** | T5-small (60M) to T5-11B (11B) |
| **Architecture** | Full encoder-decoder transformer |
| **Context** | 512 (encoder) + arbitrary (decoder) |
| **Training** | Span corruption (mask contiguous spans, predict sequence) |
| **Vocabulary** | 32K (SentencePiece) |

**Architectural highlights:**
- **Text-to-Text Framework:** Every NLP task is cast as text-to-text — input text, output text. Translation: "translate English to German: Hello" → "Hallo". Classification: "sentiment: This movie is great" → "positive". This unified formulation simplified transfer learning.
- **Relative Position Bias:** Instead of absolute or rotary positions, T5 adds a learned bias based on distance between tokens in attention computation. Enables better generalization to unseen sequence lengths.
- **Span Corruption:** Replace masked spans with sentinel tokens, predict the sequence of masked spans. More challenging than individual token masking — forces understanding of span-level semantics.
- **Encoder-Decoder:** Encoder processes input bidirectionally, decoder generates output autoregressively with cross-attention to encoder representations.

**Use cases:** Translation, summarization, text-to-SQL, question answering, structured prediction. Flan-T5 (instruction-tuned version) remains competitive for NLP tasks.
`
            },
            {
              id: 'detailed-comparison',
              title: 'Detailed Comparison',
               content: `### Multi-Dimensional Model Comparison

#### Architecture & Scale

| Model | Architecture | Total Params | Active Params | Context | Vocab | Layers |
|-------|-------------|-------------|--------------|---------|-------|--------|
| **GPT-4** | Decoder-only MoE | ~1.7T | ~280B | 8K–128K | ~100K | ~120 |
| **Claude 3 Opus** | Decoder-only dense | Unknown | Unknown | 200K | Unknown | Unknown |
| **Gemini 1.5 Pro** | Decoder-only MoE | Unknown | Unknown | 1M+ | Unknown | Unknown |
| **LLaMA 3 405B** | Decoder-only dense | 405B | 405B | 128K | 128K | ~126 |
| **LLaMA 3 70B** | Decoder-only dense | 70B | 70B | 128K | 128K | ~80 |
| **LLaMA 3 8B** | Decoder-only dense | 8B | 8B | 128K | 128K | ~32 |
| **Mixtral 8x7B** | Decoder-only MoE | ~47B | ~12.9B | 32K | 32K | 32 |
| **Mistral 7B** | Decoder-only dense | 7B | 7B | 32K | 32K | 32 |
| **BERT-large** | Encoder-only dense | 340M | 340M | 512 | 30K | 24 |
| **T5-11B** | Encoder-Decoder dense | 11B | 11B | 512 | 32K | 24+24 |

#### Attention Mechanisms

| Model | Attention Type | Position Encoding | Normalization |
|-------|---------------|-------------------|---------------|
| GPT-4 | GQA (likely) | RoPE | Pre-RMSNorm |
| Claude 3 | MHA | Unknown | Pre-LN |
| Gemini 1.5 | Unknown (sparse patterns) | RoPE | Pre-RMSNorm |
| LLaMA 3 | GQA | RoPE | Pre-RMSNorm |
| Mistral 7B | GQA + Sliding Window | RoPE | Pre-RMSNorm |
| Mixtral | GQA + Sliding Window | RoPE | Pre-RMSNorm |
| BERT | MHA | Sinusoidal | Post-LN |
| T5 | MHA | Relative Bias | Pre-LN |

#### Training & Alignment

| Model | Training Data | Pretraining Objective | Alignment Method | Open Weight |
|-------|-------------|---------------------|-----------------|-------------|
| GPT-4 | Unknown (estimated 10T+ tokens) | Next-token prediction | RLHF (PPO) | No |
| Claude 3 | Unknown | Next-token prediction | Constitutional AI (RLHF via AI feedback) | No |
| Gemini 1.5 | Multimodal (text, image, audio, video) | Multimodal next-token | RLHF | No |
| LLaMA 3 405B | ~15T tokens | Next-token prediction | SFT + DPO | Yes |
| LLaMA 3 70B | ~15T tokens | Next-token prediction | SFT + DPO | Yes |
| LLaMA 3 8B | ~15T tokens | Next-token prediction | SFT + DPO | Yes |
| Mixtral 8x7B | Unknown | Next-token prediction | SFT + DPO (Mistral Medium) | Yes |
| Mistral 7B | Unknown | Next-token prediction | SFT + DPO (Mistral 7B Instruct) | Yes |
| BERT | BookCorpus + Wikipedia (3.3B tokens) | Masked LM + NSP | None (fine-tuning only) | Yes |
| T5 | C4 (750B tokens) | Span corruption | None (fine-tuning only) | Yes |

#### Capabilities

| Capability | GPT-4 | Claude 3 | Gemini 1.5 | LLaMA 3 70B | Mixtral | BERT | T5 |
|-----------|-------|----------|------------|-------------|---------|------|----|
| **Text Generation** | ★★★★★ | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★☆ | ✗ | ★★★☆☆ |
| **Code Generation** | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★★☆☆ | ✗ | ★★☆☆☆ |
| **Reasoning** | ★★★★★ | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★☆☆☆ | ★★★☆☆ |
| **Factual Accuracy** | ★★★★☆ | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ★★★☆☆ |
| **Classification** | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★★★★ | ★★★★☆ |
| **Embeddings** | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★★★☆ | ★★★☆☆ | ★★★★★ | ★★★★☆ |
| **Long Context** | 128K | 200K | 1M+ | 128K | 32K | 512 | 512 |
| **Multimodal** | Vision | Vision | Vision+Audio+Video | ✗ | ✗ | ✗ | ✗ |
| **Open Weight** | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ |
| **Self-Hostable** | ✗ | ✗ | ✗ | ✓ | ✓ | ✓ | ✓ |

#### Performance Trade-offs (Production Perspective)

| Aspect | Dense (LLaMA 3, fully loaded) | MoE (Mixtral, GPT-4) |
|-------|------------------------------|----------------------|
| **Inference Latency** | Predictable, linear with params | Routing adds small overhead, but fewer active params | |
| **Memory (load)** | All params → ~2× params in GB (FP16) | All params → all experts must be in memory | |
| **Memory (per token)** | KV-cache proportional to layers × dim | Same KV-cache for active params (~2× vs dense of same active size) | |
| **Throughput** | Constrained by total param FLOPS | Higher — fewer active params per token | |
| **Fine-tuning** | Standard LoRA/QLoRA works | Need to balance expert load; MoE-specific tuning complexity | |
| **Qualities** | Simpler training, no load-balancing | Better quality per FLOP, routing collapse risk | |

#### Cost & Deployment Considerations

| Criteria | Recommendation |
|----------|---------------|
| **Lowest cost / highest throughput** | Mistral 7B / LLaMA 3 8B (self-hosted) or API: Claude Haiku / GPT-4o-mini |
| **Best quality, budget unlimited** | GPT-4, Claude 3 Opus, Gemini 1.5 Pro |
| **Best open-weight** | LLaMA 3 405B or 70B |
| **Best for embeddings / search** | BERT (via sentence-transformers) — still SOTA for many retrieval tasks |
| **Best for long documents** | Gemini 1.5 Pro (1M+ context) or Claude 3 (200K) |
| **Best for code** | GPT-4, Claude 3.5 Sonnet, Code Llama |
| **Best for multimodal** | GPT-4o, Gemini 1.5 Pro |
| **Best for regulated / data-sensitive** | LLaMA 3 or Mistral (self-hosted, no data leaves your VPC) |
| **Best for fine-tuning on small domain data** | LLaMA 3 8B/70B (LoRA/QLoRA runs on single GPU) |
| **Best for on-device / edge** | Mistral 7B quantized (4-bit ~4GB), Gemma 2B, Phi-3 |

#### When to Use Which Model (Decision Framework)

\`\`\`
Need text generation?
├─ Need self-hosting / data privacy?
│  ├─ Budget for 4× A100 80GB? → LLaMA 3 70B or Mixtral 8x7B
│  └─ Single GPU? → LLaMA 3 8B or Mistral 7B (quantized)
├─ Need multimodal (vision)?
│  ├─ Best quality → GPT-4o or Claude 3.5 Sonnet
│  └─ Long video → Gemini 1.5 Pro
├─ Need ultra-long context?
│  └─ Gemini 1.5 Pro (1M+) or Claude 3 (200K)
└─ Best general purpose?
   └─ GPT-4 (strongest overall) or Claude 3 Opus (safest)

Need embeddings / understanding only?
├─ Sentence similarity / RAG retrieval → BERT (all-MiniLM-L6-v2)
├─ Classification / NER → BERT / RoBERTa (fine-tuned)
└─ Need both generation + understanding → Decoder-only (use hidden states for embeddings)

Need seq2seq (translation, summarization)?
└─ T5 or Flan-T5 (still competitive, efficient for dedicated tasks)
\`\`\`

### Key Takeaways

1. **For most applications, decoder-only models are the default** — they generate, embed, classify, and reason. Encoder-only (BERT) still wins for pure understanding where cost matters. Encoder-decoder (T5) excels at structured seq2seq.

2. **MoE is the scaling path forward** — GPT-4 and Mixtral show you get more quality per FLOP. Dense models remain simpler to train and deploy.

3. **Open-weight models have nearly closed the gap** — LLaMA 3 405B approaches GPT-4 quality for many tasks, at a fraction of the per-token cost if you have the hardware.

4. **Context window is becoming a commodity** — 128K–200K is standard; Gemini's 1M+ is transformative for certain use cases (codebase analysis, long video, large document sets).

5. **Alignment method matters more than architecture** — RLHF vs Constitutional AI vs DPO shapes model behavior (safety, verbosity, refusal patterns) as much as the underlying architecture.

6. **Production engineering trumps model choice** — Prompt engineering, RAG, caching, batching, and evaluation framework often have more impact than picking between GPT-4 and Claude-3 for a given task.`
            }
          ]
        }],
    },
  ],
};
