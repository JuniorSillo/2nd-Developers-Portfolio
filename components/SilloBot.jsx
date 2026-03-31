"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaRobot, FaTimes, FaPaperPlane, FaGithub, FaLinkedin,
  FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaCode, FaMobileAlt,
  FaPalette, FaSearch, FaDownload, FaExternalLinkAlt, FaBriefcase,
  FaGraduationCap, FaUser, FaCheckCircle,
} from "react-icons/fa";
import { BsStars, BsLightningFill } from "react-icons/bs";

// ─── PROFILE DATA ─────────────────────────────────────────────────────────────

const PROFILE = {
  name: "Moeketsi Junior Sillo",
  shortName: "Junior",
  role: "Full-Stack Developer",
  location: "Bloemfontein, South Africa",
  email: "sillojunior8@gmail.com",
  phone: "(+27) 71 799 9930",
  github: "https://github.com/JuniorSillo",
  linkedin: "https://www.linkedin.com/in/moeketsi-junior-sillo-726073244/",
  available: true,
  yearsExp: "5+",
  languages: ["English", "Sotho", "Xhosa", "Zulu"],
  current: {
    company: "Bitcube",
    role: "Software Developer Leadership Programme",
    period: "Jan – May 2026",
    focus: ["Mobile Development", "Shopify", "Full-Stack Development"],
  },
  skills: {
    frontend: ["Next.js", "React", "TypeScript", "JavaScript", "TailwindCSS", "HTML5", "CSS3", "Figma"],
    backend: ["Node.js", "C#", ".NET", "REST APIs", "Prisma ORM"],
    mobile: ["React Native", "Flutter", "iOS (Swift)"],
    databases: ["MongoDB", "PostgreSQL", "MySQL", "Firebase", "SQL"],
    other: ["Shopify", "Git", "SEO", "UI/UX Design"],
  },
  services: [
    { title: "Web Development", icon: FaCode, color: "#e879f9", description: "Modern, fast, responsive web apps built with Next.js and React.", href: "/contact" },
    { title: "UI/UX Design", icon: FaPalette, color: "#06b6d4", description: "Clean, user-focused interfaces and polished design systems.", href: "/contact" },
    { title: "Mobile App Development", icon: FaMobileAlt, color: "#a78bfa", description: "Cross-platform apps with React Native and Flutter.", href: "/contact" },
    { title: "SEO Optimization", icon: FaSearch, color: "#34d399", description: "Better rankings, faster load times, structured content.", href: "/contact" },
  ],
  projects: [
    { name: "AI Resume Builder", tech: "Next.js · React · TypeScript · jsPDF", desc: "Full-stack app with AI-driven suggestions, real-time preview and PDF export.", live: "https://ai-resume-builder-rosy-rho.vercel.app/", github: "https://github.com/JuniorSillo/AI-Resume-Builder" },
    { name: "Food Delivery App", tech: "Node.js · TailwindCSS · Vite", desc: "Full-stack delivery platform with cart, order management and responsive UI.", live: "https://hotel-website-4s1i.vercel.app/", github: "https://github.com/JuniorSillo/Food-Delivery" },
    { name: "Spotify Clone", tech: "React · TailwindCSS · Vite", desc: "Pixel-perfect Spotify UI clone with smooth transitions and music browsing.", live: "https://spotify-clone-plum-pi.vercel.app/", github: "https://github.com/JuniorSillo/Spotify-clone" },
    { name: "Hotel Booking Site", tech: "React · CSS3", desc: "Responsive hotel booking interface with interactive features and clean navigation.", github: "https://github.com/JuniorSillo/HOTEL_WEBSITE" },
  ],
  education: [
    { place: "Bitcube", degree: "Software Developer Leadership Programme", year: "2026", current: true },
    { place: "ATTI Bloemfontein", degree: "IT — Systems Development", year: "2024" },
    { place: "Scrimba", degree: "UI/UX Design Essentials", year: "2022–2023" },
    { place: "Coursera", degree: "SEO Optimization", year: "2023–2024" },
    { place: "Udemy & YouTube", degree: "Mobile App Development", year: "2021–2023" },
  ],
  experience: [
    { company: "Bitcube", role: "Software Developer Leadership Programme", period: "Jan 2026 – May 2026", detail: "Mobile Dev, Shopify & Full-Stack — professional team environment.", current: true },
    { company: "Freelance", role: "Full-Stack Developer", period: "2022 – Present", detail: "Built AI Resume Builder, Food Delivery App, Spotify Clone & more." },
    { company: "Self-Learning", role: "Full-Stack Trainee", period: "2020 – 2021", detail: "500+ hours of structured training in JS, React, Node.js & databases." },
  ],
};

