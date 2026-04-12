import { resumeData } from "@/data/resume";
import { OutputLine } from "./types";

export function fortuneCmd(): OutputLine[] {
  const fortunes = [
    "The best way to predict the future is to build it.",
    "First, solve the problem. Then, write the code.",
    "It works on my machine. Ship my machine.",
    "There are only two hard things: cache invalidation, naming things, and off-by-one errors.",
    "In theory, theory and practice are the same. In practice, they are not.",
    "sudo make me a sandwich.",
    "Weeks of coding can save you hours of planning.",
    "The cloud is just someone else's computer.",
    "There are 10 types of people: those who understand binary, and those who don't.",
    "A SQL query walks into a bar, sees two tables and asks: 'Can I JOIN you?'",
    "// This code works, I have no idea why.",
    "// This code doesn't work, I have no idea why.",
    "Machine learning is just spicy statistics.",
    "AI is whatever hasn't been done yet.",
    "Talk is cheap. Show me the code. - Linus Torvalds",
    "Any sufficiently advanced bug is indistinguishable from a feature.",
  ];
  return [{ content: `  "${fortunes[Math.floor(Math.random() * fortunes.length)]}"`, color: "text-terminal-yellow" }];
}

export function cowsayCmd(args: string[]): OutputLine[] {
  const msg = args.length > 0 ? args.join(" ") : "moo";
  const border = "\u2500".repeat(msg.length + 2);
  return [
    { content: ` \u250C${border}\u2510`, color: "text-foreground" },
    { content: ` \u2502 ${msg} \u2502`, color: "text-foreground" },
    { content: ` \u2514${border}\u2518`, color: "text-foreground" },
    { content: "        \\   ^__^", color: "text-terminal-green" },
    { content: "         \\  (oo)\\_______", color: "text-terminal-green" },
    { content: "            (__)\\       )\\/\\", color: "text-terminal-green" },
    { content: "                ||----w |", color: "text-terminal-green" },
    { content: "                ||     ||", color: "text-terminal-green" },
  ];
}

export function slCmd(): OutputLine[] {
  return [
    { content: "      ====        ________                ___________", color: "text-terminal-green" },
    { content: "  _D _|  |_______/        \\__I_I_____===__|___________|", color: "text-terminal-green" },
    { content: "   |(_)---  |   H\\________/ |   |        =|___ ___|", color: "text-terminal-green" },
    { content: "   /     |  |   H  |  |     |   |         ||_| |_||", color: "text-terminal-green" },
    { content: "  |      |  |   H  |__--------------------| [___] |", color: "text-terminal-green" },
    { content: "  | ________|___H__/__|_____/[][]~\\_______|       |", color: "text-terminal-green" },
    { content: "  |/ |   |-----------I_____I [][] []  D   |=======|__", color: "text-terminal-green" },
    { content: "choo choo! You meant 'ls', didn't you?", color: "text-terminal-yellow" },
  ];
}

export function cmatrixCmd(): OutputLine[] {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789@#$%^&*";
  const lines: OutputLine[] = [
    { content: "Wake up, Neo... The Matrix has you.", color: "text-terminal-green" },
    { content: "Follow the white rabbit.", color: "text-terminal-green" },
    { content: "" },
  ];
  for (let i = 0; i < 6; i++) {
    let line = "";
    for (let j = 0; j < 60; j++) {
      line += chars[Math.floor(Math.random() * chars.length)];
    }
    lines.push({ content: line, color: "text-terminal-green" });
  }
  lines.push({ content: "", });
  lines.push({ content: "Knock, knock, Neo.", color: "text-terminal-cyan" });
  return lines;
}

