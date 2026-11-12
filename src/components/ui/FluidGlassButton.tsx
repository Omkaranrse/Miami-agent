"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import * as THREE from "three";

const VERTEX_SHADER = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
varying vec2 vUv;
uniform float uTime;
uniform float uHover;
uniform float uClick;
uniform vec3 uBaseColor;
uniform vec3 uGlassColor;
uniform vec2 uResolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float f = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    f += amp * noise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return f;
}

void main() {
  float safeH = max(uResolution.y, 1.0);
  float aspect = uResolution.x / safeH;
  vec2 p = vUv * 2.0 - 1.0;
  p.x *= aspect;

  vec2 center = vec2(0.5);
  vec2 dirToCenter = normalize(vUv - center + vec2(0.0001));
  float distToCenter = length(vUv - center);

  // Pill SDF
  float r = 1.0;
  vec2 b = vec2(max(aspect - 1.0, 0.0), 0.0);
  vec2 d = abs(p) - b;
  float dist = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0) - r;
  float innerDist = clamp(abs(dist), 0.0, 1.0);

  // Dynamic liquid noise field
  float t = uTime;
  vec2 noiseUv = vUv * vec2(2.0, 1.0);
  vec2 warp = vec2(fbm(noiseUv + t * 0.5), fbm(noiseUv + t * 0.5 + 12.34)) * mix(0.0, 0.4, uHover);
  warp -= dirToCenter * uClick * 0.25 * smoothstep(0.8, 0.0, distToCenter);

  float n1 = fbm(noiseUv + warp + vec2(t, 0.0));
  float n2 = fbm(noiseUv + warp + vec2(n1, t * 1.2));

  // Glassy rim & specular highlights
  float rimWidth = mix(0.15, 0.35, n2) * mix(1.0, 1.4, uHover);
  rimWidth += uClick * 0.15;
  float rim = smoothstep(rimWidth, 0.0, innerDist);

  float specDist = abs(innerDist - 0.12 + n1 * 0.08);
  float specular = smoothstep(0.03, 0.0, specDist);

  float rightBias = smoothstep(0.2, 1.0, vUv.x);
  rim *= mix(0.6, 1.5, rightBias);
  specular *= mix(0.5, 2.0, rightBias);

  // Twinkling stardust particles
  vec2 starUv = vUv * vec2(aspect * 6.0, 6.0);
  starUv.x -= uTime * 0.2;
  starUv.y += sin(uTime * 0.5 + starUv.x) * mix(0.2, 0.6, uHover);
  starUv += dirToCenter * uClick * 1.5;

  vec2 id = floor(starUv);
  vec2 gv = fract(starUv) - 0.5;
  float nStar = hash(id);
  float star = 0.0;
  float starThreshold = mix(0.94, 0.86, uHover);

  if (nStar > starThreshold) {
    float sizeMod = mix(0.5, 2.5, hash(id + 13.37));
    vec2 localWiggle = vec2(
      sin(uTime * 2.0 + nStar * 50.0),
      cos(uTime * 2.3 + nStar * 40.0)
    ) * 0.25 * uHover;

    float starDist = length(gv - localWiggle) * sizeMod;
    star = smoothstep(0.12, 0.0, starDist);
    star += smoothstep(0.25, 0.0, starDist) * 0.3;

    float twinklePhase = uTime * mix(5.0, 15.0, hash(id + 42.0));
    star *= sin(twinklePhase + nStar * 100.0) * 0.5 + 0.5;
    star *= smoothstep(0.05, 0.2, innerDist);
  }

  vec3 color = uBaseColor;
  float innerLiquid = smoothstep(0.2, 0.9, n2) * (1.0 - innerDist) * mix(0.2, 0.45, uHover);
  color += uGlassColor * innerLiquid;
  color += uGlassColor * rim * mix(0.6, 1.2, uHover);
  color += vec3(1.0) * specular * mix(0.8, 2.0, uHover);
  color += vec3(1.0) * star * mix(0.8, 1.5, uHover);

  color += uGlassColor * rim * uClick * 0.8;
  color += vec3(1.0) * specular * uClick * 1.5;
  color += uGlassColor * exp(-distToCenter * 6.0) * uClick * 0.6;

  color *= smoothstep(1.5, 0.2, length(vUv - 0.5));
  gl_FragColor = vec4(color, 1.0);
}
`;

export interface FluidGlassButtonProps {
  children: ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  onPointerDown?: (e: PointerEvent<HTMLElement>) => void;
  ariaLabel?: string;
  className?: string;
  baseColor?: string;
  glassColor?: string;
  hoverSpeed?: number;
}

export function FluidGlassButton({
  children,
  href,
  target,
  rel,
  type = "button",
  disabled = false,
  onClick,
  onPointerDown,
  ariaLabel,
  className = "px-7 py-3.5 text-[14px]",
  baseColor = "#4C24AE",
  glassColor = "#C8AEFF",
  hoverSpeed = 0.75,
}: FluidGlassButtonProps) {
  const canvasWrapRef = useRef<HTMLSpanElement | null>(null);
  const hoverRef = useRef(0);
  const clickRef = useRef(0);
  const [pressed, setPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Lazy mount/dispose WebGL within viewport margin to stay well under Chromium context limits
  useEffect(() => {
    const el = canvasWrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "160px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || disabled) return;
    const container = canvasWrapRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const srgbBase = new THREE.Color(baseColor).convertLinearToSRGB();
    const srgbGlass = new THREE.Color(glassColor).convertLinearToSRGB();
    const uniforms = {
      uTime: { value: 0 },
      uHover: { value: 0 },
      uClick: { value: 0 },
      uBaseColor: { value: srgbBase },
      uGlassColor: { value: srgbGlass },
      uResolution: {
        value: new THREE.Vector2(
          Math.max(container.clientWidth, 1),
          Math.max(container.clientHeight, 1)
        ),
      },
    };

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(
      Math.max(container.clientWidth, 1),
      Math.max(container.clientHeight, 1)
    );
    container.appendChild(renderer.domElement);

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      uniforms,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId = 0;
    let timeAccum = 0;
    let lastTime = performance.now();
    let curHover = 0;
    let curClick = 0;

    const tick = (now: number) => {
      frameId = requestAnimationFrame(tick);
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      curHover = THREE.MathUtils.lerp(curHover, hoverRef.current, delta * 4.5);
      if (clickRef.current > 0) {
        curClick = clickRef.current;
        clickRef.current = 0;
      }
      curClick = THREE.MathUtils.lerp(curClick, 0, delta * 6);

      const speed = THREE.MathUtils.lerp(0.18, hoverSpeed, curHover);
      timeAccum += delta * speed;

      uniforms.uTime.value = timeAccum;
      uniforms.uHover.value = curHover;
      uniforms.uClick.value = curClick;
      renderer.render(scene, camera);
    };

    frameId = requestAnimationFrame(tick);

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(entry.contentRect.width, 1);
        const h = Math.max(entry.contentRect.height, 1);
        renderer.setSize(w, h);
        uniforms.uResolution.value.set(w, h);
      }
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [isVisible, disabled, baseColor, glassColor, hoverSpeed]);

  const handleMouseEnter = useCallback(() => {
    hoverRef.current = 1;
  }, []);

  const handleMouseLeave = useCallback(() => {
    hoverRef.current = 0;
    setPressed(false);
  }, []);

  const handlePointerDownEvt = useCallback(
    (e: PointerEvent<HTMLElement>) => {
      clickRef.current = 1;
      setPressed(true);
      onPointerDown?.(e);
    },
    [onPointerDown]
  );

  const handlePointerUpEvt = useCallback(() => {
    setPressed(false);
  }, []);

  const sharedClasses = `relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-gradient-to-r from-[#3B188A] via-[#5329B8] to-[#7445E5] font-sans font-semibold tracking-[0.02em] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22),0_14px_30px_-8px_rgba(74,34,168,0.58)] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C52EB] ${
    pressed ? "scale-[0.96]" : "hover:scale-[1.015]"
  } ${disabled ? "pointer-events-none opacity-60" : "cursor-pointer"} ${className}`;

  const innerContent = (
    <>
      <span
        ref={canvasWrapRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 block overflow-hidden rounded-full"
      />
      <span className="relative z-10 inline-flex items-center justify-center gap-2.5 [text-shadow:0_2px_10px_rgba(255,255,255,0.28)]">
        {children}
      </span>
    </>
  );

  if (href) {
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      return (
        <Link
          href={href}
          aria-label={ariaLabel}
          onClick={onClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onPointerDown={handlePointerDownEvt}
          onPointerUp={handlePointerUpEvt}
          className={sharedClasses}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <a
        href={href}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onPointerDown={handlePointerDownEvt}
        onPointerUp={handlePointerUpEvt}
        className={sharedClasses}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDownEvt}
      onPointerUp={handlePointerUpEvt}
      className={sharedClasses}
    >
      {innerContent}
    </button>
  );
}
