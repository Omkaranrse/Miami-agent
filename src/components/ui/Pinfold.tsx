"use client";

import React, { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { FluidGlassButton } from "@/components/ui/FluidGlassButton";
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface PinfoldNote {
  id?: string;
  eyebrow?: string;
  title?: string;
  quote: string;
  name: string;
  role?: string;
  imageURL?: string;
  imageAlt?: string;
  link?: string;
  ctaLabel?: string;
  color?: string;
  shape?: "square" | "tall" | "wide";
}

export interface PinfoldProps {
  notes: PinfoldNote[];
  board?: {
    fill?: string;
    texture?: boolean;
    grain?: string;
    grainSize?: number;
    radius?: number;
    inset?: number;
    frameWidth?: number;
    frameColor?: string;
    frameless?: boolean;
  };
  heading?: {
    show?: boolean;
    title?: string;
    subtitle?: string;
    paper?: string;
    titleColor?: string;
    subtitleColor?: string;
    lean?: number;
  };
  spread?: {
    columns?: number;
    noteSize?: number;
    scatter?: number;
    lean?: number;
    headroom?: number;
    seed?: number;
  };
  paper?: {
    ink?: string;
    roleInk?: string;
    accentInk?: string;
    padding?: number;
    avatar?: number;
    depth?: number;
    corner?: number;
    finish?: "soft" | "paper";
    tooth?: number;
    fibers?: boolean;
    curl?: boolean;
  };
  fasteners?: {
    kind?: "pin" | "ball" | "tack" | "tape" | "none";
    size?: number;
    first?: string;
    second?: string;
    third?: string;
    tape?: string;
  };
  play?: {
    draggable?: boolean;
    swing?: boolean;
    lift?: boolean;
    entrance?: boolean;
    stagger?: number;
    breeze?: boolean;
    breezeAngle?: number;
    tools?: boolean;
    shuffleText?: string;
    tidyText?: string;
    toolPaper?: string;
    toolInk?: string;
  };
  className?: string;
  minHeight?: number;
}

const DEFAULT_BOARD = {
  fill: "transparent",
  texture: false,
  grain: "rgba(92, 49, 199, 0.16)",
  grainSize: 16,
  radius: 0,
  inset: 0,
  frameWidth: 0,
  frameColor: "transparent",
  frameless: true,
};

const DEFAULT_HEADING = {
  show: false,
  title: "",
  subtitle: "",
  paper: "#FFFFFF",
  titleColor: "#21124B",
  subtitleColor: "#5C547A",
  lean: -1.5,
};

const DEFAULT_SPREAD = {
  columns: 3,
  noteSize: 316,
  scatter: 32,
  lean: 4.5,
  headroom: 96,
  seed: 4,
};

const DEFAULT_PAPER = {
  ink: "#21124B",
  roleInk: "#5C547A",
  accentInk: "#5C31C7",
  padding: 22,
  avatar: 44,
  depth: 52,
  corner: 22,
  finish: "soft" as "soft" | "paper",
  tooth: 35,
  fibers: false,
  curl: true,
};

const DEFAULT_FASTENERS = {
  kind: "pin" as "pin" | "ball" | "tack" | "tape" | "none",
  size: 26,
  first: "#5C31C7",
  second: "#241748",
  third: "#8B5CF6",
  tape: "rgba(255, 255, 255, 0.65)",
};

const DEFAULT_PLAY = {
  draggable: true,
  swing: true,
  lift: true,
  entrance: true,
  stagger: 0.08,
  breeze: false,
  breezeAngle: 1.4,
  tools: true,
  shuffleText: "Shuffle",
  tidyText: "Tidy",
  toolPaper: "rgba(255, 255, 255, 0.92)",
  toolInk: "#21124B",
};

const TAPE_EDGE =
  "polygon(3% 0, 97% 0, 100% 20%, 97% 40%, 100% 60%, 97% 80%, 100% 100%, 3% 100%, 0 80%, 3% 60%, 0 40%, 3% 20%)";

const r2 = (n: number) => Math.round(n * 100) / 100;

function grain(seed: number, i: number, k: number) {
  let t = (seed * 374761393 + i * 668265263 + k * 1442695041) >>> 0;
  t = Math.imul(t ^ (t >>> 13), 1274126177);
  t ^= t >>> 16;
  t = Math.imul(t ^ (t >>> 7), 2246822519);
  return ((t ^ (t >>> 15)) >>> 0) / 4294967295;
}

function scatterSpots(
  count: number,
  columns: number,
  scatter: number,
  lean: number,
  seed: number
) {
  const cols = Math.max(1, Math.min(columns, count || 1));
  const rows = Math.max(1, Math.ceil(count / cols));
  const loose = Math.max(0, Math.min(100, scatter)) / 100;
  const spots: { left: number; top: number; turn: number }[] = [];

  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / cols);
    const inRow = Math.min(cols, count - row * cols);
    const slot = (i % cols) + (cols - inRow) / 2;
    const jx = (grain(seed, i, 1) * 2 - 1) * 0.14 * loose;
    const jy = (grain(seed, i, 2) * 2 - 1) * 0.22 * loose;
    const turn = r2((grain(seed, i, 3) * 2 - 1) * lean);
    spots.push({
      left: r2(((slot + 0.5 + jx) / cols) * 100),
      top: r2(((row + 0.5 + jy) / rows) * 100),
      turn,
    });
  }
  return spots;
}

