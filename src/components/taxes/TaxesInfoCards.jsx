import React from 'react';
import { motion } from 'framer-motion';
import { ScrollText, Lightbulb, Briefcase, Trophy } from 'lucide-react';

const CARDS = [
  {
    icon: ScrollText,
    title: 'Taxes explained',
    body: 'Simple kid words: money that helps pay for public stuff.',
    href: '/taxes-about',
  },
  {
    icon: Lightbulb,
    title: 'How to save',
    body: 'Learn the idea of credits + deductions (no legal advice).',
    href: '/taxes-save',
  },
  {
    icon: Briefcase,
    title: 'Business write-offs',
    body: 'Businesses can deduct some expenses that relate to earning income.',
    href: '/taxes-business',
  },
  {
    icon: Trophy,
    title: 'Games hub',
    body: 'Pick a game, score points, and learn by playing.',
    href: '/games',
  },
];

export default function TaxesInfoCards() {
  return (
    <section className="border-b-2 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="flex items-center justify-between gap-6 flex-wrap">
          <div>
            <p className="text-accent text-[11px] font-mono tracking-[0.3em]">START HERE</p>
            <h2 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-[-0.05em] mt-3 leading-tight">
              Choose your path
            </h2>
          </div>
          <p className="text-sm md:text-base font-mono text-muted-foreground leading-relaxed max-w-lg">
            For grade 8 learners. Tap a card to jump to a page.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.title}
                href={c.href}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group border-2 border-foreground rounded-2xl p-5 bg-background hover:bg-foreground hover:text-background transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl border-2 border-foreground flex items-center justify-center group-hover:bg-background group-hover:text-foreground transition-colors">
                  <Icon size={20} />
                </div>
                <div className="mt-4 font-heading font-black text-xl uppercase tracking-[-0.03em]">{c.title}</div>
                <div className="mt-3 text-sm font-mono text-muted-foreground group-hover:text-background/90 leading-relaxed">
                  {c.body}
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

