import { resumeData } from "@/data/resume";
import { OutputLine } from "./types";
import { BEAR_LOGO, NEOFETCH_INFO } from "./ascii";

export function neofetchCmd(): OutputLine[] {
  const lines: OutputLine[] = [];
  const maxLogo = BEAR_LOGO.length;
  const maxInfo = NEOFETCH_INFO.length;
  const maxLines = Math.max(maxLogo, maxInfo);

  for (let i = 0; i < maxLines; i++) {
    const logo = i < maxLogo ? BEAR_LOGO[i] : " ".repeat(28);
    const info = i < maxInfo ? NEOFETCH_INFO[i] : null;
    let infoStr = "";
    if (info) {
      infoStr = info.label === "" ? info.value : `${info.label}: ${info.value}`;
    }
    lines.push({
      content: `${logo}  ${infoStr}`,
      color: i < maxLogo ? "text-terminal-cyan" : "text-foreground",
    });
  }
  lines.push({ content: "" });
  lines.push({ content: "  \u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588\u2588", color: "text-terminal-dim" });
  return lines;
}

export function uptimeCmd(): OutputLine[] {
  const now = new Date();
  return [{ content: ` ${now.toLocaleTimeString()} up 20 years, 3 users, load average: 0.42, 0.37, 0.31`, color: "text-terminal-dim" }];
}

export function unameCmd(args: string[]): OutputLine[] {
  if (args.includes("-a")) return [{ content: "Linux archlinux 6.8.1-arch1 #1 SMP PREEMPT_DYNAMIC x86_64 GNU/Linux" }];
  if (args.includes("-r")) return [{ content: "6.8.1-arch1" }];
  if (args.includes("-m")) return [{ content: "x86_64" }];
  if (args.includes("-n")) return [{ content: "archlinux" }];
  return [{ content: "Linux" }];
}

export function hostnameCmd(): OutputLine[] {
  return [{ content: "archlinux" }];
}

export function idCmd(): OutputLine[] {
  return [{ content: "uid=1000(mohit) gid=1000(mohit) groups=1000(mohit),998(wheel),996(docker)" }];
}

export function wCmd(): OutputLine[] {
  const now = new Date();
  return [
    { content: ` ${now.toLocaleTimeString()} up 20 years, 3 users, load average: 0.42, 0.37, 0.31`, color: "text-terminal-dim" },
    { content: "USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT", color: "text-terminal-cyan" },
    { content: "mohit    tty1     -                10:00    0.00s  0.01s  0.00s portfolio", color: "text-terminal-green" },
    { content: "visitor  pts/0    web-browser      now      0.00s  0.00s  0.00s -bash", color: "text-terminal-yellow" },
  ];
}

export function topCmd(): OutputLine[] {
  return [
    { content: "top - load average: 0.42, 0.37, 0.31", color: "text-terminal-cyan" },
    { content: "Tasks:  42 total,   2 running,  40 sleeping", color: "text-terminal-dim" },
    { content: "%Cpu(s):  3.2 us,  1.1 sy,  0.0 ni, 95.7 id", color: "text-terminal-dim" },
    { content: "MiB Mem:  16384.0 total,  12288.0 free,  3072.0 used", color: "text-terminal-dim" },
    { content: "" },
    { content: "  PID USER      PR  NI    VIRT    RES  COMMAND", color: "text-terminal-yellow" },
    { content: "    1 mohit     20   0  168.2M  12.4M  portfolio-server", color: "text-terminal-green" },
    { content: "   42 mohit     20   0   84.1M   6.2M  neural-engine", color: "text-terminal-green" },
    { content: "  137 mohit     20   0   42.0M   3.1M  creativity-daemon", color: "text-terminal-green" },
    { content: "  256 mohit     20   0   21.0M   1.5M  coffee-watcher", color: "text-terminal-yellow" },
    { content: " 1337 mohit     20   0   16.0M   1.0M  arch-btw-service", color: "text-terminal-cyan" },
  ];
}

export function psCmd(args: string[]): OutputLine[] {
  if (args.includes("aux") || args.includes("-aux") || args.includes("-ef")) {
    return [
      { content: "USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   COMMAND", color: "text-terminal-cyan" },
      { content: "mohit        1  0.0  0.1 168200 12400 ?        Ss   10:00   /usr/bin/portfolio", color: "text-foreground" },
      { content: "mohit       42  2.1  0.4  84100  6200 ?        S    10:00   neural-engine --mode=creative", color: "text-foreground" },
      { content: "mohit      137  0.5  0.2  42000  3100 ?        S    10:00   creativity-daemon", color: "text-foreground" },
      { content: "mohit      256  0.1  0.1  21000  1500 ?        S    10:00   coffee-watcher --refill=auto", color: "text-foreground" },
      { content: "mohit     1337  0.0  0.0  16000  1000 ?        S    10:00   arch-btw-service", color: "text-foreground" },
      { content: "visitor   9999  0.0  0.0   8000   500 pts/0    R+   now     bash", color: "text-terminal-green" },
    ];
  }
  return [
    { content: "  PID TTY          TIME CMD", color: "text-terminal-cyan" },
    { content: " 9999 pts/0    00:00:00 bash", color: "text-foreground" },
  ];
}

export function killCmd(args: string[]): OutputLine[] {
  return [{ content: "kill: nice try, but these processes are immortal.", color: "text-terminal-red" }];
}

