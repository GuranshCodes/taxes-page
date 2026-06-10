import React from 'react';
import TaxesNavbar from '@/components/taxes/TaxesNavbar';
import TaxesFooter from '@/components/taxes/TaxesFooter';
import TaxesGameCards from '@/components/taxes/TaxesGameCards';
import TaxesSectionShell from '@/components/taxes/TaxesSectionShell';

export default function TaxesGameHub() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <TaxesNavbar />
      <main className="pt-16">
        <TaxesSectionShell eyebrow="GAMES HUB" title="Pick a game">
          <div className="mt-6 text-sm md:text-base font-mono text-muted-foreground leading-relaxed max-w-2xl">
            Grade 8 challenge: play, score points, and learn tax ideas.
            <span className="block mt-2">Learning-only · no legal advice.</span>
          </div>

          <div className="mt-10">
            <TaxesGameCards />
          </div>
        </TaxesSectionShell>

        <TaxesFooter />
      </main>
    </div>
  );
}




