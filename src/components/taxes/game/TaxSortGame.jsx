import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Play, CheckCircle2, XCircle } from "lucide-react";

const allCards = [
  { id: 1, name: "W-2 Form", category: "Income Document" },
  { id: 2, name: "1099-NEC", category: "Income Document" },
  { id: 3, name: "Mortgage Interest Statement", category: "Deduction" },
  { id: 4, name: "Child Tax Credit", category: "Credit" },
  { id: 5, name: "Social Security Tax", category: "Payroll Tax" },
  { id: 6, name: "Charitable Donation Receipt", category: "Deduction" },
  { id: 7, name: "Earned Income Tax Credit", category: "Credit" },
  { id: 8, name: "Medicare Tax", category: "Payroll Tax" },
  { id: 9, name: "Student Loan Interest", category: "Deduction" },
  { id: 10, name: "Education Tax Credit", category: "Credit" },
  { id: 11, name: "1040 Form", category: "Income Document" },
  { id: 12, name: "Home Office Deduction", category: "Deduction" },
  { id: 13, name: "Federal Unemployment Tax", category: "Payroll Tax" },
  { id: 14, name: "Child and Dependent Care Credit", category: "Credit" },
  { id: 15, name: "Schedule C", category: "Income Document" },
  { id: 16, name: "Business Mileage Deduction", category: "Deduction" },
];

const CATEGORIES = ["Income Document", "Deduction", "Credit", "Payroll Tax"];

export default function TaxSortGame() {
  const [gameState, setGameState] = useState("idle");
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  const startGame = () => {
    const shuffled = [...allCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrent(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setHistory([]);
    setGameState("playing");
  };

  const pick = (cat) => {
    if (revealed) return;
    setSelected(cat);
    setRevealed(true);
    const correct = cat === cards[current].category;
    if (correct) setScore((p) => p + 10);
    setHistory((p) => [...p, { card: cards[current].name, correct, chosen: cat, right: cards[current].category }]);
    setTimeout(() => {
      if (current < cards.length - 1) {
        setCurrent((p) => p + 1);
        setSelected(null);
        setRevealed(false);
      } else {
        setGameState("ended");
      }
    }, 1400);
  };

  if (gameState === "idle") {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🗂️</div>
        <h2 className="font-display font-bold text-3xl mb-3">Tax Document Sorter</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          16 tax items to sort into the right categories: Income Documents, Deductions, Credits, or Payroll Taxes. How many can you get right?
        </p>
        <Button onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg px-8 py-6">
          <Play className="w-5 h-5" /> Start Sorting
        </Button>
      </div>
    );
  }

  if (gameState === "ended") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display font-bold text-3xl mb-2">Sorting Complete!</h2>
        <p className="text-muted-foreground mb-2">Score</p>
        <p className="font-display font-bold text-5xl text-primary mb-1">{score}</p>
        <p className="text-muted-foreground text-sm mb-6">out of {allCards.length * 10} points</p>
        <div className="max-h-48 overflow-y-auto space-y-1 mb-6 text-left max-w-sm mx-auto">
          {history.map((h, i) => (
            <div key={i} className={`flex items-center justify-between text-xs p-2 rounded-lg ${h.correct ? "bg-emerald-500/10 text-emerald-400" : "bg-red-500/10 text-red-400"}`}>
              <span>{h.card}</span>
              {h.correct ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
            </div>
          ))}
        </div>
        <Button onClick={startGame} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> Play Again
        </Button>
      </motion.div>
    );
  }

  const card = cards[current];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/70">Card {current + 1} of {cards.length}</span>
          <p className="text-sm text-muted-foreground mt-1">Drag each item to the right category</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Score</span>
          <p className="font-display font-bold text-2xl text-primary">{score}</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-primary/10 border border-primary/30 rounded-2xl p-8 text-center mb-8"
        >
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Sort this item</p>
          <h3 className="font-display font-bold text-2xl text-foreground">{card.name}</h3>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 gap-3">
        {CATEGORIES.map((cat) => {
          let style = "bg-card border-border/50 hover:border-primary/40 cursor-pointer";
          if (revealed && selected === cat && cat === card.category) style = "bg-emerald-500/10 border-emerald-500/40";
          else if (revealed && selected === cat && cat !== card.category) style = "bg-red-500/10 border-red-500/40";
          else if (revealed && cat === card.category) style = "bg-emerald-500/10 border-emerald-500/40";
          else if (revealed) style = "bg-card border-border/20 opacity-40";
          return (
            <button key={cat} onClick={() => pick(cat)} disabled={revealed}
              className={`p-4 rounded-xl border text-sm font-semibold transition-all duration-300 ${style}`}>
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}