// ─── INTENT ENGINE ─────────────────────────────────────────────────────────────
// Scoring-based: every message is scored against ALL intents simultaneously.
// The highest scorer wins. Phrases are worth more than single keywords.
// This handles natural language like "Does he know SQL?" or "Can he build apps?"

const INTENTS = [
  {
    id: "greeting",
    phrases: ["hi", "hello", "hey", "good morning", "good afternoon", "sup", "yo", "howdy", "hiya", "greetings"],
    keywords: ["hi", "hey", "hello"],
    weight: { phrase: 3, keyword: 1 },
  },
  {
    id: "about",
    phrases: ["who is junior", "tell me about", "who are you", "about yourself", "about junior", "who is he", "introduce yourself", "background info"],
    keywords: ["who", "about", "yourself", "bio", "person", "developer", "portfolio", "introduce"],
    weight: { phrase: 4, keyword: 1 },
  },
  {
    id: "skills",
    phrases: ["what can he do", "what can you do", "what does he know", "what technologies", "tech stack", "programming languages", "what skills", "does he know", "is he good at", "can he build", "what tools", "what frameworks", "does he use"],
    keywords: ["skill", "skills", "stack", "tech", "language", "react", "next", "node", "typescript", "javascript", "css", "html", "flutter", "python", "sql", "mongo", "database", "framework", "tailwind", "figma", "csharp", "c#", ".net", "firebase", "postgresql", "mysql", "shopify", "native", "swift", "frontend", "backend", "mobile", "fullstack", "full-stack", "full stack"],
    weight: { phrase: 4, keyword: 2 },
  },
  {
    id: "experience",
    phrases: ["work experience", "work history", "where has he worked", "career history", "professional experience", "has he worked", "industry experience", "years of experience", "how long has he", "is he experienced"],
    keywords: ["experience", "worked", "career", "history", "years", "professional", "industry", "bitcube", "freelance", "job", "employed", "internship"],
    weight: { phrase: 4, keyword: 2 },
  },
  {
    id: "projects",
    phrases: ["show me projects", "what has he built", "what has he made", "his work", "portfolio projects", "project examples", "show projects", "see projects", "view projects", "what did he build", "github projects", "what apps", "what websites"],
    keywords: ["project", "projects", "built", "made", "portfolio", "work", "apps", "websites", "resume builder", "spotify", "hotel", "food delivery", "demo", "live"],
    weight: { phrase: 4, keyword: 2 },
  },
  {
    id: "services",
    phrases: ["what services", "what do you offer", "what can he offer", "services offered", "what does he offer", "i need a website", "i need an app", "build me", "help me build", "i want to hire", "need development", "need a developer", "need web development"],
    keywords: ["service", "services", "offer", "offering", "help", "need", "want", "web development", "mobile development", "design", "seo", "ux", "ui"],
    weight: { phrase: 4, keyword: 2 },
  },
  {
    id: "contact",
    phrases: ["how do i contact", "how can i reach", "get in touch", "contact junior", "reach out", "how to hire", "want to hire", "interested in hiring", "send a message", "reach him", "contact him", "get hold of"],
    keywords: ["contact", "email", "phone", "reach", "hire", "hiring", "touch", "message", "available", "availability", "freelance", "work with"],
    weight: { phrase: 4, keyword: 2 },
  },
  {
    id: "location",
    phrases: ["where is he based", "where does he live", "where is he from", "what country", "south africa", "remote work", "does he work remotely", "where is junior"],
    keywords: ["where", "location", "based", "live", "from", "country", "city", "bloemfontein", "africa", "remote", "timezone"],
    weight: { phrase: 4, keyword: 2 },
  },
  {
    id: "education",
    phrases: ["where did he study", "his education", "what did he study", "his qualifications", "is he qualified", "formal education", "self taught", "how did he learn", "where did he learn"],
    keywords: ["education", "study", "studied", "degree", "qualification", "school", "college", "university", "atti", "course", "udemy", "coursera", "certificate", "learn", "self-taught", "training"],
    weight: { phrase: 4, keyword: 2 },
  },
  {
    id: "cv",
    phrases: ["download cv", "get cv", "download resume", "get resume", "see his cv", "view his cv", "his resume", "curriculum vitae"],
    keywords: ["cv", "resume", "download", "curriculum"],
    weight: { phrase: 5, keyword: 3 },
  },
  {
    id: "github",
    phrases: ["open github", "see his code", "view code", "github profile", "see repos", "his repositories", "source code", "view github"],
    keywords: ["github", "code", "repo", "repos", "repository", "repositories", "source", "git"],
    weight: { phrase: 4, keyword: 3 },
  },
  {
    id: "linkedin",
    phrases: ["open linkedin", "linkedin profile", "connect on linkedin", "see linkedin"],
    keywords: ["linkedin", "connect", "social", "network", "professional profile"],
    weight: { phrase: 5, keyword: 3 },
  },
  {
    id: "goodbye",
    phrases: ["thank you", "thanks a lot", "that was helpful", "goodbye", "see you", "bye bye", "take care", "chat later"],
    keywords: ["bye", "goodbye", "thanks", "thank", "cya", "later", "done", "finished", "helpful"],
    weight: { phrase: 3, keyword: 1 },
  },
  {
    id: "overview",
    phrases: ["give me an overview", "quick summary", "tell me everything", "full summary", "overview of junior", "summarize", "who exactly"],
    keywords: ["overview", "summary", "everything", "all about", "summarize", "snapshot"],
    weight: { phrase: 5, keyword: 3 },
  },
];