function noteFrame(shape: PinfoldNote["shape"], size: number) {
  if (shape === "tall") return { w: Math.round(size * 0.9), h: Math.max(348, Math.round(size * 1.1)) };
  if (shape === "wide") return { w: size, h: Math.max(332, Math.round(size * 0.88)) };
  return { w: size, h: Math.max(338, Math.round(size * 0.9)) };
}

function hasPin(kind: string) {
  return kind === "pin" || kind === "ball" || kind === "tack";
}

function pinAnchor(kind: string, size: number) {
  if (kind === "ball") return r2(size * 0.95);
  if (kind === "tack") return r2(size * 0.62);
  return r2(size * 0.78);
}

function topRoomFor(
  fasteners: typeof DEFAULT_FASTENERS,
  padding: number
) {
  if (hasPin(fasteners.kind))
    return r2(pinAnchor(fasteners.kind, fasteners.size) + fasteners.size * 0.6);
  if (fasteners.kind === "tape") return padding + 10;
  return padding;
}

function pinParts(kind: string, color: string, size: number): React.CSSProperties[] {
  const S = size;
  const disc = (cx: number, cy: number, d: number): React.CSSProperties => ({
    position: "absolute",
    left: r2(cx - d / 2),
    top: r2(cy - d / 2),
    width: r2(d),
    height: r2(d),
    borderRadius: "50%",
  });

  const hole: React.CSSProperties = {
    ...disc(0, 0, 5),
    background:
      "radial-gradient(circle, rgba(36,23,72,0.5) 0, rgba(36,23,72,0.16) 45%, rgba(0,0,0,0) 72%)",
  };

  if (kind === "ball") {
    const cx = -S * 0.16;
    const cy = -S * 0.58;
    const len = r2(Math.hypot(cx, cy));
    const ang = r2((Math.atan2(cy, cx) * 180) / Math.PI);
    const sx = S * 0.44;
    const sy = S * 0.32;
    const slen = r2(Math.hypot(sx, sy));
    const sang = r2((Math.atan2(sy, sx) * 180) / Math.PI);
    return [
      hole,
      {
        position: "absolute",
        left: 0,
        top: -0.75,
        width: slen,
        height: 1.5,
        transformOrigin: "0 50%",
        transform: `rotate(${sang}deg)`,
        background: "linear-gradient(90deg, rgba(36,23,72,0.32), rgba(36,23,72,0.08))",
        borderRadius: 1,
      },
      {
        ...disc(sx, sy, S * 0.95),
        transform: "scaleY(0.62) rotate(18deg)",
        background:
          "radial-gradient(closest-side, rgba(36,23,72,0.32) 0%, rgba(36,23,72,0.14) 50%, rgba(0,0,0,0) 100%)",
      },
      {
        position: "absolute",
        left: 0,
        top: -1,
        width: len,
        height: 2,
        transformOrigin: "0 50%",
        transform: `rotate(${ang}deg)`,
        background: "linear-gradient(180deg, #FDFDFD 0%, #B9BCC2 45%, #6E7178 100%)",
        borderRadius: 1,
      },
      {
        ...disc(cx, cy, S * 0.84),
        background: `radial-gradient(circle at 33% 28%, rgba(255,255,255,0.95) 0, rgba(255,255,255,0.4) 12%, rgba(255,255,255,0) 30%), radial-gradient(circle at 62% 70%, rgba(0,0,0,0) 28%, rgba(0,0,0,0.48) 100%), ${color}`,
        boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.25), 0 1px 1px rgba(0,0,0,0.25)",
      },
    ];
  }

  if (kind === "tack") {
    const cx = -S * 0.05;
    const cy = -S * 0.1;
    return [
      hole,
      {
        ...disc(cx + S * 0.2, cy + S * 0.24, S * 1.05),
        transform: "scaleY(0.82)",
        background:
          "radial-gradient(closest-side, rgba(36,23,72,0.28) 0%, rgba(36,23,72,0.12) 55%, rgba(0,0,0,0) 100%)",
      },
      {
        ...disc(cx, cy, S * 0.88),
        background:
          "radial-gradient(circle at 36% 30%, rgba(255,255,255,0.85) 0, rgba(255,255,255,0) 32%), conic-gradient(from 210deg, #F7E7AE, #B5852D, #F9EDC1, #8F6519, #E8CE7E, #F7E7AE)",
        boxShadow:
          "inset 0 0 0 1px rgba(110,78,20,0.45), inset 0 -1px 1px rgba(0,0,0,0.25), 0 1px 1px rgba(0,0,0,0.3)",
      },
    ];
  }

  const fx = -S * 0.1;
  const fy = -S * 0.22;
  const gx = -S * 0.16;
  const gy = -S * 0.36;
  const tx = -S * 0.2;
  const ty = -S * 0.46;
  const len = r2(Math.hypot(fx, fy));
  const ang = r2((Math.atan2(fy, fx) * 180) / Math.PI);

  return [
    hole,
    {
      ...disc(S * 0.38, S * 0.36, S * 1.3),
      transform: "scaleY(0.7) rotate(24deg)",
      background:
        "radial-gradient(closest-side, rgba(36,23,72,0.32) 0%, rgba(36,23,72,0.16) 42%, rgba(0,0,0,0) 100%)",
    },
    {
      position: "absolute",
      left: 0,
      top: -1,
      width: len,
      height: 2,
      transformOrigin: "0 50%",
      transform: `rotate(${ang}deg)`,
      background: "linear-gradient(180deg, #FFFFFF 0%, #B5B9C0 50%, #6A6E75 100%)",
      borderRadius: 1,
    },
    {
      ...disc(fx, fy, S),
      background: `radial-gradient(circle at 36% 30%, rgba(255,255,255,0.42) 0, rgba(255,255,255,0) 48%), radial-gradient(circle at 66% 74%, rgba(0,0,0,0.45) 0, rgba(0,0,0,0) 70%), ${color}`,
      boxShadow: "inset 0 -1px 1.5px rgba(0,0,0,0.3), 0 1px 1.5px rgba(0,0,0,0.35)",
    },
    {
      ...disc(gx, gy, S * 0.64),
      background: `linear-gradient(125deg, rgba(255,255,255,0.32) 0%, rgba(255,255,255,0) 38%, rgba(0,0,0,0.38) 100%), ${color}`,
      boxShadow: "0 1.5px 1.5px rgba(0,0,0,0.32)",
    },
    {
      ...disc(tx, ty, S * 0.58),
      background: `radial-gradient(circle at 38% 34%, rgba(255,255,255,0.62) 0, rgba(255,255,255,0.14) 42%, rgba(0,0,0,0.12) 100%), ${color}`,
      boxShadow:
        "inset 0 -1px 1px rgba(0,0,0,0.28), inset 0 1px 1px rgba(255,255,255,0.55)",
    },
    {
      ...disc(tx - S * 0.08, ty - S * 0.09, S * 0.2),
      transform: "scaleX(1.4) rotate(-32deg)",
      background:
        "radial-gradient(closest-side, rgba(255,255,255,0.9) 0, rgba(255,255,255,0) 100%)",
    },
  ];
}

