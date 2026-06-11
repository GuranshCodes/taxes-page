import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function TaxesHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80"
          alt="Financial documents"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      {/* Side tracker */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-end gap-6">
        {["Learn", "Save", "Invest", "Grow"].map((label, i) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-xs font-medium tracking-wider text-muted-foreground/60 uppercase">
              {label}
            </span>
            <div
              className={`w-2.5 h-2.5 rounded-full border-2 transition-colors ${
                i === 0
                  ? "bg-primary border-primary"
                  : "border-muted-foreground/30 bg-transparent"
              }`}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-px bg-primary" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary">
              Financial Literacy Project
            </span>
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-8xl leading-[0.95] tracking-tight max-w-4xl">
            Master Your{" "}
            <span className="text-primary">Money</span>
            <br />
            & Taxes
          </h1>

          <p className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Exploring how taxes work, why they matter, and how to make smart
            financial decisions through interactive learning and fun games.
          </p>

          <motion.button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
            className="mt-16 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors group"
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            Scroll to explore
            <ChevronDown className="w-4 h-4 group-hover:text-primary transition-colors" />
          </motion.button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}