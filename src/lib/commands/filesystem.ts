import { OutputLine } from "./types";
import { aboutCmd, skillsCmd, projectsCmd, experienceCmd, contactCmd } from "./portfolio";

export function lsCmd(args: string[]): OutputLine[] {
  if (args.includes("-la") || args.includes("-l") || args.includes("-al") || args.includes("-lah")) {
    return [
      { content: "total 42K", color: "text-terminal-dim" },
      { content: "drwxr-xr-x 5 mohit mohit 4.0K Apr 12 10:00 .", color: "text-terminal-blue" },
      { content: "drwxr-xr-x 3 root  root  4.0K Apr 12 09:00 ..", color: "text-terminal-blue" },
      { content: "-rw-r--r-- 1 mohit mohit  512 Apr 12 10:00 .arch-btw", color: "text-terminal-dim" },
      { content: "-rw------- 1 mohit mohit 1.2K Apr 12 10:00 .bash_history", color: "text-terminal-dim" },
      { content: "-rw-r--r-- 1 mohit mohit  220 Apr 12 09:00 .bashrc", color: "text-terminal-dim" },
      { content: "drwxr-xr-x 2 mohit mohit 4.0K Apr 12 10:00 .config", color: "text-terminal-blue" },
      { content: "-rw-r--r-- 1 mohit mohit  256 Apr 12 10:00 .gitconfig", color: "text-terminal-dim" },
      { content: "drwx------ 2 mohit mohit 4.0K Apr 12 10:00 .ssh", color: "text-terminal-blue" },
      { content: "-rw-r--r-- 1 mohit mohit  256 Apr 12 10:00 .vimrc", color: "text-terminal-dim" },
      { content: "-rw-r--r-- 1 mohit mohit 4.0K Apr 12 10:00 about.txt", color: "text-terminal-green" },
      { content: "-rw-r--r-- 1 mohit mohit 1.0K Apr 12 10:00 contact.txt", color: "text-terminal-green" },
      { content: "-rw-r--r-- 1 mohit mohit 8.0K Apr 12 10:00 projects.txt", color: "text-terminal-green" },
      { content: "-rw-r--r-- 1 mohit mohit  512 Apr 12 10:00 resume.pdf", color: "text-terminal-magenta" },
      { content: "-rw-r--r-- 1 mohit mohit 2.0K Apr 12 10:00 skills.txt", color: "text-terminal-green" },
    ];
  }
  if (args.includes("-a")) {
    return [
      { content: ".  ..  .arch-btw  .bash_history  .bashrc  .config  .gitconfig  .ssh  .vimrc", color: "text-terminal-dim" },
      { content: "about.txt  contact.txt  projects.txt  resume.pdf  skills.txt", color: "text-terminal-green" },
    ];
  }
  return [
    { content: "about.txt  contact.txt  projects.txt  resume.pdf  skills.txt", color: "text-terminal-green" },
  ];
}

