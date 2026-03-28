"use client";

import dynamic from "next/dynamic";

const SilloBot = dynamic(() => import("@/components/SilloBot"), { ssr: false });

function SilloBotWrapper() {
  return <SilloBot />;
}

export default SilloBotWrapper;