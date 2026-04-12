import { resumeData } from "@/data/resume";

interface OutputLine {
  content: string;
  color?: string;
}

const BEAR_LOGO = [
  "        .--.    .--.         ",
  "       /    \\__/    \\        ",
  "      |  ❄          |       ",
  "      |    ●    ●    |      ",
  "      |      __      |      ",
  "       \\    (  )    /       ",
  "        \\   ''''   /        ",
  "    .----'--------'----.    ",
  "   /  ❄    ICY BEAR   ❄ \\  ",
  "  |  .--.        .--.   |   ",
  "  | /    \\      /    \\  |   ",
  "  | \\    /      \\    /  |   ",
  "  |  '--'        '--'   |   ",
  "   \\    ❄    ❄    ❄    /   ",
  "    '---..______..---'      ",
  "         |      |           ",
  "         |      |           ",
  "        _/      \\_          ",
  "       (__________) ❄       ",
];

const NEOFETCH_INFO = [
  { label: "", value: "mohit@archlinux", color: "text-terminal-green" },
  { label: "", value: "─".repeat(20), color: "text-terminal-dim" },
  { label: "OS", value: "Arch Linux x86_64" },
  { label: "Host", value: "Portfolio v2.0" },
  { label: "Kernel", value: "6.8.1-arch1" },
  { label: "Shell", value: "mohit-sh 2.0" },
  { label: "Terminal", value: "web-tty" },
  { label: "Role", value: "AI Systems Engineer" },
  { label: "Focus", value: "Retrieval Agents / Decision Pipelines" },
  { label: "Location", value: "New Delhi, India" },
  { label: "Uptime", value: "20 years" },
];

const COMMAND_HISTORY: string[] = [];

export function processCommand(cmd: string): OutputLine[] {
  const parts = cmd.trim().split(/\s+/);
  const command = parts[0]?.toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case "help":
      return helpCmd();
    case "about":
    case "whoami":
      return aboutCmd();
    case "skills":
      return skillsCmd();
    case "projects":
      return projectsCmd();
    case "contact":
      return contactCmd();
    case "neofetch":
      return neofetchCmd();
    case "uname":
      if (args.includes("-a")) return [{ content: "Linux archlinux 6.8.1-arch1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" }];
      return [{ content: "Linux" }];
    case "ls":
      return lsCmd(args);
    case "cat":
      return catCmd(args);
    case "pwd":
      return [{ content: "/home/mohit" }];
    case "cd":
      return [{ content: "nowhere to go — you're already home.", color: "text-terminal-dim" }];
    case "date":
      return [{ content: new Date().toString() }];
    case "echo":
      return [{ content: args.join(" ") }];
    case "man":
      return manCmd(args);
    case "grep":
      return grepCmd(args);
    case "history":
      return COMMAND_HISTORY.map((c, i) => ({ content: `  ${i + 1}  ${c}`, color: "text-terminal-dim" }));
    case "tree":
      return treeCmd();
    case "sudo":
      return [{ content: "mohit is not in the sudoers file. This incident will be reported.", color: "text-terminal-red" }];
    case "pacman":
      return pacmanCmd(args);
    case "btw":
      return [{ content: "I use Arch, btw.", color: "text-terminal-cyan" }];
    case "ping":
      return pingCmd(args);
    case "curl":
      return curlCmd(args);
    case "fortune":
      return fortuneCmd();
    case "cowsay":
      return cowsayCmd(args);
    case "matrix":
      return [{ content: "Wake up, Neo... The Matrix has you.", color: "text-terminal-green" }];
    case "exit":
    case "logout":
      return [{ content: "There is no escape. You're in too deep.", color: "text-terminal-yellow" }];
    case "rm":
      if (args.includes("-rf") && args.includes("/")) return [{ content: "Nice try. System protected.", color: "text-terminal-red" }];
      return [{ content: `rm: cannot remove: Permission denied`, color: "text-terminal-red" }];
    case "vim":
    case "nano":
    case "nvim":
      return [{ content: `${command}: read-only filesystem. Try 'cat' instead.`, color: "text-terminal-yellow" }];
    case "gcc":
    case "python":
    case "python3":
    case "node":
      return [{ content: `${command}: this is a portfolio, not a dev environment. But I appreciate the energy.`, color: "text-terminal-yellow" }];
    case "":
      return [];
    default:
      return [{ content: `bash: ${command}: command not found. Try "help" for available commands.`, color: "text-terminal-red" }];
  }
}

