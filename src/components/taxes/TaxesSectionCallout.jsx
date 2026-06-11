import React from "react";
import { motion } from "framer-motion";

/** @param {{ imgSrc: string, imgAlt: string, caption?: string, children: React.ReactNode, reverse?: boolean }} props */
export default function TaxesSectionCallout({ imgSrc, imgAlt, caption, children, reverse = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? "direction-reverse" : ""}`}
    >
      <div className={reverse ? "lg:order-2" : ""}>
        {children}
      </div>
      <div className={reverse ? "lg:order-1" : ""}>
        <div className="relative rounded-2xl overflow-hidden">
          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-full h-72 lg:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          {caption && (
            <p className="absolute bottom-4 left-4 right-4 text-xs text-foreground/70 italic">
              {caption}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}