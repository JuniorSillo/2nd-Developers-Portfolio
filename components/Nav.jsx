"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "resume", path: "/resume" },
  { name: "work", path: "/work" },
  { name: "contact", path: "/contact" },
];

const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className="flex gap-1">
      {links.map((link, index) => {
        const isActive = link.path === pathname;
        return (
          <Link
            key={index}
            href={link.path}
            className={`relative px-4 py-2 capitalize text-sm font-medium tracking-wide transition-all duration-300 rounded-full
              ${isActive
                ? "text-accent"
                : "text-white/60 hover:text-white"
              }`}
          >
            {isActive && (
              <span className="absolute inset-0 rounded-full bg-accent/10 border border-accent/20" />
            )}
            <span className="relative">{link.name}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;