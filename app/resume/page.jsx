"use client";

import { FaHtml5, FaCss3, FaJs, FaReact, FaFigma, FaNodeJs, FaDatabase, FaShopify } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiTypescript, SiMongodb, SiPostgresql, SiMysql, SiPrisma, SiDotnet, SiFlutter, SiFirebase } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { FaBriefcase, FaGraduationCap, FaTools, FaUser } from "react-icons/fa";
import { useScrollAnimation, fadeUp, fadeLeft, staggerChildren } from "@/lib/useScrollAnimation";

const about = {
  title: "About Me",
  description: `I'm a passionate Full-Stack Developer from South Africa with 5+ years of hands-on experience building modern web applications. I thrive at the intersection of clean code and compelling design — crafting digital products that are both technically robust and user-friendly.`,
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
  description: "From industry leadership programmes to freelance builds — real-world experience across the full stack.",
  items: [
    { company: "Bitcube", position: "Software Developer Leadership Programme", period: "Jan 2026 – May 2026", details: "Selected for Bitcube's competitive Leadership Programme. Working across Mobile Development (React Native & Flutter), Shopify e-commerce, and Full-Stack web solutions in a professional team environment.", badge: "Current" },
    { company: "Freelance", position: "Full-Stack Developer", period: "2022 – Present", details: "Built multiple client-facing applications including an AI Resume Builder, Food Delivery platform, and Spotify Clone using React, Next.js, and Node.js." },
    { company: "Personal Projects", position: "Frontend Developer", period: "2021 – 2022", details: "Built a portfolio site, hotel booking UI, and Spotify-inspired player using React and Tailwind CSS." },
    { company: "Self-Learning", position: "Full-Stack Trainee", period: "2020 – 2021", details: "Completed 500+ hours of structured training across JavaScript, React, Node.js, and database management." },
  ],
};

const education = {
  title: "Education",
  description: "Formal IT training combined with intense self-driven learning across the full technology stack.",
  items: [
    { institution: "ATTI Bloemfontein", degree: "IT — Systems Development", period: "2024" },
    { institution: "Scrimba", degree: "UI/UX Design Essentials", period: "2022 – 2023" },
    { institution: "Coursera", degree: "SEO Optimization Techniques", period: "2023 – 2024" },
    { institution: "Udemy & YouTube", degree: "Mobile App Dev — React Native, Flutter & iOS", period: "2021 – 2023" },
    { institution: "YouTube", degree: "Web Development Fundamentals", period: "2020 – 2021" },
  ],
};

// Skills with proficiency percentages
const skillCategories = [
  {
    label: "Frontend",
    color: "#e879f9",
    skills: [
      { icon: <FaReact />, name: "React.js", level: 92 },
      { icon: <SiNextdotjs />, name: "Next.js", level: 88 },
      { icon: <SiTypescript />, name: "TypeScript", level: 80 },
      { icon: <SiTailwindcss />, name: "TailwindCSS", level: 95 },
      { icon: <FaHtml5 />, name: "HTML5", level: 98 },
      { icon: <FaCss3 />, name: "CSS3", level: 95 },
      { icon: <FaJs />, name: "JavaScript", level: 90 },
      { icon: <FaFigma />, name: "Figma", level: 78 },
    ],
  },
  {
    label: "Backend & APIs",
    color: "#06b6d4",
    skills: [
      { icon: <FaNodeJs />, name: "Node.js", level: 82 },
      { icon: <SiDotnet />, name: "C# / .NET", level: 70 },
      { icon: <SiPrisma />, name: "Prisma ORM", level: 75 },
      { icon: <FaShopify />, name: "Shopify", level: 72 },
    ],
  },
  {
    label: "Databases",
    color: "#a78bfa",
    skills: [
      { icon: <SiMongodb />, name: "MongoDB", level: 80 },
      { icon: <SiPostgresql />, name: "PostgreSQL", level: 72 },
      { icon: <SiMysql />, name: "MySQL", level: 75 },
      { icon: <SiFirebase />, name: "Firebase", level: 78 },
      { icon: <FaDatabase />, name: "SQL", level: 76 },
    ],
  },
  {
    label: "Mobile",
    color: "#34d399",
    skills: [
      { icon: <FaReact />, name: "React Native", level: 78 },
      { icon: <SiFlutter />, name: "Flutter", level: 68 },
    ],
  },
];

// Animated skill bar
function SkillBar({ skill, color, inView }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm" style={{ color }}>{skill.icon}</span>
          <span className="text-xs text-white/70 font-medium">{skill.name}</span>
        </div>
        <span className="text-xs font-bold tabular-nums" style={{ color }}>{skill.level}%</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}80, ${color})` }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.level}%` : 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        />
      </div>
    </div>
  );
}

const tabConfig = [
  { value: "experience", label: "Experience", icon: FaBriefcase },
  { value: "education", label: "Education", icon: FaGraduationCap },
  { value: "skills", label: "Skills", icon: FaTools },
  { value: "about", label: "About Me", icon: FaUser },
];

