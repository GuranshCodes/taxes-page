import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Play, Clock, CheckCircle2, XCircle } from "lucide-react";

const questions = [
  {
    q: "What does IRS stand for?",
    options: ["Internal Revenue Service", "International Revenue System", "Internal Rate System", "Income Revenue Service"],
    correct: 0,
  },
  {
    q: "Which form do employees receive from their employer showing annual earnings?",
    options: ["1040", "W-2", "1099", "W-4"],
    correct: 1,
  },
  {
    q: "What is the standard deduction for single filers in 2024?",
    options: ["$10,000", "$12,550", "$14,600", "$16,000"],
    correct: 2,
  },
  {
    q: "Which of these is a tax credit (not a deduction)?",
    options: ["Mortgage interest", "Child Tax Credit", "Business expenses", "Student loan interest"],
    correct: 1,
  },
  {
    q: "When is Tax Day in the United States?",
    options: ["March 15", "April 15", "January 31", "December 31"],
    correct: 1,
  },
  {
    q: "What type of tax is collected on purchased goods?",
    options: ["Income tax", "Property tax", "Sales tax", "Capital gains tax"],
    correct: 2,
  },
  {
    q: "What is a 401(k)?",
    options: ["A tax form", "A retirement savings plan", "A type of tax credit", "A government bond"],
    correct: 1,
  },
  {
    q: "Which income is taxed at a lower rate than regular income?",
    options: ["Salary", "Long-term capital gains", "Tips", "Overtime pay"],
    correct: 1,
  },
  {
    q: "What does FICA stand for?",
    options: ["Federal Income Collection Act", "Federal Insurance Contributions Act", "Financial Income Credit Assessment", "Federal Investment Credit Act"],
    correct: 1,
  },
  {
    q: "What is progressive taxation?",
    options: ["Everyone pays the same rate", "Higher income = higher tax rate", "Tax decreases over time", "Only businesses pay taxes"],
    correct: 1,
  },
  {
    q: "Which is NOT a type of tax?",
    options: ["Estate tax", "Excise tax", "Equity tax", "Gift tax"],
    correct: 2,
  },
  {
    q: "What is an audit?",
    options: ["A tax refund", "A review of your tax return by the IRS", "A type of deduction", "A tax payment plan"],
    correct: 1,
  },
  {
    q: "What is a Roth IRA?",
    options: ["A business deduction", "A retirement account where withdrawals are tax-free", "A type of sales tax", "A payroll tax form"],
    correct: 1,
  },
  {
    q: "What does 'gross income' mean?",
    options: ["Income after taxes", "Total income before deductions", "Only investment income", "Income from a business only"],
    correct: 1,
  },
  {
    q: "Which form is used for self-employed people to report income?",
    options: ["W-2", "1040-EZ", "1099-NEC", "W-4"],
    correct: 2,
  },
  {
    q: "What is the self-employment tax rate?",
    options: ["7.65%", "10%", "15.3%", "22%"],
    correct: 2,
  },
  {
    q: "What is capital gains tax?",
    options: ["Tax on your salary", "Tax on profit from selling an asset", "Tax on gifts received", "Tax on Social Security benefits"],
    correct: 1,
  },
  {
    q: "How long do you need to hold an asset for long-term capital gains rates?",
    options: ["3 months", "6 months", "More than 1 year", "More than 2 years"],
    correct: 2,
  },
  {
    q: "What is a W-4 form used for?",
    options: ["Reporting investment income", "Filing your annual return", "Telling your employer how much tax to withhold", "Claiming a refund"],
    correct: 2,
  },
  {
    q: "What is the purpose of the EITC (Earned Income Tax Credit)?",
    options: ["Help high earners pay less", "Reward low to moderate income workers", "Reduce corporate taxes", "Help pay for college"],
    correct: 1,
  },
  {
    q: "Which of these is a tax-advantaged health savings account?",
    options: ["401(k)", "HSA", "CD", "IRA"],
    correct: 1,
  },
  {
    q: "What does 'taxable income' mean?",
    options: ["All money you earn", "Gross income minus deductions", "Only wages from a job", "Income minus all expenses"],
    correct: 1,
  },
  {
    q: "If you are in the 22% tax bracket, does ALL your income get taxed at 22%?",
    options: ["Yes, all of it", "No, only income within that bracket range", "Only income above $100,000", "Only business income"],
    correct: 1,
  },
  {
    q: "What is a tax refund?",
    options: ["Free money from the government", "Money the government owes you because you overpaid", "A government bonus for filing early", "A type of tax credit"],
    correct: 1,
  },
  {
    q: "Which expense is typically NOT deductible for employees?",
    options: ["Unreimbursed work travel", "Commuting to your regular job", "Home office (self-employed)", "Business meals (50%)"],
    correct: 1,
  },
];

