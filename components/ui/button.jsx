import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold ring-offset-white transition-all duration-300 ease-in-out", // Smooth transition
  {
    variants: {
      variant: {
        default:
          "bg-accent text-primary hover:bg-accent-hover hover:shadow-lg active:scale-95 hover:transform hover:translate-y-[-2px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", // Added hover shadow, active scale, and focus ring
        primary:
          "bg-primary text-white hover:bg-primary-dark hover:shadow-md active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        outline:
          "border border-accent bg-transparent hover:bg-accent hover:text-primary hover:shadow-sm active:scale-95 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
      },
      size: {
        default: "h-[44px] px-6 flex items-center", // Standard size
        md: "h-[48px] px-6 flex items-center",
        lg: "h-[56px] px-8 text-sm uppercase tracking-[2px] flex items-center",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
