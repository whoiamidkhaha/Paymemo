import { motion } from "framer-motion";
import { Eye, Lock, ShieldCheck } from "lucide-react";

export function Privacy() {
  return (
    <section id="privacy" className="relative py-24 sm:py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-pink">03 - Privacy</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-[-0.02em]">
            Public transaction. <span className="font-serif-italic text-gradient-aurora">Private meaning.</span>
          </h2>
          <p className="mt-4 text-ink/65 max-w-2xl">
            The blockchain shows the transfer. PayMemo encrypts the human context - category, note, counterparty,
            invoice - sealed in your private vault.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-2 gap-5">
          {/* Public */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-ink/35 bg-white p-8 shadow-soft"
          >
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-ink/50">
              <Eye className="h-4 w-4" /> Public · Onchain
            </div>
            <div className="mt-6 space-y-3 font-mono text-sm">
              {[
                ["TX HASH", "0x4f2a…9a12"],
                ["AMOUNT", "14,200.00 USDC"],
                ["FROM", "0xVault…e2"],
                ["TO", "0x91bd…c204"],
                ["BLOCK", "21,408,902"],
                ["MEMO", " - "],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between border-b border-ink/30 pb-2.5">
                  <span className="text-ink/45">{k}</span>
                  <span>{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink/5 px-3 py-1 text-xs text-ink/55">
              Visible on Etherscan · No context
            </div>
          </motion.div>

          {/* Private */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl border border-ink/35 p-8 overflow-hidden bg-aurora-animated text-ink shadow-glow-pink"
          >
            <div className="absolute inset-0 grain opacity-20" />
            <div className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
            <div className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest">
                  <Lock className="h-4 w-4" /> PayMemo Vault · Encrypted
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-ink text-cream px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest">
                  <ShieldCheck className="h-3 w-3" /> AES-256
                </span>
              </div>
              <div className="mt-6 space-y-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest opacity-70">Purpose</div>
                  <div className="text-lg font-semibold">Vendor Payment · Q4 logo design</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest opacity-70">Counterparty</div>
                  <div className="text-lg font-semibold">Aether Studio (Sarah)</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest opacity-70">Internal tag</div>
                  <div className="text-lg font-semibold">Project: Mercury-Revamp</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest opacity-70">Invoice</div>
                  <div className="text-lg font-semibold font-mono">INV-204 · paid</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
