import { resumeData } from "@/data/resume";
import { OutputLine } from "./types";

export function aboutCmd(): OutputLine[] {
  return [
    { content: "\u250C\u2500 About \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510", color: "text-terminal-cyan" },
    { content: "" },
    { content: `  ${resumeData.name}`, color: "text-terminal-green" },
    { content: `  ${resumeData.tagline}`, color: "text-terminal-yellow" },
    { content: "" },
    { content: `  ${resumeData.summary}` },
    { content: "" },
    { content: `  Location: ${resumeData.location}`, color: "text-terminal-dim" },
    { content: "" },
    { content: "\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518", color: "text-terminal-cyan" },
  ];
}

export function skillsCmd(): OutputLine[] {
  const lines: OutputLine[] = [
    { content: "\u250C\u2500 Tech Stack \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510", color: "text-terminal-cyan" },
    { content: "" },
  ];
  for (const [category, items] of Object.entries(resumeData.skills)) {
    lines.push({ content: `  ${category}:`, color: "text-terminal-yellow" });
    lines.push({ content: `    ${(items as string[]).join(" | ")}`, color: "text-terminal-green" });
    lines.push({ content: "" });
  }
  lines.push({ content: "\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518", color: "text-terminal-cyan" });
  return lines;
}

export function projectsCmd(): OutputLine[] {
  const lines: OutputLine[] = [
    { content: "\u250C\u2500 Projects \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510", color: "text-terminal-cyan" },
    { content: "" },
  ];
  resumeData.projects.forEach((p, i) => {
    const status = p.ongoing ? " [IN PROGRESS]" : "";
    lines.push({ content: `  [${i + 1}] ${p.name}${status}`, color: p.ongoing ? "text-terminal-yellow" : "text-terminal-green" });
    if (p.tech) lines.push({ content: `      Stack: ${p.tech.join(", ")}`, color: "text-terminal-dim" });
    if (p.link) lines.push({ content: `      ${p.link}`, color: "text-terminal-blue" });
    p.bullets.forEach((b) => {
      lines.push({ content: `      - ${b}`, color: "text-foreground" });
    });
    lines.push({ content: "" });
  });
  lines.push({ content: "  Open Source:", color: "text-terminal-yellow" });
  resumeData.openSource.forEach((item) => {
    lines.push({ content: `    - ${item}` });
  });
  lines.push({ content: "" });
  lines.push({ content: "\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518", color: "text-terminal-cyan" });
  return lines;
}

export function contactCmd(): OutputLine[] {
  return [
    { content: "\u250C\u2500 Contact \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2510", color: "text-terminal-cyan" },
    { content: "" },
    { content: `  Email:    ${resumeData.email}`, color: "text-terminal-green" },
    { content: `  GitHub:   ${resumeData.github}`, color: "text-terminal-blue" },
    { content: `  LinkedIn: ${resumeData.linkedin}`, color: "text-terminal-blue" },
    { content: `  Phone:    ${resumeData.phone}`, color: "text-terminal-dim" },
    { content: "" },
    { content: "\u2514\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2518", color: "text-terminal-cyan" },
  ];
}