function helpCmd(): OutputLine[] {
  const commands = [
    ["about      ", "Who am I and what I do"],
    ["skills     ", "Technical stack breakdown"],
    ["projects   ", "Things I've built"],
    ["contact    ", "How to reach me"],
    ["neofetch   ", "System info, Arch style"],
    ["ls [-la]   ", "List files in current directory"],
    ["cat <file> ", "Read a file"],
    ["tree       ", "Directory structure"],
    ["grep <term>", "Search across all sections"],
    ["man <cmd>  ", "Manual for a command"],
    ["history    ", "Command history"],
    ["echo <msg> ", "Print a message"],
    ["fortune    ", "Random wisdom"],
    ["cowsay <m> ", "Moo"],
    ["pacman -S  ", "Install knowledge"],
    ["ping <host>", "Check connectivity"],
    ["curl <url> ", "Fetch a resource"],
    ["btw        ", "You already know"],
    ["clear      ", "Clear the terminal"],
    ["help       ", "This message"],
  ];

  return [
    { content: "╔══════════════════════════════════════════════════╗", color: "text-terminal-blue" },
    { content: "║       mohit-sh v2.0 — Available Commands        ║", color: "text-terminal-blue" },
    { content: "╚══════════════════════════════════════════════════╝", color: "text-terminal-blue" },
    { content: "" },
    ...commands.map((c) => ({
      content: `  ${c[0]}  ${c[1]}`,
      color: "text-foreground",
    })),
    { content: "" },
    { content: "  Tab completion and history (Up/Down) supported.", color: "text-terminal-dim" },
    { content: "  Try: cat about.txt | grep skills | man projects", color: "text-terminal-dim" },
  ];
}

function aboutCmd(): OutputLine[] {
  return [
    { content: "┌─ About ──────────────────────────────────────────┐", color: "text-terminal-cyan" },
    { content: "" },
    { content: `  ${resumeData.name}`, color: "text-terminal-green" },
    { content: `  ${resumeData.tagline}`, color: "text-terminal-yellow" },
    { content: "" },
    { content: `  ${resumeData.summary}` },
    { content: "" },
    { content: `  Location: ${resumeData.location}`, color: "text-terminal-dim" },
    { content: "" },
    { content: "└───────────────────────────────────────────────────┘", color: "text-terminal-cyan" },
  ];
}

function skillsCmd(): OutputLine[] {
  const lines: OutputLine[] = [
    { content: "┌─ Tech Stack ──────────────────────────────────────┐", color: "text-terminal-cyan" },
    { content: "" },
  ];

  for (const [category, items] of Object.entries(resumeData.skills)) {
    lines.push({ content: `  ${category}:`, color: "text-terminal-yellow" });
    lines.push({ content: `    ${(items as string[]).join(" | ")}`, color: "text-terminal-green" });
    lines.push({ content: "" });
  }

  lines.push({ content: "└────────────────────────────────────────────────────┘", color: "text-terminal-cyan" });
  return lines;
}

