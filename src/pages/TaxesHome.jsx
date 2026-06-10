import React from 'react';
import TaxesNavbar from '@/components/taxes/TaxesNavbar';
import TaxesHero from '@/components/taxes/TaxesHero';
import TaxesInfoCards from '@/components/taxes/TaxesInfoCards';
import TaxesHowToSave from '@/components/taxes/TaxesHowToSave';
import TaxesBusinessWriteOffs from '@/components/taxes/TaxesBusinessWriteOffs';
import TaxesKidsFAQ from '@/components/taxes/TaxesKidsFAQ';
import TaxesFooter from '@/components/taxes/TaxesFooter';

export default function TaxesHome() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <TaxesNavbar />
      <main className="pt-16">
        <TaxesHero />
        <TaxesInfoCards />
        <TaxesHowToSave />
        <TaxesBusinessWriteOffs />
        <TaxesKidsFAQ />
        <TaxesFooter />
      </main>
    </div>
  );
}

