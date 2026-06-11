import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Play } from "lucide-react";

const allPairs = [
  { term: "W-2", match: "Employer wage statement" },
  { term: "1099-NEC", match: "Freelance/contractor income" },
  { term: "Schedule C", match: "Business profit and loss" },
  { term: "HSA", match: "Health Savings Account" },
  { term: "FICA", match: "Social Security + Medicare tax" },
  { term: "AGI", match: "Adjusted Gross Income" },
  { term: "Standard Deduction", match: "Flat amount reducing taxable income" },
  { term: "Itemized Deductions", match: "Listing individual expenses to deduct" },
  { term: "Tax Bracket", match: "Range of income taxed at same rate" },
  { term: "Withholding", match: "Tax taken from paycheck upfront" },
  { term: "Capital Gain", match: "Profit from selling an asset" },
  { term: "Depreciation", match: "Deducting asset value over time" },
];

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

export default function DeductionMatchGame() {
  const [gameState, setGameState] = useState("idle");
  const [pairs, setPairs] = useState([]);
  const [terms, setTerms] = useState([]);
  const [matches, setMatches] = useState([]);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [matched, setMatched] = useState(new Set());
  const [wrong, setWrong] = useState(new Set());
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (gameState !== "playing") return;
    const t = setInterval(() => setElapsed(Math.floor((Date.now() - startTime) / 1000)), 1000);
    return () => clearInterval(t);
  }, [gameState, startTime]);

  const startGame = () => {
    const chosen = shuffle(allPairs).slice(0, 8);
    setPairs(chosen);
    setTerms(shuffle(chosen.map((p) => p.term)));
    setMatches(shuffle(chosen.map((p) => p.match)));
    setSelectedTerm(null);
    setSelectedMatch(null);
    setMatched(new Set());
    setWrong(new Set());
    setScore(0);
    setAttempts(0);
    setStartTime(Date.now());
    setElapsed(0);
    setGameState("playing");
  };

  useEffect(() => {
    if (!selectedTerm || !selectedMatch) return;
    setAttempts((p) => p + 1);
    const pair = pairs.find((p) => p.term === selectedTerm);
    if (pair && pair.match === selectedMatch) {
      const keys = [selectedTerm, selectedMatch];
      setMatched((p) => new Set([...p, ...keys]));
      setScore((p) => p + 10);
      setSelectedTerm(null);
      setSelectedMatch(null);
      if (matched.size + 2 >= pairs.length * 2) setGameState("ended");
    } else {
      setWrong(new Set([selectedTerm, selectedMatch]));
      setTimeout(() => {
        setWrong(new Set());
        setSelectedTerm(null);
        setSelectedMatch(null);
      }, 800);
    }
  }, [selectedTerm, selectedMatch]);

  useEffect(() => {
    if (gameState === "playing" && matched.size === pairs.length * 2) {
      setGameState("ended");
    }
  }, [matched]);

  if (gameState === "idle") {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🔗</div>
        <h2 className="font-display font-bold text-3xl mb-3">Tax Term Matcher</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Match 8 tax terms to their correct definitions. Click a term and then its matching definition. Try to finish with as few wrong attempts as possible!
        </p>
        <Button onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg px-8 py-6">
          <Play className="w-5 h-5" /> Start Matching
        </Button>
      </div>
    );
  }

  if (gameState === "ended") {
    const accuracy = attempts > 0 ? Math.round((score / 10 / attempts) * 100) : 100;
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display font-bold text-3xl mb-2">All Matched!</h2>
        <div className="flex justify-center gap-8 mb-8">
          <div>
            <p className="text-muted-foreground text-sm">Score</p>
            <p className="font-display font-bold text-4xl text-primary">{score}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Accuracy</p>
            <p className="font-display font-bold text-4xl text-primary">{accuracy}%</p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Time</p>
            <p className="font-display font-bold text-4xl text-primary">{elapsed}s</p>
          </div>
        </div>
        <Button onClick={startGame} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> Play Again
        </Button>
      </motion.div>
    );
  }

  const getStyle = (val, isSelected, isMatched, isWrong) => {
    if (isMatched) return "bg-emerald-500/10 border-emerald-500/30 opacity-50 cursor-default";
    if (isWrong) return "bg-red-500/10 border-red-500/40";
    if (isSelected) return "bg-primary/15 border-primary/50 ring-2 ring-primary/30";
    return "bg-card border-border/50 hover:border-primary/30 cursor-pointer";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/70">Tax Term Matcher</span>
          <p className="text-sm text-muted-foreground mt-1">{matched.size / 2} of {pairs.length} matched</p>
        </div>
        <div className="flex gap-6 text-right">
          <div>
            <span className="text-xs text-muted-foreground">Score</span>
            <p className="font-display font-bold text-2xl text-primary">{score}</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">Time</span>
            <p className="font-display font-bold text-2xl text-foreground">{elapsed}s</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Terms</p>
          {terms.map((t) => (
            <button key={t} onClick={() => !matched.has(t) && setSelectedTerm(t)}
              className={`w-full text-left p-3 rounded-xl border text-sm font-medium transition-all duration-200 ${getStyle(t, selectedTerm === t, matched.has(t), wrong.has(t))}`}>
              {t}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">Definitions</p>
          {matches.map((m) => (
            <button key={m} onClick={() => !matched.has(m) && selectedTerm && setSelectedMatch(m)}
              className={`w-full text-left p-3 rounded-xl border text-sm transition-all duration-200 ${getStyle(m, selectedMatch === m, matched.has(m), wrong.has(m))}`}>
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}