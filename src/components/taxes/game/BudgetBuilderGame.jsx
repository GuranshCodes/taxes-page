import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Play, CheckCircle2, XCircle } from "lucide-react";

const rounds = [
  {
    income: 3200,
    label: "Entry-Level Job",
    categories: [
      { name: "Rent", recommended: 960, min: 600, max: 1400 },
      { name: "Food & Groceries", recommended: 400, min: 150, max: 700 },
      { name: "Transportation", recommended: 320, min: 100, max: 600 },
      { name: "Savings", recommended: 480, min: 0, max: 1000 },
      { name: "Entertainment", recommended: 160, min: 0, max: 500 },
    ],
  },
  {
    income: 5500,
    label: "Mid-Career Professional",
    categories: [
      { name: "Rent/Mortgage", recommended: 1650, min: 800, max: 2500 },
      { name: "Food & Groceries", recommended: 600, min: 200, max: 900 },
      { name: "Transportation", recommended: 550, min: 150, max: 900 },
      { name: "Retirement (401k)", recommended: 550, min: 0, max: 1500 },
      { name: "Entertainment", recommended: 275, min: 0, max: 800 },
      { name: "Emergency Fund", recommended: 275, min: 0, max: 800 },
    ],
  },
  {
    income: 8000,
    label: "High Earner",
    categories: [
      { name: "Housing", recommended: 2000, min: 1000, max: 3500 },
      { name: "Food & Dining", recommended: 800, min: 300, max: 1500 },
      { name: "Transportation", recommended: 700, min: 200, max: 1200 },
      { name: "Investments", recommended: 1200, min: 0, max: 2500 },
      { name: "Travel", recommended: 400, min: 0, max: 1000 },
      { name: "Taxes (estimated)", recommended: 1800, min: 1200, max: 2800 },
    ],
  },
];

export default function BudgetBuilderGame() {
  const [gameState, setGameState] = useState("idle");
  const [roundIdx, setRoundIdx] = useState(0);
  const [allocations, setAllocations] = useState({});
  const [revealed, setRevealed] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const round = rounds[roundIdx];
  const spent = Object.values(allocations).reduce((a, b) => a + b, 0);
  const remaining = round.income - spent;

  const adjust = (name, delta) => {
    if (revealed) return;
    setAllocations((prev) => {
      const current = prev[name] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [name]: next };
    });
  };

  const checkBudget = () => {
    setRevealed(true);
    let score = 0;
    round.categories.forEach((cat) => {
      const val = allocations[cat.name] || 0;
      if (val >= cat.min && val <= cat.max) score += 15;
      const diff = Math.abs(val - cat.recommended);
      if (diff < 100) score += 10;
    });
    setTotalScore((p) => p + score);
  };

  const next = () => {
    if (roundIdx < rounds.length - 1) {
      setRoundIdx((p) => p + 1);
      setAllocations({});
      setRevealed(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setRoundIdx(0);
    setAllocations({});
    setRevealed(false);
    setTotalScore(0);
    setFinished(false);
    setGameState("playing");
  };

  if (gameState === "idle") {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">📊</div>
        <h2 className="font-display font-bold text-3xl mb-3">Budget Builder</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Allocate a monthly income across real spending categories. Stay in the recommended ranges to earn points. 3 income scenarios to master.
        </p>
        <Button onClick={() => setGameState("playing")} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg px-8 py-6">
          <Play className="w-5 h-5" /> Build Your Budget
        </Button>
      </div>
    );
  }

  if (finished) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display font-bold text-3xl mb-2">Budget Master!</h2>
        <p className="text-muted-foreground mb-2">Total Score</p>
        <p className="font-display font-bold text-5xl text-primary mb-8">{totalScore}</p>
        <Button onClick={restart} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> Play Again
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/70">Round {roundIdx + 1} of {rounds.length}</span>
          <h3 className="font-display font-bold text-2xl mt-1">{round.label}</h3>
          <p className="text-sm text-muted-foreground mt-1">Monthly Income: <span className="text-primary font-semibold">${round.income.toLocaleString()}</span></p>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Score</span>
          <p className="font-display font-bold text-2xl text-primary">{totalScore}</p>
        </div>
      </div>

      <div className={`mb-4 p-3 rounded-xl text-sm font-medium text-center ${remaining < 0 ? "bg-red-500/10 text-red-400" : "bg-primary/10 text-primary"}`}>
        {remaining < 0 ? `Over budget by $${Math.abs(remaining).toLocaleString()}` : `Remaining: $${remaining.toLocaleString()}`}
      </div>

      <div className="space-y-4 mb-8">
        {round.categories.map((cat) => {
          const val = allocations[cat.name] || 0;
          let status = null;
          if (revealed) {
            const ok = val >= cat.min && val <= cat.max;
            status = ok ? "good" : "bad";
          }
          return (
            <div key={cat.name} className={`p-4 rounded-xl border transition-all ${revealed && status === "good" ? "bg-emerald-500/10 border-emerald-500/30" : revealed && status === "bad" ? "bg-red-500/10 border-red-500/30" : "bg-card border-border/50"}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{cat.name}</span>
                <div className="flex items-center gap-2">
                  {!revealed && (
                    <>
                      <button onClick={() => adjust(cat.name, -50)} className="w-7 h-7 rounded-lg bg-secondary hover:bg-secondary/70 text-sm font-bold transition-colors">-</button>
                      <span className="font-display font-bold text-primary w-20 text-center">${val.toLocaleString()}</span>
                      <button onClick={() => adjust(cat.name, 50)} className="w-7 h-7 rounded-lg bg-secondary hover:bg-secondary/70 text-sm font-bold transition-colors">+</button>
                    </>
                  )}
                  {revealed && (
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-primary">${val.toLocaleString()}</span>
                      {status === "good" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <XCircle className="w-4 h-4 text-red-400" />}
                    </div>
                  )}
                </div>
              </div>
              {revealed && (
                <p className="text-xs text-muted-foreground">Recommended: ${cat.min.toLocaleString()} to ${cat.max.toLocaleString()}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex justify-end">
        {!revealed ? (
          <Button onClick={checkBudget} className="bg-primary text-primary-foreground hover:bg-primary/90">Check Budget</Button>
        ) : (
          <Button onClick={next} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {roundIdx < rounds.length - 1 ? "Next Round" : "See Results"}
          </Button>
        )}
      </div>
    </div>
  );
}