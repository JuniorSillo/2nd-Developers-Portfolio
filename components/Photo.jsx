"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const Photo = () => {
  return (
    <div className="relative flex justify-center items-center w-full h-full">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
        className="relative w-[280px] h-[280px] xl:w-[460px] xl:h-[460px]"
      >
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/30 via-purple-500/10 to-cyan-500/20 blur-[30px] scale-110" />

        {/* Rotating gradient ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, #e879f9, #7c3aed, #06b6d4, #e879f9)",
            padding: "3px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />

        {/* Static inner ring */}
        <div
          className="absolute inset-[6px] rounded-full"
          style={{
            background:
              "linear-gradient(135deg, rgba(232,121,249,0.15), rgba(6,182,212,0.08))",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        />

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-[10px] rounded-full overflow-hidden"
        >
          <Image
            src="/photo.png"
            priority
            quality={100}
            fill
            alt="Moeketsi Junior Sillo — Full-Stack Developer"
            className="object-cover rounded-full"
          />
        </motion.div>

        {/* Animated SVG dashes */}
        <motion.svg
          className="absolute -inset-4 w-[calc(100%+32px)] h-[calc(100%+32px)]"
          fill="transparent"
          viewBox="0 0 560 560"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="280"
            cy="280"
            r="272"
            stroke="url(#gradientCircle)"
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ strokeDasharray: "10 140 20 20", rotate: 0 }}
            animate={{
              strokeDasharray: ["10 140 20 20", "5 280 18 18"],
              rotate: [0, 360],
            }}
            transition={{ duration: 10, ease: "linear", repeat: Infinity }}
          />
          <defs>
            <linearGradient id="gradientCircle" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#e879f9" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#7c3aed" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Floating badge */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-4 -right-4 xl:-bottom-6 xl:-right-6 glass-card rounded-2xl px-4 py-2.5 border border-accent/20"
        >
          <p className="text-[10px] xl:text-xs text-white/50 uppercase tracking-widest">Stack</p>
          <p className="text-xs xl:text-sm font-bold text-accent">Full-Stack Dev</p>
        </motion.div>

        {/* Years badge */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -top-4 -left-4 xl:-top-6 xl:-left-6 glass-card rounded-2xl px-4 py-2.5 border border-cyan-500/20"
        >
          <p className="text-[10px] xl:text-xs text-white/50 uppercase tracking-widest">Experience</p>
          <p className="text-xs xl:text-sm font-bold text-neon">6+ Years</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Photo;