function softSurface(color: string): React.CSSProperties {
  return {
    backgroundColor: color,
    backgroundImage:
      "linear-gradient(180deg, rgba(255,255,255,0.68) 0%, rgba(255,255,255,0.24) 36%, rgba(255,255,255,0) 64%), radial-gradient(120% 70% at 0% 0%, rgba(255,255,255,0.48) 0%, rgba(255,255,255,0) 58%), linear-gradient(0deg, rgba(92,49,199,0.04) 0%, rgba(0,0,0,0) 40%)",
    backgroundSize: "100% 100%",
  };
}

function cardShadow(depth: number, raised: boolean) {
  const s = r2(Math.max(0, depth) / 55);
  const k = raised ? 1.65 : 1;
  return `inset 0 1px 0 rgba(255,255,255,0.9), inset 0 0 0 1px rgba(255,255,255,0.65), inset 0 -1px 0 rgba(36,23,72,0.06), 0 2px 4px rgba(36,23,72,${r2(Math.min(0.22, 0.07 * s))}), 0 ${r2(10 * k)}px ${r2(22 * k)}px -6px rgba(74,38,168,${r2(Math.min(0.38, 0.16 * s))}), 0 ${r2(28 * k)}px ${r2(48 * k)}px -18px rgba(36,23,72,${r2(Math.min(0.45, 0.22 * s))})`;
}

