import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Play, CheckCircle2, XCircle } from "lucide-react";

const challenges = [
  {
    income: 45000,
    deductions: 14600,
    credits: 0,
    label: "Single filer, no credits",
    correctTax: 3248,
    choices: [3248, 9900, 6600, 4500],
  },
  {
    income: 80000,
    deductions: 14600,
    credits: 500,
    label: "Single filer with $500 credit",
    correctTax: 9648,
    choices: [9648, 12500, 7800, 11000],
  },
  {
    income: 120000,
    deductions: 29200,
    credits: 2000,
    label: "Married couple filing jointly",
    correctTax: 11827,
    choices: [11827, 18000, 14500, 9200],
  },
  {
    income: 30000,
    deductions: 14600,
    credits: 1500,
    label: "Low income single filer with credit",
    correctTax: 0,
    choices: [0, 750, 1500, 300],
  },
  {
    income: 200000,
    deductions: 14600,
    credits: 0,
    label: "High earning single filer",
    correctTax: 42047,
    choices: [42047, 55000, 36000, 48000],
  },
];

function calcTax(income, deductions, credits) {
  const taxable = Math.max(0, income - deductions);
  const brackets = [
    { limit: 11600, rate: 0.10 },
    { limit: 47150, rate: 0.12 },
    { limit: 100525, rate: 0.22 },
    { limit: 191950, rate: 0.24 },
    { limit: Infinity, rate: 0.32 },
  ];
  let tax = 0, prev = 0, rem = taxable;
  for (const b of brackets) {
    const chunk = Math.min(rem, b.limit - prev);
    if (chunk <= 0) break;
    tax += chunk * b.rate;
    rem -= chunk;
    prev = b.limit;
  }
  return Math.max(0, Math.round(tax - credits));
}

export default function TaxBracketGame() {
  const [gameState, setGameState] = useState("idle");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const startGame = () => {
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setGameState("playing");
  };

  const pick = (val) => {
    if (revealed) return;
    setSelected(val);
    setRevealed(true);
    if (val === challenges[current].correctTax) setScore((p) => p + 20);
    setTimeout(() => {
      if (current < challenges.length - 1) {
        setCurrent((p) => p + 1);
        setSelected(null);
        setRevealed(false);
      } else {
        setGameState("ended");
      }
    }, 2000);
  };

  if (gameState === "idle") {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🧮</div>
        <h2 className="font-display font-bold text-3xl mb-3">Bracket Buster</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Given an income, deductions, and credits, pick the correct tax owed. 5 real-world tax calculations using actual 2024 brackets. Can you beat the IRS?
        </p>
        <Button onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg px-8 py-6">
          <Play className="w-5 h-5" /> Calculate!
        </Button>
      </div>
    );
  }

  if (gameState === "ended") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display font-bold text-3xl mb-2">Calculations Done!</h2>
        <p className="text-muted-foreground mb-2">Score</p>
        <p className="font-display font-bold text-5xl text-primary mb-8">{score} / {challenges.length * 20}</p>
        <Button onClick={startGame} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> Try Again
        </Button>
      </motion.div>
    );
  }

  const c = challenges[current];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/70">Scenario {current + 1} of {challenges.length}</span>
          <h3 className="font-display font-bold text-2xl mt-1">{c.label}</h3>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Score</span>
          <p className="font-display font-bold text-2xl text-primary">{score}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Gross Income", value: `$${c.income.toLocaleString()}` },
          { label: "Deductions", value: `$${c.deductions.toLocaleString()}` },
          { label: "Tax Credits", value: `$${c.credits.toLocaleString()}` },
        ].map((item) => (
          <div key={item.label} className="bg-card border border-border/50 rounded-xl p-4 text-center">
            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
            <p className="font-display font-bold text-lg text-primary">{item.value}</p>
          </div>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-4 font-medium">What is the final tax owed?</p>

      <div className="grid grid-cols-2 gap-3">
        {c.choices.map((choice) => {
          let style = "bg-card border-border/50 hover:border-primary/30 cursor-pointer";
          if (revealed) {
            if (choice === c.correctTax) style = "bg-emerald-500/10 border-emerald-500/40";
            else if (choice === selected) style = "bg-red-500/10 border-red-500/30";
            else style = "bg-card border-border/20 opacity-40";
          }
          return (
            <button key={choice} onClick={() => pick(choice)} disabled={revealed}
              className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${style}`}>
              <span className="font-display font-bold text-lg">${choice.toLocaleString()}</span>
              {revealed && choice === c.correctTax && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
              {revealed && choice === selected && choice !== c.correctTax && <XCircle className="w-5 h-5 text-red-400" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}