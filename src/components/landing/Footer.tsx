export function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-ink/35">
      <div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-6 text-sm text-ink/60">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md bg-aurora text-white text-[10px] font-bold">P</span>
          <span className="font-semibold text-ink">PayMemo</span>
          <span className="ml-3">© 2026 - Encrypted memory for the onchain economy.</span>
        </div>
        <div className="flex gap-5">
          <a href="#" className="hover:text-ink">Twitter</a>
          <a href="#" className="hover:text-ink">Docs</a>
          <a href="#" className="hover:text-ink">Security</a>
        </div>
      </div>
    </footer>
  );
}
