import { resumeData } from "@/data/resume";
import { OutputLine } from "./types";

export function aliasCmd(): OutputLine[] {
  return [
    { content: "alias ll='ls -la'", color: "text-terminal-dim" },
    { content: "alias vim='nvim'", color: "text-terminal-dim" },
    { content: "alias gs='git status'", color: "text-terminal-dim" },
    { content: "alias gp='git push'", color: "text-terminal-dim" },
    { content: "alias yeet='git push --force'", color: "text-terminal-yellow" },
    { content: "alias please='sudo'", color: "text-terminal-yellow" },
  ];
}

export function envCmd(): OutputLine[] {
  return [
    { content: "USER=mohit", color: "text-terminal-dim" },
    { content: "HOME=/home/mohit", color: "text-terminal-dim" },
    { content: "SHELL=/bin/bash", color: "text-terminal-dim" },
    { content: "TERM=xterm-256color", color: "text-terminal-dim" },
    { content: "EDITOR=nvim", color: "text-terminal-dim" },
    { content: "LANG=en_US.UTF-8", color: "text-terminal-dim" },
    { content: "PATH=/usr/local/bin:/usr/bin:/bin", color: "text-terminal-dim" },
    { content: "ROLE=AI_Systems_Engineer", color: "text-terminal-green" },
    { content: "MOOD=caffeinated", color: "text-terminal-yellow" },
    { content: "BTW=i_use_arch", color: "text-terminal-cyan" },
  ];
}

export function exportCmd(args: string[]): OutputLine[] {
  if (!args[0]) return envCmd();
  return [{ content: `export: read-only environment`, color: "text-terminal-yellow" }];
}

export function whichCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: which <command>", color: "text-terminal-yellow" }];
  const bins: Record<string, string> = {
    python: "/usr/bin/python3", python3: "/usr/bin/python3", node: "/usr/bin/node",
    nvim: "/usr/bin/nvim", vim: "/usr/bin/vim", git: "/usr/bin/git",
    gcc: "/usr/bin/gcc", bash: "/bin/bash", zsh: "/usr/bin/zsh",
    docker: "/usr/bin/docker", curl: "/usr/bin/curl", wget: "/usr/bin/wget",
  };
  return [{ content: bins[args[0]] || `${args[0]} not found`, color: bins[args[0]] ? "text-terminal-green" : "text-terminal-red" }];
}

export function typeCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: type <command>", color: "text-terminal-yellow" }];
  return [{ content: `${args[0]} is a shell builtin`, color: "text-terminal-dim" }];
}

export function calCmd(): OutputLine[] {
  const now = new Date();
  const month = now.toLocaleString("default", { month: "long" });
  const year = now.getFullYear();
  const firstDay = new Date(year, now.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();
  const today = now.getDate();

  const lines: OutputLine[] = [
    { content: `     ${month} ${year}`, color: "text-terminal-cyan" },
    { content: "Su Mo Tu We Th Fr Sa", color: "text-terminal-dim" },
  ];

  let row = "  ".repeat(firstDay);
  for (let d = 1; d <= daysInMonth; d++) {
    const dayStr = d === today ? `[${d.toString().padStart(2)}]` : d.toString().padStart(2) + " ";
    row += dayStr;
    if ((firstDay + d) % 7 === 0 || d === daysInMonth) {
      lines.push({ content: row, color: d === today || row.includes(`[${today}]`) ? "text-terminal-green" : "text-foreground" });
      row = "";
    }
  }
  return lines;
}

export function exprCmd(args: string[]): OutputLine[] {
  if (args.length < 3) return [{ content: "usage: expr <num> <op> <num>", color: "text-terminal-yellow" }];
  const a = parseFloat(args[0]);
  const op = args[1];
  const b = parseFloat(args[2]);
  if (isNaN(a) || isNaN(b)) return [{ content: "expr: non-numeric argument", color: "text-terminal-red" }];
  let result: number;
  switch (op) {
    case "+": result = a + b; break;
    case "-": result = a - b; break;
    case "*": result = a * b; break;
    case "/": result = b === 0 ? NaN : a / b; break;
    case "%": result = a % b; break;
    default: return [{ content: `expr: unknown operator '${op}'`, color: "text-terminal-red" }];
  }
  if (isNaN(result)) return [{ content: "expr: division by zero", color: "text-terminal-red" }];
  return [{ content: result.toString() }];
}

export function bcCmd(args: string[]): OutputLine[] {
  return exprCmd(args);
}

export function sleepCmd(args: string[]): OutputLine[] {
  return [{ content: "zzz... (sleep is instant here, you're welcome)", color: "text-terminal-dim" }];
}

export function clearHistoryCmd(history: string[]): OutputLine[] {
  history.length = 0;
  return [{ content: "History cleared.", color: "text-terminal-dim" }];
}

export function xdgOpenCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: open <url|file>", color: "text-terminal-yellow" }];
  const target = args[0];
  if (target.startsWith("http")) {
    window.open(target, "_blank");
    return [{ content: `Opening ${target} in browser...`, color: "text-terminal-green" }];
  }
  if (target === "resume.pdf") {
    return [{ content: "resume.pdf: would open in default viewer (not available in terminal)", color: "text-terminal-yellow" }];
  }
  return [{ content: `open: ${target}: No application registered`, color: "text-terminal-red" }];
}

