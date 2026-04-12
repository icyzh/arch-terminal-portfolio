import { resumeData } from "@/data/resume";
import { OutputLine } from "./types";

export function grepCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: grep <pattern>", color: "text-terminal-yellow" }];
  const term = args[0].toLowerCase();
  const results: OutputLine[] = [];
  const allText = [
    { section: "about", text: resumeData.summary },
    { section: "about", text: resumeData.tagline },
    ...resumeData.projects.flatMap(p => p.bullets.map(b => ({ section: p.name, text: b }))),
    ...Object.entries(resumeData.skills).flatMap(([cat, items]) => (items as string[]).map(s => ({ section: cat, text: s }))),
  ];
  for (const item of allText) {
    if (item.text.toLowerCase().includes(term)) {
      results.push({ content: `  ${item.section}: ${item.text}`, color: "text-terminal-green" });
    }
  }
  if (results.length === 0) return [{ content: `No matches for "${args[0]}"`, color: "text-terminal-yellow" }];
  return [{ content: `Found ${results.length} match(es):`, color: "text-terminal-cyan" }, ...results];
}

export function manCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "What manual page do you want?", color: "text-terminal-yellow" }];
  const pages: Record<string, string[]> = {
    about: ["NAME", "  about - display portfolio owner info", "", "SYNOPSIS", "  about", "", "DESCRIPTION", "  Shows name, bio, tagline, and location."],
    skills: ["NAME", "  skills - list technical skills", "", "SYNOPSIS", "  skills", "", "DESCRIPTION", "  Displays categorized tech stack."],
    projects: ["NAME", "  projects - show built projects", "", "SYNOPSIS", "  projects", "", "DESCRIPTION", "  Lists projects with descriptions, tech stacks, and links."],
    contact: ["NAME", "  contact - show contact info", "", "SYNOPSIS", "  contact", "", "DESCRIPTION", "  Displays email, GitHub, LinkedIn, phone."],
    ls: ["NAME", "  ls - list directory contents", "", "SYNOPSIS", "  ls [-la] [-a]", "", "DESCRIPTION", "  List files in current directory. Use -la for detailed view."],
    cat: ["NAME", "  cat - concatenate and print files", "", "SYNOPSIS", "  cat <filename>", "", "DESCRIPTION", "  Display file contents. Available: about.txt, skills.txt, projects.txt, contact.txt"],
    grep: ["NAME", "  grep - search for patterns", "", "SYNOPSIS", "  grep <pattern>", "", "DESCRIPTION", "  Search across all portfolio sections for matching text."],
    neofetch: ["NAME", "  neofetch - system information tool", "", "SYNOPSIS", "  neofetch", "", "DESCRIPTION", "  Display system info with the Icy Bear ASCII art."],
  };
  const page = pages[args[0]];
  if (!page) return [{ content: `No manual entry for ${args[0]}`, color: "text-terminal-yellow" }];
  return page.map(l => ({ content: l, color: l === l.toUpperCase() && l.trim() ? "text-terminal-yellow" : "text-foreground" }));
}

export function sortCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: sort <text>", color: "text-terminal-yellow" }];
  const words = args.slice(0).sort();
  return [{ content: words.join("\n"), color: "text-terminal-green" }];
}

export function uniqCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: uniq <text>", color: "text-terminal-yellow" }];
  const unique = [...new Set(args)];
  return [{ content: unique.join(" "), color: "text-terminal-green" }];
}

export function revCmd(args: string[]): OutputLine[] {
  const text = args.join(" ") || "hello";
  return [{ content: text.split("").reverse().join(""), color: "text-terminal-green" }];
}

export function base64Cmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: base64 <text>", color: "text-terminal-yellow" }];
  try {
    const text = args.join(" ");
    return [{ content: btoa(text), color: "text-terminal-green" }];
  } catch {
    return [{ content: "base64: invalid input", color: "text-terminal-red" }];
  }
}

export function md5sumCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: md5sum <text>", color: "text-terminal-yellow" }];
  // Fake but consistent hash
  let hash = 0;
  const str = args.join(" ");
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(32, "0").slice(0, 32);
  return [{ content: `${hex}  ${args[0]}`, color: "text-terminal-green" }];
}

export function sedCmd(args: string[]): OutputLine[] {
  return [{ content: "sed: this is a portfolio, not a text editor. Try 'cat' instead.", color: "text-terminal-yellow" }];
}

export function awkCmd(args: string[]): OutputLine[] {
  return [{ content: "awk: impressive taste in text processing. Try 'grep' for searching.", color: "text-terminal-yellow" }];
}

export function cutCmd(args: string[]): OutputLine[] {
  return [{ content: "cut: try 'grep' or 'cat' to explore content.", color: "text-terminal-yellow" }];
}
