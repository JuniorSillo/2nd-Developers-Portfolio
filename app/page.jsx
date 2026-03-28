"use client";
import Photo from "@/components/Photo";
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import { Button } from "@/components/ui/button";
import { FiDownload } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Home = () => {
  const [message, setMessage] = useState("");

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/Sillo_resume.pdf";
    link.download = "Sillo_resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setMessage("CV downloaded!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <section className="min-h-[calc(100vh-80px)] flex flex-col">
      <div className="container mx-auto flex-1 px-4">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-16 gap-12 min-h-[70vh]">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="text-center xl:text-left order-2 xl:order-none space-y-6 xl:max-w-[560px]"
          >
            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/25 bg-accent/5 text-accent text-xs font-medium tracking-widest uppercase"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Available for work
            </motion.div>

            {/* Role */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="section-label">Full-Stack Developer</span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="h1 text-white leading-tight"
            >
              Hello, I&apos;m{" "}
              <br />
              <span className="text-accent text-glow">
                Moeketsi Junior
              </span>
              <br />
              <span className="text-white/90">Sillo</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="max-w-[500px] text-white/60 leading-relaxed text-sm xl:text-base mx-auto xl:mx-0"
            >
              I craft elegant, performant digital experiences — from pixel-perfect
              UIs to robust back-end systems. Passionate about clean code and
              meaningful user interactions.
            </motion.p>

            {/* Tech chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2 justify-center xl:justify-start"
            >
              {["Next.js", "React", "Node.js", "TypeScript", "TailwindCSS"].map((tech) => (
                <span key={tech} className="tag-pill">{tech}</span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 }}
              className="flex flex-col sm:flex-row items-center gap-4 justify-center xl:justify-start pt-2"
            >
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-accent/40 text-accent text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 hover:shadow-[0_0_25px_rgba(232,121,249,0.4)]"
                aria-label="Download CV"
              >
                <span>Download CV</span>
                <FiDownload className="text-lg" />
              </button>

              <Link href="/work">
                <button className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all duration-300">
                  View Work →
                </button>
              </Link>

              {message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400 text-xs"
                >
                  ✓ {message}
                </motion.p>
              )}
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="flex justify-center xl:justify-start"
            >
              <Social
                containerStyles="flex gap-3"
                iconStyles="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 text-base hover:border-accent/50 hover:text-accent hover:bg-accent/10 transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT — Photo */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
            className="order-1 xl:order-none"
          >
            <Photo />
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <Stats />
    </section>
  );
};

export default Home;