export function gitCmd(args: string[]): OutputLine[] {
  if (!args[0]) {
    return [{ content: "usage: git <command>", color: "text-terminal-yellow" }];
  }
  switch (args[0]) {
    case "status":
      return [
        { content: "On branch main", color: "text-terminal-cyan" },
        { content: "Your branch is up to date with 'origin/main'.", color: "text-terminal-green" },
        { content: "nothing to commit, working tree clean", color: "text-terminal-green" },
      ];
    case "log":
      return [
        { content: "commit a1b2c3d (HEAD -> main, origin/main)", color: "text-terminal-yellow" },
        { content: "Author: Mohit Madan <mohitmadan128@gmail.com>", color: "text-terminal-dim" },
        { content: "Date:   Sat Apr 12 2026 10:00:00 +0530", color: "text-terminal-dim" },
        { content: "", },
        { content: "    feat: deploy portfolio v2.0 with icy bear", color: "text-terminal-green" },
        { content: "", },
        { content: "commit e4f5g6h", color: "text-terminal-yellow" },
        { content: "Author: Mohit Madan <mohitmadan128@gmail.com>", color: "text-terminal-dim" },
        { content: "", },
        { content: "    feat: add AI agent pipeline", color: "text-terminal-green" },
      ];
    case "branch":
      return [
        { content: "* main", color: "text-terminal-green" },
        { content: "  dev", color: "text-terminal-dim" },
        { content: "  feature/neural-engine", color: "text-terminal-dim" },
      ];
    case "remote":
      return [
        { content: `origin\t${resumeData.github} (fetch)`, color: "text-terminal-dim" },
        { content: `origin\t${resumeData.github} (push)`, color: "text-terminal-dim" },
      ];
    case "diff":
      return [{ content: "No changes detected. Portfolio is perfect.", color: "text-terminal-green" }];
    default:
      return [{ content: `git ${args[0]}: read-only repository`, color: "text-terminal-yellow" }];
  }
}

export function dockerCmd(args: string[]): OutputLine[] {
  if (args[0] === "ps") {
    return [
      { content: "CONTAINER ID   IMAGE              STATUS         NAMES", color: "text-terminal-cyan" },
      { content: "a1b2c3d4e5f6   portfolio:latest   Up 20 years    mohit-portfolio", color: "text-terminal-green" },
      { content: "f6e5d4c3b2a1   neural:v2.0        Up 20 years    neural-engine", color: "text-terminal-green" },
    ];
  }
  if (args[0] === "images") {
    return [
      { content: "REPOSITORY     TAG       SIZE", color: "text-terminal-cyan" },
      { content: "portfolio      latest    42MB", color: "text-terminal-green" },
      { content: "neural         v2.0      1.3GB", color: "text-terminal-green" },
      { content: "python         3.12      1.0GB", color: "text-terminal-dim" },
    ];
  }
  return [{ content: "usage: docker ps | docker images", color: "text-terminal-yellow" }];
}

export function makeCmd(args: string[]): OutputLine[] {
  if (args[0] === "love") return [{ content: "make: *** No rule to make target 'love'. Try 'make portfolio'.", color: "text-terminal-yellow" }];
  if (args[0] === "portfolio") {
    return [
      { content: "gcc -O2 -o portfolio main.c", color: "text-terminal-dim" },
      { content: "Portfolio compiled successfully.", color: "text-terminal-green" },
    ];
  }
  if (args[0] === "sandwich") return [{ content: "make: *** Permission denied. Try 'sudo make sandwich'.", color: "text-terminal-red" }];
  return [{ content: "make: *** No targets specified. Try 'make portfolio'.", color: "text-terminal-yellow" }];
}

export function curlApiCmd(): OutputLine[] {
  return [
    { content: JSON.stringify({
      name: resumeData.name,
      role: "AI Systems Engineer",
      skills: Object.keys(resumeData.skills),
      projects: resumeData.projects.length,
      status: "open to opportunities",
      arch_btw: true,
    }, null, 2), color: "text-terminal-green" },
  ];
}
