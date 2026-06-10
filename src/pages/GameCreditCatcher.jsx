import React from 'react';
import TaxesNavbar from '@/components/taxes/TaxesNavbar';
import TaxesFooter from '@/components/taxes/TaxesFooter';
import TaxesSectionShell from '@/components/taxes/TaxesSectionShell';
import CreditCatcherGame from '@/components/taxes/game/CreditCatcherGame';

export default function GameCreditCatcher() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <TaxesNavbar />
      <main className="pt-16">
        <TaxesSectionShell eyebrow="GAME" title="Credit Catcher">
          <CreditCatcherGame />
        </TaxesSectionShell>
        <TaxesFooter />
      </main>
    </div>
  );
}

