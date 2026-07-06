import { OutputLine } from "./commands/types";
import { aboutCmd, skillsCmd, projectsCmd, experienceCmd, contactCmd } from "./commands/portfolio";
import { neofetchCmd, uptimeCmd, unameCmd, hostnameCmd, idCmd, wCmd, topCmd, psCmd, killCmd, freeCmd, lscpuCmd, pacmanCmd, systemctlCmd, journalctlCmd } from "./commands/system";
import { lsCmd, catCmd, treeCmd, headCmd, tailCmd, wcCmd, findCmd, duCmd, dfCmd, chmodCmd, mkdirCmd, touchCmd, cpCmd, mvCmd, statCmd, fileCmd } from "./commands/filesystem";
import { pingCmd, curlCmd, wgetCmd, sshCmd, ifconfigCmd, ipCmd, digCmd, tracerouteCmd, netstatCmd, ssCmd } from "./commands/network";
import { fortuneCmd, cowsayCmd, slCmd, cmatrixCmd, figletCmd, jokeCmd, factCmd } from "./commands/fun";
import { grepCmd, manCmd, sortCmd, uniqCmd, revCmd, base64Cmd, md5sumCmd, sedCmd, awkCmd, cutCmd } from "./commands/text";
import { aliasCmd, envCmd, exportCmd, whichCmd, typeCmd, calCmd, exprCmd, bcCmd, sleepCmd, xdgOpenCmd, gitCmd, dockerCmd, makeCmd } from "./commands/misc";

export { type OutputLine } from "./commands/types";

const COMMAND_HISTORY: string[] = [];

export function getCommandHistory(): string[] {
  return COMMAND_HISTORY;
}