function detectIntent(input) {
  const lower = input.toLowerCase().trim();
  let best = { id: "unknown", score: 0 };

  for (const intent of INTENTS) {
    let score = 0;
    // Phrase matching (higher weight)
    for (const phrase of intent.phrases) {
      if (lower.includes(phrase)) score += intent.weight.phrase;
    }
    // Keyword matching
    for (const kw of intent.keywords) {
      if (lower.includes(kw)) score += intent.weight.keyword;
    }
    if (score > best.score) best = { id: intent.id, score };
  }

  // Minimum confidence threshold — below 2 = unknown
  return best.score >= 2 ? best.id : "unknown";
}

// ─── MESSAGE FACTORY ──────────────────────────────────────────────────────────

function ts() {
  return new Intl.DateTimeFormat("en-ZA", { hour: "2-digit", minute: "2-digit" }).format(new Date());
}

function msg(overrides) {
  return {
    id: `${overrides.role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: ts(),
    text: "",
    quickReplies: [],
    type: "text",
    ...overrides,
  };
}

// ─── RESPONSE BUILDER ─────────────────────────────────────────────────────────

function buildReply(intentId, conversationHistory) {
  const topicsDiscussed = conversationHistory.map((m) => m.intent).filter(Boolean);
  const alreadyDiscussed = (id) => topicsDiscussed.includes(id);

  const prefix = alreadyDiscussed(intentId)
    ? ["To recap — ", "As mentioned — ", "Coming back to that — ", "To add a bit more — "][Math.floor(Math.random() * 4)]
    : "";

  switch (intentId) {

    case "greeting":
      return msg({
        role: "assistant", intent: "greeting",
        text: `${prefix}Hey! 👋 Great to have you here. I'm SilloBot — ${PROFILE.shortName}'s portfolio assistant.\n\nI can tell you about his skills, projects, experience, or how to get in touch. What would you like to explore?`,
        quickReplies: ["Give me an overview", "Show me projects", "Can I hire him?"],
      });

    case "overview":
      return msg({
        role: "assistant", intent: "overview",
        type: "overview",
        text: `Here's a quick snapshot of ${PROFILE.name}:`,
        quickReplies: ["See his skills", "View projects", "How do I hire him?"],
      });

    case "about":
      return msg({
        role: "assistant", intent: "about",
        text: `${prefix}${PROFILE.name} is a ${PROFILE.role} from ${PROFILE.location} with ${PROFILE.yearsExp} years of experience building modern digital products.\n\nRight now he's in Bitcube's Software Developer Leadership Programme (Jan–May 2026), working on Mobile Development, Shopify, and Full-Stack projects in a professional team environment.\n\nHe speaks English, Sotho, Xhosa, and Zulu — and he's ${PROFILE.available ? "✅ currently available for freelance work" : "not currently available"}.`,
        quickReplies: ["What are his skills?", "Show me his work", "How do I contact him?"],
      });

    case "skills":
      return msg({
        role: "assistant", intent: "skills",
        type: "skills",
        text: `${prefix}${PROFILE.shortName} works across the full stack. Here's the breakdown:`,
        quickReplies: ["Show me projects built with these", "What services does he offer?", "How do I hire him?"],
      });

    case "experience":
      return msg({
        role: "assistant", intent: "experience",
        type: "experience",
        text: `${prefix}Here's ${PROFILE.shortName}'s professional timeline:`,
        quickReplies: ["See his skills", "View his projects", "Contact Junior"],
      });

    case "projects":
      return msg({
        role: "assistant", intent: "projects",
        type: "projects",
        text: `${prefix}Here are ${PROFILE.shortName}'s featured projects. Each one has a GitHub link — and you can view the full portfolio on the Work page.`,
        quickReplies: ["View full work page", "Open GitHub", "Hire Junior"],
        cta: { label: "View Full Portfolio →", href: "/work" },
      });

    case "services":
      return msg({
        role: "assistant", intent: "services",
        type: "services",
        text: `${prefix}${PROFILE.shortName} offers four core services. Tap any card below to go straight to the contact page and kick things off.`,
        quickReplies: ["How much does it cost?", "How do I get in touch?", "See his projects first"],
      });

    case "contact":
      return msg({
        role: "assistant", intent: "contact",
        type: "contact",
        text: `${prefix}${PROFILE.shortName} is ${PROFILE.available ? "✅ available for freelance and full-time opportunities" : "not currently available"}. Here's how to reach him:`,
        quickReplies: ["Go to Contact Page", "Download CV", "See his work first"],
        cta: { label: "Open Contact Page →", href: "/contact" },
      });

    case "location":
      return msg({
        role: "assistant", intent: "location",
        text: `${prefix}${PROFILE.shortName} is based in ${PROFILE.location} 🇿🇦\n\nHe's open to both local and remote opportunities — timezone is SAST (UTC+2).`,
        quickReplies: ["Is he available to hire?", "How do I contact him?", "What does he do?"],
      });

    case "education":
      return msg({
        role: "assistant", intent: "education",
        type: "education",
        text: `${prefix}${PROFILE.shortName} combines formal IT training with intense self-driven learning:`,
        quickReplies: ["What skills did he gain?", "Show me his experience", "View his projects"],
      });

    case "cv":
      return msg({
        role: "assistant", intent: "cv",
        type: "cv",
        text: `You can download ${PROFILE.shortName}'s CV directly from the home page, or tap the button below 👇`,
        quickReplies: ["See his projects", "Contact Junior"],
        cta: { label: "Download CV →", href: "/" },
      });

    case "github":
      return msg({
        role: "assistant", intent: "github",
        type: "github",
        text: `${PROFILE.shortName}'s GitHub is where the build streak lives 🔥 — projects, commits, and current work all in one place.`,
        quickReplies: ["Show me specific projects", "Contact Junior", "View portfolio page"],
      });

    case "linkedin":
      return msg({
        role: "assistant", intent: "linkedin",
        type: "linkedin",
        text: `Connect with ${PROFILE.shortName} on LinkedIn — best place for professional outreach.`,
        quickReplies: ["How do I hire him?", "Send him an email", "Go to contact page"],
      });

    case "goodbye":
      return msg({
        role: "assistant", intent: "goodbye",
        text: `Thanks for stopping by! 🙌 If you'd like to work with ${PROFILE.shortName}, the contact page is just one click away. Good luck!`,
        quickReplies: ["Go to Contact Page", "View his work"],
        cta: { label: "Contact Junior →", href: "/contact" },
      });

    default:
      return msg({
        role: "assistant", intent: "unknown",
        text: `Hmm, I'm not quite sure about that one — but I can definitely help you with any of these:`,
        quickReplies: ["Who is Junior?", "What are his skills?", "Show me projects", "How do I hire him?"],
      });
  }
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span key={i} className="h-2 w-2 rounded-full bg-fuchsia-300/80"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }} />
      ))}
    </div>
  );
}

