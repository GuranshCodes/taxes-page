import React from 'react';
import TaxesSectionCallout from './TaxesSectionCallout';
import TaxesSavingsCalculator from './TaxesSavingsCalculator';


export default function TaxesHowToSave() {
  return (
    <section id="how-to-save" className="border-b-2 border-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <TaxesSectionCallout eyebrow="CREDITS + DEDUCTIONS" title="How can taxes go down?">
              <div className="space-y-3 text-sm md:text-base font-mono text-muted-foreground leading-relaxed">
                <p>
                  People can sometimes qualify for <span className="text-foreground font-bold">deductions</span> (lower taxable income)
                  or <span className="text-foreground font-bold">credits</span> (lower tax bill).
                </p>
                <p>
                  This website keeps it simple for learning.
                  Rules depend on where you live.
                </p>
              </div>
            </TaxesSectionCallout>
          </div>

          <div className="lg:col-span-7">
            <TaxesSavingsCalculator />
          </div>
        </div>
      </div>
    </section>
  );
}