export function catCmd(args: string[]): OutputLine[] {
  if (args.length === 0) return [{ content: "usage: cat <filename>", color: "text-terminal-yellow" }];
  const file = args[0].replace(".txt", "").replace("./", "");
  const map: Record<string, () => OutputLine[]> = {
    about: aboutCmd,
    skills: skillsCmd,
    experience: experienceCmd,
    projects: projectsCmd,
    contact: contactCmd,
    ".arch-btw": () => [{ content: "I use Arch, btw.", color: "text-terminal-cyan" }],
    ".vimrc": () => [
      { content: 'set number', color: "text-terminal-dim" },
      { content: 'set relativenumber', color: "text-terminal-dim" },
      { content: 'set tabstop=4', color: "text-terminal-dim" },
      { content: 'set shiftwidth=4', color: "text-terminal-dim" },
      { content: 'syntax on', color: "text-terminal-dim" },
      { content: 'colorscheme nord', color: "text-terminal-dim" },
      { content: '" btw, I use neovim now', color: "text-terminal-yellow" },
    ],
    ".bashrc": () => [
      { content: 'export PS1="[\\u@\\h \\W]\\$ "', color: "text-terminal-dim" },
      { content: 'alias ll="ls -la"', color: "text-terminal-dim" },
      { content: 'alias vim="nvim"', color: "text-terminal-dim" },
      { content: 'alias gs="git status"', color: "text-terminal-dim" },
      { content: 'export PATH="$HOME/.local/bin:$PATH"', color: "text-terminal-dim" },
      { content: 'neofetch', color: "text-terminal-green" },
    ],
    ".gitconfig": () => [
      { content: '[user]', color: "text-terminal-yellow" },
      { content: '    name = Mohit Madan', color: "text-terminal-dim" },
      { content: '    email = mohitmadan128@gmail.com', color: "text-terminal-dim" },
      { content: '[core]', color: "text-terminal-yellow" },
      { content: '    editor = nvim', color: "text-terminal-dim" },
      { content: '[alias]', color: "text-terminal-yellow" },
      { content: '    co = checkout', color: "text-terminal-dim" },
      { content: '    br = branch', color: "text-terminal-dim" },
      { content: '    st = status', color: "text-terminal-dim" },
    ],
    "resume": () => [{ content: "resume.pdf: binary file, use 'open resume.pdf' to download", color: "text-terminal-yellow" }],
    "resume.pdf": () => [{ content: "resume.pdf: binary file, use 'open resume.pdf' to download", color: "text-terminal-yellow" }],
  };
  if (map[file]) return map[file]();
  return [{ content: `cat: ${args[0]}: No such file or directory`, color: "text-terminal-red" }];
}

export function treeCmd(): OutputLine[] {
  return [
    { content: "/home/mohit", color: "text-terminal-blue" },
    { content: "\u251C\u2500\u2500 .arch-btw", color: "text-terminal-dim" },
    { content: "\u251C\u2500\u2500 .bash_history", color: "text-terminal-dim" },
    { content: "\u251C\u2500\u2500 .bashrc", color: "text-terminal-dim" },
    { content: "\u251C\u2500\u2500 .config/", color: "text-terminal-blue" },
    { content: "\u2502   \u251C\u2500\u2500 i3/config", color: "text-terminal-dim" },
    { content: "\u2502   \u251C\u2500\u2500 nvim/init.lua", color: "text-terminal-dim" },
    { content: "\u2502   \u2514\u2500\u2500 alacritty/alacritty.yml", color: "text-terminal-dim" },
    { content: "\u251C\u2500\u2500 .gitconfig", color: "text-terminal-dim" },
    { content: "\u251C\u2500\u2500 .ssh/", color: "text-terminal-blue" },
    { content: "\u2502   \u2514\u2500\u2500 authorized_keys", color: "text-terminal-dim" },
    { content: "\u251C\u2500\u2500 .vimrc", color: "text-terminal-dim" },
    { content: "\u251C\u2500\u2500 about.txt", color: "text-terminal-green" },
    { content: "\u251C\u2500\u2500 contact.txt", color: "text-terminal-green" },
    { content: "\u251C\u2500\u2500 projects.txt", color: "text-terminal-green" },
    { content: "\u251C\u2500\u2500 resume.pdf", color: "text-terminal-magenta" },
    { content: "\u2514\u2500\u2500 skills.txt", color: "text-terminal-green" },
    { content: "" },
    { content: "3 directories, 14 files", color: "text-terminal-dim" },
  ];
}

export function headCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: head <filename>", color: "text-terminal-yellow" }];
  const result = catCmd(args);
  return result.slice(0, 5);
}

export function tailCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: tail <filename>", color: "text-terminal-yellow" }];
  const result = catCmd(args);
  return result.slice(-5);
}

export function wcCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: wc <filename>", color: "text-terminal-yellow" }];
  const result = catCmd(args);
  const lineCount = result.length;
  const wordCount = result.reduce((acc, l) => acc + l.content.split(/\s+/).filter(Boolean).length, 0);
  const charCount = result.reduce((acc, l) => acc + l.content.length, 0);
  return [{ content: `  ${lineCount}  ${wordCount}  ${charCount} ${args[0]}` }];
}