function projectsCmd(): OutputLine[] {
  const lines: OutputLine[] = [
    { content: "┌─ Projects ────────────────────────────────────────┐", color: "text-terminal-cyan" },
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
  lines.push({ content: "└────────────────────────────────────────────────────┘", color: "text-terminal-cyan" });
  return lines;
}

function contactCmd(): OutputLine[] {
  return [
    { content: "┌─ Contact ─────────────────────────────────────────┐", color: "text-terminal-cyan" },
    { content: "" },
    { content: `  Email:    ${resumeData.email}`, color: "text-terminal-green" },
    { content: `  GitHub:   ${resumeData.github}`, color: "text-terminal-blue" },
    { content: `  LinkedIn: ${resumeData.linkedin}`, color: "text-terminal-blue" },
    { content: `  Phone:    ${resumeData.phone}`, color: "text-terminal-dim" },
    { content: "" },
    { content: "└────────────────────────────────────────────────────┘", color: "text-terminal-cyan" },
  ];
}

function neofetchCmd(): OutputLine[] {
  const lines: OutputLine[] = [];
  const maxLogo = BEAR_LOGO.length;
  const maxInfo = NEOFETCH_INFO.length;
  const maxLines = Math.max(maxLogo, maxInfo);

  for (let i = 0; i < maxLines; i++) {
    const logo = i < maxLogo ? BEAR_LOGO[i] : " ".repeat(30);
    const info = i < maxInfo ? NEOFETCH_INFO[i] : null;

    let infoStr = "";
    if (info) {
      infoStr = info.label === "" ? info.value : `${info.label}: ${info.value}`;
    }

    lines.push({
      content: `${logo}  ${infoStr}`,
      color: i < maxLogo ? "text-terminal-blue" : "text-foreground",
    });
  }

  lines.push({ content: "" });
  lines.push({ content: "  ███████████████████████████████████████", color: "text-terminal-dim" });
  return lines;
}

function lsCmd(args: string[]): OutputLine[] {
  if (args.includes("-la") || args.includes("-l") || args.includes("-al")) {
    return [
      { content: "total 6", color: "text-terminal-dim" },
      { content: "drwxr-xr-x  mohit mohit  4096  about.txt", color: "text-terminal-green" },
      { content: "-rw-r--r--  mohit mohit  2048  skills.txt", color: "text-terminal-green" },
      { content: "-rw-r--r--  mohit mohit  8192  projects.txt", color: "text-terminal-green" },
      { content: "-rw-r--r--  mohit mohit  1024  contact.txt", color: "text-terminal-green" },
      { content: "-rw-r--r--  mohit mohit   512  .arch-btw", color: "text-terminal-dim" },
      { content: "-rw-r--r--  mohit mohit   256  .vimrc", color: "text-terminal-dim" },
    ];
  }
  return [
    { content: "about.txt  skills.txt  projects.txt  contact.txt", color: "text-terminal-green" },
  ];
}

function catCmd(args: string[]): OutputLine[] {
  if (args.length === 0) return [{ content: "usage: cat <filename>", color: "text-terminal-yellow" }];

  const file = args[0].replace(".txt", "");
  const map: Record<string, () => OutputLine[]> = {
    about: aboutCmd,
    skills: skillsCmd,
    projects: projectsCmd,
    contact: contactCmd,
    ".arch-btw": () => [{ content: "I use Arch, btw.", color: "text-terminal-cyan" }],
    ".vimrc": () => [
      { content: 'set number', color: "text-terminal-dim" },
      { content: 'set relativenumber', color: "text-terminal-dim" },
      { content: 'syntax on', color: "text-terminal-dim" },
      { content: '" btw, I use neovim now', color: "text-terminal-yellow" },
    ],
  };

  if (map[file]) return map[file]();
  return [{ content: `cat: ${args[0]}: No such file or directory`, color: "text-terminal-red" }];
}

function treeCmd(): OutputLine[] {
  return [
    { content: ".", color: "text-terminal-green" },
    { content: "├── about.txt", color: "text-terminal-green" },
    { content: "├── skills.txt", color: "text-terminal-green" },
    { content: "├── projects.txt", color: "text-terminal-green" },
    { content: "├── contact.txt", color: "text-terminal-green" },
    { content: "├── .arch-btw", color: "text-terminal-dim" },
    { content: "└── .vimrc", color: "text-terminal-dim" },
    { content: "" },
    { content: "0 directories, 6 files", color: "text-terminal-dim" },
  ];
}

function manCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "What manual page do you want?", color: "text-terminal-yellow" }];
  const pages: Record<string, string[]> = {
    about: ["NAME", "  about - display portfolio owner info", "", "SYNOPSIS", "  about", "", "DESCRIPTION", "  Shows name, bio, tagline, and location."],
    skills: ["NAME", "  skills - list technical skills", "", "SYNOPSIS", "  skills", "", "DESCRIPTION", "  Displays categorized tech stack."],
    projects: ["NAME", "  projects - show built projects", "", "SYNOPSIS", "  projects", "", "DESCRIPTION", "  Lists projects with descriptions, tech stacks, and links."],
  };
  const page = pages[args[0]];
  if (!page) return [{ content: `No manual entry for ${args[0]}`, color: "text-terminal-yellow" }];
  return page.map(l => ({ content: l, color: l === l.toUpperCase() && l.trim() ? "text-terminal-yellow" : "text-foreground" }));
}

