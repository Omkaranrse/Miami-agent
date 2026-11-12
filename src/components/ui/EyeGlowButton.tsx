"use client";

import React, { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

interface EyeGlowButtonProps {
  children: React.ReactNode;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onPointerDown?: React.PointerEventHandler<HTMLElement>;
  ariaLabel?: string;
  className?: string;
  accent?: string;
  secondary?: string;
  visorColor?: string;
  eyeColor?: string;
  pupilColor?: string;
  lensSize?: number;
  showEyes?: boolean;
  tracking?: boolean;
}

export function EyeGlowButton({
  children,
  href,
  target,
  rel,
  type = "button",
  disabled = false,
  onClick,
  onPointerDown,
  ariaLabel,
  className = "",
  accent = "#8B5CF6",
  secondary = "#D4C2FF",
  visorColor = "#1B0E40",
  eyeColor = "#F5F0FF",
  pupilColor = "#1B0E40",
  lensSize = 28,
  showEyes = true,
  tracking = true,
}: EyeGlowButtonProps) {
  const eyeClipId = useId().replace(/:/g, "") + "-iris-clip";
  const rootRef = useRef<HTMLElement | null>(null);
  const lensRef = useRef<HTMLSpanElement | null>(null);
  const reducedPref = Boolean(useReducedMotion());
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const reduced = mounted && reducedPref;

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [inView, setInView] = useState(true);

  const gazeX = useMotionValue(0);
  const gazeY = useMotionValue(0);
  const smoothGazeX = useSpring(gazeX, { stiffness: 260, damping: 28 });
  const smoothGazeY = useSpring(gazeY, { stiffness: 260, damping: 28 });

  const spotX = useMotionValue(0);
  const spotY = useMotionValue(0);
  const smoothSpotX = useSpring(spotX, { stiffness: 200, damping: 30 });
  const smoothSpotY = useSpring(spotY, { stiffness: 200, damping: 30 });

  const isActive = !disabled && (hovered || focused || pressed);
  const shouldAnimate = !reduced && inView && !disabled;

  // Observe visibility so offscreen buttons don't compute pointer transforms
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Single rAF-throttled pointer listener updating both spotlight and visor gaze
  useEffect(() => {
    if (!shouldAnimate) {
      gazeX.set(0);
      gazeY.set(0);
      spotX.set(0);
      spotY.set(0);
      return;
    }

    if (!tracking || !showEyes) {
      gazeX.set(0);
      gazeY.set(0);
    }

    let frame = 0;
    let clientX = 0;
    let clientY = 0;

    const update = () => {
      frame = 0;
      const box = rootRef.current?.getBoundingClientRect();
      if (!box) return;

      spotX.set(Math.max(-box.width / 2, Math.min(box.width / 2, clientX - box.left - box.width / 2)));
      spotY.set(Math.max(-box.height / 2, Math.min(box.height / 2, clientY - box.top - box.height / 2)));

      if (tracking && showEyes) {
        const lens = lensRef.current?.getBoundingClientRect();
        if (!lens) return;
        const dx = clientX - lens.left - lens.width / 2;
        const dy = clientY - lens.top - lens.height / 2;
        gazeX.set(Math.tanh(dx / 115) * 3);
        gazeY.set(Math.tanh(dy / 140) * 2.8);
      }
    };

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      clientX = e.clientX;
      clientY = e.clientY;
      if (!frame) {
        frame = window.requestAnimationFrame(update);
      }
    };

    const reset = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      gazeX.set(0);
      gazeY.set(0);
      spotX.set(0);
      spotY.set(0);
      setPressed(false);
      setHovered(false);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [shouldAnimate, tracking, showEyes, gazeX, gazeY, spotX, spotY]);

  const setRef = (node: HTMLElement | null) => {
    rootRef.current = node;
  };

  const ringMaskStyle: React.CSSProperties = {
    padding: 1,
    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
  };

  const hasCustomPadding = /\bp[xytrbl]?-/.test(className);
  const hasPosition = /\b(absolute|fixed|sticky)\b/.test(className);
  const paddingClasses = hasCustomPadding ? "" : showEyes ? "py-2 pl-6 pr-2.5" : "px-5 py-3";
  const layoutClasses = showEyes ? "justify-between gap-3.5" : "justify-center gap-0";

  const sharedClasses = `${hasPosition ? "" : "relative"} isolate inline-flex min-h-[44px] items-center ${layoutClasses} overflow-hidden rounded-full border border-[#DED4F8] bg-white/95 font-sans font-semibold tracking-[0.01em] text-[#21124B] select-none backdrop-blur-md transition-[transform,box-shadow,opacity,border-color] duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7C52EB] ${paddingClasses} ${
    disabled ? "pointer-events-none opacity-45" : "cursor-pointer"
  } ${className}`;

  const dynamicStyle: React.CSSProperties = {
    boxShadow: isActive
      ? "0 8px 22px -4px rgba(82, 40, 184, 0.24), inset 0 1px 0 #FFFFFF, inset 0 -1px 0 rgba(92, 49, 199, 0.1)"
      : "0 4px 12px -2px rgba(42, 20, 96, 0.12), inset 0 1px 0 #FFFFFF, inset 0 -1px 0 rgba(92, 49, 199, 0.08)",
    transform: pressed && !reduced ? "scale(0.975)" : "scale(1)",
  };

  const eventHandlers = {
    onPointerEnter: (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType !== "touch" && !disabled) setHovered(true);
    },
    onPointerLeave: () => {
      setHovered(false);
      setPressed(false);
    },
    onPointerDown: (e: React.PointerEvent<HTMLElement>) => {
      if (!disabled && e.button === 0) {
        if (e.pointerType === "touch") {
          spotX.set(0);
          spotY.set(0);
        }
        setPressed(true);
      }
      onPointerDown?.(e);
    },
    onPointerUp: () => setPressed(false),
    onPointerCancel: () => {
      setPressed(false);
      setHovered(false);
    },
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      const visible = e.currentTarget.matches(":focus-visible");
      setFocused(visible);
      if (visible) {
        spotX.set(0);
        spotY.set(0);
      }
    },
    onBlur: () => {
      setFocused(false);
      setPressed(false);
    },
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      setPressed(false);
      if (disabled) {
        e.preventDefault();
        return;
      }
      onClick?.(e);
    },
  };

  const innerContent = (
    <>
      {/* Resting soft iridescent border */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          ...ringMaskStyle,
          background: `linear-gradient(115deg, ${accent} 0%, ${secondary} 25%, rgba(255,255,255,0.4) 48%, ${secondary} 72%, ${accent} 100%)`,
          opacity: isActive ? 0.68 : 0.45,
        }}
      />

      {/* Ambient idle orbiting conic beam */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] transition-opacity duration-300"
        style={{
          ...ringMaskStyle,
          opacity: isActive ? 0.25 : 0.52,
        }}
      >
        <span
          className="mm-iris-beam absolute left-[-40%] top-1/2 aspect-square w-[180%]"
          style={{
            marginTop: "-90%",
            background: `conic-gradient(from 90deg, transparent 0deg, ${secondary} 110deg, transparent 180deg, transparent 240deg, ${accent} 300deg, #FFFFFF 326deg, transparent 350deg)`,
            animationDuration: "12s",
            animationPlayState: shouldAnimate ? "running" : "paused",
          }}
        />
      </span>

      {/* Active hover bright orbiting conic beam */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit] transition-opacity duration-300"
        style={{
          ...ringMaskStyle,
          opacity: isActive ? 0.92 : 0,
        }}
      >
        <span
          className="mm-iris-beam absolute left-[-40%] top-1/2 aspect-square w-[180%]"
          style={{
            marginTop: "-90%",
            background: `conic-gradient(from 90deg, transparent 0deg, transparent 240deg, ${accent} 300deg, #FFFFFF 326deg, transparent 345deg)`,
            animationDuration: "3.8s",
            animationPlayState: shouldAnimate && isActive ? "running" : "paused",
          }}
        />
      </span>

      {/* Outer pearl/lavender halo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[2px] -z-10 rounded-[inherit] blur-[9px] transition-opacity duration-300"
        style={{
          background: `linear-gradient(115deg, ${accent}, transparent 42%, ${secondary} 75%, ${accent})`,
          opacity: isActive ? 0.24 : 0.1,
        }}
      />

      {/* Top pearl sheen wash */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{
          background:
            "linear-gradient(170deg, rgba(255,255,255,0.9) 0%, transparent 52%, rgba(92,49,199,0.05) 100%)",
        }}
      />

      {/* Interactive pointer spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
      >
        <motion.span
          initial={false}
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -90,
            marginTop: -75,
            width: 180,
            height: 150,
            x: shouldAnimate ? smoothSpotX : 0,
            y: shouldAnimate ? smoothSpotY : 0,
            background:
              "radial-gradient(ellipse, rgba(167, 139, 250, 0.22), transparent 72%)",
          }}
        />
      </span>

      {/* Button Text / Left Content */}
      <span
        className={`relative z-10 inline-flex items-center gap-2 ${
          showEyes ? "min-w-0 text-left" : "justify-center"
        }`}
      >
        {children}
      </span>

      {/* EyeGlow Cursor-Tracking Visor */}
      {showEyes && (
        <motion.span
          ref={lensRef}
          aria-hidden="true"
          initial={false}
          animate={{ y: isActive && shouldAnimate ? -1 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 grid shrink-0 place-items-center rounded-full"
          style={{
            width: lensSize * 1.5,
            height: lensSize,
            background: visorColor,
            border: `1px solid ${
              isActive ? "rgba(157, 123, 255, 0.55)" : "rgba(33, 18, 75, 0.3)"
            }`,
            boxShadow: isActive
              ? "inset 0 1px 4px rgba(0,0,0,0.7), inset 0 -1px 0 rgba(255,255,255,0.14), 0 2px 6px rgba(92,49,199,0.28)"
              : "inset 0 1px 4px rgba(0,0,0,0.85), 0 1px 0 rgba(255,255,255,0.2)",
          }}
        >
          <span
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              background: "linear-gradient(160deg, rgba(255,255,255,0.12), transparent 55%)",
            }}
          />
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 56 36"
            className="overflow-visible"
          >
            <defs>
              <clipPath id={eyeClipId}>
                {[19, 37].map((cx) => (
                  <rect key={cx} x={cx - 7} y="8.5" width="14" height="19" rx="7" />
                ))}
              </clipPath>
            </defs>
            {[19, 37].map((cx) => (
              <rect
                key={cx}
                x={cx - 7}
                y="8.5"
                width="14"
                height="19"
                rx="7"
                fill={eyeColor}
              />
            ))}
            <g clipPath={`url(#${eyeClipId})`}>
              <motion.g
                style={{
                  x: reduced ? 0 : smoothGazeX,
                  y: reduced ? 0 : smoothGazeY,
                }}
              >
                {[19, 37].map((cx) => (
                  <rect
                    key={cx}
                    x={cx - 3.25}
                    y="13.5"
                    width="6.5"
                    height="9"
                    rx="3.25"
                    fill={pupilColor}
                  />
                ))}
              </motion.g>
            </g>
          </svg>
        </motion.span>
      )}
    </>
  );

  if (href && !disabled) {
    const isInternal = href.startsWith("/") && !target;
    if (isInternal) {
      return (
        <Link
          ref={setRef as React.Ref<HTMLAnchorElement>}
          href={href}
          aria-label={ariaLabel}
          className={sharedClasses}
          style={dynamicStyle}
          {...eventHandlers}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <a
        ref={setRef as React.Ref<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
        aria-label={ariaLabel}
        className={sharedClasses}
        style={dynamicStyle}
        {...eventHandlers}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={setRef as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      aria-label={ariaLabel}
      className={sharedClasses}
      style={dynamicStyle}
      {...eventHandlers}
    >
      {innerContent}
    </button>
  );
}
