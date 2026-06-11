  import React from "react";
import { Link } from "react-router-dom";
import { DollarSign } from "lucide-react";

export default function TaxesFooter() {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-foreground">
                Money<span className="text-primary">Wise</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Making financial literacy fun and accessible through interactive
              learning and games.
            </p>
          </div>

          <div className="flex gap-12">
            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Learn
              </h4>
              <div className="space-y-2.5">
                <Link to="/taxes-about" className="block text-sm text-foreground/70 hover:text-primary transition-colors">About Taxes</Link>
                <Link to="/taxes-save" className="block text-sm text-foreground/70 hover:text-primary transition-colors">Save Money</Link>
                <Link to="/taxes-business" className="block text-sm text-foreground/70 hover:text-primary transition-colors">Business</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground mb-4">
                Play
              </h4>
              <div className="space-y-2.5">
                <Link to="/games/treasure" className="block text-sm text-foreground/70 hover:text-primary transition-colors">Treasure Hunt</Link>
                <Link to="/games/credit-catcher" className="block text-sm text-foreground/70 hover:text-primary transition-colors">Credit Catcher</Link>
                <Link to="/games/quiz-sprint" className="block text-sm text-foreground/70 hover:text-primary transition-colors">Quiz Sprint</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/30 text-center">
          <p className="text-xs text-muted-foreground/60">
            The MoneyWise Project — A Financial Literacy Learning Experience
          </p>
        </div>
      </div>
    </footer>
  );
}