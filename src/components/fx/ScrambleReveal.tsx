import { useEffect } from "react";

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
// Punctuation that should never scramble (preserved as-is).
const SKIP = new Set([" ", "\u00A0", "\n", "\t", ".", "!", ",", ":", "/", ";", "?", "'", '"', "(", ")", "&", "·"]);
const DURATION = 450;
const SWAP_INTERVAL = 35; // ms between random-char swaps (smoother, less jittery)
const SELECTOR = ".font-serif-italic";

type State = {
  raf: number | null;
  hover: () => void;
};

const STATE = new WeakMap<HTMLElement, State>();

function scramble(el: HTMLElement) {
  const original = el.dataset.scrambleOriginal!;
  const start = performance.now();
  const prev = STATE.get(el);
  if (prev?.raf) cancelAnimationFrame(prev.raf);

  let lastSwap = 0;
  const randoms: string[] = original.split("").map(() => "");

  const tick = (now: number) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / DURATION, 1);
    const revealCount = Math.floor(progress * original.length);

    if (now - lastSwap >= SWAP_INTERVAL) {
      for (let i = 0; i < original.length; i++) {
        const ch = original[i];
        if (SKIP.has(ch)) { randoms[i] = ch; continue; }
        if (ch >= "0" && ch <= "9") {
          randoms[i] = DIGITS[Math.floor(Math.random() * DIGITS.length)];
        } else if (ch === ch.toLowerCase() && ch !== ch.toUpperCase()) {
          randoms[i] = LOWER[Math.floor(Math.random() * LOWER.length)];
        } else if (ch === ch.toUpperCase() && ch !== ch.toLowerCase()) {
          randoms[i] = UPPER[Math.floor(Math.random() * UPPER.length)];
        } else {
          randoms[i] = ch;
        }
      }
      lastSwap = now;
    }

    let out = "";
    for (let i = 0; i < original.length; i++) {
      const ch = original[i];
      if (i < revealCount || SKIP.has(ch)) {
        out += ch;
      } else {
        out += randoms[i] || ch;
      }
    }
    el.textContent = out;
    if (progress < 1) {
      const id = requestAnimationFrame(tick);
      const s = STATE.get(el);
      if (s) s.raf = id;
    } else {
      el.textContent = original;
      const s = STATE.get(el);
      if (s) s.raf = null;
    }
  };
  const id = requestAnimationFrame(tick);
  STATE.set(el, { raf: id, hover: prev?.hover ?? (() => scramble(el)) });
}

function attach(el: HTMLElement) {
  if (STATE.has(el)) return;
  const original = el.textContent ?? "";
  if (!original.trim()) return;
  el.dataset.scrambleOriginal = original;
  const hover = () => scramble(el);
  STATE.set(el, { raf: null, hover });
  el.addEventListener("mouseenter", hover);
}

export function ScrambleReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            scramble(entry.target as HTMLElement);
          }
        }
      },
      { threshold: 0.2 }
    );

    const seen = new Set<HTMLElement>();

    const scan = () => {
      const els = document.querySelectorAll<HTMLElement>(SELECTOR);
      els.forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        attach(el);
        observer.observe(el);
      });
    };

    scan();
    const mo = new MutationObserver(() => scan());
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mo.disconnect();
      seen.forEach((el) => {
        const s = STATE.get(el);
        if (s) {
          if (s.raf) cancelAnimationFrame(s.raf);
          el.removeEventListener("mouseenter", s.hover);
        }
        STATE.delete(el);
      });
    };
  }, []);

  return null;
}
