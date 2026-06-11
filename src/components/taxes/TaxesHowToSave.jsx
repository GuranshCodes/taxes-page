import React from "react";
import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Max Out Your RRSP",
    desc: "Contributions to your Registered Retirement Savings Plan reduce your taxable income dollar for dollar. The 2025 limit is 18% of your prior year earned income up to $32,490. Do this before the March 3, 2025 deadline to claim it on your 2024 return.",
  },
  {
    num: "02",
    title: "Use Your TFSA",
    desc: "Your Tax-Free Savings Account lets investments grow with zero tax on withdrawals. The 2025 annual room is $7,000 and unused room carries forward. Unlike the RRSP, withdrawals do not count as income so they do not claw back benefits like OAS or GIS.",
  },
  {
    num: "03",
    title: "Claim Every Deduction",
    desc: "Keep receipts for union dues, professional fees, moving expenses for work, child care costs, and eligible employment expenses on a T2200. Medical expenses above 3% of net income are also deductible on your Ontario return.",
  },
  {
    num: "04",
    title: "Know Your Credits",
    desc: "Canada offers refundable credits like the GST/HST Credit and Canada Workers Benefit, plus Ontario specific credits like the Ontario Trillium Benefit. Non-refundable credits include the Basic Personal Amount, tuition credits, and the disability tax credit.",
  },
  {
    num: "05",
    title: "File on Time with the CRA",
    desc: "The Canadian tax filing deadline is April 30 each year. Self-employed individuals get until June 15, but any balance owing is still due April 30. Late filing triggers a 5% penalty on the balance plus 1% per month. File on time even if you cannot pay.",
  },
];

export default function TaxesHowToSave() {
  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-6 lg:left-8 top-0 bottom-0 w-px bg-border" />

      <div className="space-y-12">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative flex gap-8 lg:gap-12"
          >
            {/* Dot */}
            <div className="relative z-10 w-12 lg:w-16 flex-shrink-0 flex items-start justify-center pt-1">
              <div className="w-3 h-3 rounded-full bg-primary ring-4 ring-background" />
            </div>

            <div className="pb-2">
              <span className="text-xs font-semibold tracking-[0.2em] text-primary/60 uppercase">
                Step {step.num}
              </span>
              <h3 className="font-display font-semibold text-xl mt-2 mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-lg">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}