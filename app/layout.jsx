import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import PageTransition from "@/components/PageTransition";
import StairTransition from "@/components/StairTransition";
import SilloBotWrapper from "@/components/SilloBotWrapper";
import ClientOnlyUI from "@/components/ClientOnlyUI";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-jetbrains-mono",
});

export const metadata = {
  title: "MJ Sillo | Full-Stack Developer",
  description:
    "Moeketsi Junior Sillo — Full-Stack Developer specialising in React, Next.js, Node.js and modern web experiences.",
  keywords: ["Full-Stack Developer", "React", "Next.js", "South Africa", "Web Developer"],
  openGraph: {
    title: "MJ Sillo | Full-Stack Developer",
    description: "Building elegant digital experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.variable} grid-bg`}>
        {/* Ambient glow orbs */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-purple-900/20 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-cyan-900/15 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-fuchsia-900/10 blur-[80px]" />
        </div>

        {/* Client-only UI */}
        <ClientOnlyUI />

        <div className="relative z-10">
          <Header />
          <StairTransition />
          <PageTransition>{children}</PageTransition>
        </div>

        <SilloBotWrapper />
      </body>
    </html>
  );
}