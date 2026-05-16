import { motion } from "framer-motion";
import { useRef, useState } from "react";
import type { ReactNode, MouseEvent } from "react";

export function MagneticButton({ children, className = "", onClick, as = "button" }: { children: ReactNode; className?: string; onClick?: () => void; as?: "button" | "a" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const handle = (e: MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos({ x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.25 });
  };
  const reset = () => setPos({ x: 0, y: 0 });
  const Comp: any = as;
  return (
    <div ref={ref} onMouseMove={handle} onMouseLeave={reset} className="inline-block">
      <motion.div animate={{ x: pos.x, y: pos.y }} transition={{ type: "spring", stiffness: 200, damping: 15 }}>
        <Comp onClick={onClick} className={className}>{children}</Comp>
      </motion.div>
    </div>
  );
}
