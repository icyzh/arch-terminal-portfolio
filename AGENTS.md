# AGENTS.md

## Project Overview
Terminal-styled portfolio website for Mohit Madan (icyzh). Features a simulated Linux terminal with 80+ commands and a GUI mode with cream/vim-inspired theme. Portfolio data is driven by `src/data/resume.ts`.

## Tech Stack
- **Framework**: React 18, TypeScript 5.8
- **Build**: Vite 5 + SWC (`@vitejs/plugin-react-swc`)
- **Routing**: react-router-dom v6
- **Styling**: Tailwind CSS 3.4 + `tailwindcss-animate`
- **UI**: shadcn/ui (Radix primitives + `class-variance-authority` + `tailwind-merge` + `clsx`)
- **Icons**: lucide-react
- **Server State**: @tanstack/react-query v5
- **Forms**: react-hook-form + zod
- **Testing**: Vitest 3 (unit), Playwright 1.57 (E2E)
- **Package Manager**: npm

## Commands
| Command | Purpose |
|---|---|
| `npm run dev` | Start dev server on port 8080 |
| `npm run build` | Production build |
| `npm run lint` | ESLint flat config (v9) |
| `npm run test` | Vitest unit tests |
| `npx tsc --noEmit` | TypeScript type checking |

## Project Structure
```
src/
├── App.tsx                     # Root: QueryClient + Router + Toasts + Routes
├── components/
│   ├── GUIPortfolio.tsx        # Full GUI portfolio page
│   ├── Terminal.tsx            # Terminal emulator (boot, input, history, tab completion)
│   ├── NavLink.tsx             # react-router NavLink wrapper
│   └── ui/                     # shadcn/ui components (~40+)
├── pages/
│   ├── Index.tsx               # Home: toggles GUI/Terminal mode
│   ├── Projects.tsx            # Projects listing (filterable)
│   └── NotFound.tsx            # 404 page
├── hooks/
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/
│   ├── utils.ts                # cn() — clsx + tailwind-merge
│   ├── commands.ts             # Central command dispatcher + help system
│   └── commands/
│       ├── types.ts            # OutputLine interface
│       ├── ascii.ts            # ASCII art
│       ├── portfolio.ts        # about, skills, projects, contact
│       ├── system.ts           # neofetch, uptime, uname, top, ps, etc.
│       ├── filesystem.ts       # ls, cat, tree, chmod, mkdir, etc.
│       ├── network.ts          # ping, curl, ssh, ifconfig, etc.
│       ├── text.ts             # grep, man, sort, base64, sed, awk
│       ├── fun.ts              # fortune, cowsay, sl, cmatrix, figlet
│       └── misc.ts             # alias, env, which, cal, expr, bc, sleep, git, docker
└── data/
    └── resume.ts               # Central resumeData object
```

## Key Conventions

### Naming
- **Components**: PascalCase, default exports (`export default Terminal`)
- **Hooks**: camelCase, named exports (`export function useIsMobile`)
- **Utilities**: camelCase, named exports (`export function cn`)
- **Commands**: camelCase suffixed with `Cmd` (`aboutCmd`, `lsCmd`)
- **Files**: PascalCase for components, camelCase for utils/hooks

### Imports
- `@/` alias maps to `src/` (vite + tsconfig)
- Include `.tsx` extension in imports: `import App from "./App.tsx"`

### Component Patterns
- shadcn/ui: `React.forwardRef`, `cn()` for class merging, `displayName` set
- Props interfaces defined locally in component file

### Styling
- Dark theme default with HSL CSS variables in `:root`
- Cream theme via `.theme-cream` class
- Terminal palette: `terminal-green`, `terminal-yellow`, `terminal-red`, `terminal-cyan`, `terminal-magenta`, `terminal-blue`, `terminal-dim`
- Font: JetBrains Mono (Google Fonts in `index.css`)

### Command Architecture
- Each command returns `OutputLine[]` (`{ content: string, color?: string }`)
- Routing via switch/case in `commands.ts`

### TypeScript
- `strict: false` in tsconfig, several strict checks disabled
- Types for vitest globals included
