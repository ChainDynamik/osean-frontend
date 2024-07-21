"use client";

import clsx from "clsx";
import { forwardRef } from "react";
import { cn } from "../../util";

const classes = {
  base: "inline-flex font-medium items-center justify-center focus:outline-none transition duration-200 active:scale-90",
  size: {
    sm: "px-2.5 py-1 text-xs",
    DEFAULT: "px-4 py-2 text-sm",
    lg: "px-5 py-2 text-base",
    xl: "px-8 py-2.5 text-base",
  },
  rounded: {
    none: "rounded-none",
    sm: "rounded-sm",
    DEFAULT: "rounded-md",
    lg: "rounded-lg",
    pill: "rounded-full",
  },
  variant: {
    solid: {
      base: "border border-transparent",
      color: {
        DEFAULT:
          "bg-gray-900 text-white hover:brightness-110 hover:shadow-lg hover:shadow-black/30 hov:bg-gray-1000 focus:ring-gray-900/30 text-gray-0",
      },
    },
    flat: {
      base: "border-transparent",
      color: {
        DEFAULT:
          "bg-gray-200 hover:brightness-110 hover:shadow-lg hover:shadow-black/30 hov:bg-gray-300/70 focus:ring-gray-900/30 text-gray-1000",
      },
    },
    outline: {
      base: "bg-transparent border",
      color: {
        DEFAULT:
          "border-gray-300 hover:brightness-110 hover:shadow-lg hover:shadow-black/30 hov:border-gray-1000 focus:enabled:border-gray-1000 focus:ring-gray-900/30",
      },
    },
    text: {
      base: "",
      color: {
        DEFAULT: "hover:text-gray-1000 focus:ring-gray-900/30",
      },
    },
  },
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Set the loading status of button */
  isLoading?: boolean;
  /** Set the original html type of button */
  type?: "button" | "submit" | "reset";
  /** The variants of the component are: */
  variant?: keyof typeof classes.variant;
  /** The size of the component. `"sm"` is equivalent to the dense button styling. */
  size?: keyof typeof classes.size;
  /** The rounded variants are: */
  rounded?: keyof typeof classes.rounded;
  /** Change button color */
  color?: keyof (typeof classes.variant)["solid"]["color"];
  /** Add custom classes for extra style */
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      isLoading,
      type = "button",
      variant = "solid",
      size = "DEFAULT",
      rounded = "DEFAULT",
      color = "DEFAULT",
      disabled,
      ...buttonProps
    },
    ref
  ) => {
    const variantStyle = classes.variant[variant];
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "w-full !cursor-pointer text-center !bg-black text-white rounded-lg px-4 flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out py-[14px] text-base !font-bold tracking-widest",
          className
        )}
        {...buttonProps}
      >
        {isLoading ? (
          <>
            {/* trick to have exact button width when button is loading */}
            <span className="invisible opacity-0">{children}</span>
            {/* <span className="absolute inset-0 flex h-full w-full items-center justify-center">
              <Loader
                tag="span"
                color="current"
                size={size}
                animation="scaleUp"
              />
            </span> */}
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
