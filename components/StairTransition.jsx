"use client";

import { usePathname } from "next/navigation";
import Stairs from "./Stairs";

function StairTransition() {
  const pathname = usePathname();
  return (
    <div
      key={pathname}
      className="h-screen w-screen fixed top-0 left-0 pointer-events-none z-40"
    >
      <Stairs />
    </div>
  );
}

export default StairTransition;