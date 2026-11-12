"use client";

/**
 * Gradient Navbar — adapted from Framer component (Matthias Ölschlegel)
 * WebGL domain-warped liquid shader + radial gradient fallback, hover tint easing,
 * soft glow under hovered link, pointer swirl, and responsive container-query collapse.
 */

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export interface GradientNavItem {
  title: string;
  link: string;
  newTab?: boolean;
  tint?: string;
}

export interface GradientNavbarProps {
  logo?: {
    type?: "text" | "image";
    text?: string;
    mark?: boolean;
    react?: boolean;
    color?: string;
    image?: {
      src: string;
      alt?: string;
      width?: number;
      height?: number;
    };
    height?: number;
    link?: string;
    newTab?: boolean;
  };
  items?: GradientNavItem[];
  cta?: {
    show?: boolean;
    label?: string;
    link?: string;
    newTab?: boolean;
    tint?: string;
    fill?: string;
    hoverFill?: string;
    text?: string;
    radius?: string;
    padding?: string;
  };
  font?: React.CSSProperties;
  links?: {
    text?: string;
    hoverText?: string;
    align?: "center" | "end";
    gap?: number;
  };
  gradient?: {
    base?: string;
    color1?: string;
    color2?: string;
    color3?: string;
    color4?: string;
    shift?: number;
    glow?: boolean;
    ease?: number;
    drift?: number;
    scale?: number;
    mouse?: number;
  };
  bar?: {
    padding?: string;
    radius?: string;
    border?: {
      borderWidth?: number;
      borderStyle?: string;
      borderColor?: string;
    } | null;
    shadow?: string;
  };
  mobile?: {
    collapse?: number;
    icon?: string;
    radius?: number;
  };
  style?: React.CSSProperties;
  className?: string;
}

type RGB = [number, number, number];

const DEFAULT_ITEMS: GradientNavItem[] = [
  { title: "Properties", link: "/listings", tint: "#8B5CF6" },
  { title: "Buy", link: "/buy", tint: "#7C3AED" },
  { title: "Sell", link: "/sell", tint: "#A78BFA" },
  { title: "About", link: "/about-us", tint: "#6D28D9" },
  { title: "Our Team", link: "/agents", tint: "#9333EA" },
  { title: "Contact", link: "/contact", tint: "#6366F1" },
];

const DEFAULT_SHADOW = "0px 16px 38px -18px rgba(20, 10, 48, 0.64)";

const NAMED: Record<string, RGB> = {
  white: [255, 255, 255],
  black: [0, 0, 0],
  transparent: [0, 0, 0],
};

function parseColor(value: string | undefined, fallback: RGB): RGB {
  if (!value) return fallback;
  let v = value.trim();
  const token = /^var\(\s*--[^,]+,\s*(.+)\)$/.exec(v);
  if (token) v = token[1].trim();
  if (NAMED[v.toLowerCase()]) return NAMED[v.toLowerCase()];
  if (v[0] === "#") {
    let h = v.slice(1);
    if (h.length === 3 || h.length === 4) {
      h = h
        .slice(0, 3)
        .split("")
        .map((c) => c + c)
        .join("");
    }
    if (h.length === 6 || h.length === 8) {
      const n = parseInt(h.slice(0, 6), 16);
      if (isFinite(n)) return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
    }
    return fallback;
  }
  const m = /^rgba?\(([^)]+)\)$/i.exec(v);
  if (m) {
    const parts = m[1]
      .split(/[\s,/]+/)
      .filter(Boolean)
      .slice(0, 3)
      .map(parseFloat);
    if (parts.length === 3 && parts.every((p) => isFinite(p))) {
      return [parts[0], parts[1], parts[2]];
    }
  }
  return fallback;
}

