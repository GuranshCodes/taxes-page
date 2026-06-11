import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "What are taxes and why do we pay them?",
    a: "Taxes are payments we make to the government. They fund public services like schools, roads, hospitals, fire departments, and parks. Without taxes, these services wouldn't exist.",
  },
  {
    q: "Do kids have to pay taxes in Canada?",
    a: "If you earn money from a job, investments, or a business, you may need to file a tax return. In Canada, you should file if you earned any income, even if it's below the basic personal amount of $15,705, since you may be eligible for credits and refunds.",
  },
  {
    q: "What is the CRA?",
    a: "The CRA (Canada Revenue Agency) is the government agency that collects taxes and administers tax laws in Canada. They process tax returns, issue refunds, and manage benefits like the GST/HST credit and Canada Child Benefit.",
  },
  {
    q: "What's the difference between a deduction and a credit?",
    a: "A deduction reduces your taxable income (how much income you're taxed on). A credit reduces your actual tax bill dollar-for-dollar. Credits are generally more valuable.",
  },
  {
    q: "What happens if you don't pay taxes?",
    a: "Not paying taxes in Canada can lead to penalties, interest charges, and legal consequences. The CRA can garnish wages, freeze bank accounts, or place liens on property.",
  },
  {
    q: "What is a T4 slip?",
    a: "A T4 is a form your employer sends you showing how much you earned and how much tax was withheld from your paychecks. You need it to file your tax return with the CRA.",
  },
];

export default function TaxesKidsFAQ() {
 const [open, setOpen] = useState(/** @type {number|null} */ (null));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl space-y-3"
    >
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`bg-card border rounded-xl px-6 transition-colors ${open === i ? "border-primary/30" : "border-border/50"}`}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full text-left font-display font-medium text-base hover:text-primary transition-colors py-5 flex justify-between items-center"
          >
            {faq.q}
            <ChevronDown className={`w-4 h-4 flex-shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
          </button>
          <AnimatePresence>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="text-muted-foreground leading-relaxed pb-5">{faq.a}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
}