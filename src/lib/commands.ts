import { resumeData } from "@/data/resume";

interface OutputLine {
  content: string;
  color?: string;
}

const ARCH_LOGO = [
  "                   -`                  ",
  "                  .o+`                 ",
  "                 `ooo/                 ",
  "                `+oooo:                ",
  "               `+oooooo:               ",
  "               -+oooooo+:              ",
  "             `/:-:++oooo+:             ",
  "            `/++++/+++++++:            ",
  "           `/++++++++++++++:           ",
  "          `/+++ooooooooooooo/`         ",
  "         ./ooosssso++osssssso+`        ",
  "        .oossssso-````/ossssss+`       ",
  "       -osssssso.      :ssssssso.      ",
  "      :osssssss/        osssso+++.     ",
  "     /ossssssss/        +ssssooo/-     ",
  "   `/ossssso+/:-        -:/+osssso+-   ",
  "  `+sso+:-`                 `.-/+oso:  ",
  " `++:.                           `-/+/ ",
  " .`                                 `/ ",
];

const NEOFETCH_INFO = [
  { label: "", value: "mohit@archlinux", color: "text-terminal-green" },
  { label: "", value: "─".repeat(20), color: "text-terminal-dim" },
  { label: "OS", value: "Arch Linux x86_64" },
  { label: "Host", value: "Portfolio v1.0" },
  { label: "Kernel", value: "6.8.1-arch1" },
  { label: "Shell", value: "mohit-sh 1.0" },
  { label: "Terminal", value: "web-tty" },
  { label: "Role", value: "CS Undergrad / AI Engineer" },
  { label: "Location", value: "New Delhi, India" },
  { label: "Uptime", value: "20 years" },
];

export function processCommand(cmd: string): OutputLine[] {
  const parts = cmd.trim().split(/\s+/);
  const command = parts[0]?.toLowerCase();
  const args = parts.slice(1);

  switch (command) {
    case "help":
      return helpCmd();
    case "about":
      return aboutCmd();
    case "skills":
      return skillsCmd();
    case "projects":
      return projectsCmd();
    case "education":
      return educationCmd();
    case "certifications":
    case "certs":
      return certsCmd();
    case "contact":
      return contactCmd();
    case "neofetch":
      return neofetchCmd();
    case "whoami":
      return [{ content: "mohit", color: "text-terminal-green" }];
    case "uname":
      return [{ content: "Linux archlinux 6.8.1-arch1 #1 SMP x86_64 GNU/Linux" }];
    case "ls":
      return lsCmd();
    case "cat":
      return catCmd(args);
    case "pwd":
      return [{ content: "/home/mohit" }];
    case "date":
      return [{ content: new Date().toString() }];
    case "sudo":
      return [{ content: "mohit is not in the sudoers file. This incident will be reported. 😏", color: "text-terminal-red" }];
    case "pacman":
      return [{ content: "hint: try 'pacman -Syu skills' to upgrade your knowledge 📦", color: "text-terminal-yellow" }];
    case "btw":
      return [{ content: "I use Arch, btw. 🏔️", color: "text-terminal-cyan" }];
    case "exit":
      return [{ content: "Nice try! You can't escape this terminal. 😄", color: "text-terminal-yellow" }];
    case "":
      return [];
    default:
      return [{ content: `bash: ${command}: command not found. Type "help" for available commands.`, color: "text-terminal-red" }];
  }
}

function helpCmd(): OutputLine[] {
  const commands = [
    ["about      ", "Display summary and bio"],
    ["skills     ", "List technical skills"],
    ["projects   ", "Show project portfolio"],
    ["education  ", "Show education details"],
    ["certs      ", "List certifications"],
    ["contact    ", "Display contact information"],
    ["neofetch   ", "Show system info (Arch style)"],
    ["whoami     ", "Display current user"],
    ["ls         ", "List available sections"],
    ["cat <file> ", "Read a specific section"],
    ["clear      ", "Clear the terminal"],
    ["btw        ", "You know what this is"],
    ["help       ", "Show this help message"],
  ];

  return [
    { content: "╔══════════════════════════════════════════════╗", color: "text-terminal-blue" },
    { content: "║     Available Commands - mohit-sh v1.0      ║", color: "text-terminal-blue" },
    { content: "╚══════════════════════════════════════════════╝", color: "text-terminal-blue" },
    { content: "" },
    ...commands.map((c) => ({
      content: `  ${c[0]}  ${c[1]}`,
      color: "text-foreground",
    })),
    { content: "" },
    { content: "  Tab completion and history (↑/↓) supported.", color: "text-terminal-dim" },
  ];
}

function aboutCmd(): OutputLine[] {
  return [
    { content: "┌─ About Me ─────────────────────────────────┐", color: "text-terminal-cyan" },
    { content: "" },
    { content: `  ${resumeData.name}`, color: "text-terminal-green" },
    { content: `  ${resumeData.location}` },
    { content: "" },
    { content: `  ${resumeData.summary}` },
    { content: "" },
    { content: "└─────────────────────────────────────────────┘", color: "text-terminal-cyan" },
  ];
}

