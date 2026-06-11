import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Play, CheckCircle2, XCircle, FileText } from "lucide-react";

const steps = [
  {
    title: "Step 1: Gather Your Documents",
    description: "Maria earned $48,000 from her job and $2,000 in freelance work. She contributed $3,000 to her 401(k). Which documents does she need?",
    options: [
      { text: "W-2 from employer only", correct: false },
      { text: "W-2 from employer and 1099-NEC for freelance work", correct: true },
      { text: "Only her bank statements", correct: false },
      { text: "1040 form and a passport", correct: false },
    ],
    explanation: "Maria needs a W-2 for her job income and a 1099-NEC for freelance earnings above $600.",
  },
  {
    title: "Step 2: Choose Your Filing Status",
    description: "Maria is single with no dependents. What filing status should she use?",
    options: [
      { text: "Married Filing Jointly", correct: false },
      { text: "Head of Household", correct: false },
      { text: "Single", correct: true },
      { text: "Qualifying Widow", correct: false },
    ],
    explanation: "Single is correct for an unmarried person with no qualifying dependents.",
  },
  {
    title: "Step 3: Calculate Adjusted Gross Income",
    description: "Maria earned $50,000 total ($48k job + $2k freelance). She contributed $3,000 to her 401(k). What is her AGI?",
    options: [
      { text: "$50,000", correct: false },
      { text: "$47,000", correct: true },
      { text: "$45,000", correct: false },
      { text: "$48,000", correct: false },
    ],
    explanation: "AGI = Total Income minus above-the-line deductions. $50,000 minus $3,000 = $47,000.",
  },
  {
    title: "Step 4: Standard or Itemized?",
    description: "Maria has $4,000 in mortgage interest and $1,200 in charitable donations. The 2024 standard deduction for single filers is $14,600. What should she do?",
    options: [
      { text: "Itemize deductions ($5,200 total)", correct: false },
      { text: "Take the standard deduction ($14,600)", correct: true },
      { text: "Skip deductions entirely", correct: false },
      { text: "Itemize only the mortgage interest", correct: false },
    ],
    explanation: "Her itemized total of $5,200 is much less than the $14,600 standard deduction, so she should take the standard.",
  },
  {
    title: "Step 5: Apply Tax Credits",
    description: "Maria qualifies for a $500 saver's credit because of her 401(k) contributions. Her tax before credits is $4,800. What does she owe?",
    options: [
      { text: "$5,300", correct: false },
      { text: "$4,800", correct: false },
      { text: "$4,300", correct: true },
      { text: "$0", correct: false },
    ],
    explanation: "Credits reduce tax dollar-for-dollar. $4,800 minus $500 saver's credit = $4,300 final tax owed.",
  },
  {
    title: "Step 6: Determine Refund or Amount Owed",
    description: "Maria's employer withheld $5,200 from her paychecks all year. Her final tax owed is $4,300. What happens?",
    options: [
      { text: "She owes the IRS $900", correct: false },
      { text: "She gets a $900 refund", correct: true },
      { text: "She gets a $5,200 refund", correct: false },
      { text: "She owes $4,300", correct: false },
    ],
    explanation: "She overpaid by $900 ($5,200 withheld minus $4,300 owed), so the IRS refunds her $900.",
  },
];

export default function FormFilingGame() {
  const [gameState, setGameState] = useState("idle");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const startGame = () => {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setGameState("playing");
  };

  const pick = (opt) => {
    if (showResult) return;
    setSelected(opt);
    setShowResult(true);
    if (opt.correct) setScore((p) => p + 15);
    setTimeout(() => {
      if (current < steps.length - 1) {
        setCurrent((p) => p + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setGameState("ended");
      }
    }, 2500);
  };

  if (gameState === "idle") {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">📝</div>
        <h2 className="font-display font-bold text-3xl mb-3">Form Filing Simulator</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Walk through all 6 steps of filing a real tax return for Maria. Each step builds on the last. Learn the full filing process from start to finish!
        </p>
        <Button onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg px-8 py-6">
          <Play className="w-5 h-5" /> File Maria's Return
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
        <h2 className="font-display font-bold text-3xl mb-2">Return Filed!</h2>
        <p className="text-muted-foreground mb-2">Maria thanks you. Score:</p>
        <p className="font-display font-bold text-5xl text-primary mb-8">{score} / {steps.length * 15}</p>
        <Button onClick={startGame} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> File Again
        </Button>
      </motion.div>
    );
  }

  const step = steps[current];
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/70">{step.title}</span>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Score</span>
          <p className="font-display font-bold text-xl text-primary">{score}</p>
        </div>
      </div>

      <div className="flex gap-1.5 mb-6">
        {steps.map((_, i) => (
          <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i < current ? "bg-primary" : i === current ? "bg-primary/60" : "bg-border"}`} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <div className="bg-card border border-border/50 rounded-2xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-relaxed text-foreground">{step.description}</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {step.options.map((opt, idx) => {
              let style = "bg-card border-border/50 hover:border-primary/30 cursor-pointer";
              let icon = null;
              if (showResult) {
                if (opt.correct) { style = "bg-emerald-500/10 border-emerald-500/40"; icon = <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />; }
                else if (opt === selected) { style = "bg-red-500/10 border-red-500/30"; icon = <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />; }
                else style = "bg-card border-border/20 opacity-40";
              }
              return (
                <button key={idx} onClick={() => pick(opt)} disabled={showResult}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left text-sm font-medium transition-all duration-300 ${style}`}>
                  <span>{opt.text}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {showResult && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-muted/50 border border-border/40 text-sm text-muted-foreground">
              {step.explanation}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}