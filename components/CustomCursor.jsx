"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  // Dot follows cursor with no lag
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  useEffect(() => {
    // Don't show on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    const onMove = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      dotX.set(e.clientX - 4);
      dotY.set(e.clientY - 4);
      if (!isVisible) setIsVisible(true);
    };

    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    const addHover = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", () => setIsHovering(true));
        el.addEventListener("mouseleave", () => setIsHovering(false));
      });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    // Re-check hoverable elements periodically (for dynamic content)
    addHover();
    const interval = setInterval(addHover, 2000);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      clearInterval(interval);
      document.body.style.cursor = "";
    };
  }, []);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{ x: springX, y: springY }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 1.6 : 1,
          opacity: isHovering ? 0.6 : 0.4,
        }}
        transition={{ scale: { duration: 0.15 }, opacity: { duration: 0.15 } }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99999]"
      
      />

      {/* Inner dot */}
      <motion.div
        style={{ x: dotX, y: dotY }}
        animate={{
          scale: isClicking ? 2 : isHovering ? 0 : 1,
          backgroundColor: isHovering ? "#e879f9" : "#ffffff",
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[99999]"
      />

      {/* Glow on hover */}
      {isHovering && (
        <motion.div
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.15, scale: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[99998]"
         
        />
      )}
    </>
  );
}