function skillsCmd(): OutputLine[] {
  const lines: OutputLine[] = [
    { content: "┌─ Skills ───────────────────────────────────┐", color: "text-terminal-cyan" },
    { content: "" },
  ];

  for (const [category, items] of Object.entries(resumeData.skills)) {
    lines.push({
      content: `  ${category}:`,
      color: "text-terminal-yellow",
    });
    lines.push({
      content: `    ${(items as string[]).join(" · ")}`,
      color: "text-terminal-green",
    });
    lines.push({ content: "" });
  }

  lines.push({ content: "└─────────────────────────────────────────────┘", color: "text-terminal-cyan" });
  return lines;
}

function projectsCmd(): OutputLine[] {
  const lines: OutputLine[] = [
    { content: "┌─ Projects ─────────────────────────────────┐", color: "text-terminal-cyan" },
    { content: "" },
  ];

  resumeData.projects.forEach((p, i) => {
    lines.push({ content: `  [${i + 1}] ${p.name}`, color: "text-terminal-green" });
    p.bullets.forEach((b) => {
      lines.push({ content: `      • ${b}`, color: "text-foreground" });
    });
    lines.push({ content: "" });
  });

  lines.push({ content: "  Open Source:", color: "text-terminal-yellow" });
  resumeData.openSource.forEach((item) => {
    lines.push({ content: `    • ${item}` });
  });
  lines.push({ content: "" });
  lines.push({ content: "└─────────────────────────────────────────────┘", color: "text-terminal-cyan" });
  return lines;
}

function educationCmd(): OutputLine[] {
  return [
    { content: "┌─ Education ─────────────────────────────────┐", color: "text-terminal-cyan" },
    { content: "" },
    { content: `  🎓 ${resumeData.education.degree}`, color: "text-terminal-green" },
    { content: `     ${resumeData.education.institution}` },
    { content: `     ${resumeData.education.expected}`, color: "text-terminal-yellow" },
    { content: "" },
    { content: "└──────────────────────────────────────────────┘", color: "text-terminal-cyan" },
  ];
}

function certsCmd(): OutputLine[] {
  return [
    { content: "┌─ Certifications ────────────────────────────┐", color: "text-terminal-cyan" },
    { content: "" },
    ...resumeData.certifications.map((c) => ({
      content: `  📜 ${c}`,
      color: "text-terminal-green" as const,
    })),
    { content: "" },
    { content: "└──────────────────────────────────────────────┘", color: "text-terminal-cyan" },
  ];
}

function contactCmd(): OutputLine[] {
  return [
    { content: "┌─ Contact ───────────────────────────────────┐", color: "text-terminal-cyan" },
    { content: "" },
    { content: `  📧 Email:    ${resumeData.email}`, color: "text-terminal-green" },
    { content: `  📱 Phone:    ${resumeData.phone}` },
    { content: `  🐙 GitHub:   ${resumeData.github}`, color: "text-terminal-blue" },
    { content: `  💼 LinkedIn: ${resumeData.linkedin}`, color: "text-terminal-blue" },
    { content: "" },
    { content: "└─────────────────────────────────────────────┘", color: "text-terminal-cyan" },
  ];
}

function neofetchCmd(): OutputLine[] {
  const lines: OutputLine[] = [];
  const maxLogo = ARCH_LOGO.length;
  const maxInfo = NEOFETCH_INFO.length;
  const maxLines = Math.max(maxLogo, maxInfo);

  for (let i = 0; i < maxLines; i++) {
    const logo = i < maxLogo ? ARCH_LOGO[i] : " ".repeat(40);
    const info = i < maxInfo ? NEOFETCH_INFO[i] : null;

    let infoStr = "";
    let color = "text-foreground";

    if (info) {
      if (info.label === "") {
        infoStr = info.value;
        color = info.color || "text-foreground";
      } else {
        infoStr = `${info.label}: ${info.value}`;
        color = "text-foreground";
      }
    }

    // We'll combine logo + info into one line
    lines.push({
      content: `${logo}  ${info?.label && info.label !== "" ? "" : ""}${infoStr}`,
      color: i < maxLogo ? "text-terminal-blue" : color,
    });
  }

  // Color palette bar
  lines.push({ content: "" });
  lines.push({
    content: "  ███████████████████████████████████████",
    color: "text-terminal-dim",
  });

  return lines;
}

function lsCmd(): OutputLine[] {
  return [
    {
      content: "about.txt  skills.txt  projects.txt  education.txt  certs.txt  contact.txt",
      color: "text-terminal-green",
    },
  ];
}

function catCmd(args: string[]): OutputLine[] {
  if (args.length === 0) {
    return [{ content: "usage: cat <filename>", color: "text-terminal-yellow" }];
  }

  const file = args[0].replace(".txt", "");
  const map: Record<string, () => OutputLine[]> = {
    about: aboutCmd,
    skills: skillsCmd,
    projects: projectsCmd,
    education: educationCmd,
    certs: certsCmd,
    certifications: certsCmd,
    contact: contactCmd,
  };

  if (map[file]) return map[file]();
  return [{ content: `cat: ${args[0]}: No such file or directory`, color: "text-terminal-red" }];
}
