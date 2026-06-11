import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// 2025 Federal brackets (post July 1 rate cut: 14% → 13.5% on first bracket)
// Using the full-year blended rate of 14.0% on first bracket (Jan-Jun 15%, Jul-Dec 13.5% → ~14.25% blended)
// Source: canada.ca/en/revenue-agency/services/tax/individuals/frequently-asked-questions-individuals/canadian-income-tax-rates-individuals-current-previous-years
const FEDERAL_BRACKETS_2025 = [
  { limit: 57375,   rate: 0.1425 }, // blended 2025 rate after July 1 cut
  { limit: 114750,  rate: 0.205  },
  { limit: 177882,  rate: 0.26   },
  { limit: 253414,  rate: 0.29   },
  { limit: Infinity, rate: 0.33  },
];

// 2025 Ontario provincial brackets
const ONTARIO_BRACKETS_2025 = [
  { limit: 51446,   rate: 0.0505 },
  { limit: 102894,  rate: 0.0915 },
  { limit: 150000,  rate: 0.1116 },
  { limit: 220000,  rate: 0.1216 },
  { limit: Infinity, rate: 0.1316 },
];

// 2025 Ontario surtax (applies on top of provincial tax)
function ontarioSurtax(provTax) {
  let surtax = 0;
  if (provTax > 6802) surtax += (provTax - 6802) * 0.20;
  if (provTax > 8745) surtax += (provTax - 8745) * 0.36;
  return surtax;
}

// 2025 Basic Personal Amount (federal)
const FEDERAL_BPA = 16129;
// 2025 Ontario basic personal amount
const ONTARIO_BPA = 11865;

function calcBrackets(taxableIncome, brackets) {
  let tax = 0;
  let prev = 0;
  let remaining = taxableIncome;
  for (const b of brackets) {
    const chunk = Math.min(remaining, b.limit - prev);
    if (chunk <= 0) break;
    tax += chunk * b.rate;
    remaining -= chunk;
    prev = b.limit;
  }
  return Math.max(0, tax);
}

export default function TaxesSavingsCalculator() {
  const [income, setIncome] = useState(75000);
  const [rrspContrib, setRrspContrib] = useState(10000);
  const [credits, setCredits] = useState(0);

  const results = useMemo(() => {
    // RRSP reduces taxable income (like a deduction)
    const federalTaxable = Math.max(0, income - rrspContrib - FEDERAL_BPA);
    const provincialTaxable = Math.max(0, income - rrspContrib - ONTARIO_BPA);

    const federalTax = calcBrackets(federalTaxable, FEDERAL_BRACKETS_2025);
    const provTaxBeforeSurtax = calcBrackets(provincialTaxable, ONTARIO_BRACKETS_2025);
    const surtax = ontarioSurtax(provTaxBeforeSurtax);
    const provincialTax = provTaxBeforeSurtax + surtax;

    // Combined before credits
    const totalBeforeCredits = federalTax + provincialTax;
    const finalTax = Math.max(0, totalBeforeCredits - credits);
    const effectiveRate = income > 0 ? (finalTax / income) * 100 : 0;
    const creditSavings = totalBeforeCredits - finalTax;
    const rrspSavings = income > 0
      ? calcBrackets(income - FEDERAL_BPA, FEDERAL_BRACKETS_2025) +
        calcBrackets(income - ONTARIO_BPA, ONTARIO_BRACKETS_2025) -
        totalBeforeCredits
      : 0;

    return {
      federalTaxable,
      federalTax,
      provincialTax,
      totalBeforeCredits,
      finalTax,
      effectiveRate,
      creditSavings,
      rrspSavings: Math.max(0, rrspSavings),
    };
  }, [income, rrspContrib, credits]);

  const fmt = (n) => `$${Math.round(n).toLocaleString("en-CA")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="grid lg:grid-cols-2 gap-8"
    >
      {/* Inputs */}
      <div className="bg-card border border-border/50 rounded-2xl p-8 space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-lg">Ontario Tax Calculator</h3>
            <p className="text-xs text-muted-foreground">2025 Federal + Ontario rates</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <Label className="text-sm text-muted-foreground">Annual Employment Income</Label>
            <span className="font-display font-semibold text-primary">{fmt(income)}</span>
          </div>
          <Slider value={[income]} onValueChange={([v]) => setIncome(v)} min={0} max={300000} step={1000} className="py-2" />
          <p className="text-xs text-muted-foreground">Federal BPA ({fmt(FEDERAL_BPA)}) and Ontario BPA ({fmt(ONTARIO_BPA)}) applied automatically</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <Label className="text-sm text-muted-foreground">RRSP Contribution</Label>
            <span className="font-display font-semibold text-primary">{fmt(rrspContrib)}</span>
          </div>
          <Slider value={[rrspContrib]} onValueChange={([v]) => setRrspContrib(v)} min={0} max={32490} step={500} className="py-2" />
          <p className="text-xs text-muted-foreground">Max 2025 RRSP room is 18% of 2024 earned income up to {fmt(32490)}</p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <Label className="text-sm text-muted-foreground">Other Tax Credits</Label>
            <span className="font-display font-semibold text-primary">{fmt(credits)}</span>
          </div>
          <Slider value={[credits]} onValueChange={([v]) => setCredits(v)} min={0} max={10000} step={100} className="py-2" />
          <p className="text-xs text-muted-foreground">e.g. Canada Workers Benefit, disability tax credit, tuition credits</p>
        </div>
      </div>

      {/* Results */}
      <div className="bg-card border border-border/50 rounded-2xl p-8 flex flex-col justify-center space-y-5">
        <h3 className="font-display font-semibold text-lg mb-2">Your Tax Estimate</h3>

        {[
          { label: "Federal Tax", value: results.federalTax },
          { label: "Ontario Provincial Tax", value: results.provincialTax },
          { label: "RRSP Tax Savings", value: results.rrspSavings, highlight: true },
          { label: "Other Credit Savings", value: results.creditSavings, highlight: true },
          { label: "Total Tax Owed", value: results.finalTax, large: true },
        ].map((item) => (
          <div key={item.label} className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className={`font-display font-bold ${
              item.large ? "text-2xl text-foreground" : item.highlight ? "text-primary text-lg" : "text-lg text-foreground/80"
            }`}>
              {fmt(item.value)}
            </span>
          </div>
        ))}

        <div className="pt-4 border-t border-border/50">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Effective Tax Rate</span>
            <span className="font-display font-bold text-xl text-primary">
              {results.effectiveRate.toFixed(1)}%
            </span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground pt-2 border-t border-border/30">
          Estimate only. Does not include CPP/EI premiums, Ontario Health Premium, or other province-specific surtaxes beyond the Ontario general surtax. Consult a CPA for your actual return.
        </p>
      </div>
    </motion.div>
  );
}