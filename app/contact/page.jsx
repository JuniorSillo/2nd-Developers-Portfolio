"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectLabel,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { BsArrowRight } from "react-icons/bs";

const info = [
  {
    icon: <FaPhoneAlt />,
    title: "Phone",
    description: "(+27) 71 799 9930",
    color: "#e879f9",
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    description: "sillojunior8@gmail.com",
    color: "#06b6d4",
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Location",
    description: "Bloemfontein, South Africa",
    color: "#a78bfa",
  },
];

const Contact = () => {
  const [message, setMessage] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    setTimeout(() => {
      setMessage("✓ Message sent! I'll be in touch soon.");
      setIsSubmitting(false);
      setTimeout(() => setMessage(""), 4000);
    }, 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.5, ease: "easeIn" } }}
      className="py-12 xl:py-16"
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-14 text-center xl:text-left"
        >
          <p className="section-label mb-3">Get in touch</p>
          <h2 className="text-4xl xl:text-5xl font-bold text-white">
            Let&apos;s <span className="text-accent text-glow">Work Together</span>
          </h2>
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-10 xl:gap-16">
          {/* FORM */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex-1 order-2 xl:order-none"
          >
            <form
              action="https://formspree.io/f/xnndrwlw"
              method="POST"
              onSubmit={handleSubmit}
              className="glass-card rounded-3xl p-8 xl:p-10 space-y-6 border border-white/5"
            >
              {/* Name row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-widest" htmlFor="firstName">
                    First Name
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    placeholder="Junior"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-accent/50 focus:bg-accent/5 rounded-xl h-12 transition-all duration-300"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/40 uppercase tracking-widest" htmlFor="lastName">
                    Last Name
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    placeholder="Sillo"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-accent/50 focus:bg-accent/5 rounded-xl h-12 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-widest" htmlFor="email">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="hello@example.com"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-accent/50 focus:bg-accent/5 rounded-xl h-12 transition-all duration-300"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-widest" htmlFor="phone">
                  Phone (optional)
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="+27 71 000 0000"
                  className="bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-accent/50 focus:bg-accent/5 rounded-xl h-12 transition-all duration-300"
                />
              </div>

              {/* Service */}
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-widest">Service</label>
                <Select onValueChange={(value) => setSelectedValue(value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-accent/50 rounded-xl h-12">
                    <span className={selectedValue ? "text-white" : "text-white/30"}>
                      {selectedValue
                        ? selectedValue.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
                        : "Select a service"}
                    </span>
                  </SelectTrigger>
                  <SelectContent className="bg-secondary border-white/10">
                    <SelectGroup>
                      <SelectLabel className="text-white/40">Services</SelectLabel>
                      <SelectItem value="web-development">Web Development</SelectItem>
                      <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                      <SelectItem value="mobile-app-development">Mobile App Development</SelectItem>
                      <SelectItem value="seo-optimization">SEO Optimization</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                  <input type="hidden" name="service" value={selectedValue} />
                </Select>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs text-white/40 uppercase tracking-widest" htmlFor="message">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  className="h-[160px] bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-accent/50 focus:bg-accent/5 rounded-xl transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-xl bg-accent hover:bg-accent-hover text-primary font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_0_30px_rgba(232,121,249,0.4)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <>
                    Send Message <BsArrowRight className="text-lg" />
                  </>
                )}
              </button>

              {message && (
                <motion.p
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center text-green-400 text-sm font-medium"
                >
                  {message}
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* CONTACT INFO */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col justify-center gap-8 xl:max-w-[320px] order-1 xl:order-none"
          >
            <div className="space-y-2">
              <p className="text-white/40 text-sm leading-relaxed">
                Have a project in mind or want to explore collaboration? I&apos;m currently available for freelance work and open to new opportunities.
              </p>
            </div>

            <ul className="flex flex-col gap-6">
              {info.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="flex items-center gap-5"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `${item.color}10`,
                      border: `1px solid ${item.color}25`,
                    }}
                  >
                    <div className="text-xl" style={{ color: item.color }}>
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <p className="text-white/30 text-xs uppercase tracking-widest">{item.title}</p>
                    <p className="text-white font-medium text-sm mt-0.5">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            {/* Availability card */}
            <div className="glass-card rounded-2xl p-5 border border-green-500/15">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <div>
                  <p className="text-white font-semibold text-sm">Available for hire</p>
                  <p className="text-white/40 text-xs">Typically responds within 24 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;