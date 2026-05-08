import { useState } from "react";
import { Link } from "react-router-dom";
import { resumeData } from "@/data/resume";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-2 py-0.5 text-[11px] rounded-full border border-border text-terminal-dim bg-card/60 font-mono">
    {children}
  </span>
);

const CATEGORIES = ["All", "Web", "AI", "Apps", "Landing Pages"] as const;
type Category = (typeof CATEGORIES)[number];

const Projects = () => {
  const [filter, setFilter] = useState<Category>("All");

  const projects = resumeData.projects.filter((p) => {
    if (filter === "All") return true;
    return (p as any).category === filter;
  });

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
          <Link to="/" className="inline-flex items-center gap-2 text-terminal-green hover:text-foreground transition-colors">
            <ArrowLeft size={14} /> ~/mohit
          </Link>
          <span className="text-terminal-dim text-xs">/projects</span>
        </div>
      </nav>

      <section className="max-w-4xl mx-auto px-6 pt-16 pb-8">
        <div className="text-[11px] text-terminal-dim mb-2 tracking-wider">
          <span className="text-terminal-green">$</span> ls ~/projects
        </div>
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <p className="text-sm text-terminal-dim mt-2">Things I've built, shipped, or am still hacking on.</p>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-4 flex flex-wrap items-center gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1 text-xs rounded-full border transition-colors ${
              filter === cat
                ? "border-terminal-green text-terminal-green bg-terminal-green/10"
                : "border-border text-terminal-dim hover:text-foreground hover:border-foreground/30"
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      <section className="max-w-4xl mx-auto px-6 py-6 pb-24">
        {projects.length === 0 ? (
          <p className="text-sm text-terminal-dim">No projects in this category yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {projects.map((p, i) => (
              <div
                key={i}
                className="rounded-lg border border-border/60 bg-card/30 overflow-hidden hover:bg-card/60 transition-colors flex flex-col"
              >
                <div className="aspect-[16/9] bg-gradient-to-br from-terminal-green/5 via-card/50 to-terminal-cyan/5 border-b border-border/60 flex items-center justify-center">
                  <span className="text-xs text-terminal-dim/70 font-mono">{p.name}</span>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                      <h3 className="font-semibold text-sm text-foreground">{p.name}</h3>
                      {p.ongoing && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded border border-terminal-yellow/40 text-terminal-yellow uppercase tracking-wider">WIP</span>
                      )}
                      {(p as any).category && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded border border-terminal-cyan/40 text-terminal-cyan uppercase tracking-wider">
                          {(p as any).category}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-terminal-dim shrink-0">
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on GitHub`} className="hover:text-terminal-green transition-colors">
                          <Github size={13} />
                        </a>
                      )}
                      {(p as any).demo && (
                        <a href={(p as any).demo} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} demo`} className="hover:text-terminal-green transition-colors">
                          <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-terminal-dim/90 mt-2 leading-relaxed flex-1">
                    {(p as any).subtitle ? (p as any).subtitle + ". " : ""}{p.bullets[0]}
                  </p>
                  {p.tech && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.tech.map((t) => <Pill key={t}>{t}</Pill>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;