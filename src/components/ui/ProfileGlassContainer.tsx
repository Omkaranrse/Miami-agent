"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface ProfileGlassContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Glassmorphic container inspired by Framer's Profile Container component:
 * double-lit frosted border, soft exterior highlight/shadow pair,
 * vertical glass refraction highlights, and subtle pointer sheen.
 */
export function ProfileGlassContainer({
  children,
  className = "",
}: ProfileGlassContainerProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [spot, setSpot] = useState<{ x: number; y: number; active: boolean }>({
    x: 50,
    y: 50,
    active: false,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || !rect.width || !rect.height) return;
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
    setSpot({ x, y, active: true });
  };

  return (
    <motion.div
      ref={containerRef}
      initial={false}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setSpot((prev) => ({ ...prev, active: false }))}
      className={`relative overflow-hidden rounded-[20px] ${className}`}
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.68) 0%, rgba(247, 243, 255, 0.58) 50%, rgba(238, 230, 255, 0.56) 100%)",
        border: "1.5px solid rgba(255, 255, 255, 0.78)",
        backdropFilter: "blur(18px) saturate(150%)",
        WebkitBackdropFilter: "blur(18px) saturate(150%)",
        boxShadow:
          "0 18px 42px -12px rgba(24, 14, 58, 0.22), 0 1px 0 0 rgba(255, 255, 255, 0.75) inset, 0 -1px 0 0 rgba(124, 92, 224, 0.08) inset",
      }}
    >
      {/* Top & diagonal glassmorphic rim highlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(155deg, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0.12) 42%, rgba(255,255,255,0) 68%, rgba(154,122,255,0.1) 100%)",
        }}
      />

      {/* Interactive pointer glass specular sheen */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: spot.active ? 1 : 0,
          background: `radial-gradient(360px circle at ${spot.x}% ${spot.y}%, rgba(255, 255, 255, 0.42), rgba(212, 196, 255, 0.14) 45%, transparent 75%)`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

