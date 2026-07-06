import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { resumeData } from "@/data/resume";
import { Mail, Github, Linkedin, Terminal as TerminalIcon, Copy, Check, Send, ArrowUpRight, Award, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center px-2 py-0.5 text-[11px] rounded-full border border-border text-terminal-dim bg-card/60 font-mono">
    {children}
  </span>
);

const SectionHeader = ({ children, count }: { children: React.ReactNode; count?: number }) => (
  <div className="flex items-baseline gap-2 mb-6">
    <h2 className="text-xs uppercase tracking-[0.25em] text-terminal-dim">{children}</h2>
    {count !== undefined && <span className="text-[10px] text-terminal-dim/60 font-mono">[{count}]</span>}
    <div className="flex-1 border-b border-dashed border-border/60" />
  </div>
);

type ContribDay = { date: string; count: number; level: number };

const ContributionGraph = ({ username }: { username: string }) => {
  const [data, setData] = useState<{ contributions: ContribDay[]; total: Record<string, number> } | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((d) => {
        if (!d?.contributions?.length) throw new Error("No data");
        setData(d);
      })
      .catch(() => setError(true));
  }, [username]);

  if (error) return <p className="text-xs text-terminal-dim">Could not load contributions.</p>;
  if (!data) return <p className="text-xs text-terminal-dim">Loading…</p>;

  const days = data.contributions;
  const weeks: ContribDay[][] = [];
  const firstDay = new Date(days[0].date).getDay();
  const padded: (ContribDay | null)[] = [...Array(firstDay).fill(null), ...days];
  for (let i = 0; i < padded.length; i += 7) weeks.push(padded.slice(i, i + 7) as ContribDay[]);

  const total = Object.values(data.total).reduce((a, b) => a + b, 0);
  const year = new Date().getFullYear();

  const levelClass = (lvl: number) => {
    switch (lvl) {
      case 0: return "bg-muted/50";
      case 1: return "bg-terminal-green/25";
      case 2: return "bg-terminal-green/50";
      case 3: return "bg-terminal-green/75";
      case 4: return "bg-terminal-green";
      default: return "bg-muted/50";
    }
  };

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const monthLabels: { idx: number; label: string }[] = [];
  let lastMonth = -1;
  weeks.forEach((w, i) => {
    const first = w.find(Boolean);
    if (!first) return;
    const m = new Date(first.date).getMonth();
    if (m !== lastMonth) { monthLabels.push({ idx: i, label: months[m] }); lastMonth = m; }
  });

  return (
    <div>
      <div className="overflow-x-auto">
        <div className="inline-block">
          <div className="relative h-4 mb-1" style={{ width: weeks.length * 13 }}>
            {monthLabels.map((m) => (
              <span
                key={m.idx}
                className="absolute text-[9px] text-terminal-dim font-mono"
                style={{ left: m.idx * 13 }}
              >
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {weeks.map((w, i) => (
              <div key={i} className="flex flex-col gap-[3px]">
                {Array.from({ length: 7 }).map((_, j) => {
                  const d = w[j];
                  if (!d) return <div key={j} className="w-[10px] h-[10px]" />;
                  return (
                    <div
                      key={j}
                      className={`w-[10px] h-[10px] rounded-[2px] ${levelClass(d.level)}`}
                      title={`${d.count} contribution${d.count === 1 ? "" : "s"} on ${d.date}`}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3 text-[10px] text-terminal-dim font-mono">
        <span>{total} contributions in {year}</span>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {[0,1,2,3,4].map((l) => (
            <span key={l} className={`w-[10px] h-[10px] rounded-[2px] ${levelClass(l)}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
};

const GUIPortfolio = ({ onSwitchMode }: { onSwitchMode: () => void }) => {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyEmail = async () => {
    await navigator.clipboard.writeText(resumeData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = contactForm;
    if (!name || !email || !message) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    window.open(`mailto:${resumeData.email}?subject=${subject}&body=${body}`, "_self");
    toast({ title: "Opening your email client..." });
    setContactForm({ name: "", email: "", message: "" });
  };

  const allSkills = Object.values(resumeData.skills).flat() as string[];

  return (
    <div className="min-h-screen bg-background text-foreground font-mono">
      {/* Top bar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between text-sm">
          <span className="font-semibold tracking-tight text-terminal-green">~/mohit</span>
          <div className="flex items-center gap-5 text-terminal-dim">
            <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
            <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
            <button
              onClick={onSwitchMode}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border hover:bg-muted transition-colors text-terminal-cyan"
              aria-label="Switch to terminal mode"
            >
              <TerminalIcon size={12} /> Terminal
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-12">
        <div className="flex gap-6 items-start">
          <div className="w-24 h-24 rounded-full bg-card border border-border overflow-hidden shrink-0">
            <img
              src={resumeData.avatar}
              alt={resumeData.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
                (e.target as HTMLImageElement).parentElement!.classList.add("flex", "items-center", "justify-center", "text-2xl", "font-bold", "text-terminal-green");
                (e.target as HTMLImageElement).parentElement!.innerHTML = '<span class="text-2xl font-bold text-terminal-green">MM</span>';
              }}
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[11px] text-terminal-dim mb-2 tracking-wider font-mono">
              <span className="text-terminal-green">$</span> whoami
            </div>
            <h1 className="text-3xl font-bold tracking-tight">icyzh <span className="text-terminal-dim font-normal">aka</span> Mohit</h1>
            <p className="text-terminal-cyan mt-1 text-sm">{resumeData.tagline}</p>

            <div className="flex items-center gap-2 mt-3 text-sm">
              <button onClick={copyEmail} className="flex items-center gap-1.5 hover:text-foreground text-terminal-dim transition-colors">
                {resumeData.email}
                {copied ? <Check size={12} className="text-terminal-green" /> : <Copy size={12} />}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-4">
              <a href={`mailto:${resumeData.email}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-border hover:bg-muted transition-colors">
                <Mail size={12} /> Email
              </a>
              <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-border hover:bg-muted transition-colors">
                <Github size={12} /> GitHub
              </a>
              <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full border border-border hover:bg-muted transition-colors">
                <Linkedin size={12} /> LinkedIn
              </a>
            </div>

            <div className="flex items-center gap-2 mt-4 text-xs text-terminal-dim">
              <span className="w-1.5 h-1.5 rounded-full bg-terminal-green inline-block animate-pulse" />
              Open to collaborations · {resumeData.location}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <SectionHeader>About</SectionHeader>
        <p className="text-sm leading-relaxed text-foreground/85">
          {resumeData.summary}
        </p>
      </section>

      {/* Projects */}
      <section id="projects" className="max-w-3xl mx-auto px-6 py-8">
        <SectionHeader count={resumeData.projects.length}>Projects</SectionHeader>
        <div className="grid sm:grid-cols-2 gap-4">
          {resumeData.projects.map((p, i) => (
            <div key={i} className="rounded-lg border border-border/60 bg-card/30 overflow-hidden hover:bg-card/60 transition-colors flex flex-col">
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
                  </div>
                  <div className="flex items-center gap-2 text-terminal-dim shrink-0">
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} on GitHub`} className="hover:text-terminal-green transition-colors">
                        <Github size={13} />
                      </a>
                    )}
                    {(p as any).demo && (
                      <a href={(p as any).demo} target="_blank" rel="noopener noreferrer" aria-label={`${p.name} live demo`} className="hover:text-terminal-green transition-colors">
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
        <div className="mt-5">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs text-terminal-dim hover:text-terminal-green transition-colors"
          >
            View all projects <ArrowUpRight size={12} />
          </Link>
        </div>
      </section>

      {/* Contributions */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <SectionHeader>Contributions</SectionHeader>
        <ContributionGraph username="icyzh" />
      </section>

      {/* Open Source */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <SectionHeader count={resumeData.openSource.length}>Open Source</SectionHeader>
        <div className="space-y-5">
          {resumeData.openSource.map((item, i) => (
            <div key={i} className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-terminal-dim">{item.org}/</span>
                  <span className="text-terminal-cyan font-semibold">{item.repo}</span>
                </div>
                <p className="text-sm text-terminal-dim mt-1 leading-relaxed">{item.desc}</p>
              </div>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full border border-terminal-green/40 text-terminal-green shrink-0">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="max-w-3xl mx-auto px-6 py-8">
        <SectionHeader count={allSkills.length}>Skills</SectionHeader>
        <div className="space-y-4">
          {Object.entries(resumeData.skills).map(([category, items]) => (
            <div key={category} className="flex items-start gap-4">
              <span className="text-[11px] uppercase tracking-wider text-terminal-yellow w-24 shrink-0 pt-1">{category}</span>
              <div className="flex flex-wrap gap-1.5 flex-1">
                {(items as string[]).map((s) => <Pill key={s}>{s}</Pill>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="max-w-3xl mx-auto px-6 py-8">
        <SectionHeader count={resumeData.certifications.length}>Certifications</SectionHeader>
        <ul className="space-y-1.5 text-sm text-terminal-dim">
          {resumeData.certifications.map((c, i) => (
            <li key={i} className="flex items-start gap-2">
              <Award size={12} className="mt-1 shrink-0 text-terminal-yellow" /> {c}
            </li>
          ))}
        </ul>
      </section>

      {/* Contact */}
      <section id="contact" className="max-w-3xl mx-auto px-6 py-8 pb-24">
        <SectionHeader>Contact</SectionHeader>
        <form onSubmit={handleContactSubmit} className="space-y-3">
          <div className="grid sm:grid-cols-2 gap-3">
            <Input
              placeholder="Name"
              value={contactForm.name}
              onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))}
              className="bg-card border-border"
            />
            <Input
              type="email"
              placeholder="Email"
              value={contactForm.email}
              onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
              className="bg-card border-border"
            />
          </div>
          <Textarea
            placeholder="Message"
            rows={5}
            value={contactForm.message}
            onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
            className="bg-card border-border resize-none"
          />
          <div className="flex items-center justify-between">
            <span className="text-xs text-terminal-dim">→ Sends to {resumeData.email}</span>
            <Button type="submit" size="sm" className="rounded-full">
              <Send size={12} /> Send
            </Button>
          </div>
        </form>

        <div className="mt-12 pt-6 border-t border-border/60 flex items-center justify-between text-xs text-terminal-dim">
          <span>© {new Date().getFullYear()} Mohit Madan</span>
          <div className="flex items-center gap-4">
            <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a>
            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">LinkedIn</a>
            <a href={`mailto:${resumeData.email}`} className="hover:text-foreground transition-colors">Email</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GUIPortfolio;
