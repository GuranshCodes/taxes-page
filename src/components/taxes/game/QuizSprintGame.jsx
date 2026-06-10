import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';
 
const QUESTIONS = [
  { q: 'Taxes help pay for…', options: ['playgrounds', 'roads', 'schools', 'All of the above'], ans: 3 },
  { q: 'A tax deduction usually…', options: ['reduces taxable income', 'adds money to your bank', 'is always free money'], ans: 0 },
  { q: 'A tax credit usually…', options: ['reduces the tax bill directly', 'raises the tax rate', 'makes taxes disappear'], ans: 0 },
  { q: 'Business write-offs are about…', options: ['random shopping', 'expenses related to earning income', 'collecting toys'], ans: 1 },
  { q: 'This site is…', options: ['legal advice', 'learning content', 'a scam'], ans: 1 },
  { q: 'If rules depend on location, you should…', options: ['ask a grown-up/pro', 'guess randomly', 'ignore safety notes'], ans: 0 },
];
 
/** @typedef {{ choiceIndex: number, correct: boolean }} Picked */
 
export default function QuizSprintGame() {
  const [idx, setIdx] = React.useState(0);
  const [score, setScore] = React.useState(0);
  /** @type {[Picked | null, React.Dispatch<React.SetStateAction<Picked | null>>]} */
  const [picked, setPicked] = React.useState(/** @type {Picked | null} */ (null));
  const [finished, setFinished] = React.useState(false);
 
  const q = QUESTIONS[idx];
 
  /** @param {number} choiceIndex */
  const choose = (choiceIndex) => {
    if (finished || !q) return;
    const correct = choiceIndex === q.ans;
    setPicked({ choiceIndex, correct });
    setScore((s) => s + (correct ? 10 : 0));
 
    window.setTimeout(() => {
      setPicked(null);
      const next = idx + 1;
      if (next >= QUESTIONS.length) setFinished(true);
      else setIdx(next);
    }, 650);
  };
 
  const reset = () => {
    setIdx(0);
    setScore(0);
    setPicked(null);
    setFinished(false);
  };
 
  return (
    <div className="border-2 border-foreground rounded-3xl p-6 md:p-7 bg-background">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <p className="text-accent text-[11px] font-mono tracking-[0.3em]">QUIZ SPRINT</p>
          <h3 className="font-heading font-black text-3xl uppercase tracking-[-0.05em] mt-2">10-second-ish thinking!</h3>
          <p className="mt-2 text-sm font-mono text-muted-foreground leading-relaxed">
            Answer fast. Learn as you go.
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
          <div className="text-[10px] font-mono text-background/70 tracking-wider">QUESTION</div>
          <div className="font-heading font-black text-3xl mt-2">{finished ? 'Done!' : `${idx + 1} / ${QUESTIONS.length}`}</div>
 
          <AnimatePresence>
            {picked && (
              <motion.div
                key={picked.choiceIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-4 flex items-center gap-2 bg-background/10 border border-background/20 rounded-2xl p-3"
              >
                {picked.correct ? <CheckCircle2 size={18} className="text-accent" /> : <XCircle size={18} className="text-destructive" />}
                <div className="text-sm font-mono">{picked.correct ? 'Correct!' : 'Not this one.'}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
 
        <div className="lg:col-span-7 border-2 border-foreground rounded-3xl p-5">
          {!finished && q ? (
            <>
              <div className="font-heading font-black text-2xl uppercase tracking-[-0.04em]">{q.q}</div>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {q.options.map((opt, i) => (
                  <button
                    key={opt}
                    onClick={() => choose(i)}
                    disabled={!!picked}
                    className="border-2 border-foreground rounded-3xl px-4 py-3 text-left hover:bg-foreground hover:text-background transition-colors disabled:opacity-60"
                  >
                    <div className="text-[10px] font-mono text-muted-foreground tracking-wider">OPTION</div>
                    <div className="mt-1 text-sm md:text-base font-mono">{opt}</div>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div>
              <div className="font-heading font-black text-3xl uppercase">Badge time!</div>
              <div className="mt-3 text-sm font-mono text-muted-foreground leading-relaxed">
                Final quiz score: {score} / {QUESTIONS.length * 10}
              </div>
              <div className="mt-4 text-sm font-mono text-muted-foreground">
                Great job—now try a different game.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}