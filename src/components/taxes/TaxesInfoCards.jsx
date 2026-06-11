import React from "react";
import { motion } from "framer-motion";
import {
  Landmark,
  PiggyBank,
  FileText,
  TrendingUp,
  Shield,
  Calculator,
} from "lucide-react";

const cards = [
  {
    icon: Landmark,
    title: "Income Tax",
    category: "Basics",
    desc: "The government collects a percentage of what you earn to fund public services like roads, schools, and hospitals.",
  },
  {
    icon: FileText,
    title: "Tax Returns",
    category: "Filing",
    desc: "A tax return is a form you fill out each year to report your income and calculate how much tax you owe.",
  },
  {
    icon: Calculator,
    title: "Deductions",
    category: "Savings",
    desc: "Deductions reduce the amount of income you're taxed on. Common ones include education, healthcare, and charity.",
  },
  {
    icon: TrendingUp,
    title: "Tax Brackets",
    category: "Structure",
    desc: "Tax rates increase as income rises. Each bracket only applies to income within that range, not your total.",
  },
  {
    icon: Shield,
    title: "Tax Credits",
    category: "Benefits",
    desc: "Credits directly reduce the tax you owe dollar-for-dollar, making them more valuable than deductions.",
  },
  {
    icon: PiggyBank,
    title: "Withholding",
    category: "Paycheck",
    desc: "Your employer takes out estimated taxes from each paycheck so you don't owe a large sum at tax time.",
  },
];

export default function TaxesInfoCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="group relative bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-all duration-500"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <card.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              {card.category}
            </span>
          </div>
          <h3 className="font-display font-semibold text-lg text-foreground mb-3">
            {card.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {card.desc}
          </p>
        </motion.div>
      ))}
    </div>
  );
}