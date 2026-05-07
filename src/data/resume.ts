export const resumeData = {
  name: "Mohit Madan",
  tagline: "AI / Systems Engineer",
  location: "New Delhi, India",
  phone: "+91-7678645682",
  email: "mohitmadan128@gmail.com",
  github: "https://github.com/Mmadan128",
  linkedin: "https://www.linkedin.com/in/mohit-madan-b8447a313/",

  summary:
    "I build retrieval-based agents, neural compression models, and structured decision pipelines. Most of my time goes into writing code, contributing to open source, and exploring what's possible with LLMs. Focused on making AI systems predictable, testable, and useful — not just demos.",

  projects: [
    {
      name: "Chimera",
      subtitle: "AI Sales Assistant Platform",
      link: "https://github.com/Mmadan128",
      tech: ["React", "Node.js", "Python", "Pinecone", "WebSockets"],
      ongoing: false,
      bullets: [
        "AI sales assistant that converts website visitors into qualified leads using conversational AI.",
        "Microservices architecture: React frontend, Node backend, Python AI service.",
        "RAG pipeline with Pinecone for knowledge-grounded responses and real-time chat over WebSockets.",
      ],
    },
    {
      name: "Vortex Codec",
      subtitle: "Byte-Level Neural Compression",
      link: "https://github.com/Mmadan128/VortexCodec",
      tech: ["PyTorch", "CUDA", "Transformers"],
      ongoing: true,
      bullets: [
        "Byte-level autoregressive Transformer for lossless compression of structured binary data.",
        "Designed attention for long-context modeling; evaluated reconstruction and throughput.",
        "CUDA-optimized training with gradient checkpointing under limited GPU memory.",
      ],
    },
    {
      name: "Feynman AI Tutor",
      subtitle: "Fine-Tuned LLM for Explanations",
      link: null,
      tech: ["Qwen2.5", "LoRA", "Hugging Face"],
      ongoing: false,
      bullets: [
        "Fine-tuned Qwen2.5-1.5B to generate simplified explanations using the Feynman technique.",
        "Custom dataset design and prompt engineering for educational reasoning quality.",
        "Mixed-precision and gradient-checkpointed training under tight hardware constraints.",
      ],
    },
  ],

  openSource: [
    {
      org: "baler-collaboration",
      repo: "baler",
      desc: "Fixed constructor signature mismatch in core model init for API stability and component interop.",
      status: "Merged",
    },
    {
      org: "Hacktoberfest 2025",
      repo: "6 PRs merged",
      desc: "Collaborative open-source contributions across multiple repositories with peer code reviews.",
      status: "Completed",
    },
  ],

  education: [
    {
      school: "Maharaja Agrasen Institute of Technology",
      degree: "B.Tech, Computer Science",
      location: "New Delhi, India",
      period: "Expected 2028",
    },
  ],

  certifications: [
    "Google AI Essentials",
    "Hugging Face AI Agents Fundamentals",
    "DeepLearning.AI NLP Specialization",
    "Hugging Face Fundamentals of LLMs",
  ],

  skills: {
    Languages: ["Python", "Bash", "CUDA"],
    Frameworks: ["PyTorch", "Hugging Face", "Transformers", "PEFT", "Accelerate", "Triton"],
    Modeling: ["Transformers", "Autoregressive", "LoRA", "QLoRA", "Mixed Precision"],
    Systems: ["Linux", "Git", "Docker", "PyTest", "ROOT"],
  },
};
