import React from 'react';
import TaxesNavbar from '@/components/taxes/TaxesNavbar';
import TaxesFooter from '@/components/taxes/TaxesFooter';
import TaxesSectionShell from '@/components/taxes/TaxesSectionShell';

export default function TaxesAbout() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <TaxesNavbar />
      <main className="pt-16">
        <TaxesSectionShell
          eyebrow="TAXES FOR KIDS"
          title="What are taxes?"
        >
          <div className="space-y-4 text-sm md:text-base font-mono text-muted-foreground leading-relaxed">
            <p>
              Taxes are money that people and businesses pay to help the government
              run things.
            </p>
            <p>
              When you pay taxes, you help pay for schools, roads, hospitals,
              playgrounds, and safety.
            </p>
            <p>
              Taxes aren’t just “taking money”—they’re more like “joining the team”
              to build things everyone can use.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { k: 'INCOME TAX', v: 'Tax on money you earn.' },
              { k: 'SALES TAX', v: 'Tax when you buy things.' },
              { k: 'PROPERTY TAX', v: 'Tax related to owning property.' },
            ].map((x) => (
              <div key={x.k} className="border-2 border-foreground p-4 bg-background">
                <div className="text-[10px] font-mono text-accent tracking-wider">
                  {x.k}
                </div>
                <div className="mt-2 font-heading font-black text-lg uppercase tracking-[-0.03em]">
                  {x.v}
                </div>
              </div>
            ))}
          </div>
        </TaxesSectionShell>

        <TaxesFooter />
      </main>
    </div>
  );
}

