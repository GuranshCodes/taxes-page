import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Play, CheckCircle2, XCircle } from "lucide-react";

const questions = [
  {
    box: "Box 1",
    label: "Wages, Tips, Other Compensation",
    question: "What does Box 1 on a W-2 represent?",
    options: ["Total Social Security wages", "Total federal taxable wages", "State income withheld", "Total Medicare wages"],
    correct: 1,
    explanation: "Box 1 shows your total federal taxable wages including tips and bonuses.",
  },
  {
    box: "Box 2",
    label: "Federal Income Tax Withheld",
    question: "Box 2 shows $4,200. What does this mean?",
    options: ["You owe $4,200 more", "Your employer sent $4,200 to the IRS on your behalf", "You earned $4,200 in tips", "Your state tax bill is $4,200"],
    correct: 1,
    explanation: "Box 2 is federal income tax already withheld from your paychecks throughout the year.",
  },
  {
    box: "Box 4",
    label: "Social Security Tax Withheld",
    question: "Box 4 on a W-2 represents:",
    options: ["Your total earnings", "State taxes paid", "Social Security taxes withheld from your pay", "Medicare taxes paid"],
    correct: 2,
    explanation: "Box 4 shows the 6.2% Social Security tax withheld from your wages.",
  },
  {
    box: "Box 6",
    label: "Medicare Tax Withheld",
    question: "If Box 6 shows $725, and you earned $50,000, the Medicare tax rate was:",
    options: ["6.2%", "1.45%", "2.9%", "12.4%"],
    correct: 1,
    explanation: "$725 divided by $50,000 = 1.45%, which is the standard employee Medicare tax rate.",
  },
  {
    box: "Box 12 Code D",
    label: "401(k) Contributions",
    question: "Box 12 with code D shows $3,000. This means:",
    options: ["You owe $3,000 extra in taxes", "You contributed $3,000 to a 401(k)", "Your employer paid $3,000 in taxes", "You received a $3,000 bonus"],
    correct: 1,
    explanation: "Code D in Box 12 shows your pre-tax 401(k) contributions which reduce your taxable income.",
  },
  {
    box: "Box 16 & 17",
    label: "State Wages and Tax",
    question: "Boxes 16 and 17 on a W-2 are used for:",
    options: ["Federal taxes only", "Social Security reporting", "State wages earned and state income tax withheld", "Retirement contributions"],
    correct: 2,
    explanation: "Box 16 shows state taxable wages and Box 17 shows how much state income tax was withheld.",
  },
];

export default function W2DecoderGame() {
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

  const pick = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === questions[current].correct) setScore((p) => p + 15);
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent((p) => p + 1);
        setSelected(null);
        setShowResult(false);
      } else {
        setGameState("ended");
      }
    }, 2200);
  };

  if (gameState === "idle") {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">📄</div>
        <h2 className="font-display font-bold text-3xl mb-3">W-2 Decoder</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The W-2 is the most important tax document most people receive. Can you decode what each box means? 6 questions covering the key boxes on a real W-2.
        </p>
        <Button onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg px-8 py-6">
          <Play className="w-5 h-5" /> Decode It
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
        <h2 className="font-display font-bold text-3xl mb-2">W-2 Expert!</h2>
        <p className="text-muted-foreground mb-2">Score</p>
        <p className="font-display font-bold text-5xl text-primary mb-8">{score} / {questions.length * 15}</p>
        <Button onClick={startGame} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> Try Again
        </Button>
      </motion.div>
    );
  }

  const q = questions[current];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/70">Question {current + 1} of {questions.length}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Score</span>
          <p className="font-display font-bold text-2xl text-primary">{score}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <div className="bg-card border border-border/50 rounded-2xl p-6 mb-6 flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex flex-col items-center justify-center flex-shrink-0">
              <span className="text-xs text-primary font-bold">{q.box}</span>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{q.label}</p>
              <h3 className="font-display font-semibold text-xl">{q.question}</h3>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {q.options.map((opt, idx) => {
              let style = "bg-card border-border/50 hover:border-primary/30 cursor-pointer";
              let icon = null;
              if (showResult) {
                if (idx === q.correct) { style = "bg-emerald-500/10 border-emerald-500/40"; icon = <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />; }
                else if (idx === selected) { style = "bg-red-500/10 border-red-500/30"; icon = <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />; }
                else style = "bg-card border-border/20 opacity-40";
              }
              return (
                <button key={idx} onClick={() => pick(idx)} disabled={showResult}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left text-sm font-medium transition-all duration-300 ${style}`}>
                  <span>{opt}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {showResult && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-muted/50 border border-border/40 text-sm text-muted-foreground">
              {q.explanation}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}