export function freeCmd(): OutputLine[] {
  return [
    { content: "              total        used        free      shared  buff/cache   available", color: "text-terminal-cyan" },
    { content: "Mem:       16777216     4194304    10485760     1048576     2097152    12582912", color: "text-foreground" },
    { content: "Swap:       4194304           0     4194304", color: "text-foreground" },
  ];
}

export function lscpuCmd(): OutputLine[] {
  return [
    { content: "Architecture:          x86_64", color: "text-terminal-dim" },
    { content: "CPU(s):                8", color: "text-terminal-dim" },
    { content: "Model name:            Neural Engine v2.0 @ 3.6GHz", color: "text-terminal-green" },
    { content: "Thread(s) per core:    2", color: "text-terminal-dim" },
    { content: "L1d cache:             256 KiB", color: "text-terminal-dim" },
    { content: "L2 cache:              4 MiB", color: "text-terminal-dim" },
    { content: "L3 cache:              16 MiB", color: "text-terminal-dim" },
  ];
}

export function pacmanCmd(args: string[]): OutputLine[] {
  if (args[0] === "-S" && args[1]) {
    return [
      { content: "resolving dependencies...", color: "text-terminal-dim" },
      { content: "looking for conflicting packages...", color: "text-terminal-dim" },
      { content: "" },
      { content: "Package (1)         New Version", color: "text-terminal-cyan" },
      { content: `${args[1].padEnd(20)} 1.0.0-1` },
      { content: "" },
      { content: ":: Proceed with installation? [Y/n] Y", color: "text-terminal-yellow" },
      { content: `(1/1) installing ${args[1]}...`, color: "text-terminal-green" },
      { content: "Knowledge upgraded successfully.", color: "text-terminal-green" },
    ];
  }
  if (args[0] === "-Syu") {
    return [
      { content: ":: Synchronizing package databases...", color: "text-terminal-blue" },
      { content: "   core is up to date", color: "text-terminal-dim" },
      { content: "   extra is up to date", color: "text-terminal-dim" },
      { content: "   community is up to date", color: "text-terminal-dim" },
      { content: ":: Starting full system upgrade...", color: "text-terminal-blue" },
      { content: " there is nothing to do", color: "text-terminal-green" },
    ];
  }
  if (args[0] === "-Ss" && args[1]) {
    return [
      { content: `extra/${args[1]} 1.0.0-1`, color: "text-terminal-magenta" },
      { content: `    A knowledge package about ${args[1]}`, color: "text-terminal-dim" },
    ];
  }
  if (args[0] === "-Qi" && args[1]) {
    return [
      { content: `Name            : ${args[1]}`, color: "text-terminal-cyan" },
      { content: `Version         : 1.0.0-1` },
      { content: `Description     : ${args[1]} knowledge module` },
      { content: `Installed Size  : 42.0 KiB` },
      { content: `Install Reason  : Explicitly installed` },
    ];
  }
  if (args[0] === "-Q") {
    return [
      { content: "python 3.12.0-1", color: "text-terminal-green" },
      { content: "pytorch 2.2.0-1", color: "text-terminal-green" },
      { content: "langchain 0.1.0-1", color: "text-terminal-green" },
      { content: "faiss 1.7.4-1", color: "text-terminal-green" },
      { content: "neovim 0.9.5-1", color: "text-terminal-green" },
      { content: "git 2.44.0-1", color: "text-terminal-green" },
      { content: "docker 25.0.3-1", color: "text-terminal-green" },
      { content: "curiosity 99.9.9-1", color: "text-terminal-cyan" },
    ];
  }
  return [{ content: "usage: pacman -S <pkg> | -Syu | -Ss <pkg> | -Qi <pkg> | -Q", color: "text-terminal-yellow" }];
}

export function systemctlCmd(args: string[]): OutputLine[] {
  if (args[0] === "status" && args[1]) {
    return [
      { content: `\u25CF ${args[1]}.service - ${args[1]}`, color: "text-terminal-green" },
      { content: `   Loaded: loaded (/usr/lib/systemd/system/${args[1]}.service; enabled)`, color: "text-terminal-dim" },
      { content: `   Active: active (running) since startup`, color: "text-terminal-green" },
      { content: `   Main PID: 42 (${args[1]})`, color: "text-terminal-dim" },
    ];
  }
  if (args[0] === "list-units") {
    return [
      { content: "UNIT                    LOAD   ACTIVE SUB     DESCRIPTION", color: "text-terminal-cyan" },
      { content: "portfolio.service       loaded active running Portfolio Server", color: "text-terminal-green" },
      { content: "neural-engine.service   loaded active running Neural Engine", color: "text-terminal-green" },
      { content: "creativity.service      loaded active running Creativity Daemon", color: "text-terminal-green" },
      { content: "coffee.timer            loaded active waiting Coffee Refill Timer", color: "text-terminal-yellow" },
    ];
  }
  return [{ content: "usage: systemctl status <service> | list-units", color: "text-terminal-yellow" }];
}

export function journalctlCmd(args: string[]): OutputLine[] {
  return [
    { content: "-- Journal begins at boot, ends at now --", color: "text-terminal-dim" },
    { content: "Apr 12 10:00:01 archlinux portfolio[1]: Server started on port 443", color: "text-terminal-green" },
    { content: "Apr 12 10:00:02 archlinux neural-engine[42]: ML models loaded", color: "text-terminal-green" },
    { content: "Apr 12 10:00:03 archlinux portfolio[1]: Visitor connected from web", color: "text-terminal-cyan" },
    { content: `Apr 12 ${new Date().toLocaleTimeString()} archlinux portfolio[1]: Serving terminal to visitor`, color: "text-terminal-green" },
  ];
}
