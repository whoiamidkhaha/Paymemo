import { Link } from "@tanstack/react-router";

export function Nav() {
  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(1180px,calc(100%-2rem))]">
      <div className="flex items-center justify-between rounded-full border border-ink/40 bg-background/70 backdrop-blur-xl px-4 py-2 shadow-soft">
        <Link to="/" className="flex items-center gap-2 pl-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-aurora text-white font-bold">P</span>
          <span className="font-semibold tracking-tight text-ink">PayMemo</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-ink/70">
          <a href="#problem" className="hover:text-ink">Problem</a>
          <a href="#solution" className="hover:text-ink">How it works</a>
          <a href="#privacy" className="hover:text-ink">Privacy</a>
          <a href="#dashboard" className="hover:text-ink">Dashboard</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/app" className="hidden sm:inline-flex h-9 items-center rounded-full px-4 text-sm font-medium text-ink/70 hover:text-ink">View Demo</Link>
          <Link to="/app" className="inline-flex h-9 items-center rounded-full bg-ink px-4 text-sm font-semibold text-cream hover:bg-ink/85 transition-colors">Launch App →</Link>
        </div>
      </div>
    </header>
  );
}
