import React from "react";
import TaxesNavbar from "@/components/taxes/TaxesNavbar";
import TaxesSectionShell from "@/components/taxes/TaxesSectionShell";
import TaxesSectionCallout from "@/components/taxes/TaxesSectionCallout";
import TaxesHowToSave from "@/components/taxes/TaxesHowToSave";
import TaxesSavingsCalculator from "@/components/taxes/TaxesSavingsCalculator";
import TaxesFooter from "@/components/taxes/TaxesFooter";
import { motion } from "framer-motion";

export default function TaxesSave() {
  return (
    <div className="min-h-screen bg-background">
      <TaxesNavbar />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1553729459-uj8FD0c3ZR08?w=1600&q=80"
            alt="Savings and piggy bank"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-primary" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">
                Smart Strategies
              </span>
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-3xl">
              Save On <span className="text-primary">Taxes</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Legal strategies and smart habits for Canadians to keep more of their money while staying fully compliant with the CRA.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <TaxesSectionShell number="01" title="The Power of Saving">
        <TaxesSectionCallout
          imgSrc="https://images.unsplash.com/photo-1579621970795-87facc2f976d?w=900&q=80"
          imgAlt="Financial planning"
          caption="Small savings habits compound into significant wealth over time"
        >
          <h3 className="font-display font-semibold text-xl mb-4">Why Tax Savings Matter</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Every dollar you save on taxes legally is a dollar you can invest in your future.
            Many Canadians overpay each year simply because they do not know about available
            deductions and credits offered by the Canada Revenue Agency.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Understanding tax-saving strategies is not about avoiding responsibility. It is about
            using the system the way it was designed, to reward RRSP contributions, education,
            homeownership, and charitable giving.
          </p>
        </TaxesSectionCallout>
      </TaxesSectionShell>

      <TaxesSectionShell number="02" title="Steps to Save">
        <TaxesHowToSave />
      </TaxesSectionShell>

      <TaxesSectionShell number="03" title="Tax Savings Calculator">
        <p className="text-muted-foreground leading-relaxed max-w-2xl mb-10">
        See how RRSP contributions and credits affect your combined federal and Ontario tax bill.
        Adjust the sliders to explore different scenarios using real 2025 CRA tax brackets.
        </p>
        <TaxesSavingsCalculator />
      </TaxesSectionShell>

      {/* Tip callout */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-primary/20 rounded-2xl p-10 lg:p-14"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-px bg-primary" />
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">
                Pro Tip
              </span>
            </div>
            <h3 className="font-display font-bold text-2xl lg:text-3xl mb-4">
              The TFSA and RRSP One-Two Punch
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Canadians have two powerful tax-sheltered accounts: the RRSP reduces your taxable income now
              and the TFSA lets your money grow completely tax free forever. Using both together is one of
              the most effective legal tax strategies available. The 2025 TFSA contribution limit is $7,000
              and the RRSP deduction limit is 18% of your prior year earned income up to $32,490.
              Starting even five years earlier can mean tens of thousands more at retirement.
            </p>
          </motion.div>
        </div>
      </section>

      <TaxesFooter />
    </div>
  );
}