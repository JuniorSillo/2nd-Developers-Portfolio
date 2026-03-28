"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaCode,
  FaMobileAlt,
  FaPalette,
  FaSearch,
} from "react-icons/fa";
import { BsStars } from "react-icons/bs";

const BOT_NAME = "SilloBot";

const PROFILE = {
  name: "Moeketsi Junior Sillo",
  role: "Full-Stack Developer",
  location: "Bloemfontein, South Africa",
  email: "sillojunior8@gmail.com",
  phone: "(+27) 71 799 9930",
  github: "https://github.com/JuniorSillo",
  linkedin: "https://www.linkedin.com/in/moeketsi-junior-sillo-726073244/",
  current:
    "Software Developer Leadership Programme at Bitcube (Jan–May 2026), working on Mobile Development, Shopify, and Full-Stack projects.",
  available: true,
  skills: {
    frontend: ["Next.js", "React", "TypeScript", "TailwindCSS", "Figma"],
    backend: ["Node.js", "C#/.NET"],
    mobile: ["React Native", "Flutter"],
    databases: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
    other: ["Shopify"],
  },
  services: [
    {
      title: "Web Development",
      href: "/contact",
      icon: FaCode,
      description: "Modern, fast, responsive web apps and websites.",
    },
    {
      title: "UI/UX Design",
      href: "/contact",
      icon: FaPalette,
      description: "Clean interfaces and user-focused design systems.",
    },
    {
      title: "Mobile App Development",
      href: "/contact",
      icon: FaMobileAlt,
      description: "Cross-platform apps with React Native and Flutter.",
    },
    {
      title: "SEO Optimization",
      href: "/contact",
      icon: FaSearch,
      description: "Better visibility, structure, and performance for the web.",
    },
  ],
  projects: [
    {
      name: "AI Resume Builder",
      tech: "Next.js, React, TypeScript",
      github: "https://github.com/JuniorSillo/AI-Resume-Builder",
    },
    {
      name: "Food Delivery App",
      tech: "Frontend-heavy product UI experience",
      github: "https://github.com/JuniorSillo/Food-Delivery",
    },
    {
      name: "Spotify Clone",
      tech: "React, TailwindCSS",
      github: "https://github.com/JuniorSillo/Spotify-clone",
    },
    {
      name: "Hotel Booking Site",
      tech: "React-based booking interface",
      github: "https://github.com/JuniorSillo/HOTEL_WEBSITE",
    },
  ],
  education: [
    "ATTI Bloemfontein — IT Systems Development",
    "Continuous self-driven growth through practical software development work",
  ],
};

const INITIAL_SUGGESTIONS = [
  "Show me projects",
  "What are your skills?",
  "Can I hire Junior?",
];

const FALLBACK_SUGGESTIONS = [
  "Show me projects",
  "What services do you offer?",
  "How can I contact Junior?",
];

function formatTime(date = new Date()) {
  return new Intl.DateTimeFormat("en-ZA", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-2 w-2 rounded-full bg-fuchsia-300/80"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.55,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
    </div>
  );
}

function createMessage({
  role,
  text = "",
  quickReplies = [],
  services = false,
  cta = null,
  links = [],
  projects = null,
  timestamp = formatTime(),
}) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role,
    text,
    timestamp,
    quickReplies,
    services,
    cta,
    links,
    projects,
  };
}

function includesAny(input, words) {
  return words.some((word) => input.includes(word));
}

