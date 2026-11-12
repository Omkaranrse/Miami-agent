"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as CANNON from "cannon-es";

interface GravityInstagramCubesProps {
  href: string;
  cubeCount?: number;
  cubeSize?: number;
  gravity?: number;
  bounciness?: number;
  staggerDelay?: number;
  initialDropSpeed?: number;
}

type CubePaletteVariant = "instagram-classic" | "instagram-royal" | "instagram-lilac";

function createInstagram4KTexture(variant: CubePaletteVariant): THREE.CanvasTexture {
  const size = 2048;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  // Background gradient per cube face
  if (variant === "instagram-classic") {
    const grad = ctx.createLinearGradient(0, size, size, 0);
    grad.addColorStop(0, "#FEDA75");
    grad.addColorStop(0.26, "#FA7E1E");
    grad.addColorStop(0.55, "#D62976");
    grad.addColorStop(0.8, "#962FBF");
    grad.addColorStop(1, "#4F5BD5");
    ctx.fillStyle = grad;
  } else if (variant === "instagram-royal") {
    const grad = ctx.createLinearGradient(0, size, size, 0);
    grad.addColorStop(0, "#3D1B8E");
    grad.addColorStop(0.5, "#673AE0");
    grad.addColorStop(1, "#A87CFF");
    ctx.fillStyle = grad;
  } else {
    const grad = ctx.createLinearGradient(0, size, size, 0);
    grad.addColorStop(0, "#5126B8");
    grad.addColorStop(0.55, "#8E5AF7");
    grad.addColorStop(1, "#F472B6");
    ctx.fillStyle = grad;
  }
  ctx.fillRect(0, 0, size, size);

  // Soft glossy highlight sheen across upper-left corner
  const sheen = ctx.createRadialGradient(
    size * 0.22,
    size * 0.18,
    size * 0.04,
    size * 0.35,
    size * 0.35,
    size * 0.72
  );
  sheen.addColorStop(0, "rgba(255, 255, 255, 0.32)");
  sheen.addColorStop(1, "rgba(255, 255, 255, 0)");
  ctx.fillStyle = sheen;
  ctx.fillRect(0, 0, size, size);

  // Subtle rounded inner frame edge
  ctx.strokeStyle = "rgba(255, 255, 255, 0.32)";
  ctx.lineWidth = size * 0.025;
  const pad = size * 0.04;
  ctx.beginPath();
  ctx.roundRect(pad, pad, size - pad * 2, size - pad * 2, size * 0.12);
  ctx.stroke();

  // Crisp 4K Instagram Glyph centered on cube face
  ctx.strokeStyle = "#FFFFFF";
  ctx.fillStyle = "#FFFFFF";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const glyphBox = size * 0.56;
  const gx = (size - glyphBox) / 2;
  const gy = (size - glyphBox) / 2;
  const lineW = size * 0.046;
  ctx.lineWidth = lineW;

  // Outer rounded camera square
  ctx.beginPath();
  ctx.roundRect(gx, gy, glyphBox, glyphBox, glyphBox * 0.27);
  ctx.stroke();

  // Center camera lens ring
  ctx.beginPath();
  ctx.arc(size / 2, size / 2, glyphBox * 0.23, 0, Math.PI * 2);
  ctx.stroke();

  // Top-right flash dot
  ctx.beginPath();
  ctx.arc(
    gx + glyphBox * 0.77,
    gy + glyphBox * 0.23,
    glyphBox * 0.06,
    0,
    Math.PI * 2
  );
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

export function GravityInstagramCubes({
  href,
  cubeCount = 4,
  cubeSize = 2.1,
  gravity = 28,
  bounciness = 0.42,
  staggerDelay = 160,
  initialDropSpeed = 4.5,
}: GravityInstagramCubesProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isInViewport, setIsInViewport] = useState(false);
  const isInViewportRef = useRef(false);
  const [hoveringCube, setHoveringCube] = useState(false);
  const [webglUnsupported, setWebglUnsupported] = useState(false);

  useEffect(() => {
    isInViewportRef.current = isInViewport;
  }, [isInViewport]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInViewport(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !isInViewport) return;

    const width = container.clientWidth;
    const height = container.clientHeight;
    if (width === 0 || height === 0) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      queueMicrotask(() => setWebglUnsupported(true));
      return;
    }

    const scene = new THREE.Scene();
    const frustumSize = 8.4;
    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(
      (frustumSize * aspect) / -2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      1000
    );
    camera.position.z = 10;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // Cannon-es Physics World
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -gravity, 0),
      allowSleep: true,
    });
    const cubeMat = new CANNON.Material("cubeMat");
    const wallMat = new CANNON.Material("wallMat");
    world.addContactMaterial(
      new CANNON.ContactMaterial(cubeMat, wallMat, {
        friction: 0.45,
        restitution: bounciness,
      })
    );
    world.addContactMaterial(
      new CANNON.ContactMaterial(cubeMat, cubeMat, {
        friction: 0.35,
        restitution: bounciness,
      })
    );

    let walls: CANNON.Body[] = [];
    const wallThickness = 10;
    const updateWalls = () => {
      walls.forEach((w) => world.removeBody(w));
      walls = [];
      const curW = Math.max(container.clientWidth, 1);
      const curH = Math.max(container.clientHeight, 1);
      const viewW = frustumSize * (curW / curH);
      const viewH = frustumSize;
      const configs = [
        { w: viewW * 2, h: wallThickness, x: 0, y: -viewH / 2 - wallThickness / 2 },
        { w: viewW * 2, h: wallThickness, x: 0, y: viewH / 2 + wallThickness / 2 },
        { w: wallThickness, h: viewH * 2, x: -viewW / 2 - wallThickness / 2, y: 0 },
        { w: wallThickness, h: viewH * 2, x: viewW / 2 + wallThickness / 2, y: 0 },
      ];
      configs.forEach((cfg) => {
        const body = new CANNON.Body({
          type: CANNON.Body.STATIC,
          material: wallMat,
          shape: new CANNON.Box(new CANNON.Vec3(cfg.w / 2, cfg.h / 2, 5)),
        });
        body.position.set(cfg.x, cfg.y, 0);
        world.addBody(body);
        walls.push(body);
      });
    };
    updateWalls();

    const handleResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      const newAspect = w / h;
      camera.left = (frustumSize * newAspect) / -2;
      camera.right = (frustumSize * newAspect) / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateWalls();
    };
    window.addEventListener("resize", handleResize);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 1.9));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.25);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 4K Instagram Textures
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    const textures = (
      ["instagram-classic", "instagram-royal", "instagram-lilac"] as const
    ).map((variant) => {
      const tex = createInstagram4KTexture(variant);
      tex.anisotropy = maxAniso;
      return tex;
    });

    const responsiveCount = width < 640 ? Math.min(7, cubeCount) : cubeCount;
    const responsiveSize = width < 640 ? cubeSize * 0.85 : cubeSize;
    const geometry = new THREE.BoxGeometry(
      responsiveSize,
      responsiveSize,
      responsiveSize
    );
    const materials = textures.map(
      (tex) =>
        new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.35,
          metalness: 0.08,
          emissive: new THREE.Color("#ffffff"),
          emissiveMap: tex,
          emissiveIntensity: 0.16,
        })
    );

    const cubes: { mesh: THREE.Mesh; body: CANNON.Body }[] = [];
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    const spanX = Math.max(4, (frustumSize * aspect) * 0.56);

    for (let i = 0; i < responsiveCount; i++) {
      const timer = setTimeout(() => {
        const mat = materials[i % materials.length];
        const mesh = new THREE.Mesh(geometry, mat);
        scene.add(mesh);

        // Evenly distribute the 4 cubes horizontally with natural slight jitter
        const slot =
          responsiveCount > 1
            ? (i / (responsiveCount - 1) - 0.5) * spanX
            : 0;
        const offsetX = slot + (Math.random() - 0.5) * 0.6;

        const body = new CANNON.Body({
          mass: 1.5,
          shape: new CANNON.Box(
            new CANNON.Vec3(
              responsiveSize / 2,
              responsiveSize / 2,
              responsiveSize / 2
            )
          ),
          position: new CANNON.Vec3(offsetX, 4.4, 0),
          velocity: new CANNON.Vec3(
            (Math.random() - 0.5) * 0.8,
            -initialDropSpeed,
            0
          ),
          material: cubeMat,
          linearDamping: 0.2,
          angularDamping: 0.45,
        });
        body.quaternion.setFromEuler(
          (Math.random() - 0.5) * 0.9,
          (Math.random() - 0.5) * 1.1,
          (Math.random() - 0.5) * 0.8
        );
        world.addBody(body);
        cubes.push({ mesh, body });
      }, i * staggerDelay);
      timeouts.push(timer);
    }

    const raycaster = new THREE.Raycaster();
    const pointerNDC = new THREE.Vector2();

    const getCubeHits = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const mX = ((clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
      const mY = -((clientY - rect.top) / Math.max(rect.height, 1)) * 2 + 1;
      pointerNDC.set(mX, mY);
      raycaster.setFromCamera(pointerNDC, camera);
      return raycaster.intersectObjects(cubes.map((c) => c.mesh));
    };

    const onMouseMove = (e: MouseEvent) => {
      const hits = getCubeHits(e.clientX, e.clientY);
      setHoveringCube(hits.length > 0);
    };

    const onClick = (e: MouseEvent) => {
      const hits = getCubeHits(e.clientX, e.clientY);
      if (hits.length > 0) {
        window.open(href, "_blank", "noopener,noreferrer");
      }
    };

    const onMouseLeave = () => setHoveringCube(false);

    container.addEventListener("mousemove", onMouseMove);
    container.addEventListener("click", onClick);
    container.addEventListener("mouseleave", onMouseLeave);

    let frameId = 0;
    const animateLoop = () => {
      if (!isInViewportRef.current) return;
      world.step(1 / 60);
      cubes.forEach((c) => {
        c.body.position.z = 0;
        c.body.velocity.z = 0;
        c.mesh.position.set(c.body.position.x, c.body.position.y, 0);
        c.mesh.quaternion.set(
          c.body.quaternion.x,
          c.body.quaternion.y,
          c.body.quaternion.z,
          c.body.quaternion.w
        );
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animateLoop);
    };
    animateLoop();

    return () => {
      cancelAnimationFrame(frameId);
      timeouts.forEach((t) => clearTimeout(t));
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("click", onClick);
      container.removeEventListener("mouseleave", onMouseLeave);
      geometry.dispose();
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [
    bounciness,
    cubeCount,
    cubeSize,
    gravity,
    href,
    initialDropSpeed,
    isInViewport,
    staggerDelay,
  ]);

  if (webglUnsupported) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[14px] font-semibold text-[#3B1E8A] hover:underline"
        >
          Visit @movemiami on Instagram
        </a>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="Instagram 3D gravity cubes linking to @movemiami"
      className={`h-full w-full overflow-hidden ${
        hoveringCube ? "cursor-pointer" : "cursor-default"
      }`}
    />
  );
}

