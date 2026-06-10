import React from 'react';
import { motion } from 'framer-motion';
 
/** @param {number} n */
function money(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
 
 
export default function TaxesSavingsCalculator() {
  const [income, setIncome] = React.useState(5000);
  const [deduction, setDeduction] = React.useState(500);
  const [creditRate, setCreditRate] = React.useState(0.1);
 
  const taxable = Math.max(0, income - deduction);
  const roughTaxRate = 0.25; // Learning-only estimator
  const taxBeforeCredits = taxable * roughTaxRate;
  const credit = taxBeforeCredits * creditRate;
  const taxAfterCredits = Math.max(0, taxBeforeCredits - credit);
 
  return (
    <div className="border-2 border-foreground rounded-3xl p-6 md:p-7">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-accent text-[11px] font-mono tracking-[0.3em]">MINI CALCULATOR</p>
          <h3 className="font-heading font-black text-3xl uppercase tracking-[-0.05em] mt-2">Estimate your tax bill</h3>
          <p className="mt-2 text-sm font-mono text-muted-foreground leading-relaxed">
            Learning-only estimator for grade 8. Real rules are more complex.
          </p>
        </div>
        <div className="text-right">
          <div className="text-[10px] font-mono text-muted-foreground tracking-wider">ROUGH TAX RATE</div>
          <div className="font-heading font-black text-4xl text-accent">25%</div>
        </div>
      </div>
 
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        <label className="block">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-muted-foreground">Income</span>
            <span className="text-[11px] font-mono">${money(income)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={20000}
            step={100}
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="w-full accent-[hsl(var(--accent))]"
          />
        </label>
 
        <label className="block">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-muted-foreground">Deduction</span>
            <span className="text-[11px] font-mono">-${money(deduction)}</span>
          </div>
          <input
            type="range"
            min={0}
            max={income}
            step={50}
            value={deduction}
            onChange={(e) => setDeduction(Number(e.target.value))}
            className="w-full accent-[hsl(var(--accent))]"
          />
        </label>
 
        <label className="block md:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-muted-foreground">Credit strength</span>
            <span className="text-[11px] font-mono">{Math.round(creditRate * 100)}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={0.5}
            step={0.01}
            value={creditRate}
            onChange={(e) => setCreditRate(Number(e.target.value))}
            className="w-full accent-[hsl(var(--accent))]"
          />
        </label>
      </div>
 
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6 grid sm:grid-cols-3 gap-3"
      >
        <div className="border-2 border-foreground rounded-2xl p-4">
          <div className="text-[10px] font-mono text-muted-foreground tracking-wider">TAXABLE</div>
          <div className="font-heading font-black text-2xl mt-1">${money(taxable)}</div>
        </div>
        <div className="border-2 border-foreground rounded-2xl p-4">
          <div className="text-[10px] font-mono text-muted-foreground tracking-wider">BEFORE CREDITS</div>
          <div className="font-heading font-black text-2xl mt-1">${money(taxBeforeCredits)}</div>
        </div>
        <div className="border-2 border-foreground rounded-2xl p-4 bg-foreground">
          <div className="text-[10px] font-mono text-background/80 tracking-wider">AFTER CREDITS</div>
          <div className="font-heading font-black text-2xl mt-1 text-background">${money(taxAfterCredits)}</div>
        </div>
      </motion.div>
 
      <p className="mt-4 text-[11px] font-mono text-muted-foreground leading-relaxed">
        In this game: deductions reduce taxable income, credits reduce your tax bill.
      </p>
    </div>
  );
}