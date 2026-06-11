import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Play, TrendingUp, TrendingDown } from "lucide-react";

const rounds = [
  {
    year: 1,
    scenario: "The stock market is up 18% this year. You have $10,000 in a taxable account.",
    choices: [
      { label: "Sell everything and take profits", taxEffect: -0.22, portfolioEffect: 1.18, note: "You lock in gains but pay 22% short-term capital gains tax since you held less than 1 year." },
      { label: "Hold for at least 1 year first", taxEffect: 0, portfolioEffect: 1.18, note: "Smart. Holding over 1 year qualifies for the lower long-term capital gains rate of 0 to 20%." },
      { label: "Move to a Roth IRA", taxEffect: 0, portfolioEffect: 1.18, note: "Roth IRA growth is tax-free. A great choice for long-term compounding." },
    ],
  },
  {
    year: 2,
    scenario: "Your portfolio dropped $3,000. You have gains elsewhere that total $4,000.",
    choices: [
      { label: "Ignore the loss", taxEffect: 0, portfolioEffect: 1.0, note: "You miss the opportunity to offset your gains with this loss." },
      { label: "Sell the losing investment to offset gains (tax-loss harvesting)", taxEffect: 0.15, portfolioEffect: 1.0, note: "Tax-loss harvesting saves you taxes by offsetting $3,000 of your $4,000 in gains." },
      { label: "Double down on the losing investment", taxEffect: 0, portfolioEffect: 0.85, note: "Risky move. You may lose even more money with no tax benefit." },
    ],
  },
  {
    year: 3,
    scenario: "You can contribute $7,000 to a retirement account this year. Where does the money go?",
    choices: [
      { label: "Traditional IRA (pre-tax)", taxEffect: 0.12, portfolioEffect: 1.07, note: "You save 12% in taxes now but pay taxes on withdrawals in retirement." },
      { label: "Roth IRA (after-tax)", taxEffect: 0, portfolioEffect: 1.07, note: "No tax break now, but all growth and withdrawals are completely tax-free in retirement." },
      { label: "Taxable brokerage account", taxEffect: -0.05, portfolioEffect: 1.07, note: "You miss out on tax advantages. Growth and dividends will be taxed each year." },
    ],
  },
];

export default function InvestmentSimGame() {
  const [gameState, setGameState] = useState("idle");
  const [roundIdx, setRoundIdx] = useState(0);
  const [portfolio, setPortfolio] = useState(10000);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  const startGame = () => {
    setRoundIdx(0);
    setPortfolio(10000);
    setSelected(null);
    setScore(0);
    setHistory([]);
    setGameState("playing");
  };

  const pick = (choice) => {
    if (selected) return;
    setSelected(choice);
    const newPortfolio = Math.round(portfolio * choice.portfolioEffect * (1 - Math.max(0, -choice.taxEffect)));
    const gain = Math.round(portfolio * choice.portfolioEffect) - portfolio;
    const taxSaved = Math.round(portfolio * Math.max(0, choice.taxEffect));
    const pts = taxSaved + Math.max(0, gain / 100);
    setScore((p) => p + Math.round(pts));
    setHistory((p) => [...p, { round: roundIdx + 1, label: choice.label, portfolio: newPortfolio }]);
  };

  const next = () => {
    if (!selected) return;
    const newPortfolio = Math.round(portfolio * selected.portfolioEffect * (1 - Math.max(0, -selected.taxEffect)));
    setPortfolio(newPortfolio);
    if (roundIdx < rounds.length - 1) {
      setRoundIdx((p) => p + 1);
      setSelected(null);
    } else {
      setGameState("ended");
    }
  };

  if (gameState === "idle") {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">📈</div>
        <h2 className="font-display font-bold text-3xl mb-3">Investment Simulator</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Make 3 years of investment decisions. Each choice affects your portfolio value and your tax bill. Learn how tax-smart investing can make a huge difference.
        </p>
        <Button onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg px-8 py-6">
          <Play className="w-5 h-5" /> Start Investing
        </Button>
      </div>
    );
  }

  if (gameState === "ended") {
    const gain = portfolio - 10000;
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display font-bold text-3xl mb-4">3 Years Complete!</h2>
        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto mb-6">
          <div className="bg-card border border-border/50 rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">Final Portfolio</p>
            <p className="font-display font-bold text-2xl text-primary">${portfolio.toLocaleString()}</p>
          </div>
          <div className="bg-card border border-border/50 rounded-xl p-4">
            <p className="text-xs text-muted-foreground mb-1">Total Gain</p>
            <p className={`font-display font-bold text-2xl ${gain >= 0 ? "text-emerald-400" : "text-red-400"}`}>{gain >= 0 ? "+" : ""}${gain.toLocaleString()}</p>
          </div>
        </div>
        <Button onClick={startGame} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> Invest Again
        </Button>
      </motion.div>
    );
  }

  const r = rounds[roundIdx];
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-primary/70">Year {r.year} of {rounds.length}</span>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Portfolio</span>
          <p className="font-display font-bold text-2xl text-primary">${portfolio.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-card border border-border/50 rounded-2xl p-6 mb-6">
        <p className="font-medium text-foreground">{r.scenario}</p>
      </div>

      <div className="space-y-3 mb-6">
        {r.choices.map((choice, i) => {
          let style = "bg-card border-border/50 hover:border-primary/30 cursor-pointer text-left";
          if (selected) {
            if (choice === selected) style = "bg-primary/10 border-primary/40 text-left";
            else style = "bg-card border-border/20 opacity-40 text-left";
          }
          return (
            <button key={i} onClick={() => pick(choice)} disabled={!!selected}
              className={`w-full p-4 rounded-xl border transition-all duration-300 ${style}`}>
              <p className="text-sm font-medium mb-1">{choice.label}</p>
              {selected === choice && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-muted-foreground mt-2">
                  {choice.note}
                </motion.p>
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="flex justify-end">
          <Button onClick={next} className="bg-primary text-primary-foreground hover:bg-primary/90">
            {roundIdx < rounds.length - 1 ? "Next Year" : "See Results"}
          </Button>
        </div>
      )}
    </div>
  );
}