export function AuroraBlob({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden>
      <div className="absolute -inset-32 opacity-70 blur-3xl">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-pink/60 mix-blend-multiply animate-float-slow" />
        <div className="absolute right-0 top-12 h-80 w-80 rounded-full bg-mint/60 mix-blend-multiply animate-float-slow" style={{ animationDelay: "-3s" }} />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-papaya/70 mix-blend-multiply animate-float-slow" style={{ animationDelay: "-6s" }} />
      </div>
    </div>
  );
}
