import React from 'react';
import TaxesNavbar from '@/components/taxes/TaxesFooter';

import TaxesSectionShell from '@/components/taxes/TaxesSectionShell';
import TaxesBusinessWriteOffs from '@/components/taxes/TaxesBusinessWriteOffs';
import TaxesFooter from '@/components/taxes/TaxesFooter';

export default function TaxesBusiness() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <TaxesNavbar />
      <main className="pt-16">
        <TaxesSectionShell
          eyebrow="BUSINESSES"
          title="Write-offs (learning-only!)"
        >
          <div className="space-y-4 text-sm md:text-base font-mono text-muted-foreground leading-relaxed">
            <p>
              Businesses can often deduct <span className="text-foreground font-bold">certain expenses</span>.
              That usually means those costs may reduce taxable income.
            </p>
            <p>
              The tricky part: not every expense counts. Rules depend on where you live.
            </p>
            <p>
              This page explains the idea using kid-friendly examples.
            </p>
          </div>

          <div className="mt-8">
            <TaxesBusinessWriteOffs />
          </div>
        </TaxesSectionShell>

        <TaxesFooter />
      </main>
    </div>
  );
}

