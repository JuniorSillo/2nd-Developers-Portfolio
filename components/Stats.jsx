"use client";
import CountUp from "react-countup";
import { motion } from "framer-motion";

const stats = [
  { num: 6, suffix: "+", text: "Years of Experience" },
  { num: 40, suffix: "+", text: "Projects Completed" },
  { num: 9, suffix: "", text: "Technologies Mastered" },
  { num: 400, suffix: "+", text: "Code Commits" },
];

const Stats = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      className="py-8 xl:py-12"
    >
      <div className="container mx-auto">
        <div className="glass-card rounded-2xl border border-white/5 px-8 py-6">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-6">
            {stats.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="flex flex-col items-center xl:items-start gap-1 xl:border-r xl:last:border-r-0 border-white/5 xl:px-6 first:xl:pl-0"
              >
                <div className="flex items-end gap-0.5">
                  <CountUp
                    end={item.num}
                    duration={4}
                    delay={1.5}
                    className="text-3xl xl:text-5xl font-extrabold text-white"
                  />
                  <span className="text-2xl xl:text-4xl font-extrabold text-accent mb-1">
                    {item.suffix}
                  </span>
                </div>
                <p className="text-xs xl:text-sm text-white/40 uppercase tracking-widest">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Stats;