import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'What are taxes?', to: '/taxes-about' },
  { label: 'How to save', to: '/taxes-save' },
  { label: 'Business write-offs', to: '/taxes-business' },
  { label: 'Games', to: '/games' },
];

export default function TaxesNavbar() {
  const [open, setOpen] = React.useState(false);
  const { dark, setDark } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b-2 border-foreground bg-background/90 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg border-2 border-foreground bg-foreground text-background flex items-center justify-center">
              <Sparkles size={18} />
            </div>
            <div className="leading-tight">
              <div className="font-heading font-black text-sm uppercase tracking-[-0.03em]">
                TAX QUEST
              </div>
              <div className="text-[11px] font-mono text-muted-foreground">Grade 8 mode</div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={
                    'px-3 py-2 text-xs font-mono uppercase tracking-wider border-l-2 border-transparent hover:border-foreground hover:text-foreground transition-colors ' +
                    (active ? 'border-foreground text-foreground bg-foreground/5' : 'text-muted-foreground')
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark(!dark)}
              className="hidden sm:flex w-9 h-9 items-center justify-center border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
              aria-label="Toggle dark mode"
            >
              {dark ? '☀️' : '🌙'}
            </button>

            <button
              className="md:hidden p-2 border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
              onClick={() => setOpen((s) => !s)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>

            <button
              className="sm:hidden w-9 h-9 items-center justify-center border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
              onClick={() => setDark(!dark)}
              aria-label="Toggle dark mode"
            >
              {dark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="border-t-2 border-foreground pt-3 grid gap-2">
              {NAV.map((item) => {
                const active = item.to === '/' ? location.pathname === '/' : location.pathname.startsWith(item.to);
                return (
                  <button
                    key={item.to}
                    onClick={() => {
                      setOpen(false);
                      navigate(item.to);
                    }}
                    className={
                      'w-full text-left px-3 py-3 text-xs font-mono uppercase tracking-wider border-2 border-foreground/0 hover:border-foreground transition-colors ' +
                      (active ? 'bg-foreground text-background' : 'bg-background text-muted-foreground')
                    }
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