const TIME_PER_QUESTION = 15;

export default function QuizSprintGame() {
  const [gameState, setGameState] = useState("idle");
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TIME_PER_QUESTION);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [shuffled, setShuffled] = useState([]);

  const startGame = () => {
    const shuffledQs = [...questions].sort(() => Math.random() - 0.5);
    setShuffled(shuffledQs);
    setGameState("playing");
    setCurrentQ(0);
    setScore(0);
    setStreak(0);
    setTimeLeft(TIME_PER_QUESTION);
    setSelected(null);
    setShowResult(false);
  };

  // Timer
  useEffect(() => {
    if (gameState !== "playing" || showResult) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleAnswer(-1); // timeout
          return TIME_PER_QUESTION;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState, showResult, currentQ]);

  const handleAnswer = (idx) => {
    if (showResult) return;
    setSelected(idx);
    setShowResult(true);

    const isCorrect = idx === shuffled[currentQ].correct;
    if (isCorrect) {
      const bonus = streak >= 3 ? 5 : 0;
      setScore((prev) => prev + 10 + bonus);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQ < shuffled.length - 1) {
        setCurrentQ((prev) => prev + 1);
        setSelected(null);
        setShowResult(false);
        setTimeLeft(TIME_PER_QUESTION);
      } else {
        setGameState("ended");
      }
    }, 1500);
  };

  if (gameState === "idle") {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">🧠</div>
        <h2 className="font-display font-bold text-3xl mb-3">Quiz Sprint</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          24 questions about taxes and financial literacy. You have {TIME_PER_QUESTION} seconds per question. Build a streak for bonus points!
        </p>
        <Button onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg px-8 py-6">
          <Play className="w-5 h-5" /> Start Quiz
        </Button>
      </div>
    );
  }

  if (gameState === "ended") {
    const max = shuffled.length * 10;
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6">
          <Trophy className="w-10 h-10 text-primary" />
        </div>
        <h2 className="font-display font-bold text-3xl mb-2">Quiz Complete!</h2>
        <p className="text-muted-foreground mb-2">Your score</p>
        <p className="font-display font-bold text-5xl text-primary mb-1">{score}</p>
        <p className="text-muted-foreground text-sm mb-8">out of {max}+ possible points</p>
        <Button onClick={startGame} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> Play Again
        </Button>
      </motion.div>
    );
  }

  const q = shuffled[currentQ];

  return (
    <div>
      {/* HUD */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-6">
          <div>
            <span className="text-xs text-muted-foreground">Score</span>
            <p className="font-display font-bold text-2xl text-primary">{score}</p>
          </div>
          {streak >= 2 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-semibold text-primary">🔥 {streak} streak!</span>
            </motion.div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground">{currentQ + 1}/{shuffled.length}</span>
          <div className="flex items-center gap-1.5">
            <Clock className={`w-4 h-4 ${timeLeft <= 5 ? "text-red-400" : "text-muted-foreground"}`} />
            <span className={`font-display font-bold text-lg ${timeLeft <= 5 ? "text-red-400" : "text-foreground"}`}>
              {timeLeft}
            </span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-secondary rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: "100%" }}
          animate={{ width: `${(timeLeft / TIME_PER_QUESTION) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h3 className="font-display font-semibold text-xl lg:text-2xl mb-8">{q.q}</h3>

          <div className="grid sm:grid-cols-2 gap-3">
            {q.options.map((opt, idx) => {
              let style = "bg-card border-border/50 hover:border-primary/30";
              let icon = null;

              if (showResult) {
                if (idx === q.correct) {
                  style = "bg-emerald-500/10 border-emerald-500/40";
                  icon = <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
                } else if (idx === selected && idx !== q.correct) {
                  style = "bg-red-500/10 border-red-500/30";
                  icon = <XCircle className="w-5 h-5 text-red-400" />;
                } else {
                  style = "bg-card border-border/20 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={showResult}
                  className={`flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-300 ${style} ${
                    !showResult ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  <span className="text-sm font-medium">{opt}</span>
                  {icon}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}