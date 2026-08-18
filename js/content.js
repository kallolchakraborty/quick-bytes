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
    guides: 4,
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
          ],
        },
      ],
    },
  ],
};
