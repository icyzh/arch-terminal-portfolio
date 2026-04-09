import { useState } from "react";
import Terminal from "@/components/Terminal";
import GUIPortfolio from "@/components/GUIPortfolio";
import { Monitor, Terminal as TerminalIcon } from "lucide-react";

const Index = () => {
  const [mode, setMode] = useState<"terminal" | "gui">("gui");

  if (mode === "gui") {
    return <GUIPortfolio onSwitchMode={() => setMode("terminal")} />;
  }

  return (
    <div className="relative min-h-screen">
      <Terminal onBoot={true} />
      <button
        onClick={() => setMode("gui")}
        className="fixed bottom-4 right-4 z-50 flex items-center gap-1.5 text-xs px-3 py-2 rounded border border-border bg-card hover:bg-muted transition-colors text-terminal-cyan"
      >
        <Monitor size={14} />
        GUI Mode
      </button>
    </div>
  );
};

export default Index;
