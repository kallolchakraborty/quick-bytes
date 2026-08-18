const QUICK_BYTES = {
  site: {
    name: 'Quick Bytes',
    tagline: 'LLM interview prep.',
    description: 'What is an AI model, types of AI models, what is an LLM, types of LLMs, KV cache, inference, and popular examples — with interactive diagrams.',
    url: 'https://kallolchakraborty.github.io/quick-bytes/',
    author: 'Kallol Chakraborty',
    authorUrl: 'https://www.linkedin.com/in/kallol-chakraborty-9728a699/',
  },
  stats: {
    guides: 8,
    phases: 1,
    platform: 'Engineering',
  },
  phases: [
    {
      id: 'llms',
      title: 'AI & LLMs',
      level: 'Interview',
      description: 'What an AI model is, the types of AI models, what an LLM is, the types of LLMs, the KV cache, and inference.',
      guides: [
        {
          id: 'what-are-llms',
          title: 'What is LLMs, Types & Examples',
          icon: 'auto_awesome',
          description: 'A concise guide to understanding AI models and LLMs — their types, a tree view of the landscape, and real-world implementations.',
          sections: [
            {
              id: 'what-is-ai-model',
              title: 'What is an AI Model?',
              icon: 'psychology',
              content: `An **AI model** is a mathematical system trained on data to perform a task that normally requires human intelligence — recognizing patterns, making predictions, or generating content. It learns a *function* that maps inputs to outputs, parameterized by weights learned during training.

**Core idea:** you give the model examples (data), it learns the underlying pattern, and then generalizes to new, unseen inputs.

**Key building blocks:**
- **Data** — the examples the model learns from.
- **Architecture** — the structure (e.g., neural network, decision tree) that defines how inputs become outputs.
- **Parameters / weights** — the learned numbers that encode the pattern.
- **Loss function** — measures how wrong the model is, driving learning.
- **Training** — the process of adjusting weights to minimize loss.

**Golden rule:** an AI model is not "thinking" — it's a statistical function fit to data. Its intelligence is an emergent property of scale, architecture, and training data, not a separate reasoning engine.`
            },
            {
              id: 'types-of-ai-models',
              title: 'Types of AI Models',
              icon: 'category',
              content: `AI models are grouped by *how they learn* and *what they produce*. The interactive tree view below shows the landscape at a glance.

| Type | Core idea | Learns from | Strengths | Weaknesses |
|---|---|---|---|---|
| **Symbolic / Rule-based** | Human-written rules and logic | Expert knowledge | Explainable, deterministic, safe | Brittle, doesn't scale, no learning |
| **Statistical / Discriminative** | Learns decision boundaries | Labeled data (probability) | Accurate, efficient, interpretable | Needs labels, poor at open-ended tasks |
| **Generative** | Learns the data distribution, samples new data | Next-token / pixel / latent prediction | Creates text, images, code, audio | Can hallucinate, expensive to train |
| **Predictive / Time-series** | Learns trends and sequences | Temporal / regression data | Forecasting, anomaly detection | Sensitive to noise, limited to tabular/time |
| **Reinforcement Learning** | Learns actions via reward signals | Trial-and-error + feedback | Optimal policies, game play | Sample-inefficient, reward design hard |
| **Neuro-symbolic / Hybrid** | Neural nets + symbolic reasoning | End-to-end + explicit logic | Best of both, explainable | Complex, research-heavy, immature |

**Golden rule:** no model is universally best. Use symbolic for safety-critical logic, discriminative for fast classification, generative for open-ended creation, and LLMs when you need language understanding *and* generation in one system.`
            },
            {
              id: 'ai-landscape-tree',
              title: 'AI Model Landscape (Tree View)',
              icon: 'account_tree',
              tree: {
                label: 'AI Model',
                note: 'A system that learns patterns from data to perform intelligent tasks.',
                children: [
                  { label: 'Symbolic / Rule-based', note: 'Expert systems, deterministic', icon: 'rule' },
                  { label: 'Statistical / Discriminative', note: 'Classifiers, SVM, BERT', icon: 'category' },
                  { label: 'Generative', note: 'Creates new data', icon: 'auto_awesome', children: [
                    { label: 'LLM (Language)', note: 'GPT, Llama, Claude', icon: 'chat_bubble' },
                    { label: 'Diffusion', note: 'Images, audio', icon: 'image' },
                    { label: 'GAN', note: 'Synthetic media', icon: 'movie' }
                  ]},
                  { label: 'Predictive', note: 'Forecasting, time-series', icon: 'trending_up' },
                  { label: 'Reinforcement Learning', note: 'Reward-driven, RLHF', icon: 'casino' },
                  { label: 'Neuro-symbolic', note: 'Hybrid reasoning', icon: 'hub' }
                ]
              }
            },
            {
              id: 'what-is-llm',
              title: 'What is an LLM?',
              icon: 'chat',
              content: `A **Large Language Model (LLM)** is a deep learning model — a *type of generative AI model* — trained on massive amounts of text to understand and generate human-like language. Built on the **Transformer architecture**, it learns patterns, grammar, facts, and reasoning by predicting the next token in a sequence.

**Where it sits:** LLMs are the *language* branch of the **Generative** family of AI models.

**Key characteristics:**
- **Large scale:** trained on trillions of tokens (web pages, books, code).
- **Generative:** produces new text rather than just classifying it.
- **Context-aware:** attention mechanisms understand relationships across long passages.
- **Task-agnostic:** can translate, code, summarize, and reason without task-specific redesign.

**Golden rule:** an LLM is a *next-token predictor*. It doesn't "know" facts — it predicts the statistically most likely continuation of the input it receives.`
            },
            {
              id: 'types-of-llms',
              title: 'Types of LLMs',
              icon: 'schema',
              content: `Within generative AI, LLMs are categorized by their **transformer architecture** and training objective.

| Type | Architecture | Strengths | Weaknesses | Examples |
|---|---|---|---|---|
| **Decoder-only (Autoregressive)** | GPT-style, causal attention | Text generation, dialogue, code, reasoning | No explicit encoding step | GPT-4, Llama 3, Claude |
| **Encoder-only (Autoencoding)** | BERT-style, bidirectional attention | Understanding, classification, NER | Poor at generation | BERT, RoBERTa, DistilBERT |
| **Encoder-Decoder (Seq2Seq)** | Full encoder + decoder | Translation, summarization, structured I/O | Larger, slower than decoder-only | T5, BART, FLAN-T5 |

**Decoder-only** — the standard for generative AI. Process text left-to-right, excel at open-ended generation.

**Encoder-only** — read input bidirectionally; ideal for deep *understanding* of fixed input (sentiment, search ranking).

**Encoder-Decoder** — encoder captures context, decoder generates; best for input→output mapping (translation, summarization).

**Golden rule:** decoder-only for generation, encoder-only for understanding, encoder-decoder when you need both.`
            },
            {
              id: 'examples-of-llms',
              title: 'Examples of LLMs',
              icon: 'apps',
              content: `**Popular Large Language Models** (the language branch of generative AI):

| Model | Developer | Type | Parameters | Notable use |
|---|---|---|---|---|
| **GPT-4 / GPT-4o** | OpenAI | Decoder-only | ~1.7T (MoE) | Chat, reasoning, vision |
| **Claude 3.5 Sonnet** | Anthropic | Decoder-only | Undisclosed | Long context, safety |
| **Llama 3.1** | Meta | Decoder-only | 8B – 405B | Open-weight, local |
| **Gemini 1.5 Pro** | Google | Decoder-only | Undisclosed | Multimodal, long context |
| **BERT** | Google | Encoder-only | 110M – 340M | Search, classification |
| **T5** | Google | Encoder-Decoder | 770M – 11B | Text-to-text, translation |
| **Mistral** | Mistral AI | Decoder-only | 7B | Efficient open-weight |
| **Command R+** | Cohere | Decoder-only | 104B | RAG, enterprise |

**Key takeaways:**
- **GPT-4** and **Claude** lead in general-purpose chat and reasoning.
- **Llama** and **Mistral** dominate open-source — fine-tune or run locally.
- **BERT** is the workhorse for production NLP understanding.
- **T5** frames every NLP task as "text-to-text."

**Golden rule:** model choice = capability × cost × privacy. GPT-4 for hardest tasks; Llama/Mistral for control and cost; BERT for fast, lightweight understanding.`
            },
          ],
        },
        {
          id: 'kv-cache',
          title: 'KV Cache',
          icon: 'memory',
          description: 'What the KV cache is, why transformers use it, and an interactive architecture diagram of how keys/values are cached across decoding steps.',
          sections: [
            {
              id: 'what-is-kv-cache',
              title: 'What is KV Cache?',
              icon: 'memory',
              content: `A **KV cache** (Key–Value cache) is the memory mechanism that makes transformer *decoding* fast. During autoregressive generation, each token's attention layer computes a **Key** vector and a **Value** vector from that token's representation. The KV cache stores these K and V tensors for every token the model has already processed, so they are **never recomputed** when the next token is generated.

**The problem it solves:** without caching, generating token *t* would require recomputing attention over all *t* prior tokens from scratch. That is O(n²) work per token and O(n³) across the whole sequence. With the cache, each new token only computes its *own* K/V and attends over the cached ones — O(n) per step, O(n²) total.

**Where it lives:** the cache is kept **per layer** and **per attention head**. Its size is:

> 2 (K + V) × sequence_length × num_layers × num_heads × head_dim × bytes_per_element

**The trade-off:** memory for compute. The cache grows linearly with sequence length and model size — it is the dominant memory cost of long-context LLMs, which is why techniques like **Grouped-Query Attention (GQA)**, **Multi-head Latent Attention (MLA)**, and **sliding-window / eviction** policies exist.

**Golden rule:** the KV cache trades *memory* for *compute*. It is why long conversations get expensive and why context length is ultimately a memory budget, not just a number.`
            },
            {
              id: 'kv-cache-architecture',
              title: 'KV Cache Architecture (Interactive)',
              icon: 'account_tree',
              kv: {
                prompt: ['The', 'cat', 'sat'],
                frames: [
                  { gen: [], note: 'Prompt [The, cat, sat] is processed in parallel. The model computes the Key (K) and Value (V) vectors for all 3 prompt tokens and stores them in the KV cache — 3 slots filled. It is now ready to predict the first new token.' },
                  { gen: ['on'], note: 'The model predicts "on" (next token). It computes K/V for "on" ONCE and appends them to the cache (now 4 slots). The following attention step reads all 4 cached K/V pairs — none of the prompt is recomputed.' },
                  { gen: ['on', 'the'], note: 'Predicted "the". Only the newest token needed fresh K/V computation this step; it joins the cache (now 5 slots). Each decoding step adds exactly one K/V pair.' },
                  { gen: ['on', 'the', 'mat'], note: 'Predicted "mat". The cache holds 6 slots. Compute per step stays O(1) in sequence length — this is why decoding is fast, paid for with ever-growing memory (the KV cache).' }
                ]
              }
            },
          ],
        },
        {
          id: 'inference',
          title: 'Inference',
          icon: 'bolt',
          description: 'What inference is, how LLM inference works (prefill vs decode), and an interactive architecture pipeline diagram.',
          sections: [
            {
              id: 'what-is-inference',
              title: 'What is an Inference?',
              icon: 'bolt',
              content: `**Inference** is the phase where a trained model actually *produces output* from new input — as opposed to **training**, where the model *learns* weights. For an LLM, inference means: take a prompt, run it through the Transformer, and generate tokens.

**Training vs inference:**

| | Training | Inference |
|---|---|---|
| Goal | Learn weights from data | Produce output from input |
| Runs | Once, offline, expensive | Repeatedly, per request |
| Needs | Labels, gradients, backward pass | Only forward pass |
| Memory | Gradients + optimizer state | Activations + KV cache |
| Output | Updated model | Generated tokens |

**Why it matters:** inference is where the model meets users. Its cost, latency, and throughput — not training — determine the real-world bill and experience. Everything from batching to quantization exists to make inference cheaper and faster.

**Golden rule:** training builds the model; inference *runs* it. Optimizing inference (not training) is what makes an LLM usable in production.`
            },
            {
              id: 'how-it-works',
              title: 'How it works?',
              icon: 'sync',
              content: `LLM inference is a two-phase loop driven by the **Transformer forward pass**:

**1. Prefill (prompt processing):** the whole input prompt is fed through the model in parallel (one batched forward pass). The model computes the Key/Value vectors for every prompt token and stores them in the **KV cache**. Output: the logits for the first generated token.

**2. Decode (token generation):** the model generates **one token at a time**. Each step:
- reads the *last* token + the cached K/V of all previous tokens,
- computes new K/V (cached),
- produces logits → samples the next token,
- appends it and repeats until an end-of-sequence token or max length.

**Prefill vs decode at a glance:**

| | Prefill | Decode |
|---|---|---|
| Compute | Parallel over all prompt tokens | Sequential, one token per step |
| KV cache | Filled here | Read + extended here |
| Bottleneck | Compute-bound (big matmuls) | Memory-bandwidth-bound (reads weights + cache) |

**Batching:** in production, many requests are batched together (continuous / batch scheduling) so the GPU stays busy during both phases. This is the single biggest throughput lever.

**Golden rule:** prefill is compute-bound, decode is memory-bound. Good serving stacks optimize each phase separately and batch across requests.`
            },
            {
              id: 'inference-architecture',
              title: 'Architecture (Interactive Pipeline)',
              icon: 'account_tree',
              pipeline: {
                stages: [
                  { icon: 'text_fields', label: 'Input Prompt', note: 'Raw, untokenized user text enters the system. For example, a prompt like Translate to French: Hello is still just a string of characters here, with no tokenization yet.' },
                  { icon: 'token', label: 'Tokenizer', note: 'Splits text into subword tokens (e.g. BPE). Each token maps to an integer ID. Roughly 1 token ≈ 4 characters of English.' },
                  { icon: 'grid_on', label: 'Embedding', note: 'Token IDs are mapped to dense vectors that capture meaning. Positional encodings are added so token order is preserved.' },
                  { icon: 'account_tree', label: 'Transformer (Prefill + Decode)', note: 'Prefill: process the whole prompt in parallel and fill the KV cache. Decode: generate one token at a time, reusing the cache (see the KV Cache guide).' },
                  { icon: 'functions', label: 'LM Head / Logits', note: 'The final layer outputs a logit vector over the vocabulary — a raw score for every possible next token.' },
                  { icon: 'tune', label: 'Sampling', note: 'Logits become probabilities via softmax, then a token is chosen: greedy (argmax), or temperature / top-p / top-k for controlled diversity.' },
                  { icon: 'output', label: 'Output Token → Loop', note: 'The chosen token is emitted, appended to the sequence, and fed back in for the next decode step until an end token or max length.' }
                ]
              }
            },
          ],
        },
        {
          id: 'prompt',
          title: 'Prompt',
          icon: 'edit_note',
          description: 'What a prompt is, the main types of prompts, the architecture of a well-structured prompt, and concrete examples.',
          sections: [
            {
              id: 'what-is-prompt',
              title: 'What is a Prompt?',
              icon: 'chat',
              content: `A **prompt** is the input you give an LLM to elicit a desired response — natural-language (and sometimes structured) instructions, context, and examples. Prompting is how you *steer* a model without retraining: the model's behavior is largely determined by what you put in the prompt.

**Why prompting matters:** an LLM is a frozen, next-token predictor. The prompt is the only live lever you have at inference time to control task, format, tone, and correctness. Small prompt changes can mean the difference between a useless answer and a great one.

**Key concepts:**
- **Prompt ≠ fine-tuning:** prompting changes input, not weights.
- **Context window:** everything you put in consumes tokens (and memory via the KV cache).
- **Determinism vs sampling:** same prompt + low temperature → stable output; high temperature → varied.

**Golden rule:** a prompt is a contract with the model. Be explicit about role, task, format, and constraints, and the model will meet you halfway.`
            },
            {
              id: 'types-of-prompts',
              title: 'Types of Prompts',
              icon: 'category',
              content: `Prompts come in families. Know the main ones:

| Type | What it is | When to use |
|---|---|---|
| **Zero-shot** | Ask directly, no examples | Simple, well-defined tasks |
| **Few-shot** | Give 1+ input→output examples | When format/style must be demonstrated |
| **System / Role** | Set persona + rules up front | Define behavior across a session |
| **Instruction** | Step-by-step commands | Multi-step or precise tasks |
| **Chain-of-Thought** | "Think step by step" | Reasoning, math, logic |
| **Contextual / RAG** | Inject retrieved docs | Grounding on private/live data |
| **Negative** | State what NOT to do | Avoid known failure modes |

**Zero-shot vs few-shot:** zero-shot relies on the model's priors; few-shot *shows* the pattern, which dramatically improves consistency on structured or unusual tasks.

**Golden rule:** start zero-shot, add few-shot examples when the format is fragile, and use Chain-of-Thought only when reasoning is the bottleneck.`
            },
            {
              id: 'system-vs-user-prompt',
              title: 'System vs User Prompt',
              icon: 'swap_horiz',
              content: `In chat-style LLM APIs, a prompt is usually split into **message roles**. The two you interact with most are the **system prompt** and the **user prompt** (alongside the assistant's own replies).

| | System prompt | User prompt |
|---|---|---|
| Set by | The developer / app | The end user |
| When | Once, at the start of a session | Every turn |
| Purpose | Persona, rules, global behavior | The actual question or task |
| Persistence | Stays for the whole conversation | Varies per message |
| Example | "You are a concise SQL expert." | "List the top 5 customers by revenue." |

**System prompt:** developer-supplied instructions that shape *how* the model behaves for the entire session — tone, persona, guardrails, output format. It is typically not shown to the end user.

**User prompt:** the input the person types each turn — the question, command, or data the model should act on.

**Why the split matters:** keeping behavior (system) separate from content (user) makes the same assistant reusable across users and tasks, and lets you update guardrails without rewriting every request.

**Golden rule:** put stable behavior and constraints in the system prompt; put the task and data in the user prompt.`
            },
            {
              id: 'prompt-architecture',
              title: 'Prompt Architecture (Interactive)',
              icon: 'account_tree',
              pipeline: {
                stages: [
                  { icon: 'shield_person', label: 'System Message', note: 'Sets the model role/persona and global rules (tone, safety, constraints). Persists across the conversation.' },
                  { icon: 'history', label: 'Context', note: 'Retrieved documents or prior conversation turns (RAG). Grounds the answer in real, current data.' },
                  { icon: 'list_alt', label: 'Instruction', note: 'The actual task: what to do, step by step. The clearest instruction wins even on a weak model.' },
                  { icon: 'format_quote', label: 'Few-shot Examples', note: 'Demonstration input→output pairs that show the desired pattern and format. Powerful for structured tasks.' },
                  { icon: 'chat', label: 'User Input', note: 'The live query. Combined with everything above, this is what the model actually responds to.' },
                  { icon: 'code', label: 'Output Format', note: 'Constraints on the response: JSON schema, length, style, or citation rules. Forces machine-readable, parseable output.' }
                ]
              }
            },
            {
              id: 'examples-of-prompts',
              title: 'Examples of Prompts',
              icon: 'apps',
              content: `**1. Zero-shot classification**
> Classify the sentiment of this review as Positive, Negative, or Neutral: "The battery died after two weeks." → Answer:

**2. Few-shot extraction (JSON)**
> Extract entities as JSON.
> Example: "Apple bought a startup in Seattle." → {"org":"Apple","city":"Seattle"}
> Text: "OpenAI hired a researcher from London." →

**3. Chain-of-Thought math**
> A train travels 60 km in 45 minutes. What is its speed in km/h? Think step by step.

**4. RAG grounded answer**
> Using the provided policy document, answer: what is the refund window? Only use the document.

**5. System + negative constraint**
> You are a senior Rust reviewer. Explain the bug. Do NOT rewrite the whole file; only show the minimal fix.

**Golden rule:** show, don't just tell — few-shot examples and explicit output formats beat long paragraphs of instructions.`
            },
            {
              id: 'prompt-compression-optimization',
              title: 'Compression & Optimization',
              icon: 'compress',
              content: `As prompts grow, they cost tokens, latency, and context-window space — and the KV cache (see the KV Cache guide) grows with every token. **Compression** shrinks the prompt; **optimization** makes it cheaper and more reliable.

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

**Golden rule:** shrink what is stable (and cache it), retrieve only what is needed (do not dump everything), and measure — most "better prompting" is really better compression and better evaluation.`
            },
          ],
        },
        {
          id: 'forward-propagation',
          title: 'Forward Propagation',
          icon: 'forward',
          description: 'What forward propagation is, how it works in neural networks and transformers, an interactive architecture diagram, and the difference from backward propagation.',
          sections: [
            {
              id: 'what-is-forward-propagation',
              title: 'What is Forward Propagation?',
              icon: 'forward',
              content: `A **forward pass** (or forward propagation) is the computation of output data through a neural network when given an input. It proceeds layer by layer — from input to output — applying each layer's weights and activation functions, but **never updating any parameter**: it only computes predictions.

**Why it matters:**
- **Inference is 100% forward.** Every time you query an LLM, it runs a forward pass over the prompt (plus cached KV states for prior tokens).
- **Training needs two phases:** first forward (to get the loss) then backward (to compute gradients). Forward alone does nothing to learn.

> In a transformer:  
> Input → Embedding → Attention → FFN → LayerNorm → Output

**Golden rule:** forward propagation is a *deterministic pipeline*. Same input + same weights = same output. No learning happens during the forward pass itself.
`
            },
            {
              id: 'how-forward-works',
              title: 'How Forward Propagation Works',
              icon: 'sync',
              content: `A single layer transforms its input as:

> z = W × x + b      (linear: weight matrix × input + bias)  
> a = activation(z)  (non-linear: ReLU, GELU, softmax)

After the first layer's activation becomes the input to the second layer, and so on until the final output.

**In a Transformer block** (the architecture used by every modern LLM), one forward step does:

1. **Multi-Head Attention:** compute queries (Q), keys (K), values (V) for all tokens, apply scaled dot-product attention, then concatenate heads. Output = attention weights × V.
2. **Add & Norm:** add the residual (original input) to the attention output, then apply layer normalization.
3. **Feed-Forward Network (FFN):** apply a small MLP — up-project (W₁), non-linearity (GELU), down-project (W₂). Position-wise: each token transformed independently.
4. **Add & Norm:** another residual connection + normalization.

**Stacking layers:** N identical blocks are stacked. The output of block L feeds block L+1. This depth is what gives transformers their representational power.

**Cost:** each layer performs O(seq_len² × d) for attention (with seq_len = token count, d = hidden size) and O(seq_len × d × 4) for the feed-forward. Why compute-bound prefill vs memory-bound decode.`
            },
            {
              id: 'forward-architecture-diagram',
              title: 'Forward Architecture (Interactive)',
              icon: 'account_tree',
              pipeline: {
                stages: [
                  { icon: 'text_fields', label: 'Input Tokens', note: 'Token IDs and positions enter. For inference: prompt tokens plus any cached KV history.' },
                  { icon: 'grid_on', label: 'Embedding + Position', note: 'Token IDs become dense vectors. Positional encodings inject order so the model knows sequence.' },
                  { icon: 'mode_comment', label: 'Attention Layer', note: 'Q, K, V projections → scaled dot-product → weighted values. Output combines information from other tokens.' },
                  { icon: 'add', label: 'Add & Norm', note: 'Residual connection adds input back (gradient flow). LayerNorm stabilizes deep stacking.' },
                  { icon: 'layers', label: 'Feed-Forward (FFN)', note: 'Up-project (d → 4d), GELU non-linearity, down-project (4d → d). Position-wise MLP per token.' },
                  { icon: 'add', label: 'Add & Norm', note: 'Second residual + norm after FFN. Completes one Transformer block. Repeat N times.' },
                  { icon: 'functions', label: 'Output Logits', note: 'Final linear projection to vocabulary-sized logits — the raw scores for the next token.' }
                ]
              }
            },
            {
              id: 'forward-vs-backpropagation',
              title: 'Forward vs Backprop',
              icon: 'swap_vert',
              content: `A simple comparison of the two core phases in training:

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
`
            },
          ],
        },
        {
          id: 'backward-propagation',
          title: 'Backward Propagation',
          icon: 'arrow_back',
          description: 'What backward propagation is, how it works through the chain rule, and its role in training neural networks.',
          sections: [
            {
              id: 'what-is-backward-propagation',
              title: 'What is Backward Propagation?',
              icon: 'arrow_back',
              content: `Backward propagation (backprop) is the algorithm that computes gradients of the loss function with respect to every weight in the neural network. It runs *after* the forward pass and enables the model to learn by updating its weights via gradient descent.

**Why it exists:** an LLM (or any neural net) has billions of parameters. To make those parameters useful, they must be updated based on how wrong the forward pass was. Backprop tells us precisely how much to change each weight.

**Key facts:**
- **Efficient via dynamic programming:** chains gradients backward through the computational graph, reusing intermediate results (no recomputation).
- **Chain rule everywhere:** the gradient of a composite function is the product of gradients at each step. This is why we store activations during the forward pass.
- **Works for any differentiable function:** ReLU, GELU, softmax, attention — all have known gradients.

**Golden rule:** you can only backpropagate through operations whose gradients are defined (no non-differentiable jumps like if-statements on values).

**Why the term "backprop":** gradients flow backward through the network (from loss to input layer), but the weight updates improve the forward pass for future data.`
            },
            {
              id: 'how-backward-works',
              title: 'How Backward Propagation Works',
              icon: 'sync',
              content: `Given a loss L (e.g., cross-entropy), backprop computes ∂L/∂θ for every weight θ in the network.

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
- The backward pass is why Transformers are memory-heavy: we need to store all activations for the gradient computation.`
            },
            {
              id: 'backward-architecture-diagram',
              title: 'Backward Architecture (Interactive)',
              icon: 'account_tree',
              pipeline: {
                stages: [
                  { icon: 'functions', label: 'Loss L', note: 'The objective function (e.g., cross-entropy). Higher loss = more wrong predictions.' },
                  { icon: 'sync', label: 'Upstream Gradient', note: '∂L/∂logits flows backward from the loss into the network.' },
                  { icon: 'layers', label: 'Layer N (FFN)', note: 'Apply chain rule: d = d_past * W^T * ReLU(z). Compute gradients for weights and bias.' },
                  { icon: 'add', label: 'Add & Norm', note: 'Gradients split: one for residual path, one for LayerNorm. Sum and normalize.' },
                  { icon: 'mode_comment', label: 'Attention Block', note: 'Backprop through softmax (softmax × (input - sumsoftmax)). Compute QK/V gradients.' },
                  { icon: 'grid_on', label: 'Embedding', note: 'Embedding gradients sum over all token positions they appear in. Rare tokens get bigger updates.' },
                  { icon: 'text_fields', label: 'Input Tokens', note: 'Final gradient w.r.t. input tokens. Used in adversarial training, gradient-based attacks, or input embedding analysis.' }
                ]
              }
            },
          ],
        },
        {
          id: 'transformers',
          title: 'Transformers',
          icon: 'account_tree',
          description: 'What the Transformer architecture is, how attention works, and why it dominates modern LLMs.',
          sections: [
            {
              id: 'what-is-transformer',
              title: 'What is a Transformer?',
              icon: 'account_tree',
              content: `A **Transformer** is a neural network architecture introduced in 2017 ("Attention Is All You Need") that relies entirely on **self-attention** mechanisms to model relationships between tokens in a sequence. Unlike recurrent networks (RNNs, LSTMs), Transformers process all tokens in parallel, making them dramatically faster and more scalable.

**Why it matters:** virtually every modern LLM — GPT, Claude, Llama, Gemini, Mistral — is built on the Transformer architecture. Understanding Transformers means understanding how today's AI actually works.

**Key characteristics:**
- **Parallel processing:** all tokens processed simultaneously during training (not sequentially like RNNs).
- **Self-attention:** each token attends to every other token, capturing context regardless of distance.
- **Multi-head attention:** multiple attention heads run in parallel, each learning different relationships (syntax, semantics, coreference).
- **Positional encoding:** since there's no recurrence, position information is injected via sinusoidal or learned encodings.
- **Scalable:** the architecture scales well with more data, more parameters, and longer sequences.

**Golden rule:** Transformers are not "intelligent" — they are sophisticated pattern matchers that use attention to weigh the importance of every token in context. Their power comes from scale, not from understanding.`
            },
            {
              id: 'how-attention-works',
              title: 'How Self-Attention Works',
              icon: 'sync',
              content: `Self-attention is the core mechanism of the Transformer. It allows each token to dynamically focus on relevant tokens in the sequence.

**The three vectors:**
For each token, the model computes three vectors:
- **Query (Q):** "What am I looking for?"
- **Key (K):** "What do I contain?"
- **Value (V):** "What information do I offer?"

**Attention formula:**
> Attention(Q, K, V) = softmax(QKᵀ / √dₖ) V

Where:
- **QKᵀ:** measures similarity between every query and every key
- **√dₖ:** scaling factor (prevents dot products from growing too large)
- **softmax:** converts similarities to probabilities (weights)
- **V:** weighted sum of values (the actual output)

**Step by step:**
1. Compute Q, K, V for every token via learned linear projections.
2. Compute attention scores: Q × Kᵀ for every pair of tokens.
3. Scale scores by 1/√dₖ.
4. Apply softmax to get attention weights (probabilities).
5. Multiply weights by V and sum — each token's output is a weighted mix of all tokens' values.

**Multi-head attention:** instead of one attention function, run h parallel "heads" with different learned projections, then concatenate and project. Each head can learn different relationships — one might track subject-verb agreement, another might resolve pronouns.

**Golden rule:** attention is a *weighted average*. Every token's output is a blend of information from the entire sequence, weighted by relevance. The model learns what to attend to.`
            },
            {
              id: 'transformer-architecture-diagram',
              title: 'Transformer Architecture (Interactive)',
              icon: 'account_tree',
              pipeline: {
                stages: [
                  { icon: 'text_fields', label: 'Input Tokens', note: 'Raw text is tokenized into integer IDs. Each token becomes a dense vector via embedding.' },
                  { icon: 'grid_on', label: 'Token + Position Embedding', note: 'Token embeddings capture meaning; positional encodings inject order information. Since Transformers have no recurrence, position is essential.' },
                  { icon: 'mode_comment', label: 'Multi-Head Self-Attention', note: 'Each token computes Q, K, V and attends to every other token. Multiple heads run in parallel, each learning different relationships (syntax, semantics, coreference).' },
                  { icon: 'add', label: 'Add & Norm (Residual)', note: 'Attention output is added to the original input (residual connection), then normalized. This stabilizes training and allows gradients to flow through deep stacks.' },
                  { icon: 'layers', label: 'Feed-Forward Network (FFN)', note: 'Position-wise MLP: up-project to 4× hidden size, apply GELU non-linearity, down-project back. Each token transformed independently — this is where "knowledge" is stored.' },
                  { icon: 'add', label: 'Add & Norm (Residual)', note: 'Second residual + LayerNorm after FFN. One complete Transformer block.' },
                  { icon: 'repeat', label: 'Repeat N times', note: 'Typical LLMs stack 12–96+ identical blocks. Deeper stacking = more capacity. The output of block L feeds block L+1.' },
                  { icon: 'functions', label: 'Final LayerNorm + LM Head', note: 'Final normalization, then linear projection to vocabulary size. Output: logits — raw scores for every possible next token.' },
                  { icon: 'tune', label: 'Sampling → Output', note: 'Convert logits to probabilities via softmax, then sample (greedy, temperature, top-p, top-k). Emit token, append to sequence, repeat for autoregressive generation.' }
                ]
              }
            },
            {
              id: 'encoder-vs-decoder',
              title: 'Encoder vs Decoder Architectures',
              icon: 'compare',
              content: `Transformers come in three architectural flavors, each suited to different tasks:

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

**Golden rule:** decoder-only for generation, encoder-only for understanding, encoder-decoder when you need both. Most modern LLMs use decoder-only because generation is the dominant use case.`
            },
            {
              id: 'why-transformers-win',
              title: 'Why Transformers Dominate',
              icon: 'trending_up',
              content: `Before Transformers (pre-2017), the dominant architectures were RNNs, LSTMs, and GRUs. Transformers displaced them for several reasons:

**1. Parallelization**
- RNNs process tokens sequentially — token t must finish before token t+1 begins.
- Transformers process all tokens simultaneously. Training is dramatically faster on GPUs/TPUs.

**2. Long-range dependencies**
- RNNs struggle to connect distant tokens (vanishing gradients).
- Every token attends directly to every other token in O(1) path length.

**3. Scalability**
- The architecture is simple and uniform — just stacked attention + FFN blocks.
- Scales well with more data, more parameters, and longer sequences (with optimizations).

**4. Flexibility**
- Pre-train once on massive text, then fine-tune or prompt for any task.
- The same architecture handles classification, generation, translation, summarization, and more.

**The trade-offs:**
- **Quadratic complexity:** self-attention is O(n²) in sequence length. Long sequences are expensive (mitigated by KV cache, FlashAttention, sliding window, etc.).
- **Memory:** storing all activations during training is memory-heavy (see Backward Propagation guide).
- **Data hungry:** requires massive datasets to reach peak performance.

**Golden rule:** Transformers win because they are parallel, scalable, and flexible. Their quadratic attention cost is the main limitation — which is why research focuses on efficient attention, KV caching, and alternative architectures.`
            },
          ],
        },
        {
          id: 'caching',
          title: 'Caching',
          icon: 'memory',
          description: 'What caching is, why it matters, and the types of caching in LLMs (KV cache, prompt cache, model cache).',
          sections: [
            {
              id: 'what-is-caching',
              title: 'What is Caching?',
              icon: 'memory',
              content: `Caching is the storage of intermediate computations or results to avoid redundant work. In LLMs, caching is crucial for performance and cost optimization.

**Why caching matters:**
- **Speed:** skip repeated computation, get instant results on cache hits.
- **Cost:** fewer GPU cycles = lower electricity and compute dollars.
- **Scalability:** enables serving many concurrent requests efficiently.

**Golden rule:** cache what is expensive to compute and stable across requests. Never cache what changes frequently.

**Types of caching in LLMs:**
- **KV cache:** keys/values from attention layers during generation (the most impactful).
- **Prompt cache:** embeddings of static prompt components.
- **Model cache:** intermediate layers or weights for fast inference.
- **Tokenizer cache:** tokenization results for repeated text segments.`
            },
            {
              id: 'kv-cache-overview',
              title: 'KV Cache Overview',
              icon: 'layers',
              content: `The **KV cache** (Key-Value cache) is the most critical caching mechanism in Transformers for autoregressive generation. It stores the Q, K, and V projections computed during the attention operation.

**How it works:**
1. During prefill (prompt processing), compute K and V for each prompt token.
2. During decode (generation), compute K and V for each new token.
3. All K and V pairs are stored in the cache for future steps.

**Attention step with cache:**
> Output = softmax(Q · Kᵀ / √dₖ) · V
> Where K and V come from the cache, not recomputed.

**KV cache size:**
> cache_size = 2 (K + V) × sequence_length × num_layers × num_heads × head_dim

**What gets cached:**
- Keys and values are the *heavy* parts to compute (O(n²) attention complexity).
- They are *stable* across generation steps (once computed, they never change).
- Embedding lookups and FFN computations are cheaper (O(n) per token).

**Golden rule:** the KV cache trades *memory* for *compute*. It's why decoding a 1000-token response uses far less compute than recomputing everything from scratch each step.`
            },
            {
              id: 'caching-architecture',
              title: 'Caching Architecture (Interactive)',
              icon: 'account_tree',
              pipeline: {
                stages: [
                  { icon: 'text_fields', label: 'Input Tokens', note: 'Raw text is tokenized. For each token: compute embedding + position encoding.' },
                  { icon: 'mode_comment', label: 'Compute Q, K, V', note: 'Projection matrices W_Q, W_K, W_V applied to embeddings. Expensive matrix multiplies (O(n²)).' },
                  { icon: 'memory', label: 'KV Cache Storage', note: 'Store computed K and V pairs per layer. Grows linearly with sequence length, quadratically with model size.' },
                  { icon: 'repeat', label: 'Prefill Phase', note: 'All prompt tokens processed in one batched forward pass. Fill entire KV cache up front. Heavy compute, one-time cost.' },
                  { icon: 'repeat', label: 'Decode Phase', note: 'Each generation step: compute fresh K,V for NEW token → append to cache. Subsequent steps read from cache only.' },
                  { icon: 'bolt', label: 'Attention with Cache', note: 'QKᵀ uses cached keys; softmax weighted sum uses cached values. No recomputation of prompt token K/V pairs.' },
                  { icon: 'functions', label: 'Output + Cache Growth', note: 'Generate next token → append its K,V to cache. Cache size increases by one slot per generated token.' }
                ]
              }
            },
            {
              id: 'cache-strategies',
              title: 'Caching Strategies',
              icon: 'layers_clear',
              content: `Different caching approaches optimize for speed, memory, or cost:

**1. Full KV Cache**
- Store ALL keys and values for the entire sequence.
- **Pros:** fastest generation, simplest implementation.
- **Cons:** memory-heavy; O(n) memory growth per generated token.

**2. Sliding Window Cache**
- Keep only the most recent N tokens in cache.
- **Pros:** constant memory regardless of sequence length.
- **Cons:** cannot attend to tokens older than window (loss of long context).

**3. Block-wise / Paged Cache**
- Partition cache into blocks; evict least-recently-used.
- **Pros:** fine-grained control over memory budget.
- **Cons:** more complex eviction logic, higher overhead.

**4. Grouped-Query Attention (GQA)**
- Share keys/values across multiple attention heads.
- **Pros:** reduces KV cache memory by factor of heads.
- **Cons:** trades off expressivity; heads compete for same information.

**5. Multi-Head Latent Attention (MLA)**
- Compress K and V representations; store compressed versions.
- **Pros:** drastically smaller cache footprint.
- **Cons:** extra compression/decompression cost; approximation error.

**Golden rule:** choose cache strategy based on your use case:
- **Real-time chat:** full KV cache (speed is king).
- **Long-context summarization:** sliding window + attention mechanisms.
- **Cost-sensitive deployment:** GQA/MLA with careful tuning.
- **Research/innovation:** experiment with new cache eviction policies.`
            },
            {
              id: 'caching-optimization',
              title: 'Caching Optimization',
              icon: 'tune',
              content: `Caching works, but optimizations can make it dramatically more efficient:

**1. Prompt Caching**
- Cache embeddings of static prompt components (system prompt, few-shot examples).
- **Benefit:** identical prompts in different requests skip embedding lookup.
- **Implementation:** mark parts of prompt as "cacheable" at application level.

**2. FlashAttention**
- Reorder computation to maximize GPU utilization.
- **Benefit:** faster attention with lower memory footprint.
- **Compatibility:** works with KV cache — same keys/values, faster access.

**3. KV Cache Offloading**
- Move less-used cache entries to CPU RAM or disk.
- **Benefit:** larger effective cache size, cheaper memory tier.
- **Trade-off:** increased latency on cache misses.

**4. Quantization**
- Store K/V values in lower-precision (e.g., 8-bit instead of float16).
- **Benefit:** 2–4× smaller cache memory.
- **Consideration:** reduced accuracy, need fine-tuning.

**5. Attention Sink / Alibi**
- Special tokens (e.g., <sink>) stay in cache across many steps.
- **Benefit:** maintains context for long-range dependencies.
- **Use case:** long conversation handling, retrieval-augmented generation.

**Golden rule:** caching is optimization, not magic. Profile your workload: where are the cache hits? Where are the misses? That's where to optimize next.`
            },
            {
              id: 'caching-summary',
              title: 'Caching Summary',
              icon: 'summarize',
              content: `Caching transforms the O(n³) attention computation across tokens into O(n) per step — the single biggest performance win in modern LLMs. It enables everything from real-time chat to billion-parameter model serving.

**The three caching pillars:**
1. **KV Cache:** attention keys and values (the heavyweight, stable data).
2. **Prompt Cache:** static embedding components (the repeatable input).
3. **Model Cache:** intermediate representations (the reusable computations).

**Key insights:**
- Caching is always beneficial: it trades memory for compute.
- The right cache strategy depends on latency, memory, and cost constraints.
- Advanced techniques (quantization, offloading, attention variants) keep pushing the frontier.

**Golden rule:** start simple (full KV cache). Optimize based on bottlenecks: sliding window for memory, quantization for cost, offloading for scale. Measure cache hit rates — they tell you exactly where optimization is needed.`
            },
          ],
        },
      ],
    },
  ],
};
