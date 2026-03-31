"use client";

import Photo from "@/components/Photo";
import Social from "@/components/Social";
import Stats from "@/components/Stats";
import { FiDownload } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import CountdownBanner from "@/components/CountdownBanner";
import TerminalHero from "@/components/TerminalHero";
import { useScrollAnimation, fadeUp, fadeLeft, fadeRight, staggerChildren } from "@/lib/useScrollAnimation";

const ParticleBackground = dynamic(() => import("@/components/ParticleBackground"), { ssr: false });

const Home = () => {
  const [message, setMessage] = useState("");
  const { ref: heroRef, inView: heroIn } = useScrollAnimation({ threshold: 0.1 });
  const { ref: terminalRef, inView: terminalIn } = useScrollAnimation({ threshold: 0.1 });

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
    <section className="min-h-[calc(100vh-80px)] flex flex-col relative">
      {/* Particle background — homepage only */}
      <ParticleBackground />

      <div className="container mx-auto flex-1 px-4 relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-16 gap-12 min-h-[70vh]">

          {/* LEFT */}
          <motion.div
            ref={heroRef}
            variants={staggerChildren}
            initial="hidden"
            animate={heroIn ? "visible" : "hidden"}
            className="text-center xl:text-left order-2 xl:order-none space-y-5 xl:max-w-[560px] w-full"
          >
            {/* Countdown / Open to Work banner */}
            <motion.div variants={fadeUp}>
              <CountdownBanner />
            </motion.div>

            {/* Role label */}
            <motion.div variants={fadeUp}>
              <span className="section-label">Full-Stack Developer</span>
            </motion.div>

            {/* Name */}
            <motion.h1 variants={fadeUp} className="h1 text-white leading-tight">
              Hello, I&apos;m{" "}
              <br />
              <span className="text-accent text-glow">Moeketsi Junior</span>
              <br />
              <span className="text-white/90">Sillo</span>
            </motion.h1>

            {/* Description */}
            <motion.p variants={fadeUp} className="max-w-[500px] text-white/60 leading-relaxed text-sm xl:text-base mx-auto xl:mx-0">
              I craft elegant, performant digital experiences — from pixel-perfect
              UIs to robust back-end systems. Currently levelling up at{" "}
              <span className="text-accent font-medium">Bitcube</span>.
            </motion.p>

            {/* Tech chips */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 justify-center xl:justify-start">
              {["Next.js", "React", "Node.js", "TypeScript", "Flutter"].map((tech) => (
                <span key={tech} className="tag-pill">{tech}</span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4 justify-center xl:justify-start pt-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-accent/40 text-accent text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 hover:shadow-[0_0_25px_rgba(232,121,249,0.4)]"
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
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400 text-xs">
                  ✓ {message}
                </motion.p>
              )}
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp} className="flex justify-center xl:justify-start">
              <Social
                containerStyles="flex gap-3"
                iconStyles="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/60 text-base hover:border-accent/50 hover:text-accent hover:bg-accent/10 transition-all duration-300"
              />
            </motion.div>
          </motion.div>

          {/* RIGHT — Photo */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={heroIn ? "visible" : "hidden"}
            className="order-1 xl:order-none"
          >
            <Photo />
          </motion.div>
        </div>

        {/* Terminal section */}
        <motion.div
          ref={terminalRef}
          variants={fadeUp}
          initial="hidden"
          animate={terminalIn ? "visible" : "hidden"}
          className="pb-8 xl:pb-16"
        >
          <div className="flex flex-col xl:flex-row items-center gap-8 xl:gap-16">
            <div className="xl:w-1/2 text-center xl:text-left space-y-3">
              <p className="section-label">In Code</p>
              <h2 className="text-2xl xl:text-3xl font-bold text-white">
                What I look like <span className="text-accent text-glow">in code</span>
              </h2>
              <p className="text-white/40 text-sm max-w-[360px] mx-auto xl:mx-0">
                Sometimes the best way to introduce yourself is in the language you speak every day.
              </p>
            </div>
            <div className="xl:w-1/2 w-full">
              <TerminalHero />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats */}
      <Stats />
    </section>
  );
};

export default Home;