"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import Nav from "./Nav";
import MobileNav from "./MobileNav";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="py-5 xl:py-6 text-white sticky top-0 z-50"
    >
      {/* Glass backdrop */}
      <div className="absolute inset-0 bg-primary/60 backdrop-blur-xl border-b border-white/5" />

      <div className="container relative flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="group">
          <h1 className="text-3xl xl:text-4xl font-bold tracking-tight">
            <span className="text-white group-hover:text-white/80 transition-colors">Sillo</span>
            <span className="text-accent text-glow">.</span>
          </h1>
        </Link>

        {/* Desktop nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button className="relative overflow-hidden bg-accent hover:bg-accent-hover text-primary font-bold px-6 py-2 rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(232,121,249,0.5)]">
              Hire me
            </Button>
          </Link>
        </div>

        {/* Mobile nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;