import React from "react";
import TaxesNavbar from "@/components/taxes/TaxesNavbar";
import TaxesSectionShell from "@/components/taxes/TaxesSectionShell";
import TaxesSectionCallout from "@/components/taxes/TaxesSectionCallout";
import TaxesBusinessWriteOffs from "@/components/taxes/TaxesBusinessWriteOffs";
import TaxesFooter from "@/components/taxes/TaxesFooter";
import { motion } from "framer-motion";

const businessTypes = [
  {
    title: "Sole Proprietorship",
    desc: "The simplest structure. You and the business are the same legal entity. Income is reported on your personal tax return (Schedule C).",
    pros: "Easy to start, full control",
    cons: "Personal liability, self-employment tax",
  },
  {
    title: "LLC",
    desc: "Offers personal liability protection while allowing flexible tax treatment. Can be taxed as a sole proprietorship or corporation.",
    pros: "Liability protection, flexibility",
    cons: "State fees, more paperwork",
  },
  {
    title: "S-Corporation",
    desc: "Avoids double taxation by passing income through to shareholders. Can save on self-employment taxes by paying yourself a salary.",
    pros: "Tax savings, liability protection",
    cons: "Strict requirements, payroll needed",
  },
];

export default function TaxesBusiness() {
  return (
    <div className="min-h-screen bg-background">
      <TaxesNavbar />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80"
            alt="Business workspace"
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
                Entrepreneurship
              </span>
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-3xl">
              Business <span className="text-primary">Taxes</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
              How businesses handle taxes, from choosing the right structure
              to maximizing write-offs and staying compliant.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <TaxesSectionShell number="01" title="Business Structures">
        <div className="grid lg:grid-cols-3 gap-6">
          {businessTypes.map((bt, i) => (
            <motion.div
              key={bt.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border/50 rounded-2xl p-8 hover:border-primary/30 transition-colors"
            >
              <h3 className="font-display font-semibold text-lg mb-4">{bt.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{bt.desc}</p>
              <div className="space-y-3 pt-4 border-t border-border/30">
                <div className="flex gap-2">
                  <span className="text-xs font-semibold text-primary">+</span>
                  <span className="text-xs text-muted-foreground">{bt.pros}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-xs font-semibold text-red-400">−</span>
                  <span className="text-xs text-muted-foreground">{bt.cons}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </TaxesSectionShell>

      <TaxesSectionShell number="02" title="Common Write-Offs">
        <p className="text-muted-foreground leading-relaxed max-w-2xl mb-10">
          Business write-offs reduce your taxable income. Every legitimate expense you track
          and deduct means less money going to taxes and more staying in your business.
        </p>
        <TaxesBusinessWriteOffs />
      </TaxesSectionShell>

      <TaxesSectionShell number="03" title="Self-Employment Tax">
        <TaxesSectionCallout
          imgSrc="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=900&q=80"
          imgAlt="Self-employed individual working"
          caption="Self-employed individuals pay both the employer and employee portions of FICA"
          reverse
        >
          <h3 className="font-display font-semibold text-xl mb-4">The 15.3% Reality</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When you're self-employed, you pay both the employer and employee portions of 
            Social Security and Medicare taxes — a combined 15.3% on top of income tax.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The good news? You can deduct the employer-equivalent portion (7.65%) from your 
            adjusted gross income. And with an S-Corp election, you may save even more by 
            paying yourself a reasonable salary and taking the rest as distributions.
          </p>
          <div className="bg-secondary/50 rounded-xl p-5">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Social Security</span>
                <span className="font-display font-semibold text-primary">12.4%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Medicare</span>
                <span className="font-display font-semibold text-primary">2.9%</span>
              </div>
              <div className="flex justify-between text-sm pt-3 border-t border-border/30">
                <span className="font-medium">Total Self-Employment Tax</span>
                <span className="font-display font-bold text-primary">15.3%</span>
              </div>
            </div>
          </div>
        </TaxesSectionCallout>
      </TaxesSectionShell>

      <TaxesFooter />
    </div>
  );
}