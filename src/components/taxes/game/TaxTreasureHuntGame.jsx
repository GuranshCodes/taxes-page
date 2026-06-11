import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gem, Check, X, RotateCcw, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const scenarios = [
  {
    title: "Working From Home",
    items: [
      { name: "Home office rent portion", deductible: true },
      { name: "Netflix subscription", deductible: false },
      { name: "Internet bill (business %)", deductible: true },
      { name: "Office desk & chair", deductible: true },
      { name: "Personal groceries", deductible: false },
      { name: "Computer for work", deductible: true },
    ],
  },
  {
    title: "Starting a Business",
    items: [
      { name: "Business license fees", deductible: true },
      { name: "Marketing & advertising", deductible: true },
      { name: "Personal vacation", deductible: false },
      { name: "Professional development", deductible: true },
      { name: "Pet supplies", deductible: false },
      { name: "Business insurance", deductible: true },
    ],
  },
  {
    title: "Freelance Designer",
    items: [
      { name: "Adobe Creative Suite", deductible: true },
      { name: "Client lunch meeting", deductible: true },
      { name: "Gaming console", deductible: false },
      { name: "Portfolio website hosting", deductible: true },
      { name: "Movie tickets", deductible: false },
      { name: "Mileage to client office", deductible: true },
    ],
  },
  {
    title: "Real Estate Investor",
    items: [
      { name: "Mortgage interest on rental", deductible: true },
      { name: "Property repairs", deductible: true },
      { name: "Personal clothing", deductible: false },
      { name: "Property management fees", deductible: true },
      { name: "Gym membership", deductible: false },
      { name: "Depreciation expense", deductible: true },
    ],
  },
  {
    title: "Rideshare Driver",
    items: [
      { name: "Car mileage (work trips)", deductible: true },
      { name: "Phone mount & accessories", deductible: true },
      { name: "Personal road trip", deductible: false },
      { name: "Car insurance (work %)", deductible: true },
      { name: "Family vacation flights", deductible: false },
      { name: "Water bottles for passengers", deductible: true },
    ],
  },
  {
    title: "Small Restaurant Owner",
    items: [
      { name: "Food inventory costs", deductible: true },
      { name: "Staff wages", deductible: true },
      { name: "Owner personal meals", deductible: false },
      { name: "Kitchen equipment", deductible: true },
      { name: "Personal credit card bills", deductible: false },
      { name: "Restaurant rent", deductible: true },
    ],
  },
  {
    title: "Online Content Creator",
    items: [
      { name: "Camera and lighting gear", deductible: true },
      { name: "Editing software subscription", deductible: true },
      { name: "Personal clothes (not on camera)", deductible: false },
      { name: "Studio rent", deductible: true },
      { name: "Grocery haul for fun", deductible: false },
      { name: "Microphone and audio gear", deductible: true },
    ],
  },
  {
    title: "Medical Professional",
    items: [
      { name: "Medical board license fees", deductible: true },
      { name: "Continuing education courses", deductible: true },
      { name: "Personal health club", deductible: false },
      { name: "Medical journals & textbooks", deductible: true },
      { name: "Spouse birthday gift", deductible: false },
      { name: "Malpractice insurance", deductible: true },
    ],
  },
];

export default function TaxTreasureHuntGame() {
  const [scenarioIdx, setScenarioIdx] = useState(0);
  const [selected, setSelected] = useState(new Set());
  const [revealed, setRevealed] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const scenario = scenarios[scenarioIdx];
  const correctItems = scenario.items.filter((i) => i.deductible).map((i) => i.name);

  const toggle = (name) => {
    if (revealed) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const checkAnswers = () => {
    setRevealed(true);
    let score = 0;
    scenario.items.forEach((item) => {
      const wasSelected = selected.has(item.name);
      if (item.deductible && wasSelected) score += 10;
      if (!item.deductible && !wasSelected) score += 5;
    });
    setTotalScore((prev) => prev + score);
  };

  const nextScenario = () => {
    if (scenarioIdx < scenarios.length - 1) {
      setScenarioIdx((prev) => prev + 1);
      setSelected(new Set());
      setRevealed(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setScenarioIdx(0);
    setSelected(new Set());
    setRevealed(false);
    setTotalScore(0);
    setFinished(false);
  };

  if (finished) {
    const max = scenarios.reduce((acc, s) => acc + s.items.filter(i => i.deductible).length * 10 + s.items.filter(i => !i.deductible).length * 5, 0);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display font-bold text-3xl mb-2">Hunt Complete!</h2>
        <p className="text-muted-foreground mb-2">You scored</p>
        <p className="font-display font-bold text-5xl text-primary mb-1">{totalScore}</p>
        <p className="text-muted-foreground text-sm mb-8">out of {max} points</p>
        <Button onClick={restart} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> Play Again
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/70">
            Scenario {scenarioIdx + 1} of {scenarios.length}
          </span>
          <h3 className="font-display font-bold text-2xl mt-1">{scenario.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">Tap the items you think are tax deductible</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Score</span>
          <p className="font-display font-bold text-2xl text-primary">{totalScore}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        <AnimatePresence>
          {scenario.items.map((item) => {
            const isSelected = selected.has(item.name);
            let bg = "bg-card border-border/50";
            let icon = null;

            if (revealed) {
              if (item.deductible && isSelected) {
                bg = "bg-emerald-500/10 border-emerald-500/40";
                icon = <Check className="w-4 h-4 text-emerald-400" />;
              } else if (item.deductible && !isSelected) {
                bg = "bg-yellow-500/10 border-yellow-500/30";
                icon = <Gem className="w-4 h-4 text-yellow-400" />;
              } else if (!item.deductible && isSelected) {
                bg = "bg-red-500/10 border-red-500/30";
                icon = <X className="w-4 h-4 text-red-400" />;
              } else {
                bg = "bg-card border-border/30";
                icon = <Check className="w-4 h-4 text-muted-foreground/40" />;
              }
            } else if (isSelected) {
              bg = "bg-primary/10 border-primary/40";
            }

            return (
              <motion.button
                key={item.name}
                layout
                onClick={() => toggle(item.name)}
                className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${bg} ${
                  !revealed ? "hover:border-primary/30 cursor-pointer" : "cursor-default"
                }`}
              >
                <span className="text-sm font-medium">{item.name}</span>
                {icon}
                {!revealed && isSelected && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="flex justify-end gap-3">
        {!revealed ? (
          <Button onClick={checkAnswers} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2">
            <Gem className="w-4 h-4" /> Check Answers
          </Button>
        ) : (
          <Button onClick={nextScenario} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {scenarioIdx < scenarios.length - 1 ? "Next Scenario →" : "See Results →"}
          </Button>
        )}
      </div>
    </div>
  );
}