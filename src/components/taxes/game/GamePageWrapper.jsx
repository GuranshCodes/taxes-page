import React from "react";
import { Link } from "react-router-dom";
import TaxesNavbar from "@/components/taxes/TaxesNavbar";
import TaxesFooter from "@/components/taxes/TaxesFooter";
import { ArrowLeft } from "lucide-react";

export default function GamePageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <TaxesNavbar />
      <div className="pt-24 lg:pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <Link
            to="/games"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Games
          </Link>
          <div className="bg-card border border-border/50 rounded-2xl p-6 lg:p-10">
            {children}
          </div>
        </div>
      </div>
      <TaxesFooter />
    </div>
  );
}