function mix(a: RGB, b: RGB, t: number): RGB {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function rgba(c: RGB, a = 1): string {
  return `rgba(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])}, ${a.toFixed(3)})`;
}

function clamp(v: number, a: number, b: number): number {
  return v < a ? a : v > b ? b : v;
}

function normPadding(value: string | number | undefined, fallback: string): string {
  if (typeof value === "number") return `${value}px`;
  const parts = String(value ?? "")
    .trim()
    .split(/\s+/)
    .filter((t) => /^-?\d*\.?\d+(px|em|rem|%)?$/.test(t))
    .map((t) => (/^-?\d*\.?\d+$/.test(t) ? `${t}px` : t));
  if (parts.length === 0) return fallback;
  const [t, r = t, b = t, l = r] = parts;
  return `${t} ${r} ${b} ${l}`;
}

const BLOBS = [
  { x: 8, y: 30, ax: 10, ay: 40, w: 0.21, p: 0, sx: 38, sy: 260 },
  { x: 38, y: 90, ax: 14, ay: 50, w: 0.17, p: 1.7, sx: 34, sy: 240 },
  { x: 66, y: 10, ax: 12, ay: 45, w: 0.19, p: 3.1, sx: 36, sy: 250 },
  { x: 94, y: 70, ax: 9, ay: 40, w: 0.15, p: 4.4, sx: 32, sy: 260 },
];

function paint(
  base: RGB,
  colors: RGB[],
  t: number,
  drift: number,
  glowColor: RGB,
  glowX: number,
  glowA: number,
  size?: { w: number; h: number }
): string {
  const ry = (pct: number) =>
    size && size.h > 0
      ? `${Math.min((size.h * pct) / 100, size.w * 0.42).toFixed(1)}px`
      : `${pct}%`;
  const layers: string[] = [];
  if (glowA > 0.002) {
    layers.push(
      `radial-gradient(ellipse 22% ${ry(210)} at ${glowX.toFixed(2)}% 115%, ${rgba(
        glowColor,
        0.85 * glowA
      )} 0%, ${rgba(glowColor, 0)} 70%)`
    );
  }
  for (let i = 0; i < BLOBS.length; i++) {
    const b = BLOBS[i];
    const a = t * b.w + b.p;
    const x = b.x + Math.sin(a) * b.ax * drift;
    const y = b.y + Math.cos(a * 1.3) * b.ay * drift;
    layers.push(
      `radial-gradient(ellipse ${b.sx}% ${ry(b.sy)} at ${x.toFixed(2)}% ${y.toFixed(
        2
      )}%, ${rgba(colors[i], 0.8)} 0%, ${rgba(colors[i], 0)} 72%)`
    );
  }
  layers.push(rgba(base));
  return layers.join(", ");
}

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 uRes;
uniform float uPx, uTime, uScale, uGlowA, uGlowX;
uniform vec3 uBase, uC0, uC1, uC2, uC3, uGlow, uMouse;
float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<4;i++){v+=a*n(p);p=m*p;a*=.5;}return v;}
void main(){
 vec2 css=vec2(gl_FragCoord.x,uRes.y-gl_FragCoord.y)/uPx;
 vec2 p=css/uScale;
 vec2 m=uMouse.xy/uScale; vec2 d=p-m; float fall=exp(-dot(d,d)*3.5)*uMouse.z;
 float a=fall*1.4; p=m+mat2(cos(a),-sin(a),sin(a),cos(a))*d; p-=d*fall*.35;
 float t=uTime;
 vec2 q=vec2(fbm(p+vec2(0.,t*.16)),fbm(p+vec2(5.2,1.3)-vec2(t*.13,0.)));
 vec2 r=vec2(fbm(p+2.2*q+vec2(1.7,9.2)+t*.19),fbm(p+2.2*q+vec2(8.3,2.8)-t*.15));
 float f=fbm(p+1.8*r+vec2(t*.07,-t*.05));
 vec3 col=mix(uC0,uC1,smoothstep(.36,.6,f));
 col=mix(col,uC2,smoothstep(.6,.8,length(q)));
 col=mix(col,uC3,smoothstep(.5,.66,r.y)*.9);
 float lum=smoothstep(.25,.75,f*.55+r.x*.5);
 col=mix(uBase,col,.48+.52*lum);
 col=clamp(mix(vec3(dot(col,vec3(.299,.587,.114))),col,1.18),0.,1.);
 float gx=(css.x-uGlowX)/(uScale*.42); float gy=css.y/(uRes.y/uPx);
 col=mix(col,uGlow,clamp(uGlowA*exp(-gx*gx)*(.35+.65*gy),0.,1.));
 col+=(h(gl_FragCoord.xy+t)-.5)/255.;
 gl_FragColor=vec4(col,1.);
}`;

function createLiquid(canvas: HTMLCanvasElement) {
  let gl: WebGLRenderingContext | null = null;
  try {
    gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      premultipliedAlpha: false,
      powerPreference: "low-power",
    });
  } catch {
    gl = null;
  }
  if (!gl) return null;
  const g = gl;
  const sh = (type: number, src: string) => {
    const o = g.createShader(type);
    if (!o) return null;
    g.shaderSource(o, src);
    g.compileShader(o);
    return g.getShaderParameter(o, g.COMPILE_STATUS) ? o : null;
  };
  const vs = sh(g.VERTEX_SHADER, VERT);
  const fs = sh(g.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return null;
  const prog = g.createProgram();
  if (!prog) return null;
  g.attachShader(prog, vs);
  g.attachShader(prog, fs);
  g.linkProgram(prog);
  if (!g.getProgramParameter(prog, g.LINK_STATUS)) return null;
  g.useProgram(prog);

  const buf = g.createBuffer();
  g.bindBuffer(g.ARRAY_BUFFER, buf);
  g.bufferData(
    g.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    g.STATIC_DRAW
  );
  const loc = g.getAttribLocation(prog, "p");
  g.enableVertexAttribArray(loc);
  g.vertexAttribPointer(loc, 2, g.FLOAT, false, 0, 0);

  const U = (name: string) => g.getUniformLocation(prog, name);
  const u = {
    res: U("uRes"),
    px: U("uPx"),
    time: U("uTime"),
    scale: U("uScale"),
    glowA: U("uGlowA"),
    glowX: U("uGlowX"),
    base: U("uBase"),
    c0: U("uC0"),
    c1: U("uC1"),
    c2: U("uC2"),
    c3: U("uC3"),
    glow: U("uGlow"),
    mouse: U("uMouse"),
  };
  const c3 = (l: WebGLUniformLocation | null, c: RGB) =>
    g.uniform3f(l, c[0] / 255, c[1] / 255, c[2] / 255);

  return {
    draw(v: {
      w: number;
      h: number;
      px: number;
      time: number;
      scale: number;
      glowA: number;
      glowX: number;
      base: RGB;
      colors: RGB[];
      glow: RGB;
      mouse: [number, number, number];
    }) {
      const W = Math.max(1, Math.round(v.w * v.px));
      const H = Math.max(1, Math.round(v.h * v.px));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      g.viewport(0, 0, W, H);
      g.uniform2f(u.res, W, H);
      g.uniform1f(u.px, v.px);
      g.uniform1f(u.time, v.time);
      g.uniform1f(u.scale, v.scale);
      g.uniform1f(u.glowA, v.glowA);
      g.uniform1f(u.glowX, v.glowX);
      c3(u.base, v.base);
      c3(u.c0, v.colors[0]);
      c3(u.c1, v.colors[1]);
      c3(u.c2, v.colors[2]);
      c3(u.c3, v.colors[3]);
      c3(u.glow, v.glow);
      g.uniform3f(u.mouse, v.mouse[0], v.mouse[1], v.mouse[2]);
      g.drawArrays(g.TRIANGLES, 0, 3);
    },
    lost: () => g.isContextLost(),
    dispose() {
      g.getExtension("WEBGL_lose_context")?.loseContext();
    },
  };
}

function useCleanId() {
  const raw = React.useId();
  return "gn" + raw.replace(/[^a-zA-Z0-9_-]/g, "");
}

function isExternalHref(href: string): boolean {
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  );
}

interface SmartLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  newTab?: boolean;
  children: React.ReactNode;
}

function SmartLink({ href, newTab, children, ...rest }: SmartLinkProps) {
  if (!href) {
    return (
      <a aria-disabled="true" {...rest}>
        {children}
      </a>
    );
  }
  if (newTab || isExternalHref(href)) {
    return (
      <a
        href={href}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

export function GradientNavbar(props: GradientNavbarProps) {
  const pathname = usePathname();
  const {
    logo = {},
    items: rawItems,
    cta = {},
    font,
    links = {},
    gradient = {},
    bar = {},
    mobile = {},
    style,
    className,
  } = props;

  const items = rawItems && rawItems.length > 0 ? rawItems : DEFAULT_ITEMS;
  const uid = useCleanId();

  const linkText = links.text ?? "rgba(255, 255, 255, 0.78)";
  const linkHover = links.hoverText ?? "#FFFFFF";
  const linkGap = links.gap ?? 4;
  const linkAlign = links.align ?? "center";

  const barPadding = normPadding(bar.padding, "10px 12px 10px 24px");
  const barRadius = bar.radius ?? "999px";
  const barShadow = bar.shadow ?? DEFAULT_SHADOW;
  const border =
    bar.border === undefined
      ? {
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "rgba(255, 255, 255, 0.14)",
        }
      : bar.border;

  const showCta = cta.show ?? true;
  const ctaPadding = normPadding(cta.padding, "12px 22px 12px 22px");
  const ctaRadius = cta.radius ?? "999px";
  const ctaFill = cta.fill ?? "#FFFFFF";
  const ctaHoverFill = cta.hoverFill ?? "rgba(255, 255, 255, 0.88)";
  const ctaText = cta.text ?? "#241748";

  const collapseAt = clamp(mobile.collapse ?? 880, 0, 4000);
  const iconColor = mobile.icon ?? "#FFFFFF";
  const menuRadius = clamp(mobile.radius ?? 28, 0, 80);

  const base = React.useMemo(
    () => parseColor(gradient.base ?? "#241748", [36, 23, 72]),
    [gradient.base]
  );
  const palette: RGB[] = React.useMemo(
    () => [
      parseColor(gradient.color1 ?? "#2F1D61", [47, 29, 97]),
      parseColor(gradient.color2 ?? "#482D8F", [72, 45, 143]),
      parseColor(gradient.color3 ?? "#6640BE", [102, 64, 190]),
      parseColor(gradient.color4 ?? "#A78BFA", [167, 139, 250]),
    ],
    [gradient.color1, gradient.color2, gradient.color3, gradient.color4]
  );

  const shift = clamp((gradient.shift ?? 78) / 100, 0, 1);
  const glowOn = gradient.glow ?? true;
  const drift = clamp((gradient.drift ?? 35) / 100, 0, 1);
  const liquidScale = clamp(gradient.scale ?? 100, 30, 300);
  const mouseAmt = clamp((gradient.mouse ?? 35) / 100, 0, 1);
  const ease = clamp(gradient.ease ?? 1.2, 0.1, 3);
  const tints = React.useMemo(
    () => items.map((it) => parseColor(it.tint, palette[3])),
    [items, palette]
  );

  const logoReact = logo.react ?? true;
  const logoRGB = React.useMemo(
    () => parseColor(logo.color ?? "#FFFFFF", [255, 255, 255]),
    [logo.color]
  );
  const ctaTint = React.useMemo(
    () => parseColor(cta.tint ?? "#7C5CFF", palette[3]),
    [cta.tint, palette]
  );

  const rootRef = React.useRef<HTMLElement | null>(null);
  const bgRef = React.useRef<HTMLDivElement | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const menuButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const rowRef = React.useRef<HTMLDivElement | null>(null);
  const orbTintRef = React.useRef<HTMLSpanElement | null>(null);
  const orbGlowRef = React.useRef<HTMLSpanElement | null>(null);
  const logoTextRef = React.useRef<HTMLSpanElement | null>(null);
  const logoImgRef = React.useRef<HTMLSpanElement | null>(null);

  const [rowH, setRowH] = React.useState(0);
  const [openPath, setOpenPath] = React.useState<string | null>(null);
  const open = openPath === pathname;
  const [hovered, setHovered] = React.useState(-1);

  React.useEffect(() => {
    const row = rowRef.current;
    if (!row || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setRowH(row.offsetHeight));
    ro.observe(row);
    return () => ro.disconnect();
  }, []);

  const live = React.useRef({
    base,
    palette,
    tints,
    ctaTint,
    shift,
    glowOn,
    drift,
    liquidScale,
    mouseAmt,
    ease,
    logoReact,
    logoRGB,
    target: -1,
    glowX: 50,
    mouse: { x: 0, y: 0, inside: false },
  });

  const anim = React.useRef<{ kick: () => void } | null>(null);

  React.useEffect(() => {
    live.current.base = base;
    live.current.palette = palette;
    live.current.tints = tints;
    live.current.ctaTint = ctaTint;
    live.current.shift = shift;
    live.current.glowOn = glowOn;
    live.current.drift = drift;
    live.current.liquidScale = liquidScale;
    live.current.mouseAmt = mouseAmt;
    live.current.ease = ease;
    live.current.logoReact = logoReact;
    live.current.logoRGB = logoRGB;
    live.current.target = hovered;
    anim.current?.kick();
  }, [
    base,
    palette,
    tints,
    ctaTint,
    shift,
    glowOn,
    drift,
    liquidScale,
    mouseAmt,
    ease,
    logoReact,
    logoRGB,
    hovered,
  ]);

  const targetOf = React.useCallback((index: number): RGB | null => {
    const L = live.current;
    if (index < 0) return null;
    return index < L.tints.length ? L.tints[index] : L.ctaTint;
  }, []);

  React.useEffect(() => {
    const el = bgRef.current;
    const root = rootRef.current;
    if (!el || !root) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const L = live.current;
    const state = {
      cur: L.palette.map((c) => [...c] as RGB),
      curBase: [...L.base] as RGB,
      midCols: L.palette.map((c) => [...c] as RGB),
      midBase: [...L.base] as RGB,
      glowColor: [...L.palette[0]] as RGB,
      midGlow: [...L.palette[0]] as RGB,
      glowA: 0,
      midA: 0,
      logoA: 0,
      midLogoA: 0,
      logoKey: "",
      glowX: 50,
      t: 0,
      raf: 0,
      last: 0,
      visible: true,
      h: 0,
      mouseA: 0,
      mx: 0,
      my: 0,
      kick: () => {},
    };
    anim.current = state;

    const canvas = canvasRef.current;
    let liquid = canvas ? createLiquid(canvas) : null;
    let shown = false;

    const onLost = (e: Event) => {
      e.preventDefault();
      liquid = null;
      if (canvas) canvas.style.opacity = "0";
    };
    canvas?.addEventListener("webglcontextlost", onLost);

    const frame = (now: number) => {
      state.raf = 0;
      const dt = state.last
        ? clamp((now - state.last) / 1000, 1 / 240, 1 / 20)
        : 1 / 60;
      state.last = now;
      const curL = live.current;
      const tint = targetOf(curL.target);

      const k = reduce ? 1 : 1 - Math.exp(-dt / (curL.ease * 0.24));
      let moving = false;

      const chase = (mid: RGB, cur: RGB, goal: RGB) => {
        for (let j = 0; j < 3; j++) {
          mid[j] += (goal[j] - mid[j]) * k;
          const d = mid[j] - cur[j];
          if (Math.abs(goal[j] - cur[j]) > 0.3) moving = true;
          cur[j] += d * k;
        }
      };

      for (let i = 0; i < 4; i++) {
        const goal = tint
          ? mix(curL.palette[i], tint, curL.shift * (0.8 + 0.2 * (i % 2)))
          : curL.palette[i];
        chase(state.midCols[i], state.cur[i], goal);
      }
      chase(
        state.midBase,
        state.curBase,
        tint ? mix(curL.base, tint, curL.shift * 0.32) : curL.base
      );
      if (tint) chase(state.midGlow, state.glowColor, tint);

      const glowGoal = tint && curL.glowOn ? 1 : 0;
      state.midA += (glowGoal - state.midA) * k;
      state.glowA += (state.midA - state.glowA) * k;

      const logoGoal = tint && curL.logoReact ? 1 : 0;
      state.midLogoA += (logoGoal - state.midLogoA) * k;
      state.logoA += (state.midLogoA - state.logoA) * k;
      if (Math.abs(logoGoal - state.logoA) > 0.002) moving = true;

      state.glowX +=
        (curL.glowX - state.glowX) * (reduce ? 1 : 1 - Math.exp(-dt / 0.3));

      const a = state.logoA;
      const g = state.glowColor;
      const logoKey = `${a.toFixed(3)}|${g.map(Math.round).join(",")}|${curL.logoRGB.join(",")}`;
      if (logoKey !== state.logoKey) {
        state.logoKey = logoKey;
        const orb = orbTintRef.current;
        if (orb) {
          orb.style.background = `radial-gradient(circle at 34% 30%, ${rgba(
            mix(g, [255, 255, 255], 0.55)
          )} 0%, ${rgba(g)} 48%, ${rgba(mix(g, curL.base, 0.45))} 100%)`;
          orb.style.opacity = a.toFixed(3);
        }
        const glowEl = orbGlowRef.current;
        if (glowEl) {
          glowEl.style.boxShadow = `inset 0 0 0 1px rgba(255,255,255,0.28), inset 0 3px 6px rgba(255,255,255,0.35), 0 0 ${
            14 + 6 * a
          }px ${rgba(mix([255, 255, 255], g, a), 0.12 + 0.63 * a)}`;
        }
        const text = logoTextRef.current;
        if (text) {
          text.style.color = rgba(mix(curL.logoRGB, g, 0.18 * a));
          text.style.textShadow =
            a > 0.001 ? `0 0 16px ${rgba(g, 0.7 * a)}` : "none";
        }
        const img = logoImgRef.current;
        if (img) {
          img.style.filter =
            a > 0.001 ? `drop-shadow(0 0 10px ${rgba(g, 0.65 * a)})` : "none";
        }
      }

      if (root.offsetHeight !== state.h) {
        state.h = root.offsetHeight;
        moving = true;
      }
      if (
        Math.abs(glowGoal - state.glowA) > 0.002 ||
        Math.abs(curL.glowX - state.glowX) > 0.05
      ) {
        moving = true;
      }

      const driftOn = !reduce && curL.drift > 0;
      if (driftOn) state.t += dt * curL.drift * 2;

      const M = curL.mouse;
      const mGoal = M.inside && !reduce ? curL.mouseAmt : 0;
      const km = 1 - Math.exp(-dt / 0.25);
      state.mouseA += (mGoal - state.mouseA) * km;
      if (M.inside) {
        state.mx += (M.x - state.mx) * km;
        state.my += (M.y - state.my) * km;
      }
      if (Math.abs(mGoal - state.mouseA) > 0.002) moving = true;

      if (liquid && !liquid.lost()) {
        const w = root.offsetWidth;
        const hgt = root.offsetHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        liquid.draw({
          w,
          h: hgt,
          px: dpr * 0.5,
          time: state.t + 20,
          scale: 3.4 * curL.liquidScale,
          base: state.curBase,
          colors: state.cur,
          glow: state.glowColor,
          glowA: Math.min(state.glowA * curL.shift * 0.55, 0.6),
          glowX: (state.glowX / 100) * w,
          mouse: [state.mx, state.my, state.mouseA],
        });
        if (!shown && canvas) {
          shown = true;
          canvas.style.opacity = "1";
        }
      } else {
        el.style.background = paint(
          state.curBase,
          state.cur,
          state.t,
          curL.drift,
          state.glowColor,
          state.glowX,
          Math.min(state.glowA * curL.shift * 1.5, 1),
          { w: root.offsetWidth, h: root.offsetHeight }
        );
      }

      if ((driftOn || moving) && state.visible && !document.hidden) {
        state.raf = requestAnimationFrame(frame);
      } else {
        state.last = 0;
      }
    };

    state.kick = () => {
      if (!state.raf && state.visible && !document.hidden) {
        state.raf = requestAnimationFrame(frame);
      }
    };

    const io = new IntersectionObserver((entries) => {
      state.visible = entries[entries.length - 1].isIntersecting;
      if (state.visible) state.kick();
    });
    io.observe(root);

    const onVis = () => state.kick();
    document.addEventListener("visibilitychange", onVis);
    state.kick();

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      canvas?.removeEventListener("webglcontextlost", onLost);
      liquid?.dispose();
      if (state.raf) cancelAnimationFrame(state.raf);
      anim.current = null;
    };
  }, [targetOf]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPath(null);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    const root = rootRef.current;
    let ro: ResizeObserver | null = null;
    if (root && typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        if (root.offsetWidth >= collapseAt) setOpenPath(null);
      });
      ro.observe(root);
    }
    return () => {
      window.removeEventListener("keydown", onKey);
      ro?.disconnect();
    };
  }, [open, collapseAt]);

  const tapTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  React.useEffect(() => {
    return () => {
      if (tapTimer.current) clearTimeout(tapTimer.current);
    };
  }, []);

  const enter = React.useCallback(
    (
      index: number,
      e: React.PointerEvent<HTMLElement> | React.FocusEvent<HTMLElement>,
      touch = false
    ) => {
      if (!touch && "pointerType" in e && e.pointerType !== "mouse") return;
      const root = rootRef.current;
      const target = e.currentTarget;
      if (root && target) {
        const r = root.getBoundingClientRect();
        const t = target.getBoundingClientRect();
        if (r.width > 0) {
          live.current.glowX = clamp(
            ((t.left + t.width / 2 - r.left) / r.width) * 100,
            0,
            100
          );
        }
      }
      setHovered(index);
    },
    []
  );

  const leave = React.useCallback(
    (index: number) => setHovered((h) => (h === index ? -1 : h)),
    []
  );

  const onItemPointerEnter = React.useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      const idx = Number(e.currentTarget.dataset.navIndex ?? -1);
      if (idx >= 0) enter(idx, e);
    },
    [enter]
  );

  const onItemPointerLeave = React.useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      const idx = Number(e.currentTarget.dataset.navIndex ?? -1);
      if (idx >= 0 && e.pointerType === "mouse") leave(idx);
    },
    [leave]
  );

  const onItemPointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLAnchorElement>) => {
      if (e.pointerType === "mouse") return;
      const idx = Number(e.currentTarget.dataset.navIndex ?? -1);
      if (idx < 0) return;
      enter(idx, e, true);
      if (tapTimer.current) clearTimeout(tapTimer.current);
      tapTimer.current = setTimeout(() => leave(idx), 2200);
    },
    [enter, leave]
  );

  const onItemFocus = React.useCallback(
    (e: React.FocusEvent<HTMLAnchorElement>) => {
      const idx = Number(e.currentTarget.dataset.navIndex ?? -1);
      if (idx >= 0) enter(idx, e);
    },
    [enter]
  );

  const onItemBlur = React.useCallback(
    (e: React.FocusEvent<HTMLAnchorElement>) => {
      const idx = Number(e.currentTarget.dataset.navIndex ?? -1);
      if (idx >= 0) leave(idx);
    },
    [leave]
  );

  const singleRadius = /^\s*[\d.]+px\s*$/.test(barRadius)
    ? parseFloat(barRadius)
    : null;
  const closedRadius =
    singleRadius !== null && rowH > 0
      ? `${Math.min(singleRadius, rowH / 2)}px`
      : barRadius;
  const openRadius =
    singleRadius !== null
      ? `${Math.min(singleRadius, menuRadius)}px`
      : barRadius;

  const restBackground = paint(base, palette, 0, drift, palette[0], 50, 0);
  const c = `.${uid}`;
  const css = `
