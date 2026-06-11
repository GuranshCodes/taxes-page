import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RotateCcw, Trophy, Play, Heart } from "lucide-react";

const GOOD_ITEMS = [
  { emoji: "💰", label: "Tax Credit", points: 10 },
  { emoji: "📚", label: "Education Credit", points: 15 },
  { emoji: "🏠", label: "Mortgage Deduction", points: 12 },
  { emoji: "💊", label: "Health Savings", points: 10 },
  { emoji: "🎓", label: "Student Loan Deduction", points: 12 },
  { emoji: "👶", label: "Child Tax Credit", points: 15 },
  { emoji: "🌿", label: "Green Energy Credit", points: 10 },
  { emoji: "💵", label: "Earned Income Credit", points: 20 },
];

const BAD_ITEMS = [
  { emoji: "⚠️", label: "Late Filing Penalty", points: -15 },
  { emoji: "🚫", label: "Audit Notice", points: -20 },
  { emoji: "💸", label: "Overspending", points: -10 },
  { emoji: "📉", label: "Bad Investment", points: -12 },
];

const GAME_DURATION = 90;
const SPAWN_INTERVAL = 800;
const FALL_DURATION = 4000;

export default function CreditCatcherGame() {
  const [gameState, setGameState] = useState("idle"); // idle | playing | ended
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [items, setItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [caught, setCaught] = useState(null);
  const containerRef = useRef(null);
  const nextId = useRef(0);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    setLives(3);
    setItems([]);
    setTimeLeft(GAME_DURATION);
    setCaught(null);
  };

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState("ended");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameState]);

  // Check lives
  useEffect(() => {
    if (lives <= 0 && gameState === "playing") {
      setGameState("ended");
    }
  }, [lives, gameState]);

  // Spawn items
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      const isGood = Math.random() > 0.3;
      const pool = isGood ? GOOD_ITEMS : BAD_ITEMS;
      const item = pool[Math.floor(Math.random() * pool.length)];
      const id = nextId.current++;
      const left = 5 + Math.random() * 85;

      setItems((prev) => [...prev, { ...item, id, left, createdAt: Date.now() }]);

      // Auto-remove after fall
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== id));
      }, FALL_DURATION);
    }, SPAWN_INTERVAL);
    return () => clearInterval(interval);
  }, [gameState]);

  const catchItem = useCallback((item) => {
    setItems((prev) => prev.filter((i) => i.id !== item.id));
    if (item.points > 0) {
      setScore((prev) => prev + item.points);
      setCaught({ ...item, type: "good" });
    } else {
      setLives((prev) => prev - 1);
      setScore((prev) => Math.max(0, prev + item.points));
      setCaught({ ...item, type: "bad" });
    }
    setTimeout(() => setCaught(null), 600);
  }, []);

  if (gameState === "idle") {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-6">💰</div>
        <h2 className="font-display font-bold text-3xl mb-3">Credit Catcher</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          Catch tax credits and financial benefits falling from the sky! Avoid penalties and bad decisions. You have 3 lives and 90 seconds.
        </p>
        <Button onClick={startGame} className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-lg px-8 py-6">
          <Play className="w-5 h-5" /> Start Game
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
        <h2 className="font-display font-bold text-3xl mb-2">Game Over!</h2>
        <p className="text-muted-foreground mb-2">Your score</p>
        <p className="font-display font-bold text-5xl text-primary mb-8">{score}</p>
        <Button onClick={startGame} variant="outline" className="gap-2">
          <RotateCcw className="w-4 h-4" /> Play Again
        </Button>
      </motion.div>
    );
  }

  return (
    <div>
      {/* HUD */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-xs text-muted-foreground">Score</span>
            <p className="font-display font-bold text-2xl text-primary">{score}</p>
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <Heart
                key={i}
                className={`w-5 h-5 transition-colors ${i < lives ? "text-red-400 fill-red-400" : "text-muted-foreground/20"}`}
              />
            ))}
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Time</span>
          <p className={`font-display font-bold text-2xl ${timeLeft <= 10 ? "text-red-400" : "text-foreground"}`}>
            {timeLeft}s
          </p>
        </div>
      </div>

      {/* Caught feedback */}
      {caught && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className={`text-center text-sm font-semibold mb-2 ${caught.type === "good" ? "text-emerald-400" : "text-red-400"}`}
        >
          {caught.emoji} {caught.label} ({caught.points > 0 ? "+" : ""}{caught.points})
        </motion.div>
      )}

      {/* Game area */}
      <div
        ref={containerRef}
        className="relative bg-card border border-border/50 rounded-2xl overflow-hidden"
        style={{ height: "400px" }}
      >
        {items.map((item) => (
          <motion.button
            key={item.id}
            initial={{ top: -50, left: `${item.left}%` }}
            animate={{ top: "100%" }}
            transition={{ duration: FALL_DURATION / 1000, ease: "linear" }}
            onClick={() => catchItem(item)}
            className="absolute text-3xl cursor-pointer hover:scale-125 transition-transform z-10 -translate-x-1/2"
            style={{ left: `${item.left}%` }}
          >
            {item.emoji}
          </motion.button>
        ))}

        {/* Grid lines for visual interest */}
        <div className="absolute inset-0 opacity-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="absolute border-l border-foreground" style={{ left: `${i * 10}%`, top: 0, bottom: 0 }} />
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-3">
        Click/tap the falling items to catch credits and avoid penalties!
      </p>
    </div>
  );
}