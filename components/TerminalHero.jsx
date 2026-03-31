"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const LINES = [
  { text: "const developer = {", color: "text-white/80" },
  { text: '  name: "Moeketsi Junior Sillo",', color: "text-emerald-400" },
  { text: '  role: "Full-Stack Developer",', color: "text-emerald-400" },
  { text: '  location: "Bloemfontein, ZA 🇿🇦",', color: "text-emerald-400" },
  { text: "  stack: [", color: "text-white/80" },
  { text: '    "Next.js", "React", "Node.js",', color: "text-fuchsia-300" },
  { text: '    "TypeScript", "C#", "Flutter",', color: "text-fuchsia-300" },
  { text: '    "MongoDB", "PostgreSQL",', color: "text-fuchsia-300" },
  { text: "  ],", color: "text-white/80" },
  { text: "  available: true, // hire me!", color: "text-amber-400" },
  { text: "};", color: "text-white/80" },
  { text: "", color: "text-white/80" },
  { text: "developer.buildSomethingAmazing();", color: "text-cyan-400" },
];

const CHAR_DELAY = 18;
const LINE_PAUSE = 120;

export default function TerminalHero() {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    if (done) return;

    if (currentLine >= LINES.length) {
      setDone(true);
      return;
    }

    const line = LINES[currentLine];

    if (!line) return;

    if (currentChar < line.text.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedLines((prev) => {
          const updated = [...prev];

          while (updated.length <= currentLine) {
            updated.push(null);
          }

          updated[currentLine] = {
            ...line,
            text: line.text.slice(0, currentChar + 1),
          };

          return updated;
        });

        setCurrentChar((prev) => prev + 1);
      }, CHAR_DELAY);
    } else {
      timerRef.current = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
        setCurrentChar(0);
      }, LINE_PAUSE);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentLine, currentChar, done]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="w-full max-w-[480px] mx-auto xl:mx-0"
    >
      <div
        className="rounded-t-2xl px-4 py-3 flex items-center gap-2"
        style={{
          background: "rgba(255,255,255,0.06)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-green-500/70" />
        <span className="ml-auto text-[11px] text-white/25 font-mono">
          junior.js
        </span>
      </div>

      <div
        className="rounded-b-2xl px-5 py-5 font-mono text-[12px] xl:text-[13px] leading-relaxed min-h-[220px]"
        style={{
          background: "rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderTop: "none",
          backdropFilter: "blur(12px)",
        }}
      >
        {displayedLines.map((line, i) => {
          if (!line) return null;

          return (
            <div key={i} className="flex gap-4">
              <span className="text-white/20 select-none w-4 text-right flex-shrink-0">
                {i + 1}
              </span>
              <span className={line.color || "text-white/80"}>
                {line.text}
                {i === currentLine - 1 && !done && (
                  <span
                    className={`inline-block w-[2px] h-[13px] ml-0.5 align-middle bg-fuchsia-400 ${
                      showCursor ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}
              </span>
            </div>
          );
        })}

        {!done && currentLine < LINES.length && (
          <div className="flex gap-4">
            <span className="text-white/20 select-none w-4 text-right flex-shrink-0">
              {currentLine + 1}
            </span>
            <span className="text-white/80">
              <span
                className={`inline-block w-[2px] h-[13px] align-middle bg-fuchsia-400 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          </div>
        )}

        {done && (
          <div className="flex gap-4 mt-1">
            <span className="text-white/20 select-none w-4 text-right flex-shrink-0">
              {LINES.length + 1}
            </span>
            <span
              className={`inline-block w-[2px] h-[13px] align-middle bg-fuchsia-400 ${
                showCursor ? "opacity-100" : "opacity-0"
              }`}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}