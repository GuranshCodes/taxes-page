import React from 'react';
import { motion } from 'framer-motion';
import { Coins, ShieldCheck, Puzzle } from 'lucide-react';
import TaxesHeroBadge from './TaxesHeroBadge';

export default function TaxesHero() {
  return (
    <section className="border-b-2 border-foreground bg-[radial-gradient(ellipse_at_top,rgba(136,100,250,0.18),transparent_55%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="pt-10 pb-12 md:pt-14 md:pb-16">
          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl border-2 border-foreground bg-foreground text-background flex items-center justify-center shadow-[0_0_0_2px_hsl(var(--background))_inset]">
                    <Coins size={18} />
                  </div>
                  <div>
                    <p className="text-accent text-[11px] font-mono tracking-[0.32em]">TAX QUEST</p>
                    <p className="text-[11px] font-mono text-muted-foreground mt-1">
                      Grade 8 mode · fun + learning
                    </p>
                  </div>
                </div>

                <h1 className="font-heading font-black text-5xl md:text-7xl uppercase tracking-[-0.05em] leading-[0.88]">
                  Learn taxes.
                  <br />
                  <span className="text-accent">Play games.</span>
                </h1>

                <p className="mt-6 text-sm md:text-base font-mono text-muted-foreground leading-relaxed max-w-2xl">
                  Kid-friendly explanations + mini games about how taxes work, how to save, and how businesses use write-offs.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <TaxesHeroBadge icon={Puzzle} label="Mini games" />
                  <TaxesHeroBadge icon={ShieldCheck} label="Simple rules" />
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {[
                    { t: 'What are taxes?', href: '/taxes-about' },
                    { t: 'How to save', href: '/taxes-save' },
                    { t: 'Business write-offs', href: '/taxes-business' },
                    { t: 'Games hub', href: '/games' },
                  ].map((x) => (
                    <a
                      key={x.href}
                      href={x.href}
                      className="px-4 py-2 rounded-xl border-2 border-foreground hover:bg-foreground hover:text-background transition-colors text-xs font-mono uppercase tracking-wider"
                    >
                      {x.t}
                    </a>
                  ))}
                </div>

                <div className="mt-7 text-[11px] font-mono text-muted-foreground">
                  Learning-only. Ask a grown-up for real advice.
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, y: 22, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="border-2 border-foreground bg-foreground text-background p-5 md:p-7 rounded-3xl"
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { k: 'STEP 01', v: 'Learn', s: 'Tax basics' },
                    { k: 'STEP 02', v: 'Try', s: 'Credits + deductions' },
                    { k: 'STEP 03', v: 'Explore', s: 'Business write-offs' },
                    { k: 'STEP 04', v: 'Play', s: 'Scores + badges' },
                  ].map((b) => (
                    <div
                      key={b.k}
                      className="border-2 border-background/20 p-3 rounded-2xl bg-background/5"
                    >
                      <div className="text-[10px] font-mono opacity-80 tracking-wider">{b.k}</div>
                      <div className="font-heading font-black text-2xl leading-tight">{b.v}</div>
                      <div className="text-[11px] font-mono opacity-90 mt-1">{b.s}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t-2 border-background/20 pt-4">
                  <p className="text-[11px] font-mono opacity-80">Bonus: try the calculator after your game.</p>
                  <p className="text-[11px] font-mono opacity-90 mt-2">Rules depend on where you live.</p>
                </div>

                <div className="mt-6 flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-2xl border-2 border-background/20 bg-background/5">
                    <span className="text-[10px] font-mono opacity-80 tracking-wider">MODE</span>
                    <span className="font-heading font-black text-sm uppercase">GRADE 8</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 px-3 py-2 rounded-2xl border-2 border-background/20 bg-background/5">
                    <span className="text-[10px] font-mono opacity-80 tracking-wider">GOAL</span>
                    <span className="font-heading font-black text-sm uppercase">SORT + SCORE</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

