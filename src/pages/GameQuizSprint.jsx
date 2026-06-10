import React from 'react';
import TaxesNavbar from '@/components/taxes/TaxesNavbar';
import TaxesFooter from '@/components/taxes/TaxesFooter';
import TaxesSectionShell from '@/components/taxes/TaxesSectionShell';
import QuizSprintGame from '@/components/taxes/game/QuizSprintGame';

export default function GameQuizSprint() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
      <TaxesNavbar />
      <main className="pt-16">
        <TaxesSectionShell eyebrow="GAME" title="Quick Quiz Sprint">
          <QuizSprintGame />
        </TaxesSectionShell>
        <TaxesFooter />
      </main>
    </div>
  );
}

