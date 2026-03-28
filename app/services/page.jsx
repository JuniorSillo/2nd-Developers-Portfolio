"use client";
import { BsArrowUpRight } from "react-icons/bs";
import { FaLaptopCode, FaPalette, FaMobileAlt, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

const services = [
  {
    num: "01",
    title: "Web Development",
    description:
      "End-to-end web applications built with Next.js, React, and Node.js — fast, accessible, and scalable. From marketing sites to complex dashboards.",
    href: "/contact",
    icon: FaLaptopCode,
    color: "#e879f9",
    tags: ["Next.js", "React", "Node.js"],
  },
  {
    num: "02",
    title: "UI/UX Design",
    description:
      "User-centred design that balances aesthetics with function. Wireframes, prototypes, and polished interfaces using Figma and modern design principles.",
    href: "/contact",
    icon: FaPalette,
    color: "#06b6d4",
    tags: ["Figma", "Prototyping", "Design Systems"],
  },
  {
    num: "03",
    title: "Mobile App Development",
    description:
      "Cross-platform mobile apps built with React Native and Flutter — smooth, native-quality experiences for iOS and Android.",
    href: "/contact",
    icon: FaMobileAlt,
    color: "#a78bfa",
    tags: ["React Native", "Flutter", "iOS"],
  },
  {
    num: "04",
    title: "SEO Optimization",
    description:
      "Strategic SEO audits, on-page optimisation, and performance improvements to boost your rankings and drive sustainable organic traffic.",
    href: "/contact",
    icon: FaSearch,
    color: "#34d399",
    tags: ["On-page SEO", "Performance", "Analytics"],
  },
];

const Services = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center py-16 xl:py-0">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-14 text-center xl:text-left"
        >
          <p className="section-label mb-3">What I offer</p>
          <h2 className="text-4xl xl:text-5xl font-bold text-white">
            My <span className="text-accent text-glow">Services</span>
          </h2>
        </motion.div>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                className="glass-card-hover relative rounded-2xl p-8 flex flex-col gap-5 group cursor-default"
              >
                {/* Top row */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${service.color}15`, border: `1px solid ${service.color}30` }}
                  >
                    <Icon className="text-2xl" style={{ color: service.color }} />
                  </div>
                  <span
                    className="text-5xl font-extrabold select-none"
                    style={{
                      WebkitTextStroke: `1px ${service.color}25`,
                      color: "transparent",
                    }}
                  >
                    {service.num}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-white/50 text-sm leading-relaxed flex-1">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full font-medium"
                      style={{
                        background: `${service.color}10`,
                        border: `1px solid ${service.color}20`,
                        color: service.color,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={service.href}
                  className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 w-fit"
                  style={{ color: service.color }}
                >
                  Get in Touch
                  <BsArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>

                {/* Bottom border accent */}
                <div
                  className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${service.color}50, transparent)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;