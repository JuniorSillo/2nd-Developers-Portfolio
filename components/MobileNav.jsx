"use client";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { useState } from "react";

const links = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "resume", path: "/resume" },
  { name: "work", path: "/work" },
  { name: "contact", path: "/contact" },
];

const MobileNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleNav = (path) => {
    setOpen(false);
    router.push(path);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex justify-center items-center w-10 h-10 rounded-full border border-white/10 bg-white/5 hover:bg-accent/10 hover:border-accent/30 transition-all">
        <CiMenuFries className="text-[22px] text-accent" />
      </SheetTrigger>

      <SheetContent className="flex flex-col bg-primary/95 backdrop-blur-xl border-l border-white/5">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-accent/5 blur-[80px] pointer-events-none" />

        {/* Logo */}
        <div className="mt-16 mb-12 text-center">
          <button onClick={() => handleNav("/")}>
            <h1 className="text-4xl font-bold">
              Sillo<span className="text-accent text-glow">.</span>
            </h1>
          </button>
          <p className="text-white/40 text-xs mt-2 tracking-widest uppercase">Full-Stack Developer</p>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col justify-center items-center gap-3 relative">
          {links.map((link, index) => {
            const isActive = link.path === pathname;
            return (
              <button
                key={index}
                onClick={() => handleNav(link.path)}
                className={`w-48 text-center py-3 rounded-full text-lg capitalize font-medium transition-all duration-300
                  ${isActive
                    ? "bg-accent/15 border border-accent/30 text-accent"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* Hire me CTA */}
        <div className="mt-auto mb-8 flex justify-center">
          <button
            onClick={() => handleNav("/contact")}
            className="px-10 py-3 rounded-full bg-accent text-primary font-bold text-sm tracking-wide hover:shadow-[0_0_20px_rgba(232,121,249,0.5)] transition-all"
          >
            Hire Me
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;