function grepCmd(args: string[]): OutputLine[] {
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

function pacmanCmd(args: string[]): OutputLine[] {
  if (args[0] === "-S" && args[1]) {
    return [
      { content: `resolving dependencies...`, color: "text-terminal-dim" },
      { content: `looking for conflicting packages...`, color: "text-terminal-dim" },
      { content: ``, },
      { content: `Package (1)         New Version`, color: "text-terminal-cyan" },
      { content: `${args[1].padEnd(20)} 1.0.0-1`, },
      { content: ``, },
      { content: `:: Proceed with installation? [Y/n] Y`, color: "text-terminal-yellow" },
      { content: `(1/1) installing ${args[1]}...`, color: "text-terminal-green" },
      { content: `Knowledge upgraded successfully.`, color: "text-terminal-green" },
    ];
  }
  if (args[0] === "-Syu") {
    return [
      { content: `:: Synchronizing package databases...`, color: "text-terminal-blue" },
      { content: `   core is up to date`, color: "text-terminal-dim" },
      { content: `   extra is up to date`, color: "text-terminal-dim" },
      { content: `:: Starting full system upgrade...`, color: "text-terminal-blue" },
      { content: ` there is nothing to do`, color: "text-terminal-green" },
    ];
  }
  return [{ content: "usage: pacman -S <package> | pacman -Syu", color: "text-terminal-yellow" }];
}

function pingCmd(args: string[]): OutputLine[] {
  const host = args[0] || "localhost";
  return [
    { content: `PING ${host} (127.0.0.1) 56(84) bytes of data.`, color: "text-terminal-dim" },
    { content: `64 bytes from ${host}: icmp_seq=1 ttl=64 time=0.042 ms`, color: "text-terminal-green" },
    { content: `64 bytes from ${host}: icmp_seq=2 ttl=64 time=0.038 ms`, color: "text-terminal-green" },
    { content: `64 bytes from ${host}: icmp_seq=3 ttl=64 time=0.041 ms`, color: "text-terminal-green" },
    { content: `--- ${host} ping statistics ---`, color: "text-terminal-dim" },
    { content: `3 packets transmitted, 3 received, 0% packet loss`, color: "text-terminal-green" },
  ];
}

function curlCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: curl <url>", color: "text-terminal-yellow" }];
  return [
    { content: `> GET ${args[0]} HTTP/1.1`, color: "text-terminal-dim" },
    { content: `< HTTP/1.1 200 OK`, color: "text-terminal-green" },
    { content: `< Content-Type: application/json`, color: "text-terminal-dim" },
    { content: `` },
    { content: `{"name":"${resumeData.name}","status":"open to opportunities","stack":"AI/ML"}`, color: "text-terminal-green" },
  ];
}

function fortuneCmd(): OutputLine[] {
  const fortunes = [
    "The best way to predict the future is to build it.",
    "First, solve the problem. Then, write the code.",
    "It works on my machine. Ship my machine.",
    "There are only two hard things: cache invalidation, naming things, and off-by-one errors.",
    "In theory, theory and practice are the same. In practice, they are not.",
    "sudo make me a sandwich.",
    "Weeks of coding can save you hours of planning.",
    "The cloud is just someone else's computer.",
  ];
  return [{ content: `  "${fortunes[Math.floor(Math.random() * fortunes.length)]}"`, color: "text-terminal-yellow" }];
}

function cowsayCmd(args: string[]): OutputLine[] {
  const msg = args.length > 0 ? args.join(" ") : "moo";
  const border = "─".repeat(msg.length + 2);
  return [
    { content: ` ┌${border}┐`, color: "text-foreground" },
    { content: ` │ ${msg} │`, color: "text-foreground" },
    { content: ` └${border}┘`, color: "text-foreground" },
    { content: `        \\   ^__^`, color: "text-terminal-green" },
    { content: `         \\  (oo)\\_______`, color: "text-terminal-green" },
    { content: `            (__)\\       )\\/\\`, color: "text-terminal-green" },
    { content: `                ||----w |`, color: "text-terminal-green" },
    { content: `                ||     ||`, color: "text-terminal-green" },
  ];
}
