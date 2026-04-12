import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { processCommand } from "@/lib/commands";

interface TerminalLine {
  type: "input" | "output";
  content: string;
  color?: string;
}

const PROMPT = "[mohit@archlinux ~]$ ";

const Terminal = ({ onBoot }: { onBoot?: boolean }) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (onBoot) {
      runBootSequence();
    } else {
      setReady(true);
      setLines([{ type: "output", content: 'Type "help" for available commands.', color: "text-terminal-dim" }]);
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [lines]);

  useEffect(() => {
    if (ready) inputRef.current?.focus();
  }, [ready, lines]);

  const runBootSequence = async () => {
    const bootLines = [
      ":: Booting Arch Linux...",
      "[  OK  ] Started Journal Service.",
      "[  OK  ] Reached target Local File Systems.",
      "[  OK  ] Started Network Manager.",
      "[  OK  ] Reached target Network.",
      "[  OK  ] Loading mohit-portfolio.service...",
      "[  OK  ] Started Portfolio Service.",
      "",
      "Arch Linux 6.8.1-arch1 (tty1)",
      "",
      "archlinux login: mohit",
      "Password: ********",
      "Last login: Sat Apr 5 2026 on tty1",
      "",
    ];

    for (let i = 0; i < bootLines.length; i++) {
      await new Promise((r) => setTimeout(r, i < 7 ? 120 : 60));
      setLines((prev) => [
        ...prev,
        {
          type: "output",
          content: bootLines[i],
          color: bootLines[i].startsWith("[  OK  ]")
            ? "text-terminal-green"
            : bootLines[i].startsWith("::")
            ? "text-terminal-blue"
            : "text-foreground",
        },
      ]);
    }

    // neofetch
    const neofetchOutput = processCommand("neofetch");
    setLines((prev) => [...prev, ...neofetchOutput.map((l) => ({ type: "output" as const, ...l }))]);
    
    await new Promise((r) => setTimeout(r, 200));
    setLines((prev) => [
      ...prev,
      { type: "output", content: "" },
      { type: "output", content: 'Type "help" for available commands.', color: "text-terminal-dim" },
    ]);
    setReady(true);
  };

  const handleSubmit = () => {
    const cmd = input.trim();
    const newLines: TerminalLine[] = [{ type: "input", content: PROMPT + cmd }];

    if (cmd === "clear") {
      setLines([]);
      setInput("");
      return;
    }

    if (cmd) {
      setHistory((prev) => [...prev, cmd]);
      const output = processCommand(cmd);
      newLines.push(...output.map((l) => ({ type: "output" as const, ...l })));
    }

    setLines((prev) => [...prev, ...newLines]);
    setInput("");
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // simple tab completion
      const cmds = ["help","about","skills","projects","contact","neofetch","clear","whoami","uname","ls","ll","cat","head","tail","wc","find","du","df","chmod","mkdir","touch","cp","mv","stat","file","tree","pwd","cd","rm","sudo","su","grep","rg","man","sort","uniq","rev","base64","md5sum","sed","awk","cut","history","echo","printf","ping","curl","wget","ssh","ifconfig","ip","dig","nslookup","traceroute","netstat","ss","fortune","cowsay","sl","matrix","cmatrix","figlet","joke","fact","lolcat","btw","pacman","systemctl","journalctl","uptime","hostname","id","w","top","htop","ps","kill","killall","free","lscpu","dmesg","lsblk","lsusb","lspci","alias","env","printenv","export","which","whereis","type","cal","expr","bc","sleep","open","xdg-open","git","docker","make","date","yes","true","false","arch","nproc","tty","groups","users","logname","vim","nano","nvim","vi","emacs","python","python3","node","npm","pip","gcc","reboot","shutdown","exit","logout","quit","screenfetch","fastfetch","passwd","crontab","xrandr"];
      const match = cmds.filter((c) => c.startsWith(input));
      if (match.length === 1) setInput(match[0]);
    }
  };

  const focusInput = () => inputRef.current?.focus();

  return (
    <div className="min-h-screen bg-background flex flex-col" onClick={focusInput}>
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-secondary border-b border-border">
        <span className="w-3 h-3 rounded-full bg-terminal-red" />
        <span className="w-3 h-3 rounded-full bg-terminal-yellow" />
        <span className="w-3 h-3 rounded-full bg-terminal-green" />
        <span className="ml-4 text-sm text-muted-foreground">mohit@archlinux: ~</span>
      </div>

      {/* Terminal body */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 scanline relative">
        {lines.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap font-mono text-sm leading-relaxed ${line.color || "text-foreground"}`}>
            {line.content || "\u00A0"}
          </div>
        ))}

        {ready && (
          <div className="flex items-center font-mono text-sm">
            <span className="text-terminal-green font-bold">[mohit</span>
            <span className="text-foreground font-bold">@</span>
            <span className="text-terminal-blue font-bold">archlinux</span>
            <span className="text-foreground font-bold"> ~]$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-foreground caret-terminal-green ml-1"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
