export const resumeData = {
  name: "Mohit Madan",
  tagline: "Building reliable AI systems that actually work.",
  location: "New Delhi, India",
  phone: "+91-7678645682",
  email: "mohitmadan128@gmail.com",
  github: "https://github.com/Mmadan128",
  linkedin: "https://www.linkedin.com/in/mohit-madan-b8447a313/",

  summary:
    "I build retrieval-based agents, structured decision pipelines, and deploy them in production-grade Linux environments. Focused on making AI systems predictable, testable, and useful — not just demos.",

  projects: [
    {
      name: "TraceOps: Log Analysis & Decision System",
      link: "https://github.com/Mmadan128/TraceOps",
      tech: ["LangGraph", "FAISS", "BM25", "Docker", "PyTest"],
      ongoing: false,
      bullets: [
        "Retrieval-based system for analyzing large HDFS log corpora with structured decision-making.",
        "Hybrid retrieval combining BM25 + FAISS via Reciprocal Rank Fusion, with CrossEncoder reranking.",
        "Orchestrated workflows using LangGraph with MCP-style tool interfaces to constrain agent behavior.",
        "Dockerized dev environment with GitHub PR workflows and PyTest-based validation.",
      ],
    },
    {
      name: "Vortex Codec: Neural Compression",
      link: "https://github.com/Mmadan128/VortexCodec",
      tech: ["PyTorch", "CUDA", "Transformers"],
      ongoing: true,
      bullets: [
        "Byte-level autoregressive Transformer for lossless compression of structured binary data.",
        "CUDA-optimized training with gradient checkpointing and chunked processing under limited GPU memory.",
      ],
    },
    {
      name: "Feynman Tutor: Model Fine-Tuning",
      link: null,
      tech: ["LoRA", "Hugging Face", "Evaluation"],
      ongoing: false,
      bullets: [
        "Fine-tuned transformer models using LoRA with custom evaluation routines for explanation quality.",
      ],
    },
  ],

  openSource: [
    "Hacktoberfest 2025 Contributor",
    "Contributed to open-source repositories through reviewed pull requests.",
    "Collaborated with maintainers in public GitHub workflows.",
  ],

  skills: {
    Languages: ["Python", "Bash"],
    Frameworks: ["LangChain", "LangGraph", "MCP", "Hugging Face"],
    Retrieval: ["FAISS", "BM25", "SentenceTransformers", "CrossEncoder"],
    Systems: ["Linux", "Git", "Docker", "PyTest", "CUDA"],
  },
};