export function processCommand(cmd: string): OutputLine[] {
  const parts = cmd.trim().split(/\s+/);
  const command = parts[0]?.toLowerCase();
  const args = parts.slice(1);

  COMMAND_HISTORY.push(cmd);

  switch (command) {
    // Portfolio
    case "help": return helpCmd();
    case "about": case "whoami": return aboutCmd();
    case "skills": return skillsCmd();
    case "experience": return experienceCmd();
    case "projects": return projectsCmd();
    case "contact": return contactCmd();
    case "neofetch": return neofetchCmd();

    // Filesystem
    case "ls": case "ll": return lsCmd(args.length === 0 && command === "ll" ? ["-la"] : args);
    case "cat": return catCmd(args);
    case "tree": return treeCmd();
    case "pwd": return [{ content: "/home/mohit" }];
    case "cd": return [{ content: "nowhere to go \u2014 you're already home.", color: "text-terminal-dim" }];
    case "head": return headCmd(args);
    case "tail": return tailCmd(args);
    case "wc": return wcCmd(args);
    case "find": return findCmd(args);
    case "du": return duCmd(args);
    case "df": return dfCmd();
    case "chmod": return chmodCmd(args);
    case "mkdir": return mkdirCmd(args);
    case "touch": return touchCmd(args);
    case "cp": return cpCmd(args);
    case "mv": return mvCmd(args);
    case "stat": return statCmd(args);
    case "file": return fileCmd(args);
    case "rm": 
      if (args.includes("-rf") && (args.includes("/") || args.includes("/*"))) return [{ content: "Nice try. System protected by icy bear.", color: "text-terminal-red" }];
      return [{ content: "rm: cannot remove: Read-only file system", color: "text-terminal-red" }];

    // System
    case "uname": return unameCmd(args);
    case "uptime": return uptimeCmd();
    case "hostname": return hostnameCmd();
    case "id": return idCmd();
    case "w": return wCmd();
    case "top": case "htop": return topCmd();
    case "ps": return psCmd(args);
    case "kill": case "killall": case "pkill": return killCmd(args);
    case "free": return freeCmd();
    case "lscpu": return lscpuCmd();
    case "pacman": return pacmanCmd(args);
    case "systemctl": return systemctlCmd(args);
    case "journalctl": return journalctlCmd(args);
    case "sudo": return [{ content: "mohit is not in the sudoers file. This incident will be reported.", color: "text-terminal-red" }];
    case "su": return [{ content: "su: Authentication failure. You are not root.", color: "text-terminal-red" }];
    case "dmesg": return [{ content: "[    0.000000] Linux version 6.8.1-arch1 (mohit@archlinux)", color: "text-terminal-dim" }, { content: "[    0.000001] Icy Bear kernel module loaded.", color: "text-terminal-cyan" }];
    case "lsblk": return [
      { content: "NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINT", color: "text-terminal-cyan" },
      { content: "sda      8:0    0  500G  0 disk", color: "text-terminal-dim" },
      { content: "\u251C\u2500sda1   8:1    0   50G  0 part /", color: "text-terminal-dim" },
      { content: "\u2514\u2500sda2   8:2    0  450G  0 part /home", color: "text-terminal-dim" },
    ];
    case "lsusb": return [{ content: "Bus 001 Device 001: ID 1337:0042 Icy Bear Keyboard", color: "text-terminal-dim" }];
    case "lspci": return [
      { content: "00:00.0 Host bridge: Intel Neural Bridge", color: "text-terminal-dim" },
      { content: "00:02.0 VGA: NVIDIA Imagination RTX 4090", color: "text-terminal-green" },
    ];

    // Network
    case "ping": return pingCmd(args);
    case "curl": return curlCmd(args);
    case "wget": return wgetCmd(args);
    case "ssh": return sshCmd(args);
    case "ifconfig": return ifconfigCmd();
    case "ip": return ipCmd(args);
    case "dig": case "nslookup": return digCmd(args);
    case "traceroute": case "tracepath": return tracerouteCmd(args);
    case "netstat": return netstatCmd();
    case "ss": return ssCmd();

    // Text processing
    case "grep": case "rg": return grepCmd(args);
    case "man": return manCmd(args);
    case "sort": return sortCmd(args);
    case "uniq": return uniqCmd(args);
    case "rev": return revCmd(args);
    case "base64": return base64Cmd(args);
    case "md5sum": case "sha256sum": return md5sumCmd(args);
    case "sed": return sedCmd(args);
    case "awk": return awkCmd(args);
    case "cut": return cutCmd(args);

    // Fun
    case "fortune": return fortuneCmd();
    case "cowsay": return cowsayCmd(args);
    case "sl": return slCmd();
    case "matrix": case "cmatrix": return cmatrixCmd();
    case "figlet": return figletCmd(args);
    case "joke": return jokeCmd();
    case "fact": return factCmd();
    case "lolcat": return [{ content: args.join(" ") || "I use Arch, btw.", color: "text-terminal-magenta" }];
    case "btw": return [{ content: "I use Arch, btw.", color: "text-terminal-cyan" }];

    // Misc
    case "alias": return aliasCmd();
    case "env": case "printenv": return envCmd();
    case "export": return exportCmd(args);
    case "which": case "whereis": return whichCmd(args);
    case "type": return typeCmd(args);
    case "cal": case "calendar": return calCmd();
    case "expr": return exprCmd(args);
    case "bc": return bcCmd(args);
    case "sleep": return sleepCmd(args);
    case "open": case "xdg-open": return xdgOpenCmd(args);
    case "git": return gitCmd(args);
    case "docker": return dockerCmd(args);
    case "make": return makeCmd(args);
    case "date": return [{ content: new Date().toString() }];
    case "echo": return [{ content: args.join(" ") }];
    case "printf": return [{ content: args.join(" ").replace(/\\n/g, "\n") }];
    case "history": return COMMAND_HISTORY.map((c, i) => ({ content: `  ${i + 1}  ${c}`, color: "text-terminal-dim" }));
    case "yes": return [{ content: (args[0] || "y").repeat(50).slice(0, 200), color: "text-terminal-green" }];
    case "true": return [{ content: "" }];
    case "false": return [{ content: "1", color: "text-terminal-red" }];
    case "arch": return [{ content: "x86_64" }];
    case "nproc": return [{ content: "8" }];
    case "tty": return [{ content: "/dev/pts/0" }];
    case "groups": return [{ content: "mohit wheel docker" }];
    case "users": return [{ content: "mohit visitor" }];
    case "whoami": return [{ content: "mohit" }];
    case "logname": return [{ content: "mohit" }];

    // Editors
    case "vim": case "nano": case "nvim": case "vi": case "emacs":
      return [{ content: `${command}: read-only filesystem. Try 'cat' instead.`, color: "text-terminal-yellow" }];

    // Languages
    case "gcc": case "g++": case "python": case "python3": case "node": case "npm": case "pip": case "cargo": case "rustc": case "go": case "java": case "javac":
      return [{ content: `${command}: this is a portfolio, not a dev environment. But I appreciate the energy.`, color: "text-terminal-yellow" }];

    // Exit
    case "exit": case "logout": case "quit": case "q":
      return [{ content: "There is no escape. You're in too deep.", color: "text-terminal-yellow" }];

    // Misc responses
    case "reboot": case "shutdown": case "poweroff": case "halt":
      return [{ content: `${command}: Operation not permitted. The icy bear keeps this system alive.`, color: "text-terminal-red" }];
    case "passwd": return [{ content: "passwd: you cannot change the bear's password.", color: "text-terminal-red" }];
    case "crontab": return [{ content: "crontab: 0 * * * * /usr/bin/drink-coffee", color: "text-terminal-dim" }];
    case "xrandr": return [{ content: "Screen 0: 1920x1080, 144Hz, feeling beautiful", color: "text-terminal-dim" }];
    case "screenfetch": return neofetchCmd();
    case "fastfetch": return neofetchCmd();

    case "": return [];
    default:
      return [{ content: `bash: ${command}: command not found. Try "help" for available commands.`, color: "text-terminal-red" }];
  }
}

