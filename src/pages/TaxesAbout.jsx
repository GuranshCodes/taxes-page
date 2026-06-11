import React from "react";
import TaxesNavbar from "@/components/taxes/TaxesNavbar";
import TaxesSectionShell from "@/components/taxes/TaxesSectionShell";
import TaxesSectionCallout from "@/components/taxes/TaxesSectionCallout";
import TaxesInfoCards from "@/components/taxes/TaxesInfoCards";
import TaxesKidsFAQ from "@/components/taxes/TaxesKidsFAQ";
import TaxesFooter from "@/components/taxes/TaxesFooter";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function TaxesAbout() {
  return (
    <div className="min-h-screen bg-background">
      <TaxesNavbar />

      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1450101499163-c8848e968ab7?w=1600&q=80"
            alt="Library and learning"
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
                Understanding Taxes
              </span>
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-3xl">
              About <span className="text-primary">Taxes</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Everything you need to know about how taxes work, who pays them,
              and why they're essential to a functioning society.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <TaxesSectionShell number="01" title="How Taxes Work">
        <TaxesSectionCallout
          imgSrc="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80"
          imgAlt="Tax calculation"
          caption="The progressive tax system ensures fairness across income levels"
        >
          <h3 className="font-display font-semibold text-xl mb-4">The Progressive Tax System</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The U.S. uses a progressive tax system, meaning tax rates increase as income rises. 
            But here's the key: each rate only applies to income within that specific bracket.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            If you earn $50,000, you don't pay 22% on all of it. You pay 10% on the first $11,600, 
            12% on the next portion, and only 22% on the amount above $47,150.
          </p>
          <div className="space-y-3">
            {[
              { bracket: "$0 – $11,600", rate: "10%" },
              { bracket: "$11,601 – $47,150", rate: "12%" },
              { bracket: "$47,151 – $100,525", rate: "22%" },
              { bracket: "$100,526 – $191,950", rate: "24%" },
            ].map((b) => (
              <div key={b.bracket} className="flex justify-between items-center py-2 border-b border-border/30">
                <span className="text-sm text-muted-foreground">{b.bracket}</span>
                <span className="font-display font-semibold text-primary text-sm">{b.rate}</span>
              </div>
            ))}
          </div>
        </TaxesSectionCallout>
      </TaxesSectionShell>

      <TaxesSectionShell number="02" title="Types of Taxes">
        <TaxesInfoCards />
      </TaxesSectionShell>

      <TaxesSectionShell number="03" title="Where Do Taxes Go?">
        <TaxesSectionCallout
          imgSrc="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80"
          imgAlt="City infrastructure funded by taxes"
          caption="Tax revenue builds and maintains the infrastructure of society"
          reverse
        >
          <div className="space-y-6">
            {[
              { label: "Social Security & Medicare", pct: "33%", desc: "Retirement benefits and healthcare for seniors." },
              { label: "National Defense", pct: "15%", desc: "Military and national security operations." },
              { label: "Safety Net Programs", pct: "13%", desc: "Food assistance, housing, and aid for low-income families." },
              { label: "Interest on Debt", pct: "10%", desc: "Paying interest on money the government has borrowed." },
              { label: "Everything Else", pct: "29%", desc: "Education, infrastructure, science, transportation, and more." },
            ].map((item) => (
              <div key={item.label} className="flex gap-4">
                <span className="font-display font-bold text-lg text-primary w-12 flex-shrink-0">{item.pct}</span>
                <div>
                  <h4 className="font-medium text-sm">{item.label}</h4>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </TaxesSectionCallout>
      </TaxesSectionShell>

      <TaxesSectionShell number="04" title="Frequently Asked Questions">
        <TaxesKidsFAQ />
      </TaxesSectionShell>

      <TaxesFooter />
    </div>
  );
}