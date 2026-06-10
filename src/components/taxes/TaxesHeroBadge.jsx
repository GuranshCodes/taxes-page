import React from 'react';
 
/**
 * @param {{ icon: React.ElementType, label: string }} props
 */
export default function TaxesHeroBadge({ icon: Icon, label }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-2 border-foreground rounded-2xl bg-background bg-[radial-gradient(circle_at_top,rgba(136,100,250,0.18),transparent_60%)]">

      <div className="w-10 h-10 rounded-xl border-2 border-foreground flex items-center justify-center">
        <Icon size={18} />
      </div>
      <div>
        <div className="text-[11px] font-mono text-muted-foreground tracking-wider uppercase">FEATURE</div>
        <div className="font-heading font-black text-lg uppercase tracking-[-0.03em]">{label}</div>
      </div>
    </div>
  );
}
 