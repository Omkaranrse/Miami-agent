"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { RotateCw, Mail, Phone, Globe } from "lucide-react";
import type { Agent } from "@/types/agent";
import { BROKERAGE_INFO } from "@/lib/constants";

interface IdentityKitBadgeProps {
  agent: Agent;
}

const WOVEN_FABRIC_SVG = encodeURIComponent(
  `<svg width="8" height="8" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg"><rect width="8" height="8" fill="#18122B"/><path d="M0 2L2 0M0 6L6 0M2 8L8 2M6 8L8 6" stroke="#2D1E5A" stroke-width="1.1"/><path d="M0 0L8 8M0 4L4 8M4 0L8 4" stroke="#0F0B1B" stroke-width="0.8"/></svg>`
);

function BarcodeStrip({ color = "#21124B", height = 16 }: { color?: string; height?: number }) {
  const widths = [2, 4, 1, 3, 1, 5, 2, 1, 3, 2, 4, 1, 2];
  return (
    <div className="flex items-center gap-[2px]" style={{ height }} aria-hidden="true">
      {widths.map((w, idx) => (
        <span
          key={idx}
          style={{ width: w, height: "100%", backgroundColor: color }}
        />
      ))}
    </div>
  );
}

function FuturisticQR({
  size = 64,
  moduleColor = "#F5F3FF",
  bgColor = "#1B0F3D",
  accentColor = "#A78BFA",
}: {
  size?: number;
  moduleColor?: string;
  bgColor?: string;
  accentColor?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="76" height="76" rx="6" fill={bgColor} />
      <rect x="8" y="8" width="22" height="22" rx="3" stroke={moduleColor} strokeWidth="2.5" />
      <rect x="14" y="14" width="10" height="10" rx="1.5" fill={moduleColor} />
      <rect x="46" y="8" width="22" height="22" rx="3" stroke={moduleColor} strokeWidth="2.5" />
      <rect x="52" y="14" width="10" height="10" rx="1.5" fill={moduleColor} />
      <rect x="8" y="46" width="22" height="22" rx="3" stroke={moduleColor} strokeWidth="2.5" />
      <rect x="14" y="52" width="10" height="10" rx="1.5" fill={moduleColor} />
      <rect x="34" y="10" width="4" height="4" fill={accentColor} />
      <rect x="38" y="16" width="4" height="4" fill={moduleColor} />
      <rect x="34" y="24" width="4" height="4" fill={moduleColor} />
      <rect x="10" y="36" width="4" height="4" fill={moduleColor} />
      <rect x="18" y="38" width="4" height="4" fill={accentColor} />
      <rect x="24" y="34" width="4" height="4" fill={moduleColor} />
      <rect x="34" y="34" width="8" height="8" rx="1" fill={moduleColor} />
      <rect x="46" y="36" width="4" height="4" fill={moduleColor} />
      <rect x="54" y="34" width="6" height="4" fill={accentColor} />
      <rect x="64" y="38" width="4" height="6" fill={moduleColor} />
      <rect x="36" y="48" width="4" height="4" fill={moduleColor} />
      <rect x="44" y="46" width="6" height="4" fill={moduleColor} />
      <rect x="44" y="54" width="4" height="6" fill={accentColor} />
      <rect x="54" y="48" width="6" height="4" fill={moduleColor} />
      <rect x="62" y="52" width="6" height="6" fill={moduleColor} />
      <rect x="36" y="62" width="8" height="4" fill={moduleColor} />
      <rect x="48" y="62" width="4" height="6" fill={moduleColor} />
      <rect x="58" y="62" width="8" height="4" fill={accentColor} />
    </svg>
  );
}