${c}{container-type:inline-size;}
${c} *{box-sizing:border-box;}
${c} .gn-link{color:${linkText};transition:color .6s cubic-bezier(.25,.1,.25,1),opacity .6s;text-decoration:none;cursor:pointer;border-radius:10px;outline:none;-webkit-tap-highlight-color:transparent;}
${c} .gn-link:hover,${c} .gn-link[data-on="1"]{color:${linkHover};}
${c} .gn-link[data-active="1"]{color:${linkHover};}
${c} .gn-link:focus-visible,${c} .gn-cta:focus-visible,${c} .gn-burger:focus-visible,${c} .gn-logo:focus-visible{outline:2px solid ${linkHover};outline-offset:2px;}
${c} .gn-cta{background:${ctaFill};color:${ctaText};transition:background .6s cubic-bezier(.25,.1,.25,1),transform .35s cubic-bezier(.2,.7,.2,1);text-decoration:none;cursor:pointer;outline:none;-webkit-tap-highlight-color:transparent;}
${c} .gn-cta:hover{background:${ctaHoverFill};}
${c} .gn-cta:active{transform:scale(.97);}
${c} a[aria-disabled]{cursor:default;}
${c} .gn-burger{display:none;}
${c} .gn-panel{display:none;}
@container (max-width:${Math.max(collapseAt - 0.02, 0)}px){
${c} .gn-desk{display:none !important;}
${c} .gn-burger{display:flex;}
${c} .gn-panel{display:grid;}
}
${c} .gn-mark{animation:${uid}-spin 14s linear infinite;}
@keyframes ${uid}-spin{to{transform:rotate(360deg);}}
@media (prefers-reduced-motion:reduce){${c} .gn-mark{animation:none;}}
@media (prefers-reduced-motion:reduce){${c} .gn-panel,${c} .gn-panel-inner,${c} .gn-burger span{transition:none !important;}}
`;

  const fontStyle: React.CSSProperties = {
    fontFamily: "var(--font-sans)",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.02em",
    lineHeight: "1.2em",
    textTransform: "none",
    ...font,
  };

  const logoNode =
    logo.type === "image" && logo.image?.src ? (
      <span ref={logoImgRef} style={{ display: "inline-flex", alignItems: "center" }}>
        <Image
          src={logo.image.src}
          alt={logo.image.alt || logo.text || "Move Miami Realtor"}
          width={logo.image.width ?? 150}
          height={logo.image.height ?? 52}
          priority
          style={{ height: logo.height ?? 34, width: "auto", display: "block" }}
          draggable={false}
        />
      </span>
    ) : (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 9 }}>
        {(logo.mark ?? true) && (
          <span
            aria-hidden="true"
            className="gn-orb"
            style={{ position: "relative", width: 20, height: 20, flexShrink: 0, borderRadius: 999 }}
          >
            <span
              className="gn-mark"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                background: `conic-gradient(from 210deg, ${rgba(palette[0])}, ${rgba(
                  palette[1]
                )}, ${rgba(palette[3])}, ${rgba(palette[2])}, ${rgba(palette[0])})`,
              }}
            />
            <span
              ref={orbTintRef}
              style={{ position: "absolute", inset: 0, borderRadius: 999, opacity: 0 }}
            />
            <span
              ref={orbGlowRef}
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.28), inset 0 3px 6px rgba(255,255,255,0.35), 0 0 14px rgba(255,255,255,0.12)",
              }}
            />
          </span>
        )}
        <span
          ref={logoTextRef}
          style={{
            fontSize: 19,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: "1em",
            color: logo.color ?? "#FFFFFF",
            whiteSpace: "nowrap",
          }}
        >
          {logo.text ?? "Move Miami"}
        </span>
      </span>
    );

  const ctaLabel = cta.label ?? "WhatsApp";
  const panelId = `${uid}-menu`;

  return (
    <nav
      ref={rootRef}
      className={className ? `${uid} ${className}` : uid}
      aria-label="Primary navigation"
      onPointerMove={(e) => {
        const r = rootRef.current?.getBoundingClientRect();
        if (!r || e.pointerType !== "mouse") return;
        const M = live.current.mouse;
        M.x = e.clientX - r.left;
        M.y = e.clientY - r.top;
        M.inside = true;
        anim.current?.kick();
      }}
      onPointerLeave={() => {
        live.current.mouse.inside = false;
        anim.current?.kick();
      }}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderRadius: open ? openRadius : closedRadius,
        transition: "border-radius .5s cubic-bezier(.2,.7,.2,1)",
        overflow: "hidden",
        boxShadow: barShadow,
        isolation: "isolate",
        ...style,
      }}
    >
      <style>{css}</style>
      <div
        ref={bgRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          background: restBackground,
          pointerEvents: "none",
        }}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          display: "block",
          pointerEvents: "none",
          opacity: 0,
          transition: "opacity .6s ease",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%)",
          ...(border
            ? {
                borderWidth: border.borderWidth,
                borderStyle: border.borderStyle,
                borderColor: border.borderColor,
              }
            : null),
        }}
      />

      <div
        ref={rowRef}
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns:
            linkAlign === "center" ? "1fr auto 1fr" : "auto 1fr auto",
          alignItems: "center",
          columnGap: 16,
          padding: barPadding,
          minHeight: 0,
        }}
      >
        <SmartLink
          className="gn-logo"
          href={logo.link ?? "/"}
          newTab={logo.newTab}
          aria-label="Move Miami Realtor Home"
          style={{
            gridColumn: 1,
            justifySelf: "start",
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            borderRadius: 6,
            outline: "none",
          }}
        >
          {logoNode}
        </SmartLink>

        <ul
          className="gn-desk"
          style={{
            gridColumn: 2,
            justifySelf: linkAlign === "center" ? "center" : "end",
            listStyle: "none",
            margin: 0,
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: linkGap,
          }}
          onPointerLeave={(e) => {
            if (e.pointerType === "mouse") setHovered(-1);
          }}
        >
          {items.map((it, i) => {
            const active =
              it.link === pathname ||
              (it.link !== "/" && pathname.startsWith(it.link));
            return (
              <li key={it.link + it.title} style={{ display: "flex" }}>
                <SmartLink
                  className="gn-link"
                  data-nav-index={i}
                  data-on={hovered === i ? "1" : "0"}
                  data-active={active ? "1" : "0"}
                  href={it.link}
                  newTab={it.newTab}
                  onPointerEnter={onItemPointerEnter}
                  onPointerLeave={onItemPointerLeave}
                  onPointerDown={onItemPointerDown}
                  onFocus={onItemFocus}
                  onBlur={onItemBlur}
                  style={{
                    ...fontStyle,
                    padding: "8px 12px",
                    whiteSpace: "nowrap",
                    userSelect: "none",
                  }}
                >
                  {it.title}
                </SmartLink>
              </li>
            );
          })}
        </ul>

        <div
          style={{
            gridColumn: 3,
            justifySelf: "end",
            display: "flex",
            alignItems: "center",
          }}
        >
          {showCta && (
            <SmartLink
              className="gn-cta gn-desk"
              data-nav-index={items.length}
              href={cta.link}
              newTab={cta.newTab}
              onPointerEnter={onItemPointerEnter}
              onPointerLeave={onItemPointerLeave}
              onPointerDown={onItemPointerDown}
              onFocus={onItemFocus}
              onBlur={onItemBlur}
              style={{
                ...fontStyle,
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                padding: ctaPadding,
                borderRadius: ctaRadius,
                whiteSpace: "nowrap",
                flexShrink: 0,
                userSelect: "none",
              }}
            >
              {ctaLabel}
            </SmartLink>
          )}

          <button
            ref={menuButtonRef}
            type="button"
            className="gn-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpenPath((prev) => (prev === pathname ? null : pathname))}
            style={{
              width: 44,
              height: 44,
              flexShrink: 0,
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              border: "none",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              cursor: "pointer",
              padding: 0,
              outline: "none",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {[0, 1].map((n) => (
              <span
                key={n}
                style={{
                  position: "absolute",
                  left: 14,
                  right: 14,
                  height: 1.5,
                  borderRadius: 2,
                  background: iconColor,
                  top: "50%",
                  transition: "transform .4s cubic-bezier(.2,.7,.2,1)",
                  transform: open
                    ? `translateY(-50%) rotate(${n ? -45 : 45}deg)`
                    : `translateY(calc(-50% ${n ? "+ 4px" : "- 4px"}))`,
                }}
              />
            ))}
          </button>
        </div>
      </div>

      <div
        id={panelId}
        className="gn-panel"
        style={{
          position: "relative",
          zIndex: 1,
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows .5s cubic-bezier(.2,.7,.2,1)",
        }}
        {...(!open ? { inert: true, "aria-hidden": true } : {})}
      >
        <div className="gn-panel-inner" style={{ overflow: "hidden", minHeight: 0 }}>
          <ul
            onPointerLeave={(e) => {
              if (e.pointerType === "mouse") setHovered(-1);
            }}
            style={{
              listStyle: "none",
              margin: 0,
              padding: "4px 12px 14px 12px",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              opacity: open ? 1 : 0,
              transform: open ? "none" : "translateY(-6px)",
              transition:
                "opacity .4s cubic-bezier(.2,.7,.2,1), transform .5s cubic-bezier(.2,.7,.2,1)",
            }}
          >
            {items.map((it, i) => (
              <li key={it.link + it.title} style={{ display: "flex" }}>
                <SmartLink
                  className="gn-link"
                  data-nav-index={i}
                  data-on={hovered === i ? "1" : "0"}
                  href={it.link}
                  newTab={it.newTab}
                  onPointerEnter={onItemPointerEnter}
                  onPointerLeave={onItemPointerLeave}
                  onPointerDown={onItemPointerDown}
                  onFocus={onItemFocus}
                  onBlur={onItemBlur}
                  onClick={() => {
                    if (it.link) setOpenPath(null);
                  }}
                  style={{
                    ...fontStyle,
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    width: "100%",
                    padding: "12px 10px",
                    userSelect: "none",
                  }}
                >
                  {it.title}
                </SmartLink>
              </li>
            ))}
            {showCta && (
              <li style={{ display: "flex", paddingTop: 8 }}>
                <SmartLink
                  className="gn-cta"
                  data-nav-index={items.length}
                  href={cta.link}
                  newTab={cta.newTab}
                  onPointerEnter={onItemPointerEnter}
                  onPointerLeave={onItemPointerLeave}
                  onPointerDown={onItemPointerDown}
                  onFocus={onItemFocus}
                  onBlur={onItemBlur}
                  onClick={() => {
                    if (cta.link) setOpenPath(null);
                  }}
                  style={{
                    ...fontStyle,
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    padding: ctaPadding,
                    borderRadius: ctaRadius,
                    userSelect: "none",
                  }}
                >
                  {ctaLabel}
                </SmartLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