function getBotReply(rawInput) {
  const input = rawInput.toLowerCase().trim();

  const greetings = ["hi", "hello", "hey", "sup", "yo"];
  const about = ["who", "about", "tell me", "yourself", "junior"];
  const skills = ["skills", "stack", "technologies", "tech", "build", "can you"];
  const experience = ["experience", "worked", "work history", "background", "career"];
  const projects = ["projects", "portfolio", "work", "show me"];
  const services = ["services", "offer", "help with", "hire"];
  const contact = ["contact", "email", "reach", "hire", "available"];
  const location = ["where", "based", "south africa", "bloemfontein", "location"];
  const education = ["education", "studied", "degree", "school", "atti"];
  const resume = ["resume", "cv", "download"];
  const github = ["github", "code", "repos", "repository"];
  const linkedin = ["linkedin", "social", "connect"];
  const goodbye = ["bye", "thanks", "thank you", "cya", "goodbye"];

  if (includesAny(input, greetings)) {
    return createMessage({
      role: "assistant",
      text: `Hey there 👋 I’m ${BOT_NAME} — here to help you explore ${PROFILE.name}'s work, skills, and services. What would you like to know?`,
      quickReplies: ["Show me projects", "What are your skills?", "Can I hire Junior?"],
    });
  }

  if (includesAny(input, about)) {
    return createMessage({
      role: "assistant",
      text: `${PROFILE.name} is a ${PROFILE.role} based in ${PROFILE.location}. He’s currently in the Bitcube Software Developer Leadership Programme, building mobile, Shopify, and full-stack solutions with confidence and serious momentum 🚀`,
      quickReplies: ["Show experience", "See skills", "View projects"],
    });
  }

  if (includesAny(input, skills)) {
    return createMessage({
      role: "assistant",
      text: `Junior works across the full stack:\n\n• Frontend: ${PROFILE.skills.frontend.join(", ")}\n• Backend: ${PROFILE.skills.backend.join(", ")}\n• Mobile: ${PROFILE.skills.mobile.join(", ")}\n• Databases: ${PROFILE.skills.databases.join(", ")}\n• Other: ${PROFILE.skills.other.join(", ")}`,
      quickReplies: ["Show me projects", "What services do you offer?", "How can I contact Junior?"],
    });
  }

  if (includesAny(input, experience)) {
    return createMessage({
      role: "assistant",
      text: `Right now, Junior is sharpening his craft in Bitcube’s Leadership Programme from January to May 2026. He’s also built freelance-style and personal projects across web, mobile, and product-focused development — so he’s not just learning, he’s shipping.`,
      quickReplies: ["Show me projects", "What are your skills?", "How do I hire him?"],
    });
  }

  if (includesAny(input, projects)) {
    return createMessage({
      role: "assistant",
      text: `Here are a few standout projects from Junior’s portfolio. You can also explore more on the Work page for the full showcase.`,
      quickReplies: ["Go to Work Page", "Open GitHub", "Hire Junior"],
      projects: PROFILE.projects,
      cta: {
        label: "View Full Work Page",
        href: "/work",
      },
    });
  }

  if (includesAny(input, services)) {
    return createMessage({
      role: "assistant",
      text: `Junior offers focused digital services for brands and businesses that want polished, practical results. Tap a service below and head straight to the contact page.`,
      services: true,
      quickReplies: ["Need a website", "Need mobile app help", "How can I contact Junior?"],
      cta: {
        label: "Go to Contact Page",
        href: "/contact",
      },
    });
  }

  if (includesAny(input, contact)) {
    return createMessage({
      role: "assistant",
      text: `Absolutely — Junior is available for freelance opportunities. You can reach him directly by email or phone, or jump to the contact page for a cleaner handoff.`,
      links: [
        {
          label: PROFILE.email,
          href: `mailto:${PROFILE.email}`,
          icon: FaEnvelope,
        },
        {
          label: PROFILE.phone,
          href: `tel:${PROFILE.phone.replace(/\s+/g, "")}`,
          icon: FaPhoneAlt,
        },
      ],
      quickReplies: ["Go to Contact Page", "Open LinkedIn", "Show services"],
      cta: {
        label: "Go to Contact Page",
        href: "/contact",
      },
    });
  }

  if (includesAny(input, location)) {
    return createMessage({
      role: "assistant",
      text: `Junior is based in ${PROFILE.location}. Built in South Africa, powered by ambition, and very much open to local and remote opportunities.`,
      quickReplies: ["How can I contact Junior?", "What does he do?", "Show experience"],
    });
  }

  if (includesAny(input, education)) {
    return createMessage({
      role: "assistant",
      text: `Junior studied IT Systems Development at ATTI Bloemfontein. He’s paired that foundation with hands-on project work and ongoing growth in real-world development environments.`,
      quickReplies: ["What are your skills?", "Show experience", "View projects"],
    });
  }

  if (includesAny(input, resume)) {
    return createMessage({
      role: "assistant",
      text: `You can download Junior’s CV directly from the home page. Nice and easy — no treasure hunt required.`,
      quickReplies: ["Go to Home Page", "Show experience", "How can I hire Junior?"],
      cta: {
        label: "Back to Home Page",
        href: "/",
      },
    });
  }

  if (includesAny(input, github)) {
    return createMessage({
      role: "assistant",
      text: `Want to see the code? Perfect. Junior’s GitHub is where the build streak lives.`,
      links: [
        {
          label: "Open GitHub Profile",
          href: PROFILE.github,
          icon: FaGithub,
          external: true,
        },
      ],
      quickReplies: ["Show me projects", "Open LinkedIn", "How can I hire Junior?"],
    });
  }

  if (includesAny(input, linkedin)) {
    return createMessage({
      role: "assistant",
      text: `You can connect with Junior on LinkedIn right here. Professional, active, and a good place to keep the conversation moving.`,
      links: [
        {
          label: "Open LinkedIn Profile",
          href: PROFILE.linkedin,
          icon: FaLinkedin,
          external: true,
        },
      ],
      quickReplies: ["Contact Junior", "Show experience", "Show me projects"],
    });
  }

  if (includesAny(input, goodbye)) {
    return createMessage({
      role: "assistant",
      text: `You’re welcome — and thanks for stopping by. If you want to work with Junior, the contact page is only one click away ✨`,
      quickReplies: ["Go to Contact Page", "Show me projects"],
      cta: {
        label: "Go to Contact Page",
        href: "/contact",
      },
    });
  }

  return createMessage({
    role: "assistant",
    text: `I’m not totally sure what you mean there — but I can definitely help you explore Junior’s work, skills, or contact details. Try one of these quick options below.`,
    quickReplies: FALLBACK_SUGGESTIONS,
  });
}

