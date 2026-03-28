"use client";

import {
  FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaNodeJs, FaDatabase, FaShopify,
} from "react-icons/fa";
import {
  SiTailwindcss, SiNextdotjs, SiTypescript, SiMongodb, SiPostgresql,
  SiMysql, SiPrisma, SiDotnet, SiFlutter, SiFirebase,
} from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaTools, FaUser } from "react-icons/fa";

const about = {
  title: "About Me",
  description: `I'm a passionate Full-Stack Developer from South Africa with 5+ years of hands-on experience building modern web applications. I thrive at the intersection of clean code and compelling design — crafting digital products that are both technically robust and user-friendly. I'm always learning, always building, and always pushing the boundary of what's possible on the web.`,
  info: [
    { fieldName: "Name", fieldValue: "Moeketsi Junior Sillo" },
    { fieldName: "Email", fieldValue: "sillojunior8@gmail.com" },
    { fieldName: "Phone", fieldValue: "(+27) 71 799 9930" },
    { fieldName: "Location", fieldValue: "Bloemfontein, South Africa" },
    { fieldName: "Nationality", fieldValue: "South African" },
    { fieldName: "Freelance", fieldValue: "Available ✓" },
    { fieldName: "Languages", fieldValue: "English, Sotho, Xhosa, Zulu" },
    { fieldName: "Experience", fieldValue: "5+ Years" },
  ],
};

const experience = {
  title: "Experience",
  description: "From industry leadership programmes to freelance builds — I bring real-world experience across the full stack.",
  items: [
    {
      company: "Bitcube",
      position: "Software Developer Leadership Programme",
      period: "Jan 2026 – May 2026",
      details: "Selected for Bitcube's competitive Software Developer Leadership Programme. Working across Mobile Development (Flutter), Shopify e-commerce development, and Full-Stack web solutions in a professional team environment.",
      badge: "Current",
    },
    {
      company: "Freelance",
      position: "Full-Stack Developer",
      period: "2022 – Present",
      details: "Designed and built multiple client-facing web applications including an AI Resume Builder, a Food Delivery platform, and a Spotify Clone using React, Next.js, and Node.js.",
    },
    {
      company: "Personal Projects",
      position: "Frontend Developer",
      period: "2021 – 2022",
      details: "Built a responsive portfolio website, hotel booking UI, and Spotify-inspired music player using React and Tailwind CSS to master core frontend skills.",
    },
    {
      company: "Self-Learning",
      position: "Full-Stack Trainee",
      period: "2020 – 2021",
      details: "Completed 500+ hours of structured online training across JavaScript, React, Node.js, and database management.",
    },
  ],
};

const education = {
  title: "Education",
  description: "A blend of formal qualifications and relentless self-study across the full technology stack.",
  items: [
    {
      institution: "ATTI Bloemfontein",
      degree: "IT — Systems Development",
      period: "2024",
    },
    {
      institution: "Scrimba",
      degree: "UI/UX Design Essentials",
      period: "2022 – 2023",
    },
    {
      institution: "Coursera",
      degree: "SEO Optimization Techniques",
      period: "2023 – 2024",
    },
    {
      institution: "Udemy & YouTube",
      degree: "Mobile App Dev — React Native, Flutter & iOS",
      period: "2021 – 2023",
    },
    {
      institution: "YouTube",
      degree: "Web Development Fundamentals",
      period: "2020 – 2021",
    },
  ],
};

const skills = {
  title: "Skills",
  description: "Technologies I use to bring ideas to life — from pixel-perfect frontends to scalable back-end APIs, databases, and mobile apps.",
  categories: [
    {
      label: "Frontend",
      color: "#e879f9",
      items: [
        { icon: <FaHtml5 />, name: "HTML5", color: "#e34f26" },
        { icon: <FaCss3 />, name: "CSS3", color: "#1572b6" },
        { icon: <FaJs />, name: "JavaScript", color: "#f7df1e" },
        { icon: <SiTypescript />, name: "TypeScript", color: "#3178c6" },
        { icon: <FaReact />, name: "React.js", color: "#61dafb" },
        { icon: <SiNextdotjs />, name: "Next.js", color: "#ffffff" },
        { icon: <SiTailwindcss />, name: "TailwindCSS", color: "#06b6d4" },
        { icon: <FaFigma />, name: "Figma", color: "#f24e1e" },
      ],
    },
    {
      label: "Backend & APIs",
      color: "#06b6d4",
      items: [
        { icon: <FaNodeJs />, name: "Node.js", color: "#339933" },
        { icon: <SiDotnet />, name: "C# / .NET", color: "#512bd4" },
        { icon: <SiPrisma />, name: "Prisma ORM", color: "#ffffff" },
        { icon: <FaShopify />, name: "Shopify", color: "#96bf48" },
      ],
    },
    {
      label: "Databases",
      color: "#a78bfa",
      items: [
        { icon: <SiMongodb />, name: "MongoDB", color: "#47a248" },
        { icon: <SiPostgresql />, name: "PostgreSQL", color: "#4169e1" },
        { icon: <SiMysql />, name: "MySQL", color: "#4479a1" },
        { icon: <SiFirebase />, name: "Firebase", color: "#ffca28" },
        { icon: <FaDatabase />, name: "SQL", color: "#f59e0b" },
      ],
    },
    {
      label: "Mobile",
      color: "#34d399",
      items: [
        { icon: <FaReact />, name: "React Native", color: "#61dafb" },
        { icon: <SiFlutter />, name: "Flutter", color: "#54c5f8" },
      ],
    },
  ],
};

