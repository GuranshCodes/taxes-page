import React from 'react';
 
/**
 * @param {{ eyebrow: string, title: string, children: React.ReactNode }} props
 */
export default function TaxesSectionCallout({ eyebrow, title, children }) {
  return (
    <div className="border-2 border-foreground rounded-3xl p-6 md:p-7 bg-[radial-gradient(circle_at_top,rgba(136,100,250,0.18),transparent_60%)]">
      <p className="text-accent text-[11px] font-mono tracking-[0.3em]">{eyebrow}</p>
      <h3 className="font-heading font-black text-3xl uppercase tracking-[-0.05em] mt-3 leading-tight">
        {title}
      </h3>
      <div className="mt-5">{children}</div>
    </div>
  );
}
 