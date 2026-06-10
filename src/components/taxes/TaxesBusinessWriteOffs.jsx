import React from 'react';
import { motion } from 'framer-motion';

const EXAMPLES = [
  { title: 'Business supplies', yes: 'Can be related to earning income.', no: 'Not personal stuff.' },
  { title: 'Office rent (sometimes)', yes: 'If used for business.', no: 'If it’s mostly personal, usually not.' },
  { title: 'Marketing', yes: 'Ads and promotion can qualify.', no: 'Spending just for fun may not.' },
  { title: 'Travel (sometimes)', yes: 'If trips are for business.', no: 'Not vacations that are mostly personal.' },
];

export default function TaxesBusinessWriteOffs() {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {EXAMPLES.map((e, i) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="border-2 border-foreground rounded-3xl p-5 bg-background"
          >
            <div className="text-accent text-[11px] font-mono tracking-wider">WRITE-OFF IDEA</div>
            <div className="font-heading font-black text-2xl uppercase tracking-[-0.04em] mt-2">{e.title}</div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="border-2 border-foreground rounded-2xl p-3">
                <div className="text-[10px] font-mono text-muted-foreground tracking-wider">COULD COUNT</div>
                <div className="text-sm font-mono text-foreground mt-2">{e.yes}</div>
              </div>
              <div className="border-2 border-foreground rounded-2xl p-3 bg-foreground">
                <div className="text-[10px] font-mono text-background/80 tracking-wider">COULDN’T COUNT</div>
                <div className="text-sm font-mono text-background/95 mt-2">{e.no}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="border-2 border-foreground rounded-3xl p-5 bg-background">
        <p className="text-[11px] font-mono text-accent tracking-[0.3em]">BIG WARNING</p>
        <p className="mt-3 text-sm md:text-base font-mono text-muted-foreground leading-relaxed">
          This is learning content. Real tax rules are different by country and depend on the situation.
          Always ask a trusted adult or professional.
        </p>
      </div>
    </div>
  );
}

