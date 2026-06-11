import React from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What are taxes and why do we pay them?",
    a: "Taxes are payments we make to the government. They fund public services like schools, roads, hospitals, fire departments, and parks. Without taxes, these services wouldn't exist.",
  },
  {
    q: "Do kids have to pay taxes?",
    a: "If you earn money (from a job, investments, or a business), you might have to file a tax return. In 2024, if you earned more than $13,850 from a job, you need to file.",
  },
  {
    q: "What is the IRS?",
    a: "The IRS (Internal Revenue Service) is the government agency that collects taxes and enforces tax laws. They process tax returns and issue refunds.",
  },
  {
    q: "What's the difference between a deduction and a credit?",
    a: "A deduction reduces your taxable income (how much income you're taxed on). A credit reduces your actual tax bill dollar-for-dollar. Credits are generally more valuable.",
  },
  {
    q: "What happens if you don't pay taxes?",
    a: "Not paying taxes can lead to penalties, interest charges, and even legal trouble. The government can garnish wages or place liens on property.",
  },
  {
    q: "What is a W-2 form?",
    a: "A W-2 is a form your employer sends you showing how much you earned and how much tax was withheld from your paychecks. You need it to file your tax return.",
  },
];

export default function TaxesKidsFAQ() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="max-w-3xl"
    >
      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${i}`}
            className="bg-card border border-border/50 rounded-xl px-6 data-[state=open]:border-primary/30 transition-colors"
          >
            <AccordionTrigger className="text-left font-display font-medium text-base hover:no-underline hover:text-primary transition-colors py-5">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
              {faq.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
}