function initialsOf(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();
}

function ShuffleGlyph() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 3h5v5" />
      <path d="M4 20 21 3" />
      <path d="M21 16v5h-5" />
      <path d="m15 15 6 6" />
      <path d="M4 4l5 5" />
    </svg>
  );
}

function TidyGlyph() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

interface LiveNoteProps {
  index: number;
  note: PinfoldNote;
  spot: { left: number; top: number; turn: number };
  gridPos: { col: number; inRow: number; row: number; rows: number; alignFlush: boolean };
  box: { w: number; h: number };
  layer: number;
  raise: (index: number) => void;
  paper: typeof DEFAULT_PAPER;
  padTop: number;
  fasteners: typeof DEFAULT_FASTENERS;
  pinColor: string;
  play: typeof DEFAULT_PLAY;
  calm: boolean;
  landed: boolean;
  homing: number;
  sway: boolean;
  scope: string;
}

function LiveNote({
  index,
  note,
  spot,
  gridPos,
  box,
  layer,
  raise,
  paper,
  padTop,
  fasteners,
  pinColor,
  play,
  calm,
  landed,
  homing,
  sway,
  scope,
}: LiveNoteProps) {
  const dx = useMotionValue(0);
  const dy = useMotionValue(0);
  const base = useMotionValue(spot.turn);
  const speed = useVelocity(dx);
  const swingEnabledRef = useRef(Boolean(play.swing && !calm));
  useEffect(() => {
    swingEnabledRef.current = Boolean(play.swing && !calm);
  }, [play.swing, calm]);

  const kick = useTransform(speed, (v) =>
    swingEnabledRef.current ? Math.max(-14, Math.min(14, -v * 0.012)) : 0
  );
  const swing = useSpring(kick, { stiffness: 260, damping: 16, mass: 0.8 });
  const turn = useTransform([base, swing], ([b, s]) => Number(b) + Number(s));

  const [held, setHeld] = useState(false);
  const moved = useRef(false);

  useEffect(() => {
    const ctl = animate(
      base,
      spot.turn,
      calm ? { duration: 0 } : { type: "spring", stiffness: 140, damping: 18 }
    );
    return () => ctl.stop();
  }, [base, spot.turn, calm]);

  const calmRef = useRef(calm);
  useEffect(() => {
    calmRef.current = calm;
  }, [calm]);

  const firstHome = useRef(true);
  useEffect(() => {
    if (firstHome.current) {
      firstHome.current = false;
      return;
    }
    const cfg = calmRef.current
      ? { duration: 0 }
      : { type: "spring" as const, stiffness: 160, damping: 20 };
    const a = animate(dx, 0, cfg);
    const b = animate(dy, 0, cfg);
    return () => {
      a.stop();
      b.stop();
    };
  }, [dx, dy, homing]);

  const dropIn = play.entrance && !calm;
  const restingState = {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 230,
      damping: 19,
      delay: dropIn ? index * play.stagger : 0,
    },
  };
  const waitingState = { opacity: 0, scale: 1.12 };

  const swayLength = 4.2 + grain(7, index, 5) * 2.4;
  const swayDelay = -grain(11, index, 6) * 4;
  const surface = useMemo(
    () => softSurface(note.color || "#FFFFFF"),
    [note.color]
  );
  const pinBits = useMemo(
    () =>
      hasPin(fasteners.kind)
        ? pinParts(fasteners.kind, pinColor, fasteners.size)
        : [],
    [fasteners.kind, pinColor, fasteners.size]
  );

  const leftStyle = gridPos.alignFlush
    ? gridPos.inRow <= 1
      ? "50%"
      : `calc(${box.w / 2}px + ${gridPos.col / (gridPos.inRow - 1)} * (100% - ${box.w}px))`
    : `clamp(${box.w / 2 + 8}px, ${spot.left}%, calc(100% - ${box.w / 2 + 8}px))`;

  const topStyle = gridPos.alignFlush
    ? gridPos.rows <= 1
      ? "50%"
      : `${((gridPos.row + 0.5) / gridPos.rows) * 100}%`
    : `clamp(${box.h / 2 + 8}px, ${spot.top}%, calc(100% - ${box.h / 2 + 8}px))`;

  return (
    <div
      style={{
        position: "absolute",
        left: leftStyle,
        top: topStyle,
        width: 0,
        height: 0,
        zIndex: layer,
        transition: calm
          ? "none"
          : "left 0.8s cubic-bezier(0.2, 0.8, 0.2, 1), top 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
      }}
    >
      <motion.div
        drag={play.draggable}
        dragConstraints={{ left: -360, right: 360, top: -160, bottom: 200 }}
        dragElastic={0.18}
        dragMomentum={true}
        dragTransition={{ power: 0.2, timeConstant: 180 }}
        onPointerDown={() => {
          moved.current = false;
          raise(index);
        }}
        onDragStart={() => {
          moved.current = true;
          setHeld(true);
        }}
        onDragEnd={() => setHeld(false)}
        initial={dropIn ? waitingState : false}
        animate={landed ? restingState : waitingState}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        whileHover={play.lift && !calm ? { scale: 1.02 } : undefined}
        whileDrag={{ scale: 1.04 }}
        style={{
          position: "absolute",
          left: -box.w / 2,
          top: -box.h / 2,
          width: box.w,
          height: box.h,
          x: dx,
          y: dy,
          rotate: turn,
          cursor: play.draggable ? (held ? "grabbing" : "grab") : "default",
          touchAction: play.draggable ? "none" : "auto",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            transformOrigin: `50% ${
              hasPin(fasteners.kind)
                ? pinAnchor(fasteners.kind, fasteners.size)
                : 0
            }px`,
            animation:
              sway && !held
                ? `${scope}-sway ${swayLength}s ease-in-out ${swayDelay}s infinite`
                : "none",
          }}
        >
          {/* Card Paper Surface */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              boxSizing: "border-box",
              padding: `${padTop}px ${paper.padding}px ${paper.padding}px`,
              borderRadius: paper.corner,
              ...surface,
              boxShadow: cardShadow(paper.depth, held),
              transition: "box-shadow 0.25s ease",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 12,
              overflow: "hidden",
              color: paper.ink,
            }}
          >
            <div>
              {note.eyebrow && (
                <p
                  className="font-sans text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: paper.accentInk }}
                >
                  {note.eyebrow}
                </p>
              )}

              {note.title && (
                <h3
                  className="heading-editorial mt-2 text-[25px] leading-tight"
                  style={{ color: paper.ink }}
                >
                  {note.title}
                </h3>
              )}

              <p
                className="mt-2.5 font-sans text-[14px] leading-relaxed"
                style={{ color: paper.roleInk }}
              >
                {note.quote}
              </p>
            </div>

            {/* Bottom Author/Service Thumb + Interactive Link */}
            <div className="flex items-center justify-between gap-3 border-t border-[#E2D8F7]/80 pt-3.5">
              <div className="flex min-w-0 items-center gap-2.5">
                {note.imageURL ? (
                  <div
                    className="relative shrink-0 overflow-hidden rounded-full ring-2 ring-white/90 shadow-sm"
                    style={{ width: paper.avatar, height: paper.avatar }}
                  >
                    <Image
                      src={note.imageURL}
                      alt={note.imageAlt || note.name}
                      fill
                      sizes="64px"
                      draggable={false}
                      className="pointer-events-none object-cover"
                    />
                  </div>
                ) : (
                  <span
                    aria-hidden="true"
                    className="flex shrink-0 items-center justify-center rounded-full bg-[#EDE5FF] font-sans text-[12px] font-bold text-[#4C2B9A]"
                    style={{ width: paper.avatar, height: paper.avatar }}
                  >
                    {initialsOf(note.name)}
                  </span>
                )}

                <div className="flex min-w-0 flex-col">
                  <span className="truncate font-sans text-[13px] font-bold leading-tight text-[#21124B]">
                    {note.name}
                  </span>
                  {note.role && (
                    <span className="truncate font-sans text-[11px] font-medium leading-tight text-[#5C547A]">
                      {note.role}
                    </span>
                  )}
                </div>
              </div>

              {note.link && (
                <FluidGlassButton
                  href={note.link}
                  onPointerDown={(e) => e.stopPropagation()}
                  onClick={(e) => {
                    if (moved.current) e.preventDefault();
                  }}
                  className="shrink-0 gap-1.5 px-3.5 py-2 text-[12px]"
                >
                  <span>{note.ctaLabel || "Explore"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </FluidGlassButton>
              )}
            </div>
          </div>

          {/* 3D Push Pin */}
          {pinBits.length > 0 && (
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                top: pinAnchor(fasteners.kind, fasteners.size),
                width: 0,
                height: 0,
                pointerEvents: "none",
              }}
            >
              {pinBits.map((part, k) => (
                <span key={k} style={part} />
              ))}
            </span>
          )}

          {/* Tape */}
          {fasteners.kind === "tape" && (
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: -11,
                width: box.w * 0.42,
                marginLeft: -(box.w * 0.42) / 2,
                height: 24,
                background: fasteners.tape,
                clipPath: TAPE_EDGE,
                transform: `rotate(${index % 2 ? 4 : -4}deg)`,
              }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}

