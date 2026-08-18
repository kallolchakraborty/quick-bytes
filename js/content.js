const QUICK_BYTES = {
  site: {
    name: 'Quick Bytes',
    tagline: 'LLM interview prep.',
    description: 'What is an AI model, types of AI models, what is an LLM, types of LLMs, and popular examples — with an interactive tree view.',
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
      id: 'llms',
      title: 'AI & LLMs',
      level: 'Interview',
      description: 'What an AI model is, the types of AI models, what an LLM is, the types of LLMs, and real-world examples.',
      guides: [
        {
          id: 'what-are-llms',
          title: 'What is LLMs, Types & Examples',
          description: 'A concise guide to understanding AI models and LLMs — their types, a tree view of the landscape, and real-world implementations.',
          sections: [
            {
              id: 'what-is-ai-model',
              title: 'What is an AI Model?',
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
      ],
    },
  ],
};
