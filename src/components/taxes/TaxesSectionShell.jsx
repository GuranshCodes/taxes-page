import React from 'react';
 
/**
 * @param {{ eyebrow?: string, title: string, children: React.ReactNode }} props
 */
export default function TaxesSectionShell({ eyebrow, title, children }) {
  return (
    <section className="border-t-2 border-foreground">
      <div className="p-6 md:p-12 max-w-7xl mx-auto">
        <div className="border-b-2 border-foreground pb-6">
          <p className="text-accent text-[11px] font-mono tracking-[0.3em] mb-4">
            {eyebrow || 'SECTION'}
          </p>
          <h2 className="font-heading font-black text-3xl md:text-6xl uppercase tracking-[-0.05em] leading-[0.95]">
            {title}
          </h2>
        </div>
 
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
 