function helpCmd(): OutputLine[] {
  const sections = [
    { title: "PORTFOLIO", cmds: [
      ["about/whoami", "Who am I"], ["skills", "Tech stack"], ["projects", "Things I built"], ["contact", "Reach me"], ["neofetch", "System info + Icy Bear"],
    ]},
    { title: "FILESYSTEM", cmds: [
      ["ls [-la]", "List files"], ["cat <file>", "Read file"], ["tree", "Directory tree"], ["head/tail", "First/last lines"],
      ["find", "Search files"], ["wc", "Word count"], ["stat", "File info"], ["file", "File type"],
    ]},
    { title: "SYSTEM", cmds: [
      ["uname [-a]", "System info"], ["uptime", "Uptime"], ["top/htop", "Processes"], ["ps aux", "Process list"],
      ["free", "Memory usage"], ["df", "Disk space"], ["lscpu", "CPU info"], ["pacman", "Package mgr"],
      ["systemctl", "Services"], ["journalctl", "System logs"],
    ]},
    { title: "NETWORK", cmds: [
      ["ping <host>", "Ping"], ["curl <url>", "HTTP request"], ["wget <url>", "Download"], ["ifconfig/ip", "Network"],
      ["dig <host>", "DNS lookup"], ["traceroute", "Trace route"], ["netstat/ss", "Connections"],
    ]},
    { title: "TEXT", cmds: [
      ["grep <term>", "Search content"], ["man <cmd>", "Manual pages"], ["sort/uniq", "Sort/dedupe"],
      ["rev <text>", "Reverse text"], ["base64", "Encode"], ["md5sum", "Hash"],
    ]},
    { title: "TOOLS", cmds: [
      ["git <cmd>", "Git commands"], ["docker <cmd>", "Containers"], ["make <target>", "Build"],
      ["cal", "Calendar"], ["expr", "Calculator"], ["which", "Find binary"],
      ["env", "Environment"], ["alias", "Aliases"], ["open <url>", "Open in browser"],
    ]},
    { title: "FUN", cmds: [
      ["fortune", "Random wisdom"], ["cowsay <msg>", "Moo"], ["joke", "Dev humor"], ["fact", "Random fact"],
      ["figlet <text>", "ASCII text"], ["sl", "Choo choo"], ["matrix", "Red pill"], ["btw", "You know"],
    ]},
  ];

  const lines: OutputLine[] = [
    { content: "\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557", color: "text-terminal-blue" },
    { content: "\u2551     mohit-sh v2.0 \u2014 Icy Bear Terminal          \u2551", color: "text-terminal-blue" },
    { content: "\u255A\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255D", color: "text-terminal-blue" },
    { content: "" },
  ];

  for (const section of sections) {
    lines.push({ content: `  ${section.title}`, color: "text-terminal-yellow" });
    for (const [cmd, desc] of section.cmds) {
      lines.push({ content: `    ${cmd.padEnd(16)} ${desc}`, color: "text-foreground" });
    }
    lines.push({ content: "" });
  }

  lines.push({ content: "  Tab completion and history (Up/Down) supported.", color: "text-terminal-dim" });
  lines.push({ content: "  80+ commands available. Go wild.", color: "text-terminal-dim" });
  return lines;
}
