"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BsLightningFill } from "react-icons/bs";

const TARGET = new Date("2026-05-05T00:00:00+02:00"); // 5 May 2026 SAST

function getTimeLeft() {
  const now = new Date();
  const diff = TARGET - now;
  if (diff <= 0) return null;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, mins };
}

export default function CountdownBanner() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(getTimeLeft());
    const interval = setInterval(() => setTime(getTimeLeft()), 60000);
    return () => clearInterval(interval);
  }, []);

  // After May 2026 — show generic available banner
  if (!time) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full"
      >
        <Link href="/contact"
          className="flex items-center justify-center gap-3 px-4 py-2.5 rounded-2xl border border-green-500/20 bg-green-500/5 hover:bg-green-500/10 transition-all group">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-green-400 text-sm font-medium">Available for new opportunities — Let's talk</span>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="w-full"
    >
      <Link href="/contact"
        className="group flex flex-wrap items-center justify-center xl:justify-start gap-3 px-5 py-3 rounded-2xl border border-amber-400/20 bg-amber-400/5 hover:bg-amber-400/8 hover:border-amber-400/35 transition-all">
        {/* Icon */}
        <div className="flex items-center gap-2">
          <BsLightningFill className="text-amber-400 text-sm animate-pulse" />
          <span className="text-amber-300 text-sm font-bold uppercase tracking-widest">Open to Work</span>
        </div>

        {/* Divider */}
        <span className="hidden xl:block w-px h-4 bg-white/10" />

        {/* Countdown chips */}
        <div className="flex items-center gap-2">
          {[
            { val: time.days, label: "days" },
            { val: time.hours, label: "hrs" },
            { val: time.mins, label: "min" },
          ].map(({ val, label }) => (
            <div key={label} className="flex items-baseline gap-1">
              <span className="text-white font-bold text-sm tabular-nums">{val}</span>
              <span className="text-white/35 text-[10px]">{label}</span>
            </div>
          ))}
          <span className="text-white/40 text-xs ml-1">until Bitcube programme ends</span>
        </div>

        {/* CTA arrow */}
        <span className="hidden xl:block ml-auto text-amber-400 text-xs font-bold uppercase tracking-widest group-hover:gap-2 transition-all">
          Hire me →
        </span>
      </Link>
    </motion.div>
  );
}