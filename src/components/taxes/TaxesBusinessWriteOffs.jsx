import React from "react";
import { motion } from "framer-motion";
import {
  Car,
  Home,
  Wifi,
  GraduationCap,
  Utensils,
  Laptop,
  HeartPulse,
  Phone,
} from "lucide-react";

const writeOffs = [
  { icon: Home, title: "Home Office", pct: "Up to $1,500", desc: "Deduct part of rent, utilities, and internet if you use a dedicated workspace." },
  { icon: Car, title: "Vehicle Expenses", pct: "67¢/mile", desc: "Track business miles for deliveries, meetings, or client visits." },
  { icon: Laptop, title: "Equipment", pct: "100%", desc: "Computers, software, and tools needed for your business." },
  { icon: Wifi, title: "Internet & Phone", pct: "Business %", desc: "Deduct the percentage of phone and internet used for work." },
  { icon: GraduationCap, title: "Education", pct: "100%", desc: "Courses, certifications, and books related to your business." },
  { icon: Utensils, title: "Business Meals", pct: "50%", desc: "Meals with clients or during business travel are partially deductible." },
  { icon: HeartPulse, title: "Health Insurance", pct: "100%", desc: "Self-employed individuals can deduct health insurance premiums." },
  { icon: Phone, title: "Marketing", pct: "100%", desc: "Website costs, ads, business cards, and promotional materials." },
];

export default function TaxesBusinessWriteOffs() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {writeOffs.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="group bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/30 transition-all duration-400"
        >
          <div className="flex items-center justify-between mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <item.icon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-xs font-bold font-display text-primary/80 bg-primary/10 px-2.5 py-1 rounded-full">
              {item.pct}
            </span>
          </div>
          <h4 className="font-display font-semibold text-sm mb-2">{item.title}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}