function MessageBubble({ message, onQuickReply }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      {!isUser && (
        <div className="mr-2 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10">
          <FaRobot className="text-[10px] text-fuchsia-300" />
        </div>
      )}

      <div className={`max-w-[86%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg ${
            isUser
              ? "rounded-tr-sm bg-gradient-to-br from-fuchsia-500 to-purple-600 text-white"
              : "rounded-tl-sm border border-white/10 bg-white/5 text-white/90 backdrop-blur-md"
          }`}
        >
          <div className="whitespace-pre-line">{message.text}</div>

          {message.projects?.length ? (
            <div className="mt-3 space-y-2">
              {message.projects.map((project) => (
                <div
                  key={project.name}
                  className="rounded-2xl border border-white/10 bg-black/20 p-3"
                >
                  <p className="font-semibold text-white">{project.name}</p>
                  <p className="mt-1 text-xs text-white/65">{project.tech}</p>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-2 text-xs font-medium text-fuchsia-300 transition hover:text-fuchsia-200"
                  >
                    <FaGithub />
                    View GitHub
                  </a>
                </div>
              ))}
            </div>
          ) : null}

          {message.services ? (
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {PROFILE.services.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="group rounded-2xl border border-fuchsia-400/20 bg-gradient-to-br from-white/5 to-fuchsia-500/5 p-3 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-500/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-300">
                        <Icon className="text-sm" />
                      </div>
                      <div>
                        <p className="font-semibold text-white">{service.title}</p>
                        <p className="mt-1 text-xs text-white/60">{service.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : null}

          {message.links?.length ? (
            <div className="mt-3 space-y-2">
              {message.links.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noreferrer" : undefined}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-sm text-white/85 transition hover:border-fuchsia-400/30 hover:text-fuchsia-200"
                  >
                    {Icon ? <Icon className="text-xs text-fuchsia-300" /> : null}
                    <span>{link.label}</span>
                  </a>
                );
              })}
            </div>
          ) : null}

          {message.cta ? (
            <div className="mt-3">
              <Link
                href={message.cta.href}
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-fuchsia-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white transition hover:scale-[1.01] hover:shadow-[0_0_25px_rgba(232,121,249,0.28)]"
              >
                {message.cta.label}
              </Link>
            </div>
          ) : null}
        </div>

        <span className="mt-1 px-1 text-[10px] text-white/35">{message.timestamp}</span>

        {!isUser && message.quickReplies?.length ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {message.quickReplies.map((reply) => (
              <button
                key={reply}
                onClick={() => onQuickReply(reply)}
                className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/8 px-3 py-1.5 text-[11px] font-medium text-fuchsia-200 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-500/15"
              >
                {reply}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}

export default function SilloBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState(() => [
    createMessage({
      role: "assistant",
      text: `Hey! 👋 I’m ${BOT_NAME} — Junior’s portfolio assistant. Ask me about his projects, skills, experience, or how to hire him.`,
      quickReplies: INITIAL_SUGGESTIONS,
    }),
  ]);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 260);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const canSend = useMemo(() => input.trim().length > 0 && !isTyping, [input, isTyping]);

  const handleSend = async (value) => {
    const userText = (value ?? input).trim();
    if (!userText || isTyping) return;

    const userMessage = createMessage({
      role: "user",
      text: userText,
    });

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    const botReply = getBotReply(userText);
    setMessages((prev) => [...prev, botReply]);
    setIsTyping(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open SilloBot"
        className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-2xl transition-all duration-300 sm:bottom-6 sm:right-6 ${
          open ? "pointer-events-none scale-90 opacity-0" : "opacity-100"
        }`}
        style={{
          background: "linear-gradient(135deg, #d946ef 0%, #7c3aed 100%)",
          boxShadow: "0 0 35px rgba(232,121,249,0.35)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
      >
        <FaRobot className="relative z-10 text-lg" />
        <span className="absolute inset-0 rounded-full bg-fuchsia-400/30 animate-ping" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-5 right-5 z-50 flex h-[82vh] w-[calc(100vw-24px)] max-w-[420px] flex-col overflow-hidden rounded-[28px] border border-fuchsia-400/15 bg-[#0a0a0f]/95 shadow-[0_25px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:bottom-6 sm:right-6 sm:h-[700px]"
          >
            <div
              className="flex items-center justify-between border-b border-white/8 px-5 py-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(217,70,239,0.18) 0%, rgba(124,58,237,0.16) 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10">
                  <FaRobot className="text-sm text-fuchsia-300" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-white">{BOT_NAME}</p>
                    <BsStars className="text-[11px] text-fuchsia-300" />
                  </div>
                  <p className="text-[11px] text-white/45">Junior&apos;s portfolio assistant</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden items-center gap-1.5 sm:flex">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-medium text-emerald-400">Online</span>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white/60 transition hover:bg-white/10 hover:text-white"
                  aria-label="Close SilloBot"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    onQuickReply={(value) => handleSend(value)}
                  />
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="mr-2 mt-1 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-fuchsia-400/25 bg-fuchsia-500/10">
                      <FaRobot className="text-[10px] text-fuchsia-300" />
                    </div>

                    <div className="rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 backdrop-blur-md">
                      <TypingIndicator />
                    </div>
                  </motion.div>
                )}

                <div ref={bottomRef} />
              </div>
            </div>

            {messages.length === 1 && !isTyping ? (
              <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-2">
                  {INITIAL_SUGGESTIONS.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleSend(item)}
                      className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/8 px-3 py-1.5 text-[11px] font-medium text-fuchsia-200 transition hover:border-fuchsia-300/40 hover:bg-fuchsia-500/15"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="border-t border-white/8 px-4 py-3">
              <div className="flex items-center gap-3">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Junior..."
                  disabled={isTyping}
                  className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-fuchsia-400/35 focus:bg-fuchsia-500/5"
                />

                <button
                  type="button"
                  onClick={() => handleSend()}
                  disabled={!canSend}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white transition hover:shadow-[0_0_20px_rgba(232,121,249,0.28)] disabled:cursor-not-allowed disabled:opacity-35"
                  aria-label="Send message"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </div>

              <div className="mt-2 flex items-center justify-between px-1 text-[10px] text-white/30">
                <span>Rule-based portfolio assistant</span>
                <span>{messages.length} messages</span>
                
              </div>
              
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}