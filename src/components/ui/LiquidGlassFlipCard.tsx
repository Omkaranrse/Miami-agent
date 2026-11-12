"use client";

import * as React from "react";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
  useVelocity,
  type Transition,
  type MotionValue,
} from "framer-motion";
import "./LiquidGlassFlipCard.css";

const DEFAULT_TRANSITION: Transition = {
  type: "spring",
  stiffness: 70,
  damping: 13,
  mass: 1.1,
};

const RAD = Math.PI / 180;
const clamp = (value: number, min: number, max: number) =>
  value < min ? min : value > max ? max : value;
const clamp01 = (value: number) => clamp(value, 0, 1);
const smooth = (edge0: number, edge1: number, value: number) => {
  const t = clamp01((value - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};
const num = (value: unknown, fallback: number) => {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
};

const halfTurn = (turn: number) => turn - 180 * Math.round(turn / 180);
const sideOf = (turn: number): "front" | "back" =>
  Math.abs(Math.round(turn / 180)) % 2 === 0 ? "front" : "back";
const edgeOf = (turn: number) => Math.abs(Math.sin(halfTurn(turn) * RAD));

function boxSides(value: number | string | undefined, fallback: string) {
  const raw =
    typeof value === "number"
      ? `${value}px`
      : String(value ?? "").trim() || fallback;
  const parts = raw.split(/\s+/).filter(Boolean);
  const [top, right = top] = parts;
  return [top, right];
}

function supportsBackdropRefraction() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const touchMac =
    navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  if (/iPhone|iPad|iPod/.test(ua) || touchMac || /Firefox\//.test(ua))
    return false;
  return /(?:Chrome|Chromium|Edg)\//.test(ua);
}

interface GlassMaps {
  field: string;
  light: string;
  width: number;
  height: number;
}

function makeGlassMaps(
  width: number,
  height: number,
  corners: number[],
  depth: number
): GlassMaps | null {
  if (typeof document === "undefined") return null;
  const w = Math.max(1, width);
  const h = Math.max(1, height);
  let [tl, tr, br, bl] = corners.map((value) =>
    Number.isFinite(value) ? Math.max(0, value) : 0
  );
  const fit = Math.min(
    1,
    w / Math.max(1e-6, tl + tr),
    w / Math.max(1e-6, bl + br),
    h / Math.max(1e-6, tl + bl),
    h / Math.max(1e-6, tr + br)
  );
  tl *= fit;
  tr *= fit;
  br *= fit;
  bl *= fit;

  const bezel = Math.max(2, Math.min(depth, w / 2, h / 2));
  const density = Math.min(1.25, Math.sqrt(21e4 / (w * h)), 900 / w, 900 / h);
  const mapW = Math.max(2, Math.round(w * density));
  const mapH = Math.max(2, Math.round(h * density));
  const stepX = w / mapW;
  const stepY = h / mapH;
  const footprint = Math.max(stepX, stepY);
  const halfW = w / 2;
  const halfH = h / 2;
  const lightX = -0.5547;
  const lightY = -0.83205;

  const canvas = document.createElement("canvas");
  canvas.width = mapW;
  canvas.height = mapH;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const fieldData = context.createImageData(mapW, mapH);
  const lightData = context.createImageData(mapW, mapH);
  const f = fieldData.data;
  const l = lightData.data;
  const rampEnd = Math.min(0.5, (footprint * 1.5) / bezel);

  for (let y = 0; y < mapH; y++) {
    const py = (y + 0.5) * stepY - halfH;
    for (let x = 0; x < mapW; x++) {
      const px = (x + 0.5) * stepX - halfW;
      const i = (y * mapW + x) * 4;
      f[i] = 128;
      f[i + 1] = 128;
      f[i + 2] = 128;
      f[i + 3] = 255;

      const r = px < 0 ? (py < 0 ? tl : bl) : py < 0 ? tr : br;
      const qx = Math.abs(px) - (halfW - r);
      const qy = Math.abs(py) - (halfH - r);
      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const outer = Math.hypot(ox, oy);
      const inward = -(outer + Math.min(Math.max(qx, qy), 0) - r);
      if (inward <= 0 || inward >= bezel) continue;

      const sx = px < 0 ? -1 : 1;
      const sy = py < 0 ? -1 : 1;
      let nx: number;
      let ny: number;
      if (outer > 1e-6) {
        nx = (ox / outer) * sx;
        ny = (oy / outer) * sy;
      } else if (qx > qy) {
        nx = sx;
        ny = 0;
      } else if (qy > qx) {
        nx = 0;
        ny = sy;
      } else {
        nx = sx * Math.SQRT1_2;
        ny = sy * Math.SQRT1_2;
      }

      const u = inward / bezel;
      const magnitude = Math.pow(1 - u, 2.2) * smooth(0, rampEnd, u);
      f[i] = Math.round(127.5 - 127.5 * nx * magnitude);
      f[i + 1] = Math.round(127.5 - 127.5 * ny * magnitude);
      f[i + 2] = 128;

      const facing = nx * lightX + ny * lightY;
      const bright = Math.pow(Math.max(0, facing), 1.6);
      const dark = Math.pow(Math.max(0, -facing), 1.5);
      const narrow = Math.exp(-Math.pow((u - 0.1) / 0.14, 2));
      const soft = Math.exp(-Math.pow((u - 0.32) / 0.3, 2));
      const coverage = clamp01(inward / footprint + 0.5);
      const signed =
        (0.85 * bright * narrow - 0.16 * dark * soft) * Math.pow(1 - u, 1.1);
      const tone = signed >= 0 ? 255 : 0;
      l[i] = tone;
      l[i + 1] = tone;
      l[i + 2] = tone;
      l[i + 3] = Math.round(255 * Math.min(1, Math.abs(signed)) * coverage);
    }
  }

  context.putImageData(fieldData, 0, 0);
  const field = canvas.toDataURL("image/png");
  context.putImageData(lightData, 0, 0);
  const light = canvas.toDataURL("image/png");
  canvas.width = 1;
  canvas.height = 1;
  return { field, light, width: w, height: h };
}

function useReveal(
  presence: MotionValue<number>,
  index: number,
  staged: boolean
) {
  const opacity = useTransform(presence, (p) =>
    staged ? smooth(0, 1, (p - 0.18 - 0.12 * index) / 0.46) : 1
  );
  const y = useTransform(opacity, (o) => (staged ? (1 - o) * 10 : 0));
  return { opacity, y };
}

function SlotFill({ node }: { node: React.ReactNode }) {
  const child = React.Children.toArray(node)[0];
  if (!React.isValidElement<{ style?: React.CSSProperties }>(child)) return null;
  return React.cloneElement(child, {
    style: {
      ...(child.props.style ?? {}),
      width: "100%",
      height: "100%",
    },
  });
}

function FlipIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M19.5 10.5A7.6 7.6 0 0 0 6.1 6.6L4.5 8.2" />
      <path d="M4.5 3.9v4.3h4.3" />
      <path d="M4.5 13.5a7.6 7.6 0 0 0 13.4 3.9l1.6-1.6" />
      <path d="M19.5 20.1v-4.3h-4.3" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      className="lgf-cta-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function subscribeEmpty() {
  return () => {};
}

function subscribeReducedMotion(callback: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export interface LiquidGlassOptics {
  blur?: number;
  depth?: number;
  refraction?: number;
  dispersion?: number;
  light?: number;
}

export interface LiquidGlassFlipCardProps {
  frontEyebrow?: string;
  frontTitle?: string;
  frontText?: string;
  frontLayer?: React.ReactNode;
  backEyebrow?: string;
  backTitle?: string;
  backText?: string;
  buttonLabel?: string;
  link?: string;
  newTab?: boolean;
  linkArea?: "card" | "button";
  backLayer?: React.ReactNode;
  startSide?: "front" | "back";
  trigger?: "hover" | "click";
  drag?: boolean;
  axis?: "horizontal" | "vertical";
  flipTransition?: Transition;
  liquidity?: number;
  tilt?: number;
  flipButton?: boolean;
  surface?: "light" | "dark";
  material?: "clear" | "frosted" | "tinted";
  tint?: string;
  textColor?: string;
  titleFont?: React.CSSProperties;
  bodyFont?: React.CSSProperties;
  radius?: number | string;
  padding?: number | string;
  optics?: LiquidGlassOptics;
  shadow?: "prism" | "soft" | "none";
  onFlip?: () => void;
  onButtonTap?: () => void;
  focusColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

interface DragState {
  id: number;
  x: number;
  y: number;
  start: number;
  active: boolean;
  moved: boolean;
  rect: DOMRect;
  type: string;
}

export function LiquidGlassFlipCard(props: LiquidGlassFlipCardProps) {
  const {
    frontEyebrow = "",
    frontTitle = "",
    frontText = "",
    frontLayer,
    backEyebrow = "",
    backTitle = "",
    backText = "",
    buttonLabel = "",
    link = "",
    newTab = false,
    linkArea = "card",
    backLayer,
    startSide = "front",
    trigger = "click",
    drag = true,
    axis = "horizontal",
    flipTransition = DEFAULT_TRANSITION,
    liquidity = 45,
    tilt = 55,
    flipButton = true,
    surface = "light",
    material = "clear",
    tint = "#F2EBFF",
    textColor,
    titleFont,
    bodyFont,
    radius = "32px",
    padding = "14px",
    optics = {},
    shadow = "prism",
    onFlip,
    onButtonTap,
    focusColor = "#6136D6",
    className,
    style,
  } = props;

  const reduced = React.useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
  const live = true;
  const vertical = axis === "vertical";
  const hoverMode = trigger === "hover";

  const dragAllowed = (pointerType: string) =>
    live && drag && (!hoverMode || pointerType !== "mouse");
  const trimmedLink = typeof link === "string" ? link.trim() : "";
  const cardLink = !!trimmedLink && hoverMode && linkArea !== "button";

  const blur = clamp(num(optics.blur, 10), 0, 40) + (material === "frosted" ? 10 : 0);
  const depth = clamp(num(optics.depth, 28), 6, 60);
  const refraction = clamp01(num(optics.refraction, 85) / 100);
  const dispersion = clamp01(num(optics.dispersion, 58) / 100);
  const light = clamp01(num(optics.light, 82) / 100);
  const tiltMax = 8.5 * clamp01(num(tilt, 55) / 100);
  const gel = clamp01(num(liquidity, 45) / 100);
  const thickness = clamp(Math.round(depth * 0.4), 6, 20);
  const transition = flipTransition || DEFAULT_TRANSITION;

  const radiusCSS =
    typeof radius === "number"
      ? `${Math.max(0, radius)}px`
      : String(radius || "32px");
  const paddingCSS =
    typeof padding === "number"
      ? `${Math.max(0, padding)}px`
      : String(padding || "14px");
  const [padTop, padRight] = boxSides(paddingCSS, "14px");

  // ── Flip state ────────────────────────────────────────────────────────────
  const startTurn = startSide === "back" ? 180 : 0;
  const turn = useMotionValue(startTurn);
  const homeRef = React.useRef(startTurn);
  const targetRef = React.useRef(startTurn);
  const animationRef = React.useRef<{ stop: () => void } | null>(null);
  const [side, setSide] = React.useState<"front" | "back">(startSide);
  const sideRef = React.useRef<"front" | "back">(startSide);
  const prevStartSideRef = React.useRef<"front" | "back">(startSide);
  const [dragging, setDragging] = React.useState(false);

  React.useEffect(() => {
    if (prevStartSideRef.current === startSide) return;
    prevStartSideRef.current = startSide;
    animationRef.current?.stop();
    homeRef.current = startTurn;
    targetRef.current = startTurn;
    sideRef.current = startSide;
    turn.jump(startTurn);
  }, [startTurn, startSide, turn]);

  React.useEffect(() => () => animationRef.current?.stop(), []);

  useMotionValueEvent(turn, "change", (value) => {
    const next = sideOf(value);
    if (next !== sideRef.current) {
      sideRef.current = next;
      setSide(next);
    }
  });

  const settle = React.useCallback(
    (target: number) => {
      if (Math.abs(target) >= 3600) {
        const wrapped = target % 360;
        turn.jump(wrapped);
        targetRef.current = wrapped;
        homeRef.current = ((homeRef.current % 360) + 360) % 360;
      }
    },
    [turn]
  );

  const runTo = React.useCallback(
    (target: number, velocity?: number) => {
      animationRef.current?.stop();
      if (!live || reduced) {
        turn.jump(target);
        settle(target);
        return;
      }
      const options: Record<string, unknown> = { ...transition };
      if (typeof velocity === "number" && Number.isFinite(velocity)) {
        options.velocity = velocity;
      }
      animationRef.current = animate(turn, target, {
        ...options,
        onComplete: () => settle(target),
      });
    },
    [live, reduced, transition, settle, turn]
  );

  const flip = React.useCallback(
    (direction: number) => {
      const next = targetRef.current + 180 * direction;
      targetRef.current = next;
      runTo(next);
      onFlip?.();
    },
    [runTo, onFlip]
  );

  // ── Geometry ──────────────────────────────────────────────────────────────
  const stageRef = React.useRef<HTMLDivElement | null>(null);
  const cardRef = React.useRef<HTMLDivElement | null>(null);
  const [size, setSize] = React.useState({ w: 0, h: 0 });
  const span = vertical ? size.h : size.w;
  const perspective = clamp((span || 360) * 3.1, 900, 2600);
  const geometry = React.useRef({ w: 360, h: 520, perspective: 1120 });

  React.useEffect(() => {
    geometry.current = {
      w: size.w || 360,
      h: size.h || 520,
      perspective,
    };
  }, [size.w, size.h, perspective]);

  React.useEffect(() => {
    const element = cardRef.current;
    if (!element) return;
    let frame = 0;
    const measure = () => {
      const w = element.offsetWidth;
      const h = element.offsetHeight;
      if (!w || !h) return;
      setSize((previous) =>
        previous.w === w && previous.h === h ? previous : { w, h }
      );
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  // ── Optics (Chromium: SVG backdrop refraction + chromatic dispersion) ──────
  const refractionSupported = React.useSyncExternalStore(
    subscribeEmpty,
    supportsBackdropRefraction,
    () => false
  );
  const [maps, setMaps] = React.useState<GlassMaps | null>(null);
  const [cornerRadius, setCornerRadius] = React.useState(32);
  const rawId = React.useId();
  const filterId = `lgf-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  React.useEffect(() => {
    const element = cardRef.current;
    if (!element || !size.w || !size.h) return;
    const computed = window.getComputedStyle(element);
    const values = [
      computed.borderTopLeftRadius,
      computed.borderTopRightRadius,
      computed.borderBottomRightRadius,
      computed.borderBottomLeftRadius,
    ];
    if (values.some((v) => v.includes("%") || v.trim().includes(" "))) {
      setMaps(null);
      return;
    }
    const corners = values.map((v) => Math.max(0, parseFloat(v) || 0));
    setCornerRadius(Math.min(Math.max(...corners), size.w / 2, size.h / 2));
    const timer = window.setTimeout(() => {
      try {
        setMaps(makeGlassMaps(size.w, size.h, corners, depth));
      } catch {
        setMaps(null);
      }
    }, 60);
    return () => window.clearTimeout(timer);
  }, [size.w, size.h, radiusCSS, depth]);

  const refractionOn = !!maps && refractionSupported && refraction > 0;
  const baseScale = 2 * depth * 0.92 * refraction;
  const dispRefR = React.useRef<SVGFEDisplacementMapElement | null>(null);
  const dispRefG = React.useRef<SVGFEDisplacementMapElement | null>(null);
  const dispRefB = React.useRef<SVGFEDisplacementMapElement | null>(null);

  const scaleFor = React.useCallback(
    (edgeVal: number): [number, number, number] => {
      const main = baseScale * (1 + 1.25 * edgeVal);
      const spread = dispersion * 0.22 * (0.35 + 0.65 * edgeVal);
      return [main, main * (1 + spread), main * (1 + 2 * spread)];
    },
    [baseScale, dispersion]
  );

  // ── Motion graph ──────────────────────────────────────────────────────────
  const half = useTransform(turn, halfTurn);
  const edge = useTransform(turn, edgeOf);
  const velocity = useVelocity(turn);
  const squashTarget = useTransform(velocity, (v) =>
    clamp(Math.abs(v) / 1100, 0, 1)
  );
  const squash = useSpring(squashTarget, {
    stiffness: 320,
    damping: 15,
    mass: 0.7,
  });
  const press = useSpring(0, { stiffness: 520, damping: 34, mass: 0.6 });
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const px = useSpring(rawX, { stiffness: 190, damping: 24, mass: 0.6 });
  const py = useSpring(rawY, { stiffness: 190, damping: 24, mass: 0.6 });
  const engage = useSpring(0, { stiffness: 150, damping: 22, mass: 0.7 });

  useMotionValueEvent(edge, "change", (value) => {
    if (!refractionOn) return;
    const [sr, sg, sb] = scaleFor(value);
    dispRefR.current?.setAttribute("scale", sr.toFixed(2));
    dispRefG.current?.setAttribute("scale", sg.toFixed(2));
    dispRefB.current?.setAttribute("scale", sb.toFixed(2));
  });

  const cardTransform = useTransform(
    [half, edge, px, py, engage, squash, press],
    ([d, e, x, y, h, q, p]: number[]) => {
      const face = 1 - e;
      const tx = -y * h * tiltMax * face;
      const ty = x * h * tiltMax * face;
      const lift = h * face * 10;
      const along = 1 + 0.05 * gel * q - 0.012 * p;
      const across = 1 - 0.022 * gel * q - 0.012 * p;
      const depthStr = `perspective(${geometry.current.perspective.toFixed(1)}px)`;
      return vertical
        ? `${depthStr} translateZ(${lift.toFixed(2)}px) rotateX(${(-d + tx).toFixed(3)}deg) rotateY(${ty.toFixed(3)}deg) scale(${along.toFixed(4)}, ${across.toFixed(4)})`
        : `${depthStr} translateZ(${lift.toFixed(2)}px) rotateX(${tx.toFixed(3)}deg) rotateY(${(d + ty).toFixed(3)}deg) scale(${across.toFixed(4)}, ${along.toFixed(4)})`;
    }
  );

  const edgeTransform = useTransform(
    [half, squash],
    ([d, q]: number[]) => {
      const { w, h, perspective: p } = geometry.current;
      const s = Math.abs(Math.sin(d * RAD));
      const c = Math.cos(d * RAD);
      const extent = vertical ? h : w;
      const k = p / Math.max(1, p - (extent / 2) * s);
      const offset = -Math.sign(d) * (extent / 2) * c * k;
      const along = (1 + 0.05 * gel * q) * k;
      const width = Math.max(0.001, s * k);
      return vertical
        ? `translate3d(0px, ${offset.toFixed(2)}px, 0px) scale(${along.toFixed(4)}, ${width.toFixed(4)})`
        : `translate3d(${offset.toFixed(2)}px, 0px, 0px) scale(${width.toFixed(4)}, ${along.toFixed(4)})`;
    }
  );

  const flareTransform = useTransform(
    [half, squash],
    ([d, q]: number[]) => {
      const { w, h, perspective: p } = geometry.current;
      const s = Math.abs(Math.sin(d * RAD));
      const c = Math.cos(d * RAD);
      const extent = vertical ? h : w;
      const k = p / Math.max(1, p - (extent / 2) * s);
      const offset = -Math.sign(d) * (extent / 2) * c * k;
      const along = (1 + 0.05 * gel * q) * k;
      return vertical
        ? `translate3d(0px, ${offset.toFixed(2)}px, 0px) scale(${along.toFixed(4)}, 1)`
        : `translate3d(${offset.toFixed(2)}px, 0px, 0px) scale(1, ${along.toFixed(4)})`;
    }
  );

  const edgeOpacity = useTransform(edge, (e) => smooth(0.8, 0.97, e));
  const spectrumOpacity = useTransform(
    edge,
    (e) => (0.25 + 0.75 * dispersion) * smooth(0.9, 0.995, e)
  );
  const flareOpacity = useTransform(
    edge,
    (e) => Math.min(1, light * 1.15) * smooth(0.92, 0.997, e)
  );

  const leadingEdgeLight = useTransform(half, (d) => {
    const a = smooth(0.12, 0.8, Math.abs(Math.sin(d * RAD))) * light;
    if (a < 0.003) return "none";
    const direction = vertical
      ? d > 0
        ? "to bottom"
        : "to top"
      : d > 0
        ? "to right"
        : "to left";
    return `linear-gradient(${direction}, rgba(255,255,255,${(0.5 * a).toFixed(3)}) 0px, rgba(255,255,255,${(0.2 * a).toFixed(3)}) 3px, rgba(255,255,255,${(0.07 * a).toFixed(3)}) 14px, rgba(255,255,255,0) 40px)`;
  });

  const groundTransform = useTransform(half, (d) => {
    const c = Math.abs(Math.cos(d * RAD));
    return vertical
      ? `translateX(-50%) scale(1, ${(0.55 + 0.45 * c).toFixed(4)})`
      : `translateX(-50%) scale(${(0.28 + 0.72 * c).toFixed(4)}, 1)`;
  });

  const causticTransform = useTransform(half, (d) => {
    const { w, perspective: p } = geometry.current;
    const s = Math.sin(d * RAD);
    const c = Math.abs(Math.cos(d * RAD));
    let shift = 0;
    if (!vertical) {
      const right = 1 / Math.max(0.05, 1 + ((w / 2) * s) / p);
      const left = 1 / Math.max(0.05, 1 - ((w / 2) * s) / p);
      shift = (((w / 2) * c * (right - left)) / 2);
    }
    return `translate(calc(-50% + ${shift.toFixed(2)}px), 0px) scale(${(0.55 + 0.45 * c).toFixed(4)}, 1)`;
  });

  const shadowOpacity = useTransform(edge, (e) => 0.6 + 0.4 * (1 - e));
  const causticOpacity = useTransform(
    edge,
    (e) => light * dispersion * 0.9 * smooth(0.2, 0.95, e)
  );

  const lightAngle = useTransform(
    [turn, px, engage],
    ([t, x, h]: number[]) => 205 + t * 2 + x * h * 22
  );
  const rimBackground = useMotionTemplate`conic-gradient(from ${lightAngle}deg at 50% 50%, rgba(255,255,255,.95) 0deg, rgba(255,255,255,.42) 34deg, rgba(255,255,255,.05) 70deg, rgba(0,0,0,.14) 115deg, rgba(255,255,255,.1) 160deg, rgba(255,255,255,.92) 192deg, rgba(255,255,255,.55) 220deg, rgba(255,255,255,.05) 258deg, rgba(0,0,0,.08) 300deg, rgba(255,255,255,.12) 336deg, rgba(255,255,255,.95) 360deg)`;

  const spectrumAngle = useTransform(lightAngle, (a) => a + 48);
  const spectrumBackground = useMotionTemplate`conic-gradient(from ${spectrumAngle}deg at 50% 50%, #ff5f6d, #ffc371, #f4f86f, #58e8a2, #47c7ff, #8a7dff, #ff6fd8, #ff5f6d)`;
  const rimSpectrumOpacity = useTransform(
    edge,
    (e) => dispersion * (0.12 + 0.88 * Math.pow(e, 0.8)) * 0.7
  );

  const bandX = useTransform([half, px, engage], ([d, x, h]: number[]) => {
    const sweep = d === 0 ? -1.4 : clamp((d - 45 * Math.sign(d)) / 34, -1.4, 1.4);
    return `${(sweep * 46 + x * h * 5).toFixed(3)}%`;
  });
  const bandOpacity = useTransform(
    [edge, engage],
    ([e, h]: number[]) => light * (0.12 * h + 0.85 * smooth(0.05, 0.45, e))
  );
  const fresnelOpacity = useTransform(
    edge,
    (e) => light * 0.5 * Math.pow(e, 2.4)
  );

  const lightX = useTransform(px, (x) => 50 + x * 42);
  const lightY = useTransform(py, (y) => 50 + y * 40);
  const pointerLight = useMotionTemplate`radial-gradient(ellipse 62% 46% at ${lightX}% ${lightY}%, rgba(255,255,255,.22), rgba(255,255,255,.07) 42%, rgba(255,255,255,0) 74%)`;
  const pointerOpacity = useTransform(
    [engage, edge],
    ([h, e]: number[]) => h * (1 - e) * light
  );

  const rippleX = useMotionValue(50);
  const rippleY = useMotionValue(50);
  const ripple = useMotionValue(1);
  const rippleInner = useTransform(ripple, (r) => 6 + r * 40);
  const rippleOuter = useTransform(ripple, (r) => 18 + r * 95);
  const rippleBackground = useMotionTemplate`radial-gradient(circle at ${rippleX}% ${rippleY}%, rgba(255,255,255,.46) 0%, rgba(255,255,255,.16) ${rippleInner}%, rgba(255,255,255,0) ${rippleOuter}%)`;
  const rippleOpacity = useTransform(
    ripple,
    (r) => light * Math.pow(1 - r, 1.3)
  );
  const iconRotate = useTransform(turn, (t) => t);

  const staged = live && !reduced;
  const frontPresence = useTransform(turn, (t) =>
    sideOf(t) === "front" ? 1 - edgeOf(t) : 0
  );
  const backPresence = useTransform(turn, (t) =>
    sideOf(t) === "back" ? 1 - edgeOf(t) : 0
  );
  const frontSlotOpacity = useTransform(turn, (t) =>
    sideOf(t) === "front" ? 1 : 0
  );
  const backSlotOpacity = useTransform(turn, (t) =>
    sideOf(t) === "back" ? 1 : 0
  );
  const front = [
    useReveal(frontPresence, 0, staged),
    useReveal(frontPresence, 1, staged),
    useReveal(frontPresence, 2, staged),
  ];
  const back = [
    useReveal(backPresence, 0, staged),
    useReveal(backPresence, 1, staged),
    useReveal(backPresence, 2, staged),
    useReveal(backPresence, 3, staged),
  ];

  // ── Pointer & drag handlers ───────────────────────────────────────────────
  const pointer = React.useRef<DragState | null>(null);
  const stageRect = () => stageRef.current?.getBoundingClientRect() ?? null;

  const trackPointer = (clientX: number, clientY: number, rect: DOMRect) => {
    rawX.set(clamp(((clientX - rect.left) / Math.max(1, rect.width)) * 2 - 1, -1, 1));
    rawY.set(clamp(((clientY - rect.top) / Math.max(1, rect.height)) * 2 - 1, -1, 1));
  };

  const pushDirection = (clientX: number, clientY: number, rect: DOMRect) =>
    vertical
      ? clientY >= rect.top + rect.height / 2
        ? 1
        : -1
      : clientX >= rect.left + rect.width / 2
        ? 1
        : -1;

  const isInteractiveTarget = (target: EventTarget | null) =>
    target instanceof Element &&
    !!target.closest("a:not(.lgf-face),button,input,textarea,select,[data-lgf-interactive]");

  const suppressClickUntil = React.useRef(0);
  const suppressNextClick = () => {
    suppressClickUntil.current = performance.now() + 450;
  };
  const onFaceClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (performance.now() < suppressClickUntil.current) {
      suppressClickUntil.current = 0;
      event.preventDefault();
    }
  };

  const hoverTimer = React.useRef<number | undefined>(undefined);
  const hoverDirection = React.useRef(1);
  const hovering = React.useRef(false);
  React.useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  const onPointerEnter = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!live || event.pointerType !== "mouse") return;
    const rect = stageRect();
    if (!rect) return;
    trackPointer(event.clientX, event.clientY, rect);
    if (!reduced) engage.set(1);
    if (!hoverMode) return;
    hovering.current = true;
    const direction = -pushDirection(event.clientX, event.clientY, rect);
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => {
      if (!hovering.current || sideOf(targetRef.current) !== startSide) return;
      hoverDirection.current = direction;
      const next = targetRef.current + 180 * direction;
      targetRef.current = next;
      runTo(next);
      onFlip?.();
    }, 70);
  };

  const onPointerLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!live || event.pointerType !== "mouse") return;
    engage.set(0);
    if (pointer.current && !pointer.current.active) {
      pointer.current = null;
      press.set(0);
    }
    if (!hoverMode) return;
    hovering.current = false;
    window.clearTimeout(hoverTimer.current);
    if (sideOf(targetRef.current) === startSide) return;
    const next = targetRef.current - 180 * hoverDirection.current;
    targetRef.current = next;
    runTo(next);
    onFlip?.();
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!live || event.button !== 0 || isInteractiveTarget(event.target)) return;
    const rect = stageRect();
    if (!rect) return;
    suppressClickUntil.current = 0;
    pointer.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      start: turn.get(),
      active: false,
      moved: false,
      rect,
      type: event.pointerType,
    };
    if (!reduced) {
      press.set(1);
      rippleX.set(clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100));
      rippleY.set(clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100));
      ripple.jump(0);
      animate(ripple, 1, { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] });
    }
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!live) return;
    const state = pointer.current;
    if (event.pointerType === "mouse" && !(state && state.active)) {
      const rect = stageRect();
      if (rect) trackPointer(event.clientX, event.clientY, rect);
    }
    if (!state || state.id !== event.pointerId) return;

    const dx = event.clientX - state.x;
    const dy = event.clientY - state.y;
    const along = vertical ? dy : dx;
    const across = vertical ? dx : dy;

    if (!state.active) {
      if (!state.moved && dx * dx + dy * dy > 100) state.moved = true;
      if (
        !dragAllowed(state.type) ||
        Math.abs(along) < 8 ||
        Math.abs(along) < Math.abs(across) * 1.2
      ) {
        return;
      }
      state.active = true;
      animationRef.current?.stop();
      state.start = turn.get();
      state.x = event.clientX;
      state.y = event.clientY;
      setDragging(true);
      engage.set(0);
      press.set(0);
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        // noop
      }
      return;
    }

    const extent = vertical ? state.rect.height : state.rect.width;
    const delta = vertical ? event.clientY - state.y : event.clientX - state.x;
    turn.set(state.start + (delta / Math.max(120, extent * 0.9)) * 180);
  };

  const finishDrag = (cancelled: boolean) => {
    suppressNextClick();
    const base = targetRef.current;
    const current = turn.get();
    const speed = turn.getVelocity();
    const projected = cancelled ? current : current + speed * 0.16;
    const next = clamp(Math.round(projected / 180) * 180, base - 180, base + 180);
    targetRef.current = next;
    runTo(next, speed);
    if (next !== base) onFlip?.();
  };

  const onPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = pointer.current;
    if (!state || state.id !== event.pointerId) return;
    pointer.current = null;
    press.set(0);
    if (state.active) {
      setDragging(false);
      finishDrag(false);
      return;
    }
    if (state.moved) {
      suppressNextClick();
      return;
    }
    if (cardLink) {
      if (state.type !== "mouse" && sideOf(targetRef.current) === startSide) {
        suppressNextClick();
        flip(pushDirection(event.clientX, event.clientY, state.rect));
      }
      return;
    }
    if (!hoverMode || state.type !== "mouse") {
      flip(pushDirection(event.clientX, event.clientY, state.rect));
    }
  };

  const onPointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    const state = pointer.current;
    if (!state || state.id !== event.pointerId) return;
    pointer.current = null;
    press.set(0);
    if (state.active) {
      setDragging(false);
      finishDrag(true);
    }
  };

  // Hidden faces leave the accessibility tree and tab order
  const frontRef = React.useRef<HTMLElement | null>(null);
  const backRef = React.useRef<HTMLElement | null>(null);
  const setFrontRef = React.useCallback((el: HTMLElement | null) => {
    frontRef.current = el;
  }, []);
  const setBackRef = React.useCallback((el: HTMLElement | null) => {
    backRef.current = el;
  }, []);

  React.useEffect(() => {
    frontRef.current?.toggleAttribute("inert", side !== "front");
    backRef.current?.toggleAttribute("inert", side !== "back");
  }, [side, cardLink]);

  // ── Render styling variables ──────────────────────────────────────────────
  const dark = surface === "dark";
  const tintAlpha =
    material === "tinted"
      ? 0.3
      : material === "frosted"
        ? 0.16
        : dark
          ? 0.05
          : 0.08;

  const rootStyle = {
    width: "100%",
    height: "100%",
    ...style,
    "--lgf-radius": radiusCSS,
    "--lgf-padding": paddingCSS,
    "--lgf-pt": padTop,
    "--lgf-pr": padRight,
    "--lgf-text": textColor || (dark ? "#FFFFFF" : "#1F1246"),
    "--lgf-soft": textColor
      ? `color-mix(in srgb, ${textColor} 72%, transparent)`
      : dark
        ? "rgba(255,255,255,.74)"
        : "rgba(31,18,70,.7)",
    "--lgf-chip": dark ? "rgba(255,255,255,.14)" : "rgba(255,255,255,.45)",
    "--lgf-chip-hover": dark ? "rgba(255,255,255,.22)" : "rgba(255,255,255,.68)",
    "--lgf-chip-hi": dark ? "rgba(255,255,255,.45)" : "rgba(255,255,255,.92)",
    "--lgf-chip-lo": dark ? "rgba(255,255,255,.08)" : "rgba(255,255,255,.32)",
    "--lgf-text-shadow": dark
      ? "0 1px 2px rgba(0,0,0,.28)"
      : "0 1px 1px rgba(255,255,255,.35)",
    "--lgf-tint": tint,
    "--lgf-tint-alpha": tintAlpha,
    "--lgf-focus": focusColor,
  } as React.CSSProperties;

  const surfaceFilter = refractionOn
    ? `blur(${blur}px) url(#${filterId}) saturate(1.45) brightness(1.02)`
    : `blur(${blur}px) saturate(1.45) brightness(1.02)`;

  const initialScales = scaleFor(0);
  const titleStyle: React.CSSProperties = {
    fontSize: 34,
    fontWeight: 500,
    letterSpacing: "-0.035em",
    lineHeight: 1.05,
    ...titleFont,
  };
  const bodyStyle: React.CSSProperties = {
    fontSize: 15,
    fontWeight: 400,
    letterSpacing: "-0.005em",
    lineHeight: 1.5,
    ...bodyFont,
  };
  const eyebrowStyle: React.CSSProperties = {
    fontFamily: bodyStyle.fontFamily,
  };

  const ctaKind = cardLink
    ? "card"
    : trimmedLink
      ? "link"
      : typeof onButtonTap === "function"
        ? "button"
        : "none";
  const label = buttonLabel?.trim() || "";

  let cta: React.ReactNode = null;
  if (label) {
    const ctaContent = (
      <>
        <span className="lgf-cta-label">{label}</span>
        <ArrowIcon />
      </>
    );
    if (ctaKind === "link") {
      cta = (
        <a
          className="lgf-cta"
          data-kind="link"
          href={trimmedLink}
          target={newTab ? "_blank" : undefined}
          rel={newTab ? "noopener noreferrer" : undefined}
          draggable={false}
        >
          {ctaContent}
        </a>
      );
    } else if (ctaKind === "button") {
      cta = (
        <button
          className="lgf-cta"
          data-kind="button"
          type="button"
          onClick={() => onButtonTap?.()}
        >
          {ctaContent}
        </button>
      );
    } else {
      cta = (
        <span className="lgf-cta" data-kind={ctaKind}>
          {ctaContent}
        </span>
      );
    }
  }

  const hasFrontLayer = React.Children.count(frontLayer) > 0;
  const hasBackLayer = React.Children.count(backLayer) > 0;
  const faceOpacity = (target: "front" | "back") =>
    staged ? 1 : side === target ? 1 : 0;
  const cardLabel =
    (frontTitle || "").split("\n").join(" ").trim() || "Interactive flip card";
  const causticVisible = shadow === "prism";
  const edgeSpan = Math.max(
    0,
    (vertical ? size.w || 360 : size.h || 520) - 2 * cornerRadius
  );
  const shadowVisible = shadow !== "none";

  const renderFace = (target: "front" | "back", children: React.ReactNode) => {
    const refCb = target === "front" ? setFrontRef : setBackRef;
    const isActive = side === target;
    const faceStyle: React.CSSProperties = { opacity: faceOpacity(target) };

    if (!cardLink) {
      return (
        <div
          ref={refCb as React.Ref<HTMLDivElement>}
          className="lgf-face"
          data-active={isActive}
          aria-hidden={!isActive}
          style={faceStyle}
        >
          {children}
        </div>
      );
    }
    return (
      <a
        ref={refCb as React.Ref<HTMLAnchorElement>}
        className="lgf-face"
        data-active={isActive}
        aria-hidden={!isActive}
        style={faceStyle}
        data-link="true"
        href={trimmedLink}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        draggable={false}
        onClick={onFaceClick}
      >
        {children}
      </a>
    );
  };

  return (
    <div
      className={className ? `lgf ${className}` : "lgf"}
      style={rootStyle}
      role="group"
      aria-roledescription="flip card"
      aria-label={cardLabel}
      data-axis={axis}
      data-surface={surface}
      data-shadow={shadow}
      data-trigger={trigger}
      data-live={live}
      data-reduced={reduced}
      data-dragging={dragging}
      data-flip-button={flipButton}
    >
      {refractionOn && maps ? (
        <svg
          aria-hidden="true"
          focusable="false"
          width="0"
          height="0"
          style={{
            position: "absolute",
            width: 0,
            height: 0,
            pointerEvents: "none",
          }}
        >
          <defs>
            <filter
              id={filterId}
              x="0"
              y="0"
              width={maps.width}
              height={maps.height}
              filterUnits="userSpaceOnUse"
              primitiveUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feImage
                href={maps.field}
                x="0"
                y="0"
                width={maps.width}
                height={maps.height}
                preserveAspectRatio="none"
                result="field"
              />
              {dispersion > 0 ? (
                <>
                  <feDisplacementMap
                    ref={dispRefR}
                    in="SourceGraphic"
                    in2="field"
                    scale={initialScales[0]}
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="bentR"
                  />
                  <feColorMatrix
                    in="bentR"
                    type="matrix"
                    values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                    result="red"
                  />
                  <feDisplacementMap
                    ref={dispRefG}
                    in="SourceGraphic"
                    in2="field"
                    scale={initialScales[1]}
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="bentG"
                  />
                  <feColorMatrix
                    in="bentG"
                    type="matrix"
                    values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                    result="green"
                  />
                  <feDisplacementMap
                    ref={dispRefB}
                    in="SourceGraphic"
                    in2="field"
                    scale={initialScales[2]}
                    xChannelSelector="R"
                    yChannelSelector="G"
                    result="bentB"
                  />
                  <feColorMatrix
                    in="bentB"
                    type="matrix"
                    values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                    result="blue"
                  />
                  <feComposite
                    in="red"
                    in2="green"
                    operator="arithmetic"
                    k1="0"
                    k2="1"
                    k3="1"
                    k4="0"
                    result="redGreen"
                  />
                  <feComposite
                    in="redGreen"
                    in2="blue"
                    operator="arithmetic"
                    k1="0"
                    k2="1"
                    k3="1"
                    k4="0"
                  />
                </>
              ) : (
                <feDisplacementMap
                  ref={dispRefR}
                  in="SourceGraphic"
                  in2="field"
                  scale={initialScales[0]}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              )}
            </filter>
          </defs>
        </svg>
      ) : null}

      <div
        ref={stageRef}
        className="lgf-stage"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
      >
        {shadowVisible ? (
          <motion.div
            className="lgf-deco lgf-ground lgf-shadow"
            aria-hidden="true"
            style={{
              width: "78%",
              height: 44,
              marginTop: 0,
              transform: groundTransform,
              opacity: shadowOpacity,
            }}
          />
        ) : null}

        {causticVisible ? (
          <motion.div
            className="lgf-deco lgf-ground lgf-caustic"
            aria-hidden="true"
            style={{
              width: "64%",
              height: 30,
              marginTop: 10,
              transform: causticTransform,
              opacity: causticOpacity,
            }}
          />
        ) : null}

        <motion.div
          ref={cardRef}
          className="lgf-card"
          style={{
            transform: cardTransform,
            willChange: "transform",
          }}
        >
          <div className="lgf-body" aria-hidden="true">
            <div
              className="lgf-surface"
              style={{
                backdropFilter: surfaceFilter,
                WebkitBackdropFilter: surfaceFilter,
              }}
            >
              <div className="lgf-layer lgf-tint" />
              <div className="lgf-layer lgf-shoulder" />
              {maps ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  className="lgf-lightmap"
                  src={maps.light}
                  alt=""
                  draggable={false}
                />
              ) : null}
              <motion.div
                className="lgf-band"
                style={{ x: bandX, opacity: bandOpacity }}
              />
              <motion.div
                className="lgf-layer lgf-fresnel"
                style={{ opacity: fresnelOpacity }}
              />
              <motion.div
                className="lgf-layer"
                style={{ background: leadingEdgeLight }}
              />
              <motion.div
                className="lgf-layer"
                style={{ background: pointerLight, opacity: pointerOpacity }}
              />
              <motion.div
                className="lgf-layer"
                style={{ background: rippleBackground, opacity: rippleOpacity }}
              />
            </div>

            <motion.div
              className="lgf-rim"
              style={{ background: rimBackground }}
            />
            {dispersion > 0 ? (
              <motion.div
                className="lgf-rim"
                style={{
                  background: spectrumBackground,
                  opacity: rimSpectrumOpacity,
                }}
              />
            ) : null}
          </div>

          <button
            type="button"
            className="lgf-flip"
            aria-label={side === "front" ? "Show advisor back card" : "Show advisor portrait"}
            tabIndex={0}
            onClick={(event) => {
              event.stopPropagation();
              flip(1);
            }}
          >
            <motion.span
              style={{
                display: "grid",
                rotate: !reduced ? iconRotate : 0,
              }}
            >
              <FlipIcon />
            </motion.span>
          </button>

          {renderFace(
            "front",
            hasFrontLayer ? (
              <motion.div
                className="lgf-slot"
                style={{ opacity: frontSlotOpacity }}
              >
                <SlotFill node={frontLayer} />
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="lgf-top"
                  style={{
                    ...eyebrowStyle,
                    opacity: front[0].opacity,
                    y: front[0].y,
                  }}
                >
                  {frontEyebrow?.trim() ? (
                    <span className="lgf-eyebrow">{frontEyebrow}</span>
                  ) : null}
                </motion.div>
                <div className="lgf-main">
                  {frontTitle?.trim() ? (
                    <motion.p
                      className="lgf-title"
                      style={{
                        ...titleStyle,
                        opacity: front[1].opacity,
                        y: front[1].y,
                      }}
                    >
                      {frontTitle}
                    </motion.p>
                  ) : null}
                  {frontText?.trim() ? (
                    <motion.p
                      className="lgf-text"
                      style={{
                        ...bodyStyle,
                        opacity: front[2].opacity,
                        y: front[2].y,
                      }}
                    >
                      {frontText}
                    </motion.p>
                  ) : null}
                </div>
              </>
            )
          )}

          {renderFace(
            "back",
            hasBackLayer ? (
              <motion.div
                className="lgf-slot"
                style={{ opacity: backSlotOpacity }}
              >
                <SlotFill node={backLayer} />
              </motion.div>
            ) : (
              <>
                <motion.div
                  className="lgf-top"
                  style={{
                    ...eyebrowStyle,
                    opacity: back[0].opacity,
                    y: back[0].y,
                  }}
                >
                  {backEyebrow?.trim() ? (
                    <span className="lgf-eyebrow">{backEyebrow}</span>
                  ) : null}
                </motion.div>
                <div className="lgf-main">
                  {backTitle?.trim() ? (
                    <motion.p
                      className="lgf-title"
                      style={{
                        ...titleStyle,
                        opacity: back[1].opacity,
                        y: back[1].y,
                      }}
                    >
                      {backTitle}
                    </motion.p>
                  ) : null}
                  {backText?.trim() ? (
                    <motion.p
                      className="lgf-text"
                      style={{
                        ...bodyStyle,
                        opacity: back[2].opacity,
                        y: back[2].y,
                      }}
                    >
                      {backText}
                    </motion.p>
                  ) : null}
                  {cta ? (
                    <motion.div
                      className="lgf-cta-line"
                      style={{
                        ...bodyStyle,
                        opacity: back[3].opacity,
                        y: back[3].y,
                      }}
                    >
                      {cta}
                    </motion.div>
                  ) : null}
                </div>
              </>
            )
          )}
        </motion.div>

        <motion.div
          className="lgf-deco lgf-edge"
          aria-hidden="true"
          style={{
            width: vertical ? edgeSpan : thickness,
            height: vertical ? thickness : edgeSpan,
            marginLeft: -(vertical ? edgeSpan : thickness) / 2,
            marginTop: -(vertical ? thickness : edgeSpan) / 2,
            transform: edgeTransform,
            opacity: edgeOpacity,
          }}
        >
          <motion.div
            className="lgf-edge-spectrum"
            style={{ opacity: spectrumOpacity }}
          />
        </motion.div>

        <motion.div
          className="lgf-deco lgf-flare"
          aria-hidden="true"
          style={{
            width: vertical ? edgeSpan : 88,
            height: vertical ? 88 : edgeSpan,
            marginLeft: -(vertical ? edgeSpan : 88) / 2,
            marginTop: -(vertical ? 88 : edgeSpan) / 2,
            transform: flareTransform,
            opacity: flareOpacity,
          }}
        />
      </div>
    </div>
  );
}

export default LiquidGlassFlipCard;
