"use client";

import clsx from "clsx";
import { forwardRef } from "react";
import { cn } from "../../util";
import { Spinner } from "@chakra-ui/react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Set the loading status of button */
  isLoading?: boolean;
  /** Set the original html type of button */
  type?: "button" | "submit" | "reset";
  variant?: "outline" | "secondary" | "primary";
  /** Add custom classes for extra style */
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, isLoading, type = "button", variant = "primary", disabled, ...buttonProps }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "w-full !cursor-pointer text-center bg-primary text-white rounded-lg px-4 flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out py-[14px] text-base !font-bold tracking-widest",
          {
            "bg-transparent border hover:!text-white hover:!bg-primary text-primary border-primary":
              variant === "outline",
            "text-white bg-black": variant === "secondary",
          },
          className
        )}
        {...buttonProps}
      >
        {isLoading ? (
          <>
            <Spinner />
            <span className="ml-2">Loading...</span>
          </>
        ) : (
          <>{children}</>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
