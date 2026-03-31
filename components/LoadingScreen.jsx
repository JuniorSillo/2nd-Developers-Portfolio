"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState("intro"); // intro | exit

  useEffect(() => {
    // Block scroll while loading
    document.body.style.overflow = "hidden";
    const t1 = setTimeout(() => setPhase("exit"), 2000);
    const t2 = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)",
          }}
        >
          {/* Glow orb */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[500px] h-[500px] rounded-full bg-fuchsia-600/10 blur-[120px]" />
          </div>

          <div className="relative flex flex-col items-center gap-6">
            {/* Logo letters animate in one by one */}
            <div className="flex items-end gap-1">
              {["S", "i", "l", "l", "o"].map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
                  className="text-6xl xl:text-8xl font-extrabold text-white tracking-tight"
                >
                  {letter}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.4, ease: "backOut" }}
                className="text-6xl xl:text-8xl font-extrabold text-accent mb-1"
                style={{ color: "#e879f9", textShadow: "0 0 30px rgba(232,121,249,0.6)" }}
              >
                .
              </motion.span>
            </div>

            {/* Role text */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
              className="text-sm tracking-[0.4em] uppercase text-white/40 font-medium"
            >
              Full-Stack Developer
            </motion.p>

            {/* Progress bar */}
            <motion.div
              className="w-48 h-[2px] rounded-full overflow-hidden bg-white/10 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #e879f9, #7c3aed)" }}
                initial={{ width: "0%" }}
                animate={{ width: phase === "exit" ? "100%" : "70%" }}
                transition={{ duration: phase === "exit" ? 0.4 : 1.2, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}