export function Pinfold(props: PinfoldProps) {
  const board = useMemo(
    () => ({ ...DEFAULT_BOARD, ...props.board }),
    [props.board]
  );
  const heading = useMemo(
    () => ({ ...DEFAULT_HEADING, ...props.heading }),
    [props.heading]
  );
  const spread = useMemo(
    () => ({ ...DEFAULT_SPREAD, ...props.spread }),
    [props.spread]
  );
  const paper = useMemo(
    () => ({ ...DEFAULT_PAPER, ...props.paper }),
    [props.paper]
  );
  const fasteners = useMemo(
    () => ({ ...DEFAULT_FASTENERS, ...props.fasteners }),
    [props.fasteners]
  );
  const play = useMemo(() => ({ ...DEFAULT_PLAY, ...props.play }), [props.play]);

  const notes = useMemo(
    () => (Array.isArray(props.notes) ? props.notes : []),
    [props.notes]
  );

  const shellRef = useRef<HTMLDivElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [calm, setCalm] = useState(false);
  const [boardWidth, setBoardWidth] = useState(1120);

  useEffect(() => {
    const el = shellRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setBoardWidth(entry.contentRect.width);
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = shellRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const watcher = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setHasEntered(true);
            watcher.disconnect();
          }
        }
      },
      { threshold: 0.12 }
    );
    watcher.observe(el);
    return () => watcher.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => setCalm(e.matches);
    if (query.matches) {
      queueMicrotask(() => setCalm(true));
    }
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const rawId = useId();
  const scope = "pf" + rawId.replace(/[^a-zA-Z0-9]/g, "");
  const [shake, setShake] = useState(0);
  const [neat, setNeat] = useState(false);
  const [homing, setHoming] = useState(0);
  const [stack, setStack] = useState<Record<number, number>>({});
  const peak = useRef(notes.length + 1);

  const responsiveCols =
    boardWidth < 680 ? 1 : boardWidth < 1024 ? Math.min(2, spread.columns) : spread.columns;
  const gridGap = 28;
  const innerWidth = Math.max(280, boardWidth - board.inset * 2);
  const responsiveSize =
    responsiveCols === 1
      ? Math.min(420, innerWidth)
      : Math.min(
          spread.noteSize,
          Math.max(260, Math.floor((innerWidth - gridGap * (responsiveCols - 1)) / responsiveCols))
        );
  const rowCount = Math.max(1, Math.ceil(notes.length / Math.max(1, responsiveCols)));
  const baseCardHeight = noteFrame("square", responsiveSize).h;
  const computedHeight =
    props.minHeight ??
    Math.max(
      360,
      rowCount * baseCardHeight +
        Math.max(0, rowCount - 1) * gridGap +
        board.inset * 2 +
        (heading.show ? spread.headroom : 0) +
        (play.tools ? 48 : 0)
    );

  const alignFlush = neat || (spread.scatter === 0 && spread.lean === 0);
  const isFrameless = Boolean(board.frameless || board.fill === "transparent");

  const landed = !play.entrance || calm || hasEntered;

  const spots = useMemo(
    () =>
      scatterSpots(
        notes.length,
        responsiveCols,
        neat ? 0 : spread.scatter,
        neat ? 0 : spread.lean,
        spread.seed + shake * 97
      ),
    [notes.length, responsiveCols, spread.scatter, spread.lean, spread.seed, shake, neat]
  );

  const raise = useCallback((i: number) => {
    peak.current += 1;
    const level = peak.current;
    setStack((prev) => (prev[i] === level ? prev : { ...prev, [i]: level }));
  }, []);

  const doShuffle = () => {
    setNeat(false);
    setShake((n) => n + 1);
    setHoming((n) => n + 1);
  };

  const doTidy = () => {
    setNeat(true);
    setHoming((n) => n + 1);
  };

  const pins = [fasteners.first, fasteners.second, fasteners.third];
  const topRoom = heading.show ? spread.headroom : 0;
  const padTop = Math.max(paper.padding, topRoomFor(fasteners, paper.padding));
  const swayAllowed = play.breeze && hasEntered && !calm;

  return (
    <div
      ref={shellRef}
      className={`relative w-full ${
        isFrameless
          ? "overflow-visible"
          : "overflow-hidden shadow-[0_24px_60px_-16px_rgba(74,38,168,0.18)]"
      } ${props.className ?? ""}`}
      style={{
        minHeight: computedHeight,
        borderRadius: isFrameless ? 0 : board.radius,
        boxSizing: "border-box",
        border:
          !isFrameless && board.frameWidth > 0
            ? `${board.frameWidth}px solid ${board.frameColor}`
            : "none",
        backgroundColor: isFrameless ? "transparent" : board.fill,
        backgroundImage:
          !isFrameless && board.texture
            ? `radial-gradient(${board.grain} 1px, transparent 1.3px)`
            : "none",
        backgroundSize: `${board.grainSize}px ${board.grainSize}px`,
      }}
    >
      {play.breeze && (
        <style>{`@keyframes ${scope}-sway { 0%, 100% { transform: rotate(${-play.breezeAngle}deg); } 50% { transform: rotate(${play.breezeAngle}deg); } }`}</style>
      )}

      {/* Optional Pinned Header Note */}
      {heading.show && (
        <motion.div
          initial={play.entrance && !calm ? { opacity: 0, y: -14 } : false}
          animate={landed ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          style={{
            position: "absolute",
            left: board.inset,
            top: board.inset,
            maxWidth: "72%",
            rotate: heading.lean,
            zIndex: 999999,
          }}
        >
          <div
            style={{
              position: "relative",
              padding: `${hasPin(fasteners.kind) ? 24 : 18}px 24px 16px`,
              ...softSurface(heading.paper),
              borderRadius: paper.corner,
              boxShadow: cardShadow(paper.depth, false),
            }}
          >
            <h3
              className="heading-editorial text-[26px]"
              style={{ color: heading.titleColor }}
            >
              {heading.title}
            </h3>
            {heading.subtitle && (
              <p
                className="mt-1 font-sans text-[13px]"
                style={{ color: heading.subtitleColor }}
              >
                {heading.subtitle}
              </p>
            )}
          </div>
          {hasPin(fasteners.kind) && (
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "50%",
                top: 12,
                width: 0,
                height: 0,
              }}
            >
              {pinParts(fasteners.kind, pins[0], fasteners.size * 0.9).map(
                (part, k) => (
                  <span key={k} style={part} />
                )
              )}
            </span>
          )}
        </motion.div>
      )}

      {/* Pinned Cards Spread Area */}
      <div
        style={{
          position: "absolute",
          left: board.inset,
          right: board.inset,
          top: board.inset + topRoom,
          bottom: board.inset + (play.tools ? 44 : 0),
        }}
      >
        {notes.map((note, i) => {
          const row = Math.floor(i / Math.max(1, responsiveCols));
          const inRow = Math.min(responsiveCols, notes.length - row * responsiveCols);
          const col = i % Math.max(1, responsiveCols);
          return (
            <LiveNote
              key={note.id ?? note.name ?? i}
              index={i}
              note={note}
              spot={spots[i] ?? { left: 50, top: 50, turn: 0 }}
              gridPos={{ col, inRow, row, rows: rowCount, alignFlush }}
              box={noteFrame(note.shape, responsiveSize)}
              layer={stack[i] || i + 1}
              raise={raise}
              paper={paper}
              padTop={padTop}
              fasteners={fasteners}
              pinColor={pins[i % pins.length]}
              play={play}
              calm={calm}
              landed={landed}
              homing={homing}
              sway={swayAllowed}
              scope={scope}
            />
          );
        })}
      </div>

      {/* Shuffle & Tidy Controls */}
      {play.tools && (
        <div
          className="backdrop-blur-md"
          style={{
            position: "absolute",
            right: Math.max(16, board.inset - 6),
            bottom: Math.max(16, board.inset - 6),
            display: "flex",
            gap: 4,
            padding: 4,
            borderRadius: 999,
            background: play.toolPaper,
            border: "1px solid rgba(255, 255, 255, 0.95)",
            boxShadow: "0 10px 26px -6px rgba(74, 38, 168, 0.28)",
            zIndex: 1000000,
          }}
        >
          <button
            type="button"
            onClick={doShuffle}
            className="inline-flex h-9 items-center gap-1.5 rounded-full px-4 font-sans text-[13px] font-semibold transition-colors hover:bg-[#EFEAFF]"
            style={{ color: play.toolInk }}
          >
            <ShuffleGlyph />
            <span>{play.shuffleText}</span>
          </button>

          <button
            type="button"
            onClick={doTidy}
            aria-pressed={neat}
            className={`inline-flex h-9 items-center gap-1.5 rounded-full px-4 font-sans text-[13px] font-semibold transition-colors ${
              neat ? "bg-[#E6DAFF]" : "hover:bg-[#EFEAFF]"
            }`}
            style={{ color: play.toolInk }}
          >
            <TidyGlyph />
            <span>{play.tidyText}</span>
          </button>
        </div>
      )}
    </div>
  );
}
