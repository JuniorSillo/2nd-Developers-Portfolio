import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "peer h-12 w-full border-0 border-b-2 border-gray-300 bg-transparent text-white placeholder-transparent focus:outline-none focus:border-pink-500",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
