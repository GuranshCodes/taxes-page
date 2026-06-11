import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Play, ThumbsUp, ThumbsDown } from "lucide-react";

const scenarios = [
  {
    situation: "You just got a $3,000 tax refund. What is the smartest move?",
    options: [
      { text: "Book a vacation immediately", smart: false, reason: "A refund is your own money returned. Spending it all on luxury misses an opportunity to build wealth." },
      { text: "Put it toward an emergency fund or debt", smart: true, reason: "Great choice. Paying off high-interest debt or building savings creates long-term financial stability." },
      { text: "Lend it all to a friend", smart: false, reason: "Lending large amounts to friends often strains relationships and rarely gets repaid fully." },
      { text: "Invest it in a retirement account", smart: true, reason: "Excellent. Tax-advantaged retirement accounts grow your money over decades with compound interest." },
    ],
  },
  {
    situation: "You are self-employed and just got paid $5,000. What should you do first?",
    options: [
      { text: "Spend it on new equipment immediately", smart: false, reason: "New expenses are fine but you should set aside taxes first since no employer withheld for you." },
      { text: "Set aside 25 to 30 percent for taxes", smart: true, reason: "Self-employed people pay both sides of FICA plus income tax. Always set tax money aside first." },
      { text: "Wait until April to worry about taxes", smart: false, reason: "This leads to a large unexpected bill and possible underpayment penalties." },
      { text: "Pay estimated quarterly taxes", smart: true, reason: "Paying estimated taxes each quarter keeps you compliant and avoids penalties." },
    ],
  },
  {
    situation: "Your employer offers a 401(k) match up to 5% of your salary. You currently contribute 0%. What do you do?",
    options: [
      { text: "Keep contributing 0% to take home more pay", smart: false, reason: "You are leaving free money on the table. An employer match is a 100% instant return on your money." },
      { text: "Contribute at least 5% to get the full match", smart: true, reason: "Always capture the full employer match. It is essentially a guaranteed 100% return." },
      { text: "Invest in stocks instead of a 401(k)", smart: false, reason: "Individual stocks do not come with an employer match or the same tax advantages." },
      { text: "Wait until you earn more money", smart: false, reason: "The longer you wait the more years of compound growth and free employer money you lose." },
    ],
  },
  {
    situation: "You owe $2,000 in taxes you cannot afford to pay by April 15. What should you do?",
    options: [
      { text: "Ignore the bill and hope for the best", smart: false, reason: "Ignoring it leads to mounting penalties and interest. The IRS will eventually collect." },
      { text: "File on time and request an installment plan", smart: true, reason: "Filing on time avoids failure-to-file penalties. An IRS payment plan keeps penalties to a minimum." },
      { text: "File an extension to avoid paying", smart: false, reason: "An extension gives more time to file but does not delay when payment is due." },
      { text: "Pay as much as you can and request a payment plan", smart: true, reason: "Paying something and requesting a plan shows good faith and minimizes penalties and interest." },
    ],
  },
  {
    situation: "You receive a $10,000 inheritance. You are in the 22% tax bracket. What is the wisest move?",
    options: [
      { text: "Spend it all before you have to pay taxes on it", smart: false, reason: "Inheritances are generally not taxable income. Spending it all out of fear is not necessary." },
      { text: "Put it in a high-yield savings account or invest it", smart: true, reason: "Inherited money is generally tax-free income. Growing it through savings or investments is a smart choice." },
      { text: "Report it as income on your tax return", smart: false, reason: "Most inheritances are not taxable as ordinary income. Only estates over the federal threshold owe estate tax." },
      { text: "Open a Roth IRA and invest it", smart: true, reason: "Roth IRA contributions grow tax-free. Using inherited money to fund one is an excellent long-term move." },
    ],
  },
];

export default function SpendingAdvisorGame() {
  const [gameState, setGameState] = useState("idle");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState(null);

  const startGame = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFeedback(null);
    setGameState("playing");
  };

  const pick = (opt) => {
    if (selected !== null) return;
    setSelected(opt);
    if (opt.smart) setScore((p) => p + 20);
    setFeedback(opt);
  };

  const next = () => {
    if (current < scenarios.length - 1) {
      setCurrent((p) => p + 1);
      setSelected(null);
      setFeedback(null);
    } else {
      setGameState("ended");
    }
  };

  if (gameState === "idle") {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">💡</div>
        <h2 className="font-display font-bold text-3xl mb-3">Spending Advisor</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          5 real financial situations. Some answers are smart, some will cost you in the long run. Show off your money wisdom!
        </p>
        <Button onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg px-8 py-6">
          <Play className="w-5 h-5" /> Advise Away
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
        <h2 className="font-display font-bold text-3xl mb-2">Advice Complete!</h2>
        <p className="text-muted-foreground mb-2">Financial Wisdom Score</p>
        <p className="font-display font-bold text-5xl text-primary mb-8">{score} / {scenarios.length * 20}</p>
        <Button onClick={startGame} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> Play Again
        </Button>
      </motion.div>
    );
  }

  const s = scenarios[current];
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/70">Situation {current + 1} of {scenarios.length}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Score</span>
          <p className="font-display font-bold text-2xl text-primary">{score}</p>
        </div>
      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 mb-8">
        <h3 className="font-display font-semibold text-xl">{s.situation}</h3>
      </div>

      <div className="space-y-3 mb-6">
        {s.options.map((opt, i) => {
          let style = "bg-card border-border/50 hover:border-primary/30 cursor-pointer";
          let icon = null;
          if (selected) {
            if (opt === selected) {
              style = opt.smart ? "bg-emerald-500/10 border-emerald-500/40" : "bg-red-500/10 border-red-500/30";
              icon = opt.smart ? <ThumbsUp className="w-5 h-5 text-emerald-400" /> : <ThumbsDown className="w-5 h-5 text-red-400" />;
            } else if (opt.smart) {
              style = "bg-emerald-500/10 border-emerald-500/30 opacity-70";
              icon = <ThumbsUp className="w-4 h-4 text-emerald-400" />;
            } else {
              style = "bg-card border-border/20 opacity-40";
            }
          }
          return (
            <button key={i} onClick={() => pick(opt)} disabled={!!selected}
              className={`w-full flex items-center justify-between p-4 rounded-xl border text-left text-sm font-medium transition-all duration-300 ${style}`}>
              <span>{opt.text}</span>
              {icon}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {feedback && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`p-4 rounded-xl border text-sm mb-6 ${feedback.smart ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-300" : "bg-red-500/10 border-red-500/20 text-red-300"}`}>
            {feedback.reason}
          </motion.div>
        )}
      </AnimatePresence>

      {selected && (
        <div className="flex justify-end">
          <Button onClick={next} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {current < scenarios.length - 1 ? "Next Situation" : "See Results"}
          </Button>
        </div>
      )}
    </div>
  );
}