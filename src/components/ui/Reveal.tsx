"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

export type RevealVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade"
  | "scale"
  | "blur-up";

const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  aside: motion.aside,
  header: motion.header,
  footer: motion.footer,
  span: motion.span,
  p: motion.p,
  ul: motion.ul,
  ol: motion.ol,
  li: motion.li,
} as const;

export type RevealTag = keyof typeof MOTION_TAGS;

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  distance?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  as?: RevealTag;
}

const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Reveal({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  variant = "fade-up",
  distance = 20,
  once = true,
  amount = 0.15,
  as: Component = "div",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const FallbackTag = Component as keyof HTMLElementTagNameMap;
    return <FallbackTag className={className}>{children}</FallbackTag>;
  }

  const getInitialAndTarget = () => {
    switch (variant) {
      case "fade-up":
        return {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
        };
      case "fade-down":
        return {
          initial: { opacity: 0, y: -distance },
          animate: { opacity: 1, y: 0 },
        };
      case "fade-left":
        return {
          initial: { opacity: 0, x: distance },
          animate: { opacity: 1, x: 0 },
        };
      case "fade-right":
        return {
          initial: { opacity: 0, x: -distance },
          animate: { opacity: 1, x: 0 },
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
        };
      case "blur-up":
        return {
          initial: { opacity: 0, y: distance, filter: "blur(6px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
        };
      case "fade":
      default:
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        };
    }
  };

  const { initial, animate } = getInitialAndTarget();
  const MotionComponent = MOTION_TAGS[Component] ?? motion.div;

  return (
    <MotionComponent
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: LUXURY_EASE,
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number | "some" | "all";
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (custom: { staggerDelay: number; delayChildren: number }) => ({
    opacity: 1,
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.delayChildren,
    },
  }),
};

export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  delayChildren = 0.1,
  once = true,
  amount = 0.15,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={containerVariants}
      custom={{ staggerDelay, delayChildren }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  distance?: number;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: LUXURY_EASE,
    },
  },
};

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
