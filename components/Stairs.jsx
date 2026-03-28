"use client";

import { motion } from "framer-motion";

const STEPS = 8;
const COLORS = [
  "#e879f9","#d946ef","#c026d3","#a21caf",
  "#7c3aed","#6d28d9","#4c1d95","#3b0764",
];

function Stairs() {
  return (
    <>
      {[...Array(STEPS)].map((_, index) => {
        const delay = (STEPS - index - 1) * 0.05;
        return (
          <motion.div
            key={index}
            initial={{ scaleX: 1 }}
            animate={{
              scaleX: 0,
              transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay },
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: `${100 / STEPS}%`,
              top: `${(index / STEPS) * 100}%`,
              background: COLORS[index],
              transformOrigin: "right center",
              zIndex: STEPS - index,
            }}
          />
        );
      })}
    </>
  );
}

export default Stairs;