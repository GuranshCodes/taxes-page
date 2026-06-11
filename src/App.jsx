import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';
import { useEffect } from 'react';

// Page imports
import Home from '@/pages/Home';
import TaxesAbout from '@/pages/TaxesAbout';
import TaxesSave from '@/pages/TaxesSave';
import TaxesBusiness from '@/pages/TaxesBusiness';
import TaxesGameHub from '@/pages/TaxesGameHub';
import GameTreasureHunt from '@/pages/GameTreasureHunt';
import GameCreditCatcher from '@/pages/GameCreditCatcher';
import GameQuizSprint from '@/pages/GameQuizSprint';
import GameBudgetBuilder from '@/pages/GameBudgetBuilder';
import GameTaxSort from '@/pages/GameTaxSort';
import GameRefundRace from '@/pages/GameRefundRace';
import GameDeductionMatch from '@/pages/GameDeductionMatch';
import GameTaxBracket from '@/pages/GameTaxBracket';
import GameSpendingAdvisor from '@/pages/GameSpendingAdvisor';
import GameW2Decoder from '@/pages/GameW2Decoder';
import GameInvestmentSim from '@/pages/GameInvestmentSim';
import GameFormFiling from '@/pages/GameFormFiling';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-muted border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/taxes-about" element={<TaxesAbout />} />
        <Route path="/taxes-save" element={<TaxesSave />} />
        <Route path="/taxes-business" element={<TaxesBusiness />} />
        <Route path="/games" element={<TaxesGameHub />} />
        <Route path="/games/treasure" element={<GameTreasureHunt />} />
        <Route path="/games/credit-catcher" element={<GameCreditCatcher />} />
        <Route path="/games/quiz-sprint" element={<GameQuizSprint />} />
        <Route path="/games/budget-builder" element={<GameBudgetBuilder />} />
        <Route path="/games/tax-sort" element={<GameTaxSort />} />
        <Route path="/games/refund-race" element={<GameRefundRace />} />
        <Route path="/games/deduction-match" element={<GameDeductionMatch />} />
        <Route path="/games/tax-bracket" element={<GameTaxBracket />} />
        <Route path="/games/spending-advisor" element={<GameSpendingAdvisor />} />
        <Route path="/games/w2-decoder" element={<GameW2Decoder />} />
        <Route path="/games/investment-sim" element={<GameInvestmentSim />} />
        <Route path="/games/form-filing" element={<GameFormFiling />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App