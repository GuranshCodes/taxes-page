import React from 'react';
import TaxesNavbar from '@/components/taxes/TaxesNavbar';
import TaxesFooter from '@/components/taxes/TaxesFooter';
import TaxesSectionShell from '@/components/taxes/TaxesSectionShell';
import TaxTreasureHuntGame from '@/components/taxes/game/TaxTreasureHuntGame';

export default function GameTreasureHunt() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <TaxesNavbar />
      <main className="pt-16">
        <TaxesSectionShell eyebrow="GAME" title="Tax Treasure Hunt">
          <TaxTreasureHuntGame />
        </TaxesSectionShell>
        <TaxesFooter />
      </main>
    </div>
  );
}