const Resume = () => {
  const { ref: headerRef, inView: headerIn } = useScrollAnimation();
  const { ref: skillsRef, inView: skillsIn } = useScrollAnimation({ threshold: 0.1 });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.5 } }}
      className="min-h-[80vh] flex items-center justify-center py-16 xl:py-0"
    >
      <div className="container mx-auto">
        <motion.div ref={headerRef} variants={fadeUp} initial="hidden" animate={headerIn ? "visible" : "hidden"} className="mb-12 text-center xl:text-left">
          <p className="section-label mb-3">Background</p>
          <h2 className="text-4xl xl:text-5xl font-bold text-white">
            My <span className="text-accent text-glow">Resume</span>
          </h2>
        </motion.div>

        <Tabs defaultValue="experience" className="flex flex-col xl:flex-row gap-[50px]">
          <TabsList className="flex flex-col w-full max-w-[260px] mx-auto xl:mx-0 gap-2">
            {tabConfig.map(({ value, label, icon: Icon }) => (
              <TabsTrigger key={value} value={value}
                className="flex items-center gap-3 p-4 rounded-xl text-white/50 text-sm font-medium tracking-wide data-[state=active]:bg-accent/10 data-[state=active]:border data-[state=active]:border-accent/30 data-[state=active]:text-accent hover:text-white transition-all w-full justify-start">
                <Icon className="text-lg flex-shrink-0" /> {label}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="min-h-[60vh] w-full">

            {/* EXPERIENCE */}
            <TabsContent value="experience" className="w-full">
              <motion.div variants={staggerChildren} initial="hidden" animate="visible" className="flex flex-col gap-8 text-center xl:text-left">
                <motion.div variants={fadeUp}>
                  <h3 className="text-3xl font-bold text-white">{experience.title}</h3>
                  <p className="max-w-[600px] text-white/40 mt-2 text-sm mx-auto xl:mx-0">{experience.description}</p>
                </motion.div>
                <ScrollArea className="h-[420px] pr-4">
                  <ul className="flex flex-col gap-5">
                    {experience.items.map((item, index) => (
                      <motion.li key={index} variants={fadeUp} className={`glass-card-hover rounded-2xl p-6 flex flex-col gap-3 ${item.badge ? "border border-accent/25" : ""}`}>
                        <div className="flex items-start justify-between flex-wrap gap-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-lg font-bold text-white">{item.position}</h4>
                              {item.badge && <span className="px-2 py-0.5 text-[10px] rounded-full font-bold uppercase tracking-widest bg-green-500/15 border border-green-500/30 text-green-400">{item.badge}</span>}
                            </div>
                            <p className="text-accent text-sm font-medium">{item.company}</p>
                          </div>
                          <span className="tag-pill text-xs">{item.period}</span>
                        </div>
                        <p className="text-white/50 text-sm leading-relaxed">{item.details}</p>
                      </motion.li>
                    ))}
                  </ul>
                </ScrollArea>
              </motion.div>
            </TabsContent>

            {/* EDUCATION */}
            <TabsContent value="education" className="w-full">
              <motion.div variants={staggerChildren} initial="hidden" animate="visible" className="flex flex-col gap-8 text-center xl:text-left">
                <motion.div variants={fadeUp}>
                  <h3 className="text-3xl font-bold text-white">{education.title}</h3>
                  <p className="max-w-[600px] text-white/40 mt-2 text-sm mx-auto xl:mx-0">{education.description}</p>
                </motion.div>
                <ScrollArea className="h-[420px] pr-4">
                  <ul className="flex flex-col gap-4">
                    {education.items.map((item, index) => (
                      <motion.li key={index} variants={fadeUp} className="glass-card-hover rounded-2xl p-6 flex flex-col gap-2">
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <span className="tag-pill-neon text-xs">{item.period}</span>
                        </div>
                        <h4 className="text-base font-bold text-white">{item.degree}</h4>
                        <p className="text-white/40 text-sm">{item.institution}</p>
                      </motion.li>
                    ))}
                  </ul>
                </ScrollArea>
              </motion.div>
            </TabsContent>

            {/* SKILLS — with proficiency bars */}
            <TabsContent value="skills" className="w-full h-full">
              <div ref={skillsRef} className="flex flex-col gap-8">
                <div className="text-center xl:text-left">
                  <h3 className="text-3xl font-bold text-white">Skills</h3>
                  <p className="max-w-[600px] text-white/40 mt-2 text-sm mx-auto xl:mx-0">
                    Proficiency levels based on project experience and daily usage.
                  </p>
                </div>
                <ScrollArea className="h-[420px] pr-4">
                  <div className="space-y-8">
                    {skillCategories.map((cat) => (
                      <div key={cat.label} className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: cat.color }}>{cat.label}</span>
                          <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${cat.color}40, transparent)` }} />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {cat.skills.map((skill) => (
                            <SkillBar key={skill.name} skill={skill} color={cat.color} inView={skillsIn} />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </TabsContent>

            {/* ABOUT */}
            <TabsContent value="about" className="w-full text-center xl:text-left">
              <motion.div variants={staggerChildren} initial="hidden" animate="visible" className="flex flex-col gap-8">
                <motion.div variants={fadeUp}>
                  <h3 className="text-3xl font-bold text-white">{about.title}</h3>
                  <p className="max-w-[640px] text-white/50 mt-3 text-sm leading-relaxed mx-auto xl:mx-0">{about.description}</p>
                </motion.div>
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 max-w-[680px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => (
                    <motion.div key={index} variants={fadeUp} className="glass-card rounded-xl px-5 py-3 flex items-center gap-4">
                      <span className="text-white/30 text-xs uppercase tracking-widest whitespace-nowrap">{item.fieldName}</span>
                      <span className="text-white text-sm font-medium truncate">{item.fieldValue}</span>
                    </motion.div>
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