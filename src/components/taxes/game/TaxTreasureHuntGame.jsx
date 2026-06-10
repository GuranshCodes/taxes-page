import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, CheckCircle2, XCircle } from 'lucide-react';
 
const BUCKETS = [
  { key: 'deductible', label: 'Could be deductible' },
  { key: 'credit', label: 'Credit-ish (reduces tax bill)' },
  { key: 'no', label: 'Probably not' },
];
 
const ITEMS = [
  { id: 'supplies', label: 'Business supplies for work', bucket: 'deductible' },
  { id: 'vacation', label: 'Vacation with family', bucket: 'no' },
  { id: 'software', label: 'Work software subscription', bucket: 'deductible' },
  { id: 'school_donation', label: 'Donation to a charity (sometimes a credit)', bucket: 'credit' },
  { id: 'personal_movie', label: 'Movie ticket for personal time', bucket: 'no' },
  { id: 'marketing', label: 'Ad/marketing for your business', bucket: 'deductible' },
];
 
/** @typedef {{ id: string, label: string, bucket: string }} Item */
/** @typedef {{ id: string, correct: boolean }} Picked */
 
/** @param {Item[]} arr */
function shuffleArray(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
 
export default function TaxTreasureHuntGame() {
  const [seed, setSeed] = React.useState(1);
  /** @type {[Picked | null, React.Dispatch<React.SetStateAction<Picked | null>>]} */
  const [picked, setPicked] = React.useState(/** @type {Picked | null} */ (null));
  const [score, setScore] = React.useState(0);
  const [done, setDone] = React.useState(false);
  /** @type {[string[], React.Dispatch<React.SetStateAction<string[]>>]} */
  const [usedIds, setUsedIds] = React.useState(/** @type {string[]} */ ([]));
 
  const items = React.useMemo(() => shuffleArray(ITEMS), [seed]);
  const remaining = items.filter((i) => !usedIds.includes(i.id));
  const current = remaining[0];
 
  React.useEffect(() => {
    if (remaining.length === 0) setDone(true);
  }, [remaining.length]);
 
  /** @param {string} bucketKey */
  const choose = (bucketKey) => {
    if (!current) return;
    const correct = bucketKey === current.bucket;
    setPicked({ id: current.id, correct });
    setUsedIds((prev) => [...prev, current.id]);
    setScore((s) => s + (correct ? 100 : 0));
 
    window.setTimeout(() => {
      setPicked(null);
    }, 700);
  };
 
  const reset = () => {
    setSeed((x) => x + 1);
    setPicked(null);
    setScore(0);
    setDone(false);
    setUsedIds([]);
  };
 
  return (
    <div className="border-2 border-foreground rounded-3xl p-6 md:p-7 bg-background">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-accent text-[11px] font-mono tracking-[0.3em]">TAX TREASURE HUNT</p>
          <h3 className="font-heading font-black text-3xl uppercase tracking-[-0.05em] mt-2">Sort the items!</h3>
          <p className="mt-2 text-sm font-mono text-muted-foreground leading-relaxed">
            Drag is optional—just tap a bucket. Grade 8 mode: quick learning, big fun.
          </p>
        </div>
 
        <div className="flex items-center gap-3">
          <div className="border-2 border-foreground rounded-2xl px-4 py-3">
            <div className="text-[10px] font-mono text-muted-foreground tracking-wider">SCORE</div>
            <div className="font-heading font-black text-2xl">{score}</div>
          </div>
          <button
            onClick={reset}
            className="border-2 border-foreground hover:bg-foreground hover:text-background transition-colors rounded-2xl px-4 py-3 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider"
          >
            <Shuffle size={16} />
            Reset
          </button>
        </div>
      </div>
 
      <div className="mt-6 grid lg:grid-cols-12 gap-4">
        <div className="lg:col-span-5 border-2 border-foreground rounded-3xl p-5">
          <div className="text-[10px] font-mono text-muted-foreground tracking-wider">ITEM TO SORT</div>
          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3"
              >
                <div className="font-heading font-black text-2xl">Mission complete!</div>
                <div className="mt-2 text-sm font-mono text-muted-foreground">
                  Your treasure score: {score}
                </div>
              </motion.div>
            ) : current ? (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-3"
              >
                <div className="font-heading font-black text-2xl">{current.label}</div>
                <div className="mt-4">
                  <div className="flex items-center gap-3 text-sm font-mono text-muted-foreground">
                    <span>Tap a bucket:</span>
                    <span className="text-foreground font-bold">{remaining.length}</span>
                    <span>left</span>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
 
          <AnimatePresence>
            {picked && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="mt-4 flex items-center gap-2"
              >
                {picked.correct ? (
                  <CheckCircle2 className="text-accent" size={18} />
                ) : (
                  <XCircle className="text-destructive" size={18} />
                )}
                <div className="text-sm font-mono text-muted-foreground">
                  {picked.correct ? 'Nice! +100' : 'Close—try the next one!'}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
 
        <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
          {BUCKETS.map((b) => (
            <button
              key={b.key}
              disabled={done || !current}
              onClick={() => choose(b.key)}
              className="border-2 border-foreground rounded-3xl p-4 text-left hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:hover:bg-background"
            >
              <div className="text-accent text-[11px] font-mono tracking-wider">BUCKET</div>
              <div className="font-heading font-black text-lg uppercase tracking-[-0.03em] mt-2">{b.label}</div>
              <div className="mt-2 text-sm font-mono text-muted-foreground">
                {b.key === 'deductible' ? 'Work-related costs' : b.key === 'credit' ? 'Reduces the bill' : 'Not related (usually)'}
              </div>
            </button>
          ))}
        </div>
      </div>
 
      <div className="mt-5 border-t-2 border-foreground pt-4 text-[11px] font-mono text-muted-foreground leading-relaxed">
        Learning-only: your goal is to practice the idea of sorting examples, not to claim legal advice.
      </div>
    </div>
  );
}