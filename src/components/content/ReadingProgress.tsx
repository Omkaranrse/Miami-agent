"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export function ReadingProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-[#321477] via-[#5B2EC6] to-[#7C52EB]"
    />
  );
}

