import React from "react";
import TaxesNavbar from "@/components/taxes/TaxesNavbar";
import TaxesGameCards from "@/components/taxes/TaxesGameCards";
import TaxesFooter from "@/components/taxes/TaxesFooter";
import { motion } from "framer-motion";

export default function TaxesGameHub() {
  return (
    <div className="min-h-screen bg-background">
      <TaxesNavbar />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1600&q=80"
            alt="Gaming and learning"
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
                Learn By Playing
              </span>
            </div>
            <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight max-w-3xl">
              Financial <span className="text-primary">Games</span>
            </h1>
            <p className="mt-8 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Put your financial knowledge to the test with interactive games
              that teach real-world money concepts.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <TaxesGameCards />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
              Each game teaches different financial concepts. Play all three to get a
              well-rounded understanding of taxes, credits, deductions, and smart money management.
            </p>
          </motion.div>
        </div>
      </section>

      <TaxesFooter />
    </div>
  );
}