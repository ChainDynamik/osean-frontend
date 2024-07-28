import { AnimatePresence, motion } from "framer-motion";
import React, { MouseEvent } from "react";
import { cn } from "../../util";

type OverlayProps = {
  isOpen: boolean;
  className?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};

const Overlay = ({ isOpen, className, onClick }: OverlayProps) => {
  return (
    <>
      {isOpen && (
        <div
          onClick={onClick}
          className={cn(
            "overlay fixed z-[9999] bg-black/60 w-screen h-dvh top-0 left-0",
            className
          )}
        ></div>
      )}
    </>
  );
};

export default Overlay;
