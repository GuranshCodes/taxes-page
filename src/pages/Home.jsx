import React from "react";
import TaxesNavbar from "@/components/taxes/TaxesNavbar";
import TaxesHero from "@/components/taxes/TaxesHero";
import TaxesSectionShell from "@/components/taxes/TaxesSectionShell";
import TaxesSectionCallout from "@/components/taxes/TaxesSectionCallout";
import TaxesInfoCards from "@/components/taxes/TaxesInfoCards";
import TaxesGameCards from "@/components/taxes/TaxesGameCards";
import TaxesFooter from "@/components/taxes/TaxesFooter";
import { motion } from "framer-motion";

const keyLessons = [
  "Taxes fund the public services and infrastructure we all rely on every day.",
  "Understanding tax brackets helps you realize you keep most of what you earn.",
  "Starting early with financial literacy gives you decades of compound advantage.",
  "Every dollar saved on taxes through legal deductions is a dollar that works for you.",
  "Filing taxes on time avoids penalties and keeps your financial record clean.",
  "Tax credits are more powerful than deductions — they reduce your bill dollar-for-dollar.",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <TaxesNavbar />
      <TaxesHero />

      <TaxesSectionShell number="01" title="What Are Taxes?">
        <TaxesSectionCallout
          imgSrc="https://images.unsplash.com/photo-1554224155-8d04cb21cd6e?w=900&q=80"
          imgAlt="Tax documents and calculator"
          caption="Understanding the tax system is the foundation of financial literacy"
        >
          <p className="text-muted-foreground leading-relaxed mb-6">
            Taxes are mandatory payments that individuals and businesses make to the government. 
            They fund essential public services — from the roads you drive on to the schools you attend,
            from emergency services to national defense.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Think of taxes as your contribution to the shared resources everyone uses. Understanding 
            how they work is the first step toward making smarter financial decisions and keeping more 
            of what you earn.
          </p>
        </TaxesSectionCallout>
      </TaxesSectionShell>

      <TaxesSectionShell number="02" title="Tax Fundamentals">
        <TaxesInfoCards />
      </TaxesSectionShell>

      <TaxesSectionShell number="03" title="Test Your Knowledge">
        <div className="mb-8">
          <p className="text-muted-foreground leading-relaxed max-w-2xl">
            The best way to learn about money is by doing. Jump into our interactive games
            designed to teach tax concepts, financial decision-making, and smart money habits.
          </p>
        </div>
        <TaxesGameCards />
      </TaxesSectionShell>

      {/* Lessons section - inspired by watershed "What We Learned" */}
      <TaxesSectionShell number="04" title="What You'll Learn">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {keyLessons.map((lesson, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex gap-4"
            >
              <span className="font-display font-bold text-3xl text-primary/30 flex-shrink-0 leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                {lesson}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 max-w-3xl"
        >
          <p className="text-lg text-muted-foreground leading-relaxed italic border-l-2 border-primary/30 pl-6">
            Learning about taxes and money management is more than a school subject — it's a life skill 
            that shapes your ability to achieve financial independence. The earlier you start, the further 
            ahead you'll be.
          </p>
        </motion.div>
      </TaxesSectionShell>

      {/* Full-bleed image section */}
      <section className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1600&q=80"
          alt="Financial growth"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl mb-4"
            >
              Your Money, <span className="text-primary">Your Future</span>
            </motion.h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Every financial decision you make today shapes the life you'll live tomorrow.
            </p>
          </div>
        </div>
      </section>

      <TaxesFooter />
    </div>
  );
}