export function findCmd(args: string[]): OutputLine[] {
  const files = [
    "/home/mohit/about.txt", "/home/mohit/skills.txt", "/home/mohit/projects.txt",
    "/home/mohit/contact.txt", "/home/mohit/resume.pdf", "/home/mohit/.arch-btw",
    "/home/mohit/.vimrc", "/home/mohit/.bashrc", "/home/mohit/.gitconfig",
    "/home/mohit/.config/i3/config", "/home/mohit/.config/nvim/init.lua",
    "/home/mohit/.config/alacritty/alacritty.yml", "/home/mohit/.ssh/authorized_keys",
  ];
  if (args.length === 0) return files.map(f => ({ content: f, color: "text-terminal-green" }));
  const nameIdx = args.indexOf("-name");
  if (nameIdx !== -1 && args[nameIdx + 1]) {
    const pattern = args[nameIdx + 1].replace(/\*/g, ".*").replace(/\?/g, ".");
    const regex = new RegExp(pattern, "i");
    const matched = files.filter(f => regex.test(f.split("/").pop() || ""));
    if (matched.length === 0) return [{ content: "No files found.", color: "text-terminal-yellow" }];
    return matched.map(f => ({ content: f, color: "text-terminal-green" }));
  }
  return files.map(f => ({ content: f, color: "text-terminal-green" }));
}

export function duCmd(args: string[]): OutputLine[] {
  return [
    { content: "4.0K\t./.ssh", color: "text-terminal-dim" },
    { content: "12K\t./.config", color: "text-terminal-dim" },
    { content: "42K\t.", color: "text-terminal-green" },
  ];
}

export function dfCmd(): OutputLine[] {
  return [
    { content: "Filesystem     Size  Used Avail Use% Mounted on", color: "text-terminal-cyan" },
    { content: "/dev/sda1       50G   12G   38G  24% /", color: "text-foreground" },
    { content: "tmpfs          7.8G     0  7.8G   0% /dev/shm", color: "text-foreground" },
    { content: "/dev/sda2      450G  200G  250G  45% /home", color: "text-foreground" },
  ];
}

export function chmodCmd(args: string[]): OutputLine[] {
  return [{ content: "chmod: changing permissions: Operation not permitted (read-only portfolio)", color: "text-terminal-red" }];
}

export function mkdirCmd(args: string[]): OutputLine[] {
  return [{ content: "mkdir: cannot create directory: Read-only file system", color: "text-terminal-red" }];
}

export function touchCmd(args: string[]): OutputLine[] {
  return [{ content: "touch: cannot touch: Read-only file system", color: "text-terminal-red" }];
}

export function cpCmd(args: string[]): OutputLine[] {
  return [{ content: "cp: cannot copy: Read-only file system", color: "text-terminal-red" }];
}

export function mvCmd(args: string[]): OutputLine[] {
  return [{ content: "mv: cannot move: Read-only file system", color: "text-terminal-red" }];
}

export function statCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: stat <filename>", color: "text-terminal-yellow" }];
  return [
    { content: `  File: ${args[0]}`, color: "text-terminal-green" },
    { content: `  Size: 4096\tBlocks: 8\tIO Block: 4096\tregular file`, color: "text-terminal-dim" },
    { content: `  Access: (0644/-rw-r--r--)\tUid: (1000/mohit)\tGid: (1000/mohit)`, color: "text-terminal-dim" },
    { content: `  Modify: 2026-04-12 10:00:00.000000000 +0530`, color: "text-terminal-dim" },
  ];
}

export function fileCmd(args: string[]): OutputLine[] {
  if (!args[0]) return [{ content: "usage: file <filename>", color: "text-terminal-yellow" }];
  const ext = args[0].split(".").pop();
  const types: Record<string, string> = {
    txt: "ASCII text", pdf: "PDF document, version 1.7", py: "Python script, ASCII text",
    sh: "Bourne-Again shell script, ASCII text",
  };
  return [{ content: `${args[0]}: ${types[ext || ""] || "ASCII text"}` }];
}
