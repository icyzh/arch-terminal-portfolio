export const resumeData = {
  name: "Mohit Madan",
  location: "New Delhi, India",
  phone: "+91-7678645682",
  email: "mohitmadan128@gmail.com",
  github: "https://github.com/mohitmadan",
  linkedin: "https://linkedin.com/in/mohitmadan",
  
  summary:
    "Computer Science undergraduate interested in building reliable AI systems for practical and operational workflows. Experience developing retrieval-based agents, structuring decision pipelines, and deploying systems in Linux environments with testing and version control.",

  education: {
    institution: "Maharaja Agrasen Institute of Technology, New Delhi, India",
    degree: "B.Tech in Computer Science",
    expected: "Expected 2028",
  },

  projects: [
    {
      name: "TraceOps: Log Analysis and Controlled Decision System",
      link: "GitHub",
      bullets: [
        "Built a retrieval-based system to analyze large HDFS log corpora and support structured decision-making.",
        "Implemented hybrid retrieval combining BM25 and FAISS using Reciprocal Rank Fusion, followed by CrossEncoder reranking.",
        "Orchestrated workflows using LangGraph and explored MCP-style structured tool interfaces to constrain agent behavior.",
        "Developed in Dockerized environments with GitHub pull-request workflows and PyTest-based validation.",
      ],
    },
    {
      name: "Vortex Codec: Byte-Level Neural Compression (Ongoing)",
      link: "GitHub",
      bullets: [
        "Developing a byte-level autoregressive Transformer for lossless compression of structured binary data.",
        "Optimized CUDA-based training under limited GPU memory using gradient checkpointing and chunked processing.",
      ],
    },
    {
      name: "Feynman Tutor: Model Fine-Tuning and Evaluation",
      link: null,
      bullets: [
        "Fine-tuned transformer models using LoRA and designed evaluation routines to assess explanation quality.",
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

  certifications: [
    "Natural Language Processing Specialization – DeepLearning.AI",
    "Hugging Face AI Agents Fundamentals",
  ],
};
