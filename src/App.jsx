import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClientInstance } from "@/lib/query-client"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import PageNotFound from "./lib/PageNotFound"
import { AuthProvider, useAuth } from "@/lib/AuthContext"
import UserNotRegisteredError from "@/components/UserNotRegisteredError"
import ScrollToTop from "./components/ScrollToTop"
import Home from "./pages/Home"
import { ThemeProvider } from "./lib/ThemeContext"

// -----------------------------
// AUTH WRAPPER (SAFE VERSION)
// -----------------------------
const AuthenticatedApp = () => {
  const {
    isLoadingAuth,
    isLoadingPublicSettings,
    authError,
  } = useAuth()

  // 🔥 Loading state
  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      </div>
    )
  }

  // 🔥 Error handling (NO redirects here anymore)
  if (authError) {
    if (authError.type === "user_not_registered") {
      return <UserNotRegisteredError />
    }

    if (authError.type === "auth_required") {
      return (
        <div className="fixed inset-0 flex items-center justify-center flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Authentication required
          </p>

          <button
            onClick={() => (window.location.href = "/")}
            className="px-4 py-2 rounded bg-black text-white"
          >
            Go Home
          </button>
        </div>
      )
    }
  }

// 🔥 Normal routes
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/taxes-about" element={<TaxesAbout />} />
      <Route path="/taxes-save" element={<TaxesSave />} />
      <Route path="/taxes-business" element={<TaxesBusiness />} />
      <Route path="/games" element={<TaxesGameHub />} />
      <Route path="/games/treasure" element={<GameTreasureHunt />} />
      <Route path="/games/credit-catcher" element={<GameCreditCatcher />} />
      <Route path="/games/quiz-sprint" element={<GameQuizSprint />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

// -----------------------------
// MAIN APP
// -----------------------------
function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClientInstance}>

          <Router basename="/">
            <ScrollToTop />
            <AuthenticatedApp />
          </Router>

          <Toaster />

        </QueryClientProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
