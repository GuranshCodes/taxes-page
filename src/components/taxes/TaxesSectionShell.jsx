import React from "react";
import { motion } from "framer-motion";

export default function TaxesSectionShell({ number, title, children, className = "" }) {
  return (
    <section className={`relative py-24 lg:py-32 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {(number || title) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            {number && (
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-primary/70 block mb-4">
                Section {number}
              </span>
            )}
            {title && (
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight max-w-3xl">
                {title}
              </h2>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}