const tabConfig = [
  { value: "experience", label: "Experience", icon: FaBriefcase },
  { value: "education", label: "Education", icon: FaGraduationCap },
  { value: "skills", label: "Skills", icon: FaTools },
  { value: "about", label: "About Me", icon: FaUser },
];

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.5, ease: "easeIn" } }}
      className="min-h-[80vh] flex items-center justify-center py-16 xl:py-0"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12 text-center xl:text-left"
        >
          <p className="section-label mb-3">Background</p>
          <h2 className="text-4xl xl:text-5xl font-bold text-white">
            My <span className="text-accent text-glow">Resume</span>
          </h2>
        </motion.div>

        <Tabs defaultValue="experience" className="flex flex-col xl:flex-row gap-[50px]">
          {/* Tab triggers */}
          <TabsList className="flex flex-col w-full max-w-[260px] mx-auto xl:mx-0 gap-2">
            {tabConfig.map(({ value, label, icon: Icon }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="flex items-center gap-3 p-4 rounded-xl text-white/50 text-sm font-medium tracking-wide data-[state=active]:bg-accent/10 data-[state=active]:border data-[state=active]:border-accent/30 data-[state=active]:text-accent hover:text-white transition-all duration-200 w-full justify-start"
              >
                <Icon className="text-lg flex-shrink-0" />
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tab content */}
          <div className="min-h-[60vh] w-full">
            {/* EXPERIENCE */}
            <TabsContent value="experience" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 text-center xl:text-left"
              >
                <div>
                  <h3 className="text-3xl font-bold text-white">{experience.title}</h3>
                  <p className="max-w-[600px] text-white/40 mt-2 text-sm mx-auto xl:mx-0">
                    {experience.description}
                  </p>
                </div>
                <ScrollArea className="h-[420px] pr-4">
                  <ul className="flex flex-col gap-5">
                    {experience.items.map((item, index) => (
                      <li key={index} className={`glass-card-hover rounded-2xl p-6 flex flex-col gap-3 ${item.badge ? "border border-accent/25" : ""}`}>
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-lg font-bold text-white">{item.position}</h4>
                              {item.badge && (
                                <span className="px-2 py-0.5 text-[10px] rounded-full font-bold uppercase tracking-widest bg-green-500/15 border border-green-500/30 text-green-400">
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="text-accent text-sm font-medium">{item.company}</p>
                          </div>
                          <span className="tag-pill text-xs">{item.period}</span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed">{item.details}</p>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </motion.div>
            </TabsContent>

            {/* EDUCATION */}
            <TabsContent value="education" className="w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8 text-center xl:text-left"
              >
                <div>
                  <h3 className="text-3xl font-bold text-white">{education.title}</h3>
                  <p className="max-w-[600px] text-white/40 mt-2 text-sm mx-auto xl:mx-0">
                    {education.description}
                  </p>
                </div>
                <ScrollArea className="h-[420px] pr-4">
                  <ul className="flex flex-col gap-4">
                    {education.items.map((item, index) => (
                      <li key={index} className="glass-card-hover rounded-2xl p-6 flex flex-col gap-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="tag-pill-neon text-xs">{item.period}</span>
                        </div>
                        <h4 className="text-base font-bold text-white">{item.degree}</h4>
                        <p className="text-white/40 text-sm">{item.institution}</p>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </motion.div>
            </TabsContent>

            {/* SKILLS */}
            <TabsContent value="skills" className="w-full h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8"
              >
                <div className="text-center xl:text-left">
                  <h3 className="text-3xl font-bold text-white">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/40 mt-2 text-sm mx-auto xl:mx-0">
                    {skills.description}
                  </p>
                </div>
                <ScrollArea className="h-[420px] pr-4">
                  <div className="flex flex-col gap-8">
                    {skills.categories.map((category, catIndex) => (
                      <div key={catIndex} className="flex flex-col gap-4">
                        {/* Category label */}
                        <div className="flex items-center gap-3">
                          <span
                            className="text-xs font-bold uppercase tracking-widest"
                            style={{ color: category.color }}
                          >
                            {category.label}
                          </span>
                          <div
                            className="flex-1 h-px"
                            style={{ background: `linear-gradient(90deg, ${category.color}40, transparent)` }}
                          />
                        </div>
                        {/* Skill icons */}
                        <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                          {category.items.map((skill, index) => (
                            <li key={index}>
                              <TooltipProvider delayDuration={50}>
                                <Tooltip>
                                  <TooltipTrigger className="w-full h-[100px] glass-card-hover rounded-2xl flex flex-col justify-center items-center gap-2 group cursor-default">
                                    <div
                                      className="text-3xl transition-all duration-300 group-hover:scale-110"
                                      style={{ color: skill.color }}
                                    >
                                      {skill.icon}
                                    </div>
                                    <span className="text-[10px] text-white/30 group-hover:text-white/60 transition-colors text-center px-1">
                                      {skill.name}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p className="font-medium">{skill.name}</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </motion.div>
            </TabsContent>

            {/* ABOUT */}
            <TabsContent value="about" className="w-full text-center xl:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-8"
              >
                <div>
                  <h3 className="text-3xl font-bold text-white">{about.title}</h3>
                  <p className="max-w-[640px] text-white/50 mt-3 text-sm leading-relaxed mx-auto xl:mx-0">
                    {about.description}
                  </p>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 max-w-[680px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => (
                    <div
                      key={index}
                      className="glass-card rounded-xl px-5 py-3 flex items-center gap-4"
                    >
                      <span className="text-white/30 text-xs uppercase tracking-widest whitespace-nowrap">
                        {item.fieldName}
                      </span>
                      <span className="text-white text-sm font-medium truncate">
                        {item.fieldValue}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;