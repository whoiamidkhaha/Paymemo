export function Noise({ opacity = 0.06 }: { opacity?: number }) {
  return <div aria-hidden className="pointer-events-none fixed inset-0 grain z-50" style={{ opacity, mixBlendMode: "multiply" }} />;
}
