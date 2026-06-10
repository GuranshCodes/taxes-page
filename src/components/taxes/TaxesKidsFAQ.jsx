import React from 'react';
import { motion } from 'framer-motion';

const Q = [
  {
    q: 'Do taxes mean you lose all your money?'
    ,
    a: 'No. Taxes help the government pay for services. Some rules can reduce your tax bill.'
  },
  {
    q: 'Are “write-offs” the same as “free money”?'
    ,
    a: 'No. A write-off (in the learning sense) can reduce taxable income, but you still have to follow rules.'
  },
  {
    q: 'Can I do tax tricks without rules?'
    ,
    a: 'No. The games are for learning. Real life needs correct info and permission from adults.'
  },
  {
    q: 'Which country tax rules do you use?'
    ,
    a: 'This site uses simple ideas (kid edition). Different places have different rules.'
  },
];

export default function TaxesKidsFAQ() {
  return (
    <section className="border-b-2 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="border-2 border-foreground rounded-3xl p-6 md:p-8 bg-background">
          <p className="text-accent text-[11px] font-mono tracking-[0.3em]">KIDS FAQ</p>
          <h2 className="font-heading font-black text-3xl md:text-5xl uppercase tracking-[-0.05em] mt-3">Common questions</h2>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {Q.map((item, i) => (
              <motion.div
                key={item.q}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="border-2 border-foreground rounded-2xl p-4"
              >
                <div className="font-heading font-black uppercase tracking-[-0.03em]">{item.q}</div>
                <div className="mt-2 text-sm font-mono text-muted-foreground leading-relaxed">{item.a}</div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-[11px] font-mono text-muted-foreground leading-relaxed">
            Safety note: This is educational. It’s not legal, tax, or financial advice.
          </div>
        </div>
      </div>
    </section>
  );
}