export function IdentityKitBadge({ agent }: IdentityKitBadgeProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointerStartRef = useRef<{ x: number; y: number } | null>(null);
  const isDragRef = useRef(false);

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);
  const smoothX = useSpring(rawMouseX, { damping: 24, stiffness: 220, mass: 0.6 });
  const smoothY = useSpring(rawMouseY, { damping: 24, stiffness: 220, mass: 0.6 });

  const tiltRotateX = useTransform(smoothY, [-0.5, 0.5], [14, -14]);
  const tiltRotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], [15, 85]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], [15, 85]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle 260px at ${gx}% ${gy}%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 78%)`
  );

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== undefined && e.button !== 0) return;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
    isDragRef.current = false;
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (pointerStartRef.current) {
        const dx = e.clientX - pointerStartRef.current.x;
        const dy = e.clientY - pointerStartRef.current.y;
        if (Math.hypot(dx, dy) >= 14) {
          isDragRef.current = true;
        }
      }
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const nx = Math.max(-0.5, Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5));
      const ny = Math.max(-0.5, Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5));
      rawMouseX.set(nx);
      rawMouseY.set(ny);
    },
    [rawMouseX, rawMouseY]
  );

  const handlePointerUp = useCallback(() => {
    if (!pointerStartRef.current) return;
    pointerStartRef.current = null;
    if (!isDragRef.current) {
      setIsFlipped((prev) => !prev);
    }
  }, []);

  const handlePointerLeave = useCallback(() => {
    pointerStartRef.current = null;
    rawMouseX.set(0);
    rawMouseY.set(0);
  }, [rawMouseX, rawMouseY]);

  const cardWidth = 316;
  const cardHeight = 472;
  const cardThickness = 5;
  const halfThickness = cardThickness / 2;
  const strapWidth = 46;
  const strapLength = 88;
  const accentColor = "#7C52EB";

  return (
    <div className="flex flex-col items-center">
      {/* Lanyard Clearance + Interactive 3D Credential */}
      <div
        className="relative flex select-none items-center justify-center pt-[112px] pb-6"
        style={{ perspective: "1200px" }}
      >
        <div
          ref={containerRef}
          role="button"
          tabIndex={0}
          aria-pressed={isFlipped}
          aria-label={`Interactive 3D credential for ${agent.name}. Click to flip between front and back details.`}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setIsFlipped((prev) => !prev);
            }
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => {
            pointerStartRef.current = null;
            isDragRef.current = false;
          }}
          onPointerLeave={handlePointerLeave}
          className="relative cursor-pointer touch-manipulation outline-none"
          style={{
            width: cardWidth,
            height: cardHeight,
            transformStyle: "preserve-3d",
          }}
        >
          <motion.div
            style={{
              rotateX: tiltRotateX,
              rotateY: tiltRotateY,
              transformStyle: "preserve-3d",
              transformOrigin: "50% 40px",
              width: cardWidth,
              height: cardHeight,
              position: "relative",
            }}
          >
            {/* Lanyard Strap */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 flex flex-col items-center"
              style={{
                top: -(strapLength + 34),
                transform: "translateX(-50%)",
                width: strapWidth,
                height: strapLength,
                zIndex: 1,
              }}
            >
              <div
                className="relative flex w-full flex-col items-center justify-end rounded-t pb-3.5"
                style={{
                  height: "calc(100% - 12px)",
                  backgroundImage: `url("data:image/svg+xml;utf8,${WOVEN_FABRIC_SVG}")`,
                  backgroundColor: "#18122B",
                  boxShadow:
                    "inset 2px 0 3px rgba(0,0,0,0.7), inset -2px 0 3px rgba(0,0,0,0.7), 0 8px 20px rgba(33,18,75,0.28)",
                }}
              >
                <span
                  className="mb-1 h-[2.5px] w-3.5 rounded-full"
                  style={{
                    backgroundColor: "#A78BFA",
                    boxShadow: "0 0 8px rgba(167,139,250,0.9)",
                  }}
                />
                <span className="text-center font-sans text-[7.5px] font-extrabold uppercase tracking-[0.16em] text-white/75">
                  MOVE
                  <br />
                  MIAMI
                </span>
              </div>
              <div
                className="z-10 h-3.5 rounded-[3px]"
                style={{
                  width: strapWidth + 6,
                  background:
                    "linear-gradient(135deg, #6B7077 0%, #32353A 38%, #4B5057 68%, #1F2124 100%)",
                  boxShadow:
                    "0 2px 5px rgba(10,11,13,0.65), inset 0 1px 0 rgba(255,255,255,0.45)",
                }}
              />
            </div>

            {/* 3D Flip Container */}
            <motion.div
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                inset: 0,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Metallic Clasp Hardware */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 flex flex-col items-center"
                style={{
                  top: -34,
                  transform: "translateX(-50%)",
                  width: 46,
                  height: 42,
                  zIndex: 15,
                  transformStyle: "preserve-3d",
                }}
              >
                <div
                  className="z-10 h-[5px] w-3 rounded-[2px]"
                  style={{
                    background:
                      "linear-gradient(180deg, #3A3E44 0%, #6E747D 50%, #282A2E 100%)",
                  }}
                />
                <div
                  className="-mt-[1px] flex h-[23px] w-[36px] items-center justify-center rounded-[4px] border border-white/40"
                  style={{
                    background:
                      "linear-gradient(135deg, #6B7077 0%, #32353A 38%, #4B5057 68%, #1F2124 100%)",
                    boxShadow: "0 3px 8px rgba(10,11,13,0.65)",
                  }}
                >
                  <span className="font-sans text-[8px] font-extrabold tracking-[0.14em] text-white/75">
                    MM
                  </span>
                </div>
                <div className="-mt-[3px] h-[16px] w-[22px] rounded-[6px] border-[3px] border-[#44474D] border-b-[#6B7077]" />
              </div>

              {/* 3D Acrylic Edge Slices */}
              {Array.from({ length: 6 }).map((_, i) => {
                const zOffset = -halfThickness + (i + 0.5) * (cardThickness / 6);
                return (
                  <div
                    key={i}
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[24px] border border-white/30 bg-[#DCD1FA]/20"
                    style={{ transform: `translateZ(${zOffset}px)` }}
                  />
                );
              })}

              {/* Soft Floor Drop Shadow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-7 left-[10%] h-9 w-[80%] rounded-full blur-lg"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(42,18,99,0.34) 0%, rgba(42,18,99,0) 72%)",
                  transform: `translateZ(-${28 + halfThickness}px)`,
                }}
              />

              {/* ================= FRONT FACE (Light Futuristic Acrylic) ================= */}
              <div
                className="absolute inset-0 flex flex-col rounded-[24px] border border-white/80 bg-white/45 p-2.5 backdrop-blur-md"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: `translateZ(${halfThickness}px)`,
                  pointerEvents: isFlipped ? "none" : "auto",
                  boxShadow:
                    "0 30px 60px -15px rgba(51,27,110,0.32), inset 0 1px 1.5px rgba(255,255,255,0.92), inset 0 -1px 2px rgba(51,27,110,0.14)",
                }}
              >
                {/* Lanyard Die-Cut Slot */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1.5 z-20 h-2 w-10 -translate-x-1/2 rounded-full bg-[#241252]/25 shadow-inner"
                />

                <div className="relative flex flex-1 flex-col overflow-hidden rounded-[18px] bg-[#FAF8FF] p-5">
                  {/* Futuristic Corner Glow */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-16 -right-16 h-64 w-64 rounded-[44%] bg-radial from-[#C4B0FF]/35 via-[#E8DEFF]/25 to-transparent"
                  />

                  {/* Header */}
                  <div className="relative z-10 flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-[#451E9E] to-[#7C52EB] font-sans text-[9px] font-extrabold text-white shadow-sm">
                        MM
                      </span>
                      <div>
                        <p className="font-sans text-[10px] font-extrabold uppercase tracking-[0.14em] text-[#21124B]">
                          Move Miami
                        </p>
                        <p className="font-sans text-[7.5px] font-semibold uppercase tracking-[0.1em] text-[#6B618A]">
                          Licensed Brokerage
                        </p>
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-1.5 rounded-full border border-[#DCD0FA] bg-white px-2.5 py-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#22C55E]" />
                      <span className="font-sans text-[8px] font-bold uppercase tracking-[0.12em] text-[#21124B]">
                        Principal
                      </span>
                    </div>
                  </div>

                  {/* Portrait + Identity */}
                  <div className="relative z-10 mt-5 flex items-center gap-4">
                    <div className="relative h-28 w-22 shrink-0 overflow-hidden rounded-xl border border-[#DDD2F7] bg-[#EDE7FC] shadow-sm">
                      <Image
                        src={agent.image}
                        alt={agent.name}
                        fill
                        sizes="96px"
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="inline-block rounded bg-[#21124B] px-2 py-0.5 font-sans text-[8px] font-bold uppercase tracking-[0.14em] text-white">
                        FL · BROKER-01
                      </span>
                      <h3 className="heading-editorial mt-2 text-[22px] font-semibold leading-tight text-[#1E1242]">
                        {agent.name}
                      </h3>
                      <p className="mt-1 font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-[#5C31C7]">
                        Managing Broker · Esq.
                      </p>
                    </div>
                  </div>

                  {/* Credentials Matrix */}
                  <div className="relative z-10 mt-5 grid grid-cols-2 gap-3 rounded-xl border border-[#E5DCFA] bg-white/90 p-3">
                    <div>
                      <p className="font-sans text-[7.5px] font-bold uppercase tracking-[0.14em] text-[#7A7099]">
                        Legal Counsel
                      </p>
                      <p className="mt-0.5 font-sans text-[10px] font-bold uppercase text-[#21124B]">
                        Trial Attorney
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-[7.5px] font-bold uppercase tracking-[0.14em] text-[#7A7099]">
                        Corridors
                      </p>
                      <p className="mt-0.5 font-sans text-[10px] font-bold uppercase text-[#21124B]">
                        Dade &amp; Broward
                      </p>
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="relative z-10 mt-auto flex items-end justify-between border-t border-[#E6DDF9] pt-3">
                    <div>
                      <p className="font-sans text-[9px] font-extrabold uppercase tracking-[0.08em] text-[#21124B]">
                        8660 W Flagler St · Miami
                      </p>
                      <p className="mt-0.5 font-sans text-[8px] font-medium text-[#6B618A]">
                        Click badge to view directory
                      </p>
                    </div>
                    <BarcodeStrip color="#21124B" height={16} />
                  </div>
                </div>

                {/* Mouse-Responsive Acrylic Glare */}
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 rounded-[24px]"
                  style={{ background: glareBackground }}
                />
              </div>

              {/* ================= BACK FACE (Deep Royal Futuristic Surface) ================= */}
              <div
                className="absolute inset-0 flex flex-col rounded-[24px] border border-white/25 bg-[#1B0E42]/80 p-2.5 backdrop-blur-md"
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: `rotateY(180deg) translateZ(${halfThickness}px)`,
                  pointerEvents: isFlipped ? "auto" : "none",
                  boxShadow:
                    "0 30px 60px -15px rgba(24,10,60,0.55), inset 0 1px 1px rgba(255,255,255,0.28)",
                }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1.5 z-20 h-2 w-10 -translate-x-1/2 rounded-full bg-black/50"
                />

                <div className="relative flex flex-1 flex-col overflow-hidden rounded-[18px] bg-[linear-gradient(160deg,#231059_0%,#150938_100%)] p-5 text-white">
                  {/* Top Directory Label */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-[9px] font-bold uppercase tracking-[0.16em] text-[#C4B0FF]">
                        Brokerage Credential
                      </span>
                      <span
                        className="h-[2.5px] w-3 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                    </div>
                    <span className="font-sans text-[9px] font-bold tracking-[0.12em] text-[#C4B0FF]">
                      ID · 001
                    </span>
                  </div>

                  {/* Bio Summary */}
                  <div className="mt-5">
                    <p className="font-sans text-[11px] font-extrabold uppercase tracking-[0.08em] text-white">
                      {agent.name}
                    </p>
                    <p className="mt-2 font-sans text-[11.5px] leading-relaxed text-white/80">
                      Miami-native trial attorney and managing broker. Every
                      Move Miami contract is reviewed and executed with legal
                      precision and transparent numbers.
                    </p>
                  </div>

                  {/* Contact Rows */}
                  <div className="mt-5 space-y-2.5 font-sans text-[11px] text-white/90">
                    <div className="flex items-center gap-2.5">
                      <Globe className="h-3.5 w-3.5 shrink-0 text-[#A78BFA]" />
                      <span>movemiamirealtor.com</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Mail className="h-3.5 w-3.5 shrink-0 text-[#A78BFA]" />
                      <span className="truncate">{agent.email}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <Phone className="h-3.5 w-3.5 shrink-0 text-[#A78BFA]" />
                      <span>{agent.phone ?? BROKERAGE_INFO.officePhoneDisplay}</span>
                    </div>
                  </div>

                  {/* Bottom QR Registry */}
                  <div className="mt-auto flex items-end justify-between border-t border-white/15 pt-4">
                    <div>
                      <p className="font-sans text-[9px] font-extrabold uppercase tracking-[0.14em] text-white">
                        Verified Florida Broker
                      </p>
                      <p className="mt-1 max-w-[140px] font-sans text-[8px] leading-snug text-white/60">
                        Miami-Dade &amp; Broward Real Estate Brokerage
                      </p>
                    </div>
                    <div className="overflow-hidden rounded-lg border border-white/15">
                      <FuturisticQR
                        size={62}
                        moduleColor="#F5F3FF"
                        bgColor="#160B36"
                        accentColor="#A78BFA"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Subtle Interactive Hint Button */}
      <button
        type="button"
        onClick={() => setIsFlipped((prev) => !prev)}
        className="inline-flex items-center gap-2 rounded-full border border-[#D4C4FA] bg-white/80 px-4 py-1.5 font-sans text-[11.5px] font-semibold text-[#4B299C] shadow-xs backdrop-blur-sm transition-all hover:bg-white hover:text-[#21124B]"
      >
        <RotateCw className="h-3.5 w-3.5" />
        <span>{isFlipped ? "Flip to Front" : "Hover to Tilt · Click Badge to Flip"}</span>
      </button>
    </div>
  );
}

