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
    guides: 6,
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
          description: 'What forward propagation is, how it works in neural networks and transformers, an interactive architecture diagram, and the difference from backpropagation.',
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

| | Forward Propagation | Backpropagation |
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
            {
              id: 'backward-propagation',
              title: 'Backward Propagation',
              icon: 'reverse',
              description: 'What backward propagation is, how it works through the chain rule, and its role in training neural networks.',
              sections: [
                {
                  id: 'what-is-backward-propagation',
                  title: 'What is Backward Propagation?',
                  icon: 'reverse',
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
                {
                  id: 'forward-vs-backward-comparison',
                  title: 'Forward vs Backprop',
                  icon: 'compare',
                  content: `A side-by-side of the two phases:

| Aspect | Forward Pass | Backward Pass |
|---|---|---|
| Direction | Input → Output | Output → Input (gradients) |
| Purpose | Compute prediction/loss | Compute weight gradients |
| Updates weights? | No | Yes (via optimizer) |
| Runs in | Inference & Training | Training only |
| Memory pattern | KV cache reused | All activations stored |
| Latency | Real-time friendly | ~2–3× slower than forward |

**Key insight:** Training does a full forward pass to get a loss, then a backward pass to compute gradients, then repeats (multiple mini-batches, epochs). In production, only the forward pass matters.

**Golden rule:** forward = predict, backward = learn, optimizer = update. Master these three to understand both inference and training.`
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
