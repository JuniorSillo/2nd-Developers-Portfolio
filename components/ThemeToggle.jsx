"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BsSunFill, BsMoonFill } from "react-icons/bs";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored ? stored === "dark" : true;
    setDark(isDark);
    document.documentElement.classList.toggle("light-mode", !isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.classList.toggle("light-mode", !next);
  };

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      className="relative w-12 h-6 rounded-full border border-white/15 bg-white/8 flex items-center px-1 transition-all hover:border-accent/40"
    >
      <motion.div
        animate={{ x: dark ? 0 : 22 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className="w-4 h-4 rounded-full flex items-center justify-center"
        style={{ background: dark ? "#e879f9" : "#f59e0b" }}
      >
        {dark
          ? <BsMoonFill className="text-[7px] text-primary" />
          : <BsSunFill className="text-[7px] text-primary" />
        }
      </motion.div>
    </motion.button>
  );
}