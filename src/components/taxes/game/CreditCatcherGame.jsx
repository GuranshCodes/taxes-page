import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Star, XCircle } from 'lucide-react';
 
const CREDIT_ITEMS = [
  { id: 'tuition', label: 'Education credit idea', amount: 8 },
  { id: 'donation', label: 'Charity credit idea', amount: 6 },
  { id: 'sports', label: 'Sports program credit idea', amount: 4 },
];
 
const NOT_CREDITS = [
  { id: 'cookie', label: 'Cookie (not a tax credit)', amount: 0 },
  { id: 'toy', label: 'Toy purchase (usually not)', amount: 0 },
  { id: 'movie', label: 'Movie ticket (not a credit)', amount: 0 },
];
 
/** @param {typeof CREDIT_ITEMS} arr */
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
 
/** @typedef {{ id: string, label: string, amount: number }} Item */
/** @typedef {{ type: string, label?: string }} Toast */
 
export default function CreditCatcherGame() {
  const [score, setScore] = React.useState(0);
  const [bill, setBill] = React.useState(100);
  /** @type {[Toast | null, React.Dispatch<React.SetStateAction<Toast | null>>]} */
  const [toast, setToast] = React.useState(/** @type {Toast | null} */ (null));
 
  const [running, setRunning] = React.useState(true);
  const [spawnKey, setSpawnKey] = React.useState(1);
  /** @type {[Item | null, React.Dispatch<React.SetStateAction<Item | null>>]} */
  const [target, setTarget] = React.useState(/** @type {Item | null} */ (null));
 
  React.useEffect(() => {
    if (!running) return;
    const t = window.setInterval(() => {
      const isCredit = Math.random() > 0.55;
      const item = isCredit ? pick(CREDIT_ITEMS) : pick(NOT_CREDITS);
      setTarget(item);
      setSpawnKey((x) => x + 1);
    }, 900);
 
    return () => window.clearInterval(t);
  }, [running]);
 
  React.useEffect(() => {
    if (!running) return;
    if (bill <= 0) {
      setRunning(false);
      setToast({ type: 'win' });
    }
  }, [bill, running]);
 
  /** @param {'catch' | 'skip'} kind */
  const act = (kind) => {
    if (!target || !running) return;
 
    if (target.amount > 0 && kind === 'catch') {
      setScore((s) => s + target.amount * 10);
      setBill((b) => Math.max(0, b - target.amount));
      setToast({ type: 'good', label: `Caught! -${target.amount} tax points` });
    } else if (target.amount === 0 && kind === 'catch') {
      setBill((b) => Math.max(0, b - 2));
      setToast({ type: 'bad', label: `Oops. Not a credit. -2 tax points` });
    } else {
      setToast({ type: 'skip', label: 'Skipped.' });
    }
 
    setTarget(null);
    window.setTimeout(() => setToast(null), 850);
  };
 
  const reset = () => {
    setScore(0);
    setBill(100);
    setRunning(true);
    setTarget(null);
    setToast(null);
  };
 
  return (
    <div className="border-2 border-foreground rounded-3xl p-6 md:p-7 bg-background">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-accent text-[11px] font-mono tracking-[0.3em]">CREDIT CATCHER</p>
          <h3 className="font-heading font-black text-3xl uppercase tracking-[-0.05em] mt-2">Catch credits, reduce the bill!</h3>
          <p className="mt-2 text-sm font-mono text-muted-foreground leading-relaxed">
            Tap "Catch" when it's a credit. Tap "Skip" otherwise. Grade 8 fun.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="border-2 border-foreground rounded-2xl px-4 py-3">
            <div className="text-[10px] font-mono text-muted-foreground tracking-wider">SCORE</div>
            <div className="font-heading font-black text-2xl">{score}</div>
          </div>
          <button
            onClick={reset}
            className="border-2 border-foreground hover:bg-foreground hover:text-background transition-colors rounded-2xl px-4 py-3 text-xs font-mono uppercase tracking-wider"
          >
            Reset
          </button>
        </div>
      </div>
 
      <div className="mt-6 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 border-2 border-foreground rounded-3xl p-5 bg-foreground text-background">
          <div className="text-[10px] font-mono text-background/70 tracking-wider">TAX BILL (POINTS)</div>
          <div className="font-heading font-black text-5xl mt-2">{bill}</div>
          <div className="mt-3 text-sm font-mono text-background/90">
            Goal: bring it to 0 by catching credit ideas.
          </div>
 
          <AnimatePresence>
            {toast && (
              <motion.div
                key={spawnKey}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 flex items-center gap-2 bg-background/10 border border-background/20 rounded-2xl p-3"
              >
                {toast.type === 'good' ? (
                  <Star size={18} className="text-accent" />
                ) : toast.type === 'bad' ? (
                  <XCircle size={18} className="text-destructive" />
                ) : (
                  <Gift size={18} />
                )}
                <div className="text-sm font-mono">{toast.label}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
 
        <div className="lg:col-span-7 border-2 border-foreground rounded-3xl p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] font-mono text-muted-foreground tracking-wider">CURRENT ITEM</div>
              <div className="font-heading font-black text-2xl uppercase tracking-[-0.04em] mt-2">
                {running ? (target ? target.label : 'Waiting for an item...') : 'You won!'}
              </div>
            </div>
          </div>
 
          <div className="mt-5 grid sm:grid-cols-2 gap-3">
            <button
              disabled={!running || !target}
              onClick={() => act('catch')}
              className="border-2 border-foreground hover:bg-foreground hover:text-background transition-colors rounded-3xl py-3 text-xs font-mono uppercase tracking-wider disabled:opacity-50"
            >
              Catch
            </button>
            <button
              disabled={!running}
              onClick={() => act('skip')}
              className="border-2 border-foreground hover:bg-muted transition-colors rounded-3xl py-3 text-xs font-mono uppercase tracking-wider disabled:opacity-50"
            >
              Skip
            </button>
          </div>
 
          <div className="mt-4 text-[11px] font-mono text-muted-foreground leading-relaxed">
            Tip: Credit ideas reduce tax bills. Most random purchases do not.
          </div>
        </div>
      </div>
    </div>
  );
}