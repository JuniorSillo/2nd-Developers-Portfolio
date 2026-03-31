"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import Link from "next/link";
import { useScrollAnimation, fadeUp, staggerChildren } from "@/lib/useScrollAnimation";

const projects = [
  { num: "01", category: "Full-Stack", title: "AI-Powered Resume Builder", description: "A dynamic web app for creating professional resumes with AI-driven suggestions and real-time previews. Features form validation, PDF export, and a modern responsive UI.", stack: ["Next.js", "React", "TypeScript", "TailwindCSS", "jsPDF"], live: "https://ai-resume-builder-rosy-rho.vercel.app/", github: "https://github.com/JuniorSillo/AI-Resume-Builder", color: "#e879f9" },
  { num: "02", category: "Full-Stack", title: "Food Delivery Website", description: "A full-stack food delivery app — users can browse menus, manage a cart, and place orders. Includes a Node.js backend for order and data management.", stack: ["HTML5", "CSS3", "JavaScript", "TailwindCSS", "Node.js", "Vite"], live: "https://hotel-website-4s1i.vercel.app/", github: "https://github.com/JuniorSillo/Food-Delivery", color: "#06b6d4" },
  { num: "03", category: "Frontend", title: "Spotify Clone", description: "A Spotify-inspired music browsing UI — pixel-perfect recreation of the interface built with React and Tailwind CSS, complete with smooth transitions.", stack: ["React", "TailwindCSS", "JavaScript", "Vite"], live: "https://spotify-clone-plum-pi.vercel.app/", github: "https://github.com/JuniorSillo/Spotify-clone", color: "#a78bfa" },
  { num: "04", category: "Frontend", title: "Hotel Booking Website", description: "A responsive hotel booking site with interactive features, polished design, and smooth user-friendly navigation built with React.", stack: ["HTML5", "CSS3", "JavaScript", "React"], live: "", github: "https://github.com/JuniorSillo/HOTEL_WEBSITE", color: "#34d399" },
];

const GITHUB_PROFILE = "https://github.com/JuniorSillo";

// 3D tilt card wrapper
function TiltCard({ children, className }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateX = ((y - midY) / midY) * -8;
    const rotateY = ((x - midX) / midX) * 8;
    setStyle({
      transform: `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      transition: "transform 0.1s ease-out",
    });
  };

  const onLeave = () => {
    setStyle({ transform: "perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)", transition: "transform 0.4s ease-out" });
  };

  return (
    <div ref={ref} style={style} onMouseMove={onMove} onMouseLeave={onLeave} className={className}>
      {children}
    </div>
  );
}

const Work = () => {
  const { ref, inView } = useScrollAnimation({ threshold: 0.05 });
  const { ref: cardsRef, inView: cardsIn } = useScrollAnimation({ threshold: 0.05 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
      className="min-h-[80vh] py-12 xl:py-16"
    >
      <div className="container mx-auto">

        {/* Header */}
        <motion.div ref={ref} variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-6 text-center xl:text-left">
          <p className="section-label mb-3">Portfolio</p>
          <h2 className="text-4xl xl:text-5xl font-bold text-white">
            Featured <span className="text-accent text-glow">Projects</span>
          </h2>
        </motion.div>

        {/* GitHub Banner */}
        <motion.div variants={fadeUp} initial="hidden" animate={inView ? "visible" : "hidden"} className="mb-12">
          <Link href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer"
            className="group flex flex-col sm:flex-row items-center justify-between gap-4 glass-card rounded-2xl px-7 py-5 border border-accent/15 hover:border-accent/40 hover:bg-accent/5 transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center flex-shrink-0">
                <FaGithub className="text-2xl text-accent" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white font-semibold text-sm">Want to see everything I&apos;m building?</p>
                <p className="text-white/40 text-xs mt-0.5">My GitHub has all current projects, experiments, and work-in-progress repos — updated regularly.</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-widest whitespace-nowrap group-hover:gap-3 transition-all">
              View GitHub <BsArrowUpRight />
            </div>
          </Link>
        </motion.div>

        {/* Cards */}
        <motion.div
          ref={cardsRef}
          variants={staggerChildren}
          initial="hidden"
          animate={cardsIn ? "visible" : "hidden"}
          className="grid grid-cols-1 xl:grid-cols-2 gap-5"
        >
          {projects.map((project, index) => (
            <motion.div key={index} variants={fadeUp}>
              <TiltCard className="h-full">
                <div className="glass-card-hover rounded-2xl p-7 flex flex-col gap-5 group relative overflow-hidden h-full cursor-default">
                  <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-25 transition-opacity duration-500" style={{ background: project.color }} />

                  <div className="flex items-center justify-between">
                    <span className="text-5xl font-extrabold select-none leading-none" style={{ WebkitTextStroke: `1px ${project.color}30`, color: "transparent" }}>{project.num}</span>
                    <span className="px-3 py-1 text-xs rounded-full font-bold uppercase tracking-widest" style={{ background: `${project.color}12`, border: `1px solid ${project.color}30`, color: project.color }}>{project.category}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300 leading-tight">{project.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed flex-1">{project.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 text-[11px] rounded-full font-medium" style={{ background: `${project.color}10`, border: `1px solid ${project.color}20`, color: project.color }}>{tech}</span>
                    ))}
                  </div>

                  <div className="h-px w-full opacity-20" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

                  <div className="flex items-center gap-3">
                    <Link href={project.github} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 border"
                      style={{ background: `${project.color}10`, borderColor: `${project.color}30`, color: project.color }}>
                      <BsGithub className="text-base" /> View Code
                    </Link>
                    {project.live ? (
                      <Link href={project.live} target="_blank" rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/60 text-sm font-semibold hover:text-white hover:bg-white/10 transition-all">
                        <HiOutlineExternalLink className="text-base" /> Live Demo
                      </Link>
                    ) : (
                      <span className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/5 text-white/20 text-sm font-semibold cursor-default select-none">
                        <HiOutlineExternalLink className="text-base" /> No Live Demo
                      </span>
                    )}
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <motion.div variants={fadeUp} initial="hidden" animate={cardsIn ? "visible" : "hidden"} className="mt-12 text-center">
          <p className="text-white/30 text-sm mb-5">These are a few highlights — there&apos;s more on GitHub including current work from my Bitcube leadership programme.</p>
          <Link href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-accent/30 text-accent text-sm font-bold uppercase tracking-widest hover:bg-accent hover:text-primary hover:border-accent transition-all duration-300 hover:shadow-[0_0_25px_rgba(232,121,249,0.35)]">
            <FaGithub className="text-lg" /> Explore All Projects on GitHub
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Work;