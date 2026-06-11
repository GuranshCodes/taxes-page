import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Play, Clock } from "lucide-react";

const situations = [
  {
    question: "You withheld $4,200 all year but only owe $3,800. What happens?",
    options: ["You owe $400 more", "You get a $400 refund", "Nothing changes", "You get a penalty"],
    correct: 1,
    explanation: "You overpaid by $400 so the IRS sends you a refund.",
  },
  {
    question: "A freelancer earns $60,000 but made no estimated tax payments. At filing time they will likely:",
    options: ["Get a big refund", "Owe taxes and possibly a penalty", "Pay nothing", "Get a credit"],
    correct: 1,
    explanation: "Freelancers must pay estimated taxes quarterly or they owe at filing plus a penalty.",
  },
  {
    question: "Which filing status typically results in the lowest tax bill for a single parent?",
    options: ["Single", "Married Filing Jointly", "Head of Household", "Married Filing Separately"],
    correct: 2,
    explanation: "Head of Household gives a larger standard deduction and lower rates than Single.",
  },
  {
    question: "You earned $1,000 in side income and never reported it. The IRS will:",
    options: ["Forgive it", "Add it to your tax bill plus interest", "Only charge you if over $5,000", "Send a thank-you note"],
    correct: 1,
    explanation: "All income must be reported. Unreported income leads to back taxes plus interest and penalties.",
  },
  {
    question: "Filing an extension gives you extra time to:",
    options: ["Pay your taxes", "File your return", "Avoid paying taxes", "Increase deductions"],
    correct: 1,
    explanation: "An extension gives more time to file, but payment is still due by April 15.",
  },
  {
    question: "Which situation would most likely result in a large tax refund?",
    options: ["Claiming zero allowances on your W-4 all year", "Claiming many allowances on your W-4", "Paying no estimated taxes", "Having only freelance income"],
    correct: 0,
    explanation: "Claiming zero means more is withheld per paycheck, which often leads to a refund.",
  },
  {
    question: "You receive a 1099-K showing $800 in payments from an app. You must:",
    options: ["Ignore it", "Report it as income on your tax return", "Only report it if over $5,000", "Send it back to the app"],
    correct: 1,
    explanation: "Any income reported to the IRS on a 1099 must be included on your tax return.",
  },
  {
    question: "What does 'tax liability' mean?",
    options: ["Total income", "The total amount of tax you owe for the year", "Your bank balance", "How much you get back"],
    correct: 1,
    explanation: "Tax liability is the total taxes owed before accounting for any payments already made.",
  },
];

const TIME_PER_Q = 20;

export default function RefundRaceGame() {
  const [gameState, setGameState] = useState("idle");
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_Q);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffled, setShuffled] = useState([]);

  const startGame = () => {
    setShuffled([...situations].sort(() => Math.random() - 0.5));
    setCurrent(0);
    setScore(0);
    setTimeLeft(TIME_PER_Q);
    setSelected(null);
    setShowResult(false);
    setGameState("playing");
  };

  useEffect(() => {
    if (gameState !== "playing" || showResult) return;
    const t = setInterval(() => {
      setTimeLeft((p) => {
        if (p <= 1) { handleAnswer(-1); return TIME_PER_Q; }
        return p - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [gameState, showResult, current]);

  const handleAnswer = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);
    if (idx === shuffled[current].correct) setScore((p) => p + 15);
    setTimeout(() => {
      if (current < shuffled.length - 1) {
        setCurrent((p) => p + 1);
        setSelected(null);
        setShowResult(false);
        setTimeLeft(TIME_PER_Q);
      } else {
        setGameState("ended");
      }
    }, 2000);
  };

  if (gameState === "idle") {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🏁</div>
        <h2 className="font-display font-bold text-3xl mb-3">Refund Race</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          8 real-world tax scenarios. Figure out what happens at filing time. You have {TIME_PER_Q} seconds per question. Speed and accuracy win!
        </p>
        <Button onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg px-8 py-6">
          <Play className="w-5 h-5" /> Start Race
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
        <h2 className="font-display font-bold text-3xl mb-2">Race Finished!</h2>
        <p className="text-muted-foreground mb-2">Score</p>
        <p className="font-display font-bold text-5xl text-primary mb-8">{score}</p>
        <Button onClick={startGame} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> Race Again
        </Button>
      </motion.div>
    );
  }

  const q = shuffled[current];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-xs text-muted-foreground">Score</span>
            <p className="font-display font-bold text-2xl text-primary">{score}</p>
          </div>
          <span className="text-xs text-muted-foreground">{current + 1} / {shuffled.length}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className={`w-4 h-4 ${timeLeft <= 7 ? "text-red-400" : "text-muted-foreground"}`} />
          <span className={`font-display font-bold text-lg ${timeLeft <= 7 ? "text-red-400" : "text-foreground"}`}>{timeLeft}</span>
        </div>
      </div>

      <div className="w-full h-1 bg-secondary rounded-full mb-8 overflow-hidden">
        <motion.div className="h-full bg-primary rounded-full" animate={{ width: `${(timeLeft / TIME_PER_Q) * 100}%` }} transition={{ duration: 0.5 }} />
      </div>

      <h3 className="font-display font-semibold text-xl mb-6">{q.question}</h3>

      <div className="grid sm:grid-cols-2 gap-3 mb-6">
        {q.options.map((opt, idx) => {
          let style = "bg-card border-border/50 hover:border-primary/30 cursor-pointer";
          if (showResult) {
            if (idx === q.correct) style = "bg-emerald-500/10 border-emerald-500/40";
            else if (idx === selected) style = "bg-red-500/10 border-red-500/30";
            else style = "bg-card border-border/20 opacity-40";
          }
          return (
            <button key={idx} onClick={() => handleAnswer(idx)} disabled={showResult}
              className={`p-4 rounded-xl border text-sm font-medium text-left transition-all duration-300 ${style}`}>
              {opt}
            </button>
          );
        })}
      </div>

      {showResult && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-card border border-border/50 text-sm text-muted-foreground">
          {q.explanation}
        </motion.div>
      )}
    </div>
  );
}