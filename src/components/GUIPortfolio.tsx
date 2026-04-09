import { resumeData } from "@/data/resume";
import { Mail, Phone, Github, Linkedin, GraduationCap, Award, Code, Briefcase, User, Terminal, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const GUIPortfolio = ({ onSwitchMode }: { onSwitchMode: () => void }) => {
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
      <section id="about" className="max-w-5xl mx-auto px-4 py-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-bold text-terminal-green">{resumeData.name}</h1>
          <p className="text-lg text-terminal-cyan">{resumeData.education.degree} · {resumeData.location}</p>
          <p className="mt-4 text-muted-foreground max-w-2xl leading-relaxed">{resumeData.summary}</p>
          <div className="flex gap-3 mt-6">
            <a href={`mailto:${resumeData.email}`} className="flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground text-sm hover:opacity-90 transition-opacity">
              <Mail size={16} /> Get in Touch
            </a>
            <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded border border-border text-sm hover:bg-muted transition-colors">
              <Github size={16} /> GitHub
            </a>
            <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded border border-border text-sm hover:bg-muted transition-colors">
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Projects */}
      <section id="projects" className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2 mb-6">
          <Briefcase size={22} /> Projects
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {resumeData.projects.map((p, i) => (
            <Card key={i} className="bg-card border-border hover:border-terminal-dim transition-colors">
              <CardHeader className="pb-2">
                <CardTitle className="text-base text-terminal-green flex items-center gap-2">
                  {p.name}
                  {p.link && <ExternalLink size={14} className="text-muted-foreground" />}
                </CardTitle>
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
          <Card className="bg-card border-border hover:border-terminal-dim transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-base text-terminal-yellow flex items-center gap-2">
                <Award size={16} /> Open Source
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
      <section id="skills" className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2 mb-6">
          <Code size={22} /> Skills
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(resumeData.skills).map(([category, items]) => (
            <div key={category} className="space-y-2">
              <h3 className="text-sm font-semibold text-terminal-yellow">{category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {(items as string[]).map((s) => (
                  <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Education & Certs */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2 mb-4">
              <GraduationCap size={22} /> Education
            </h2>
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <p className="font-semibold text-terminal-green">{resumeData.education.degree}</p>
                <p className="text-sm text-muted-foreground">{resumeData.education.institution}</p>
                <p className="text-sm text-terminal-yellow mt-1">{resumeData.education.expected}</p>
              </CardContent>
            </Card>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2 mb-4">
              <Award size={22} /> Certifications
            </h2>
            <div className="space-y-2">
              {resumeData.certifications.map((c, i) => (
                <Card key={i} className="bg-card border-border">
                  <CardContent className="pt-4 pb-4">
                    <p className="text-sm text-terminal-green">📜 {c}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Separator className="max-w-5xl mx-auto" />

      {/* Contact */}
      <section id="contact" className="max-w-5xl mx-auto px-4 py-12 pb-20">
        <h2 className="text-2xl font-bold text-terminal-cyan flex items-center gap-2 mb-6">
          <User size={22} /> Contact
        </h2>
        <div className="flex flex-wrap gap-4">
          <a href={`mailto:${resumeData.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terminal-green transition-colors">
            <Mail size={16} /> {resumeData.email}
          </a>
          <span className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone size={16} /> {resumeData.phone}
          </span>
          <a href={resumeData.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terminal-blue transition-colors">
            <Github size={16} /> GitHub
          </a>
          <a href={resumeData.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-terminal-blue transition-colors">
            <Linkedin size={16} /> LinkedIn
          </a>
        </div>
      </section>
    </div>
  );
};

export default GUIPortfolio;
