import { useState } from "react";
import { resumeData } from "@/data/resume";
import { Mail, Github, Linkedin, Code, Briefcase, User, Terminal, ExternalLink, Send, Sparkles, Cpu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const GUIPortfolio = ({ onSwitchMode }: { onSwitchMode: () => void }) => {
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-border bg-secondary/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-lg text-terminal-green">~/mohit</span>
          <div className="flex items-center gap-4">
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
            <a href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Projects</a>
            <a href="#skills" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Skills</a>
            <a href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Contact</a>
            <button
              onClick={onSwitchMode}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded border border-border bg-card hover:bg-muted transition-colors text-terminal-green"
            >
              <Terminal size={14} />
              Terminal Mode
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="about" className="max-w-5xl mx-auto px-4 py-20">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm text-terminal-dim font-mono">
            <Cpu size={14} /> AI Systems · Retrieval Agents · Infrastructure
          </div>
          <h1 className="text-5xl font-bold text-terminal-green tracking-tight">{resumeData.name}</h1>
          <p className="text-xl text-terminal-cyan font-medium">{resumeData.tagline}</p>
          <p className="mt-3 text-muted-foreground max-w-2xl leading-relaxed text-base">{resumeData.summary}</p>
          <div className="flex gap-3 mt-6">
            <a href={`mailto:${resumeData.email}`} className="flex items-center gap-2 px-5 py-2.5 rounded bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
              <Mail size={16} /> Get in Touch
            </a>
            <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded border border-border text-sm hover:bg-muted transition-colors">
              <Github size={16} /> GitHub
            </a>
            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded border border-border text-sm hover:bg-muted transition-colors">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Projects */}
      <section id="projects" className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2 mb-8">
          <Briefcase size={22} /> What I've Built
        </h2>
        <div className="grid md:grid-cols-2 gap-5">
          {resumeData.projects.map((p, i) => (
            <Card key={i} className="bg-card border-border hover:border-terminal-green/50 transition-all duration-300 group">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-terminal-green flex items-center justify-between">
                  {p.link ? (
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:underline">
                      {p.name} <ExternalLink size={14} className="text-muted-foreground group-hover:text-terminal-green transition-colors" />
                    </a>
                  ) : (
                    <span className="flex items-center gap-2">{p.name} {p.ongoing && <Badge variant="outline" className="text-[10px] text-terminal-yellow border-terminal-yellow/40">In Progress</Badge>}</span>
                  )}
                </CardTitle>
                {p.tech && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {p.tech.map(t => (
                      <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-terminal-dim font-mono">{t}</span>
                    ))}
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {p.bullets.map((b, j) => (
                    <li key={j} className="text-sm text-muted-foreground leading-relaxed">• {b}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
          <Card className="bg-card border-border hover:border-terminal-yellow/50 transition-all duration-300">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-terminal-yellow flex items-center gap-2">
                <Sparkles size={16} /> Open Source
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1.5">
                {resumeData.openSource.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground">• {item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Skills */}
      <section id="skills" className="max-w-5xl mx-auto px-4 py-14">
        <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2 mb-8">
          <Code size={22} /> Tech Stack
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {Object.entries(resumeData.skills).map(([category, items]) => (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold text-terminal-yellow uppercase tracking-wider">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {(items as string[]).map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs font-mono">{s}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Contact */}
      <section id="contact" className="max-w-5xl mx-auto px-4 py-14 pb-20">
        <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2 mb-8">
          <User size={22} /> Let's Connect
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <Input
              placeholder="Your Name"
              value={contactForm.name}
              onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))}
              className="bg-card border-border"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={contactForm.email}
              onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))}
              className="bg-card border-border"
            />
            <Textarea
              placeholder="Your Message"
              rows={5}
              value={contactForm.message}
              onChange={(e) => setContactForm((p) => ({ ...p, message: e.target.value }))}
              className="bg-card border-border resize-none"
            />
            <Button type="submit" className="flex items-center gap-2">
              <Send size={16} /> Send Message
            </Button>
          </form>
          <div className="space-y-4 pt-2">
            <a href={`mailto:${resumeData.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terminal-green transition-colors">
              <Mail size={16} /> {resumeData.email}
            </a>
            <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terminal-blue transition-colors">
              <Github size={16} /> GitHub
            </a>
            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terminal-blue transition-colors">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GUIPortfolio;
