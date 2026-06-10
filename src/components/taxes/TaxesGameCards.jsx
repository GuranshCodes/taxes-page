import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Gamepad2, Crown, Target, Puzzle } from 'lucide-react';

const GAMES = [
  {
    key: 'treasure',
    title: 'Tax Treasure Hunt',
    subtitle: 'Sort items into: deductible / not / credit-ish',
    icon: Target,
    href: '/games/treasure',
    color: 'bg-foreground text-background',
  },
  {
    key: 'multiplier',
    title: 'Credit Catcher',
    subtitle: 'Catch credits to lower a tax bill',
    icon: Puzzle,
    href: '/games/credit-catcher',
    color: 'bg-background',
  },
  {
    key: 'quiz',
    title: 'Quick Quiz Sprint',
    subtitle: 'Answer 10 questions. Get a badge.',
    icon: Crown,
    href: '/games/quiz-sprint',
    color: 'bg-background',
  },
];

export default function TaxesGameCards() {
  return (
      <div className="grid md:grid-cols-3 gap-5">
      {GAMES.map((g, i) => {
        const Icon = g.icon;
        return (
          <motion.div
            key={g.key}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="relative overflow-hidden border-2 border-foreground rounded-3xl p-5 bg-background before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top,rgba(136,100,250,0.22),transparent_55%)] before:opacity-60"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-accent text-[11px] font-mono tracking-[0.3em]">GAME {i + 1}</div>
                <div className="font-heading font-black text-2xl uppercase tracking-[-0.04em] mt-2">{g.title}</div>
                <div className="mt-2 text-sm font-mono text-muted-foreground leading-relaxed">{g.subtitle}</div>
              </div>
              <div className="w-12 h-12 rounded-2xl border-2 border-foreground flex items-center justify-center bg-foreground text-background">
                <Icon size={20} />
              </div>
            </div>

            <div className="mt-5">
              <Link
                to={g.href}
                className="inline-flex items-center justify-center w-full px-4 py-3 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors text-xs font-mono uppercase tracking-wider"
              >
                Play now
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

