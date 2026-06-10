import React from 'react';
import TaxesNavbar from '@/components/taxes/TaxesNavbar';
import TaxesFooter from '@/components/taxes/TaxesFooter';
import TaxesSectionShell from '@/components/taxes/TaxesSectionShell';
import TaxesSavingsCalculator from '@/components/taxes/TaxesSavingsCalculator';

export default function TaxesSave() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <TaxesNavbar />
      <main className="pt-16">
        <TaxesSectionShell eyebrow="HOW TO SAVE" title="Credits + deductions (kid edition)">
          <div className="space-y-5 text-sm md:text-base font-mono text-muted-foreground leading-relaxed">
            <p>
              When you lower your <span className="text-foreground font-bold">tax bill</span>,
              it often happens because you qualify for:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-foreground font-bold">Deductions</span>: they reduce
                the amount of income that gets taxed.
              </li>
              <li>
                <span className="text-foreground font-bold">Credits</span>: they reduce
                your tax bill directly.
              </li>
            </ul>
            <p>
              Every country has different rules. This site is for learning only—always
              ask a grown-up or professional for real advice.
            </p>
          </div>

          <div className="mt-8">
            <TaxesSavingsCalculator />
          </div>
        </TaxesSectionShell>

        <TaxesFooter />
      </main>
    </div>
  );
}