export function figletCmd(args: string[]): OutputLine[] {
  const text = args.join(" ") || "hello";
  if (text.length > 10) return [{ content: text.toUpperCase(), color: "text-terminal-cyan" }];
  const letters: Record<string, string[]> = {
    a: [" __ ", "/ _|", "| |_", "|__/"],
    b: [" _  ", "| | ", "| _ ", "|__|"],
    c: [" __ ", "/  |", "|   ", "\\__|"],
    d: [" _  ", "| \\ ", "| | ", "|_/ "],
    e: [" __ ", "|_ ", "|__", "|__"],
    f: [" __ ", "|_ ", "|  ", "|  "],
    g: [" __ ", "/ _ ", "| (_", "\\__/"],
    h: ["    ", "|__|", "|  |", "|  |"],
    i: [" _ ", "| |", "| |", "|_|"],
    j: ["  _ ", " | |", " | |", "_/ |"],
    k: ["   ", "| /", "|< ", "| \\"],
    l: ["   ", "|  ", "|  ", "|__"],
    m: ["      ", "|\\/\\ ", "|  | ", "|  | "],
    n: ["     ", "|\\ | ", "| \\| ", "|  | "],
    o: [" __ ", "/  \\", "\\  /", " \\/ "],
    p: [" __ ", "|__)", "|   ", "|   "],
    r: [" __ ", "|__)", "| \\ ", "|  \\"],
    s: [" __ ", "/ _ ", "\\_ \\", "__/ "],
    t: ["___", " | ", " | ", " | "],
    u: ["    ", "|  |", "|  |", " \\/ "],
    w: ["       ", "|   | ", "| | | ", " \\_/  "],
    y: ["    ", "\\ / ", " |  ", " |  "],
  };
  const rows = ["", "", "", ""];
  for (const ch of text.toLowerCase()) {
    const l = letters[ch] || [" ? ", " ? ", " ? ", " ? "];
    for (let i = 0; i < 4; i++) rows[i] += l[i];
  }
  return rows.map(r => ({ content: r, color: "text-terminal-cyan" }));
}

export function jokeCmd(): OutputLine[] {
  const jokes = [
    { q: "Why do programmers prefer dark mode?", a: "Because light attracts bugs." },
    { q: "Why did the developer go broke?", a: "Because he used up all his cache." },
    { q: "What's a programmer's favorite hangout place?", a: "Foo Bar." },
    { q: "Why do Java developers wear glasses?", a: "Because they can't C#." },
    { q: "How many programmers does it take to change a light bulb?", a: "None, that's a hardware problem." },
    { q: "What did the router say to the doctor?", a: "It hurts when IP." },
    { q: "Why was the JavaScript developer sad?", a: "Because he didn't Node how to Express himself." },
  ];
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  return [
    { content: `  Q: ${joke.q}`, color: "text-terminal-cyan" },
    { content: `  A: ${joke.a}`, color: "text-terminal-yellow" },
  ];
}

export function factCmd(): OutputLine[] {
  const facts = [
    "The first computer bug was an actual bug - a moth found in a Harvard Mark II computer in 1947.",
    "The first 1GB hard drive weighed about 550 pounds and cost $40,000 in 1980.",
    "About 90% of the world's currency exists only on computers.",
    "The QWERTY keyboard was designed to slow you down to prevent typewriter jams.",
    "The first website ever made is still online: info.cern.ch",
    "Linux runs on 100% of the world's top 500 supercomputers.",
    "Git was created by Linus Torvalds in just 2 weeks.",
    "The average developer writes about 10-50 lines of production code per day.",
  ];
  return [{ content: `  ${facts[Math.floor(Math.random() * facts.length)]}`, color: "text-terminal-cyan" }];
}

export function lolcatCmd(args: string[]): OutputLine[] {
  const text = args.join(" ") || "I use Arch, btw.";
  const colors = ["text-terminal-red", "text-terminal-yellow", "text-terminal-green", "text-terminal-cyan", "text-terminal-blue", "text-terminal-magenta"];
  return text.split("").map((ch, i) => ({
    content: ch,
    color: colors[i % colors.length],
  })).reduce((acc, curr) => {
    // Combine into one line with mixed colors - simplified to just colorize whole string
    return acc;
  }, [] as OutputLine[]) || [{ content: text, color: "text-terminal-magenta" }];
}
