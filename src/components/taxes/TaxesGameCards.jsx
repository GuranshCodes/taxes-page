import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Gem, Zap, Brain, ArrowRight, BarChart2, Layers, Flag, Link2, Calculator, Lightbulb, FileText, TrendingUp, BookOpen } from "lucide-react";

const games = [
  {
    icon: Gem,
    title: "Tax Treasure Hunt",
    desc: "Search through 8 real financial scenarios and find hidden tax deductions. The more you find, the higher your score!",
    path: "/games/treasure",
    color: "from-emerald-500/20 to-teal-500/20",
    border: "hover:border-emerald-500/40",
  },
  {
    icon: Zap,
    title: "Credit Catcher",
    desc: "Catch falling tax credits and benefits while avoiding penalties. 90 seconds of fast-paced financial action!",
    path: "/games/credit-catcher",
    color: "from-blue-500/20 to-cyan-500/20",
    border: "hover:border-blue-500/40",
  },
  {
    icon: Brain,
    title: "Quiz Sprint",
    desc: "24 questions on taxes and financial literacy. Build a streak for bonus points. How many can you get right?",
    path: "/games/quiz-sprint",
    color: "from-purple-500/20 to-pink-500/20",
    border: "hover:border-purple-500/40",
  },
  {
    icon: BarChart2,
    title: "Budget Builder",
    desc: "Allocate a monthly income across rent, food, savings, and more. Stay in the smart ranges to earn points across 3 income levels.",
    path: "/games/budget-builder",
    color: "from-orange-500/20 to-amber-500/20",
    border: "hover:border-orange-500/40",
  },
  {
    icon: Layers,
    title: "Tax Doc Sorter",
    desc: "Sort 16 tax items into the right categories: Income Documents, Deductions, Credits, or Payroll Taxes. How fast can you sort them all?",
    path: "/games/tax-sort",
    color: "from-rose-500/20 to-pink-500/20",
    border: "hover:border-rose-500/40",
  },
  {
    icon: Flag,
    title: "Refund Race",
    desc: "8 real-world tax scenarios. Figure out what happens at filing time. Speed and accuracy both matter in this timed challenge.",
    path: "/games/refund-race",
    color: "from-sky-500/20 to-blue-500/20",
    border: "hover:border-sky-500/40",
  },
  {
    icon: Link2,
    title: "Tax Term Matcher",
    desc: "Match 8 tax terms to their correct definitions in a memory-style matching game. Race the clock and aim for 100% accuracy.",
    path: "/games/deduction-match",
    color: "from-violet-500/20 to-purple-500/20",
    border: "hover:border-violet-500/40",
  },
  {
    icon: Calculator,
    title: "Bracket Buster",
    desc: "Given income, deductions, and credits, pick the correct tax owed using real 2024 tax brackets. Can you out-calculate the IRS?",
    path: "/games/tax-bracket",
    color: "from-lime-500/20 to-green-500/20",
    border: "hover:border-lime-500/40",
  },
  {
    icon: Lightbulb,
    title: "Spending Advisor",
    desc: "5 real financial situations where some choices are smart and some will cost you later. Show off your money wisdom!",
    path: "/games/spending-advisor",
    color: "from-yellow-500/20 to-amber-500/20",
    border: "hover:border-yellow-500/40",
  },
  {
    icon: FileText,
    title: "W-2 Decoder",
    desc: "The W-2 is the most important tax document most people get. 6 questions to see if you really understand what each box means.",
    path: "/games/w2-decoder",
    color: "from-teal-500/20 to-cyan-500/20",
    border: "hover:border-teal-500/40",
  },
  {
    icon: TrendingUp,
    title: "Investment Simulator",
    desc: "Make 3 years of real investment decisions and see how taxes affect your portfolio. Learn how tax-smart investing compounds over time.",
    path: "/games/investment-sim",
    color: "from-indigo-500/20 to-blue-500/20",
    border: "hover:border-indigo-500/40",
  },
  {
    icon: BookOpen,
    title: "Form Filing Simulator",
    desc: "Walk through all 6 steps of filing a real tax return for Maria. Each step builds on the last. Learn the full process end to end!",
    path: "/games/form-filing",
    color: "from-fuchsia-500/20 to-purple-500/20",
    border: "hover:border-fuchsia-500/40",
  },
];

export default function TaxesGameCards() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game, i) => (
        <motion.div
          key={game.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <Link
            to={game.path}
            className={`group block bg-card border border-border/50 rounded-2xl overflow-hidden ${game.border} transition-all duration-500`}
          >
            <div className={`h-40 bg-gradient-to-br ${game.color} flex items-center justify-center`}>
              <game.icon className="w-16 h-16 text-foreground/30 group-hover:text-foreground/50 group-hover:scale-110 transition-all duration-500" />
            </div>
            <div className="p-6">
              <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                {game.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                {game.desc}
              </p>
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-primary">
                Play Now
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}