function OverviewCard() {
  return (
    <div className="mt-3 rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/8 to-purple-600/8 p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-fuchsia-500/20 border border-fuchsia-400/30 flex items-center justify-center">
          <FaUser className="text-fuchsia-300 text-sm" />
        </div>
        <div>
          <p className="font-bold text-white text-sm">{PROFILE.name}</p>
          <p className="text-fuchsia-300 text-xs">{PROFILE.role}</p>
        </div>
        {PROFILE.available && (
          <span className="ml-auto flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/15 border border-green-500/25 text-green-400 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {[
          { icon: FaMapMarkerAlt, label: PROFILE.location },
          { icon: FaBriefcase, label: `${PROFILE.yearsExp} yrs experience` },
          { icon: FaCode, label: "Full-Stack + Mobile" },
          { icon: FaGraduationCap, label: "ATTI · Bitcube" },
        ].map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-white/60">
            <Icon className="text-fuchsia-400/70 flex-shrink-0" />
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="pt-1 border-t border-white/8">
        <p className="text-[11px] text-white/45">Currently @ <span className="text-fuchsia-300 font-medium">Bitcube Leadership Programme</span> · Jan–May 2026</p>
      </div>
    </div>
  );
}

function SkillsCard() {
  const categories = [
    { label: "Frontend", color: "#e879f9", items: PROFILE.skills.frontend },
    { label: "Backend", color: "#06b6d4", items: PROFILE.skills.backend },
    { label: "Mobile", color: "#34d399", items: PROFILE.skills.mobile },
    { label: "Databases", color: "#a78bfa", items: PROFILE.skills.databases },
    { label: "Other", color: "#f59e0b", items: PROFILE.skills.other },
  ];
  return (
    <div className="mt-3 space-y-2">
      {categories.map(({ label, color, items }) => (
        <div key={label} className="rounded-xl border border-white/8 bg-black/20 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color }}>{label}</p>
          <div className="flex flex-wrap gap-1.5">
            {items.map((item) => (
              <span key={item} className="px-2 py-0.5 rounded-full text-[11px] font-medium text-white/75" style={{ background: `${color}15`, border: `1px solid ${color}25` }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectsCard() {
  return (
    <div className="mt-3 space-y-2">
      {PROFILE.projects.map((p) => (
        <div key={p.name} className="rounded-2xl border border-white/10 bg-black/25 p-3">
          <p className="font-bold text-white text-sm">{p.name}</p>
          <p className="text-[11px] text-fuchsia-300/80 mt-0.5">{p.tech}</p>
          <p className="text-xs text-white/50 mt-1 leading-relaxed">{p.desc}</p>
          <div className="flex gap-3 mt-2">
            <a href={p.github} target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-[11px] font-medium text-fuchsia-300 hover:text-fuchsia-200 transition">
              <FaGithub className="text-xs" /> View Code
            </a>
            {p.live && (
              <a href={p.live} target="_blank" rel="noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-medium text-white/50 hover:text-white/80 transition">
                <FaExternalLinkAlt className="text-[9px]" /> Live Demo
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ServicesCard() {
  return (
    <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {PROFILE.services.map((s) => {
        const Icon = s.icon;
        return (
          <Link key={s.title} href={s.href}
            className="group rounded-2xl border border-white/8 bg-gradient-to-br from-white/3 to-white/0 p-3 hover:border-fuchsia-400/30 hover:bg-fuchsia-500/8 transition-all">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                <Icon className="text-xs" style={{ color: s.color }} />
              </div>
              <div>
                <p className="font-semibold text-white text-xs">{s.title}</p>
                <p className="text-[11px] text-white/50 mt-0.5 leading-relaxed">{s.description}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function ExperienceCard() {
  return (
    <div className="mt-3 space-y-2">
      {PROFILE.experience.map((e) => (
        <div key={e.company} className={`rounded-xl border p-3 ${e.current ? "border-fuchsia-400/25 bg-fuchsia-500/5" : "border-white/8 bg-black/20"}`}>
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-bold text-white text-sm">{e.role}</p>
              <p className="text-[11px] text-fuchsia-300">{e.company}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-[10px] text-white/40 whitespace-nowrap">{e.period}</span>
              {e.current && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-green-500/15 border border-green-500/25 text-green-400">Current</span>}
            </div>
          </div>
          <p className="text-xs text-white/50 mt-1.5">{e.detail}</p>
        </div>
      ))}
    </div>
  );
}

function EducationCard() {
  return (
    <div className="mt-3 space-y-2">
      {PROFILE.education.map((e) => (
        <div key={e.place} className={`rounded-xl border p-3 flex items-start justify-between gap-2 ${e.current ? "border-fuchsia-400/20 bg-fuchsia-500/5" : "border-white/8 bg-black/20"}`}>
          <div>
            <p className="text-sm font-bold text-white">{e.degree}</p>
            <p className="text-xs text-fuchsia-300/80 mt-0.5">{e.place}</p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <span className="text-[10px] text-white/40">{e.year}</span>
            {e.current && <span className="px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-green-500/15 border border-green-500/25 text-green-400">Current</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

function ContactCard() {
  return (
    <div className="mt-3 space-y-2">
      {[
        { icon: FaEnvelope, label: PROFILE.email, href: `mailto:${PROFILE.email}`, color: "#e879f9" },
        { icon: FaPhoneAlt, label: PROFILE.phone, href: `tel:${PROFILE.phone.replace(/\s/g, "")}`, color: "#06b6d4" },
        { icon: FaMapMarkerAlt, label: PROFILE.location, href: null, color: "#a78bfa" },
        { icon: FaGithub, label: "GitHub Profile", href: PROFILE.github, external: true, color: "#ffffff" },
        { icon: FaLinkedin, label: "LinkedIn Profile", href: PROFILE.linkedin, external: true, color: "#0ea5e9" },
      ].map(({ icon: Icon, label, href, external, color }) => {
        const cls = "flex items-center gap-3 rounded-xl border border-white/8 bg-black/20 px-3 py-2.5 text-sm text-white/80 hover:border-fuchsia-400/25 hover:text-white transition-all";
        const inner = (<><div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${color}15` }}><Icon className="text-xs" style={{ color }} /></div><span className="text-xs">{label}</span></>);
        return href ? (
          <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={cls}>{inner}</a>
        ) : (
          <div key={label} className={cls}>{inner}</div>
        );
      })}
    </div>
  );
}

function GitHubCard() {
  return (
    <a href={PROFILE.github} target="_blank" rel="noreferrer"
      className="mt-3 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 hover:border-fuchsia-400/30 hover:bg-fuchsia-500/5 transition-all group">
      <div className="w-10 h-10 rounded-full bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0">
        <FaGithub className="text-white text-lg" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-bold text-sm">JuniorSillo</p>
        <p className="text-white/40 text-xs">github.com/JuniorSillo</p>
      </div>
      <FaExternalLinkAlt className="text-white/30 group-hover:text-fuchsia-300 transition-colors text-xs" />
    </a>
  );
}

function CvCard() {
  return (
    <Link href="/"
      className="mt-3 flex items-center gap-3 rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/8 px-4 py-3 hover:bg-fuchsia-500/15 transition-all group">
      <div className="w-9 h-9 rounded-xl bg-fuchsia-500/20 flex items-center justify-center flex-shrink-0">
        <FaDownload className="text-fuchsia-300 text-sm" />
      </div>
      <div>
        <p className="text-white font-bold text-sm">Download CV</p>
        <p className="text-white/40 text-xs">Go to home page to download</p>
      </div>
    </Link>
  );
}

// ─── MESSAGE BUBBLE ────────────────────────────────────────────────────────────

function MessageBubble({ message, onQuickReply }) {
  const isUser = message.role === "user";
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="mr-2 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10">
          <FaRobot className="text-[10px] text-fuchsia-300" />
        </div>
      )}
      <div className={`max-w-[88%] flex flex-col ${isUser ? "items-end" : "items-start"}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${isUser
          ? "rounded-tr-sm bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white"
          : "rounded-tl-sm border border-white/10 bg-white/5 text-white/90 backdrop-blur-md"}`}>
          {message.text && <p className="whitespace-pre-line">{message.text}</p>}

          {message.type === "overview" && <OverviewCard />}
          {message.type === "skills" && <SkillsCard />}
          {message.type === "projects" && <ProjectsCard />}
          {message.type === "services" && <ServicesCard />}
          {message.type === "experience" && <ExperienceCard />}
          {message.type === "education" && <EducationCard />}
          {message.type === "contact" && <ContactCard />}
          {message.type === "github" && <GitHubCard />}
          {message.type === "linkedin" && (
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer"
              className="mt-3 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 hover:border-blue-400/30 transition-all group">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-400/20 flex items-center justify-center flex-shrink-0">
                <FaLinkedin className="text-blue-400 text-lg" />
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">Moeketsi Junior Sillo</p>
                <p className="text-white/40 text-xs">linkedin.com/in/moeketsi-junior-sillo</p>
              </div>
              <FaExternalLinkAlt className="text-white/30 group-hover:text-blue-300 transition-colors text-xs" />
            </a>
          )}
          {message.type === "cv" && <CvCard />}

          {message.cta && (
            <div className="mt-3">
              <Link href={message.cta.href}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 px-4 py-2 text-xs font-bold text-white transition hover:shadow-[0_0_20px_rgba(232,121,249,0.3)] hover:scale-[1.02]">
                {message.cta.label}
              </Link>
            </div>
          )}
        </div>

        <span className="mt-1 px-1 text-[10px] text-white/30">{message.timestamp}</span>

        {!isUser && message.quickReplies?.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {message.quickReplies.map((r) => (
              <button key={r} onClick={() => onQuickReply(r)}
                className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/8 px-3 py-1.5 text-[11px] font-medium text-fuchsia-200 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-500/15">
                {r}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function SilloBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(() => [
    msg({
      role: "assistant", intent: "greeting", type: "overview",
      text: `Hey! 👋 I'm **SilloBot** — ${PROFILE.shortName}'s portfolio assistant. Here's a quick snapshot:`,
      quickReplies: ["What are his skills?", "Show me projects", "Is he available to hire?"],
    }),
  ]);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const canSend = useMemo(() => input.trim().length > 0 && !isTyping, [input, isTyping]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 260);
  }, [open]);

  const handleSend = useCallback(async (value) => {
    const text = (value ?? input).trim();
    if (!text || isTyping) return;

    const userMsg = msg({ role: "user", text });
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Realistic delay: 600–1000ms based on response complexity
    await new Promise((r) => setTimeout(r, 700 + Math.random() * 300));

    const intentId = detectIntent(text);
    const history = messages;
    const reply = buildReply(intentId, history);
    setMessages((prev) => [...prev, reply]);
    setIsTyping(false);
  }, [input, isTyping, messages]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <>
      {/* Trigger button */}
      <motion.button type="button" onClick={() => setOpen(true)} aria-label="Open SilloBot"
        whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-all duration-300 sm:bottom-6 sm:right-6 ${open ? "pointer-events-none scale-90 opacity-0" : "opacity-100"}`}
        style={{ background: "linear-gradient(135deg, #d946ef 0%, #7c3aed 100%)", boxShadow: "0 0 35px rgba(232,121,249,0.4)" }}>
        <FaRobot className="relative z-10 text-lg" />
        <span className="absolute inset-0 rounded-full bg-fuchsia-400/30 animate-ping" />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-50 flex flex-col overflow-hidden rounded-[28px] border border-fuchsia-400/15 bg-[#0a0a0f]/96 shadow-[0_25px_80px_rgba(0,0,0,0.6)] backdrop-blur-xl sm:bottom-6 sm:right-6"
            style={{ width: "min(420px, calc(100vw - 24px))", height: "min(700px, 85vh)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/8 px-5 py-4 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, rgba(217,70,239,0.18) 0%, rgba(124,58,237,0.16) 100%)" }}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10">
                  <FaRobot className="text-sm text-fuchsia-300" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-white">SilloBot</p>
                    <BsStars className="text-[11px] text-fuchsia-300" />
                  </div>
                  <p className="text-[11px] text-white/45">{PROFILE.shortName}&apos;s portfolio assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {PROFILE.available && (
                  <div className="hidden items-center gap-1.5 sm:flex">
                    <FaCheckCircle className="text-green-400 text-xs" />
                    <span className="text-[10px] font-medium text-green-400">Available for hire</span>
                  </div>
                )}
                <button type="button" onClick={() => setOpen(false)} aria-label="Close SilloBot"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white">
                  <FaTimes className="text-xs" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(232,121,249,0.2) transparent" }}>
              {messages.map((m) => (
                <MessageBubble key={m.id} message={m} onQuickReply={(v) => handleSend(v)} />
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="mr-2 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10">
                    <FaRobot className="text-[10px] text-fuchsia-300" />
                  </div>
                  <div className="rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 backdrop-blur-md">
                    <TypingDots />
                  </div>
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/8 px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <input ref={inputRef} type="text" value={input}
                  onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}
                  placeholder="Ask me anything about Junior…"
                  disabled={isTyping}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-fuchsia-400/35 focus:bg-fuchsia-500/5 disabled:opacity-50" />
                <button type="button" onClick={() => handleSend()} disabled={!canSend} aria-label="Send"
                  className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white transition hover:shadow-[0_0_20px_rgba(232,121,249,0.3)] disabled:cursor-not-allowed disabled:opacity-30">
                  <FaPaperPlane className="text-sm" />
                </button>
              </div>
              <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-white/25">
                <span className="flex items-center gap-1"><BsLightningFill className="text-fuchsia-400/50" /> Smart rule-based assistant</span>
                <span>No API · Always fast</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}