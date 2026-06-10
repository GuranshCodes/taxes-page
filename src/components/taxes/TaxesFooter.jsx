import React from 'react';

export default function TaxesFooter() {
  return (
    <footer className="border-t-2 border-foreground mt-12 bg-[radial-gradient(ellipse_at_top,rgba(136,100,250,0.16),transparent_60%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-accent" />
              <div className="font-heading font-black text-sm uppercase tracking-[-0.03em]">TAX QUEST</div>
            </div>
            <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
              Built for learning. Not legal or financial advice.
            </p>
          </div>

          <div>
            <div className="text-[10px] font-mono text-muted-foreground tracking-wider mb-4">QUICK LINKS</div>
            <div className="space-y-2 text-[11px] font-mono">
              {[
                { label: 'Home', href: '/' },
                { label: 'What are taxes?', href: '/taxes-about' },
                { label: 'How to save', href: '/taxes-save' },
                { label: 'Business write-offs', href: '/taxes-business' },
                { label: 'Games', href: '/games' },
              ].map((x) => (
                <a key={x.href} className="block hover:text-accent transition-colors" href={x.href}>
                  → {x.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-[10px] font-mono text-muted-foreground tracking-wider mb-4">GRADE 8 CHALLENGE</div>
            <p className="text-[11px] font-mono text-muted-foreground leading-relaxed">
              Finish a game, then try the mini calculator.
            </p>
          </div>
        </div>

        <div className="border-t-2 border-foreground mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] font-mono text-muted-foreground">
            © {new Date().getFullYear()} TAX QUEST. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] font-mono text-accent">Let’s learn taxes.</p>
        </div>
      </div>
    </footer>
  );
}

