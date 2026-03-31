"use client";

import {
  Suspense,
  useRef,
  useState,
  useEffect,
  useCallback,
  memo,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  ContactShadows,
  Html,
} from "@react-three/drei";
import * as THREE from "three";
import { Maximize2, Minimize2, RotateCcw, ZoomIn, SkipForward } from "lucide-react";

// ─── Preload hint ─────────────────────────────────────────────────────────────
if (typeof window !== "undefined") {
  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "fetch";
  link.href = "/models/roommerged.glb";
  document.head.appendChild(link);
}

// ═══════════════════════════════════════════════════════════════════════════════
// CINEMATIC DATA — 58-second "day in the life" of Mangesh Sarde
// Camera positions are in Three.js world space after GLB is auto-scaled.
// Room fits inside ~3.5 units, centred at origin in fullscreen view.
// ═══════════════════════════════════════════════════════════════════════════════
const CINEMATIC_DURATION = 58;

interface Waypoint {
  t: number;                             // seconds into cinematic
  pos: [number, number, number];         // camera world position
  look: [number, number, number];        // camera look-at target
  ambientHex: string;                    // ambient light colour
  ambientInt: number;                    // ambient light intensity
  dirHex: string;                        // directional light colour
  dirInt: number;                        // directional light intensity
  subtitle: string;                      // on-screen caption (empty = none)
}

const WAYPOINTS: Waypoint[] = [
  // ── 0-3s   Fade-in, wide establishing shot (no subtitle yet)
  {
    t: 0, pos: [2.2, 2.0, 5.0], look: [0, 0.2, 0],
    ambientHex: "#ffe4c8", ambientInt: 0.55,
    dirHex: "#ffe090", dirInt: 1.1,
    subtitle: "",
  },
  // ── 3-10s  Wide shot + title card
  {
    t: 3, pos: [2.2, 2.0, 5.0], look: [0, 0.2, 0],
    ambientHex: "#ffe4c8", ambientInt: 0.6,
    dirHex: "#ffe090", dirInt: 1.2,
    subtitle: "Mangesh Sarde's world — in 60 seconds",
  },
  // ── 10-20s  Drift toward bed area (morning)
  {
    t: 10, pos: [-1.6, 0.5, 3.2], look: [-1.2, 0.0, 0.2],
    ambientHex: "#ffd08a", ambientInt: 0.5,
    dirHex: "#ffc060", dirInt: 0.9,
    subtitle: "6:30 AM — Nagpur mornings. Mind already racing before the alarm.",
  },
  // ── 20-30s  Swing to whiteboard (research)
  {
    t: 20, pos: [-0.6, 1.6, 2.2], look: [-0.5, 0.5, -1.2],
    ambientHex: "#fff6f0", ambientInt: 0.72,
    dirHex: "#fffff0", dirInt: 1.4,
    subtitle: "10 AM — 5G network slices on the whiteboard. CSISense hologram running.",
  },
  // ── 30-40s  Desk / ESP32 / AirShoes
  {
    t: 30, pos: [1.7, 1.0, 2.4], look: [1.3, 0.5, 0.2],
    ambientHex: "#e8f0ff", ambientInt: 0.65,
    dirHex: "#d0e0ff", dirInt: 1.2,
    subtitle: "2 PM — ESP32. Breadboard. AirShoes insole. One pressure sensor at a time.",
  },
  // ── 40-50s  Monitor close-up (evening coding)
  {
    t: 40, pos: [0.9, 0.9, 1.9], look: [0.7, 0.7, -0.4],
    ambientHex: "#7090d0", ambientInt: 0.32,
    dirHex: "#3858a8", dirInt: 0.55,
    subtitle: "8 PM — Screen glow. Rust. Python. Always one more commit.",
  },
  // ── 50-57s  Pull back, string lights, night atmosphere
  {
    t: 50, pos: [2.2, 2.4, 5.2], look: [0, 0.4, 0],
    ambientHex: "#1a2040", ambientInt: 0.18,
    dirHex: "#282850", dirInt: 0.28,
    subtitle: "11 PM — Chai, Nagpur orange, the hum of the router. Tomorrow's another build.",
  },
  // ── 57-58s  Hold, fade (no subtitle)
  {
    t: 57, pos: [2.2, 2.4, 5.2], look: [0, 0.4, 0],
    ambientHex: "#1a2040", ambientInt: 0.18,
    dirHex: "#282850", dirInt: 0.28,
    subtitle: "",
  },
];

// Smooth-step easing
function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

// Interpolate all cinematic values at a given elapsed time
function sampleCinematic(elapsed: number) {
  const clamped = Math.min(Math.max(elapsed, 0), CINEMATIC_DURATION);

  // Find bracket
  let i = WAYPOINTS.length - 2;
  for (let j = 0; j < WAYPOINTS.length - 1; j++) {
    if (clamped >= WAYPOINTS[j].t && clamped < WAYPOINTS[j + 1].t) {
      i = j;
      break;
    }
  }

  const a = WAYPOINTS[i];
  const b = WAYPOINTS[i + 1];
  const raw = (clamped - a.t) / Math.max(b.t - a.t, 0.001);
  const t = smoothstep(Math.min(Math.max(raw, 0), 1));

  const pos = new THREE.Vector3(...a.pos).lerp(new THREE.Vector3(...b.pos), t);
  const look = new THREE.Vector3(...a.look).lerp(new THREE.Vector3(...b.look), t);
  const ambientColor = new THREE.Color(a.ambientHex).lerp(new THREE.Color(b.ambientHex), t);
  const ambientInt = THREE.MathUtils.lerp(a.ambientInt, b.ambientInt, t);
  const dirColor = new THREE.Color(a.dirHex).lerp(new THREE.Color(b.dirHex), t);
  const dirInt = THREE.MathUtils.lerp(a.dirInt, b.dirInt, t);
  // Show subtitle of the active segment
  const subtitle = a.subtitle;

  return { pos, look, ambientColor, ambientInt, dirColor, dirInt, subtitle };
}

// ─── The actual GLB mesh ──────────────────────────────────────────────────────
function RoomScene({
  isFullscreen,
  onLoad,
}: {
  isFullscreen: boolean;
  onLoad: () => void;
}) {
  const { scene } = useGLTF("/models/roommerged.glb");
  const groupRef = useRef<THREE.Group>(null!);
  const hasNotified = useRef(false);

  // Gentle auto-rotate only in mini mode
  useFrame((_, delta) => {
    if (!groupRef.current || isFullscreen) return;
    groupRef.current.rotation.y += delta * 0.12;
  });

  useEffect(() => {
    if (!hasNotified.current) {
      hasNotified.current = true;
      onLoad();
    }

    const cloned = scene.clone();

    cloned.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material = mesh.material.map((m) => {
            const mat = m.clone() as THREE.MeshStandardMaterial;
            mat.envMapIntensity = 0.6;
            return mat;
          });
        } else if (mesh.material) {
          const mat = (mesh.material as THREE.MeshStandardMaterial).clone() as THREE.MeshStandardMaterial;
          mat.envMapIntensity = 0.6;
          mesh.material = mat;
        }
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });

    if (groupRef.current) {
      while (groupRef.current.children.length) {
        groupRef.current.remove(groupRef.current.children[0]);
      }
      groupRef.current.add(cloned);

      const box = new THREE.Box3().setFromObject(groupRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetSize = isFullscreen ? 3.5 : 2.2;
      const scale = targetSize / maxDim;

      groupRef.current.scale.setScalar(scale);
      groupRef.current.position.set(
        -center.x * scale,
        -center.y * scale + (isFullscreen ? 0 : -0.3),
        -center.z * scale
      );
    }
  }, [scene, isFullscreen, onLoad]);

  return <group ref={groupRef} />;
}

// ─── Loading placeholder ──────────────────────────────────────────────────────
function RoomSkeleton() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-muted-foreground">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
          <div className="absolute inset-2 rounded-full border-2 border-primary/40 animate-spin" />
          <div className="absolute inset-4 rounded-full bg-primary/10" />
        </div>
        <p className="text-xs font-mono tracking-widest animate-pulse">loading room…</p>
      </div>
    </Html>
  );
}

// ─── Camera rig: smooth dolly for free-explore mode ───────────────────────────
function CameraRig({ isFullscreen }: { isFullscreen: boolean }) {
  const { camera } = useThree();
  const target = isFullscreen ? 5 : 3.5;

  useFrame(() => {
    const current = (camera as THREE.PerspectiveCamera).position.z;
    (camera as THREE.PerspectiveCamera).position.z = THREE.MathUtils.lerp(current, target, 0.05);
  });

  return null;
}

// ─── Cinematic camera — runs the 58-second intro sequence ─────────────────────
function CinematicCamera({
  playing,
  onComplete,
  onTick,
  ambientRef,
  dirRef,
}: {
  playing: boolean;
  onComplete: () => void;
  onTick: (progress: number, subtitle: string) => void;
  ambientRef: React.MutableRefObject<THREE.AmbientLight | null>;
  dirRef: React.MutableRefObject<THREE.DirectionalLight | null>;
}) {
  const { camera } = useThree();
  const elapsed = useRef(0);
  const done = useRef(false);
  const lastSub = useRef("");

  // Reset on play
  useEffect(() => {
    if (!playing) return;
    elapsed.current = 0;
    done.current = false;
    lastSub.current = "";
    const w = WAYPOINTS[0];
    camera.position.set(...w.pos);
    const tgt = new THREE.Vector3(...w.look);
    camera.lookAt(tgt);
  }, [playing, camera]);

  useFrame((_, delta) => {
    if (!playing || done.current) return;

    elapsed.current = Math.min(elapsed.current + delta, CINEMATIC_DURATION);
    const { pos, look, ambientColor, ambientInt, dirColor, dirInt, subtitle } =
      sampleCinematic(elapsed.current);

    // Smooth camera movement — slow lerp feels cinematic
    camera.position.lerp(pos, 0.025);
    camera.lookAt(look);

    // Update lights
    if (ambientRef.current) {
      ambientRef.current.color.lerp(ambientColor, 0.04);
      ambientRef.current.intensity = THREE.MathUtils.lerp(
        ambientRef.current.intensity, ambientInt, 0.04
      );
    }
    if (dirRef.current) {
      dirRef.current.color.lerp(dirColor, 0.04);
      dirRef.current.intensity = THREE.MathUtils.lerp(
        dirRef.current.intensity, dirInt, 0.04
      );
    }

    // Subtitle + progress callback (only on change to avoid React thrashing)
    const progress = elapsed.current / CINEMATIC_DURATION;
    if (subtitle !== lastSub.current) {
      lastSub.current = subtitle;
    }
    onTick(progress, subtitle);

    // Signal completion
    if (elapsed.current >= CINEMATIC_DURATION - 0.08 && !done.current) {
      done.current = true;
      onComplete();
    }
  });

  return null;
}

// ─── Mini hero canvas ─────────────────────────────────────────────────────────
const MiniCanvas = memo(function MiniCanvas({ onLoad }: { onLoad: () => void }) {
  return (
    <Canvas
      camera={{ position: [0, 1, 3.5], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      shadows={false}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 4]} intensity={1.2} castShadow={false} />
      <pointLight position={[-3, 3, -3]} intensity={0.4} color="#3b82f6" />
      <Suspense fallback={<RoomSkeleton />}>
        <RoomScene isFullscreen={false} onLoad={onLoad} />
        <Environment preset="city" />
        <ContactShadows position={[0, -1.4, 0]} opacity={0.3} scale={6} blur={2} far={4} />
      </Suspense>
    </Canvas>
  );
});

// ─── Fullscreen canvas — with cinematic camera support ────────────────────────
const FullscreenCanvas = memo(function FullscreenCanvas({
  onLoad,
  cinematicPlaying,
  onCinematicComplete,
  onCinematicTick,
}: {
  onLoad: () => void;
  cinematicPlaying: boolean;
  onCinematicComplete: () => void;
  onCinematicTick: (progress: number, subtitle: string) => void;
}) {
  const ambientRef = useRef<THREE.AmbientLight | null>(null);
  const dirRef = useRef<THREE.DirectionalLight | null>(null);

  return (
    <Canvas
      camera={{ position: [2.2, 2.0, 5.0], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      shadows
      style={{ background: "hsl(222.2 84% 4.9%)" }}
    >
      {/* Lights — refs wired so CinematicCamera can animate them */}
      <ambientLight ref={ambientRef} intensity={0.55} color="#ffe4c8" />
      <directionalLight
        ref={dirRef}
        position={[5, 8, 5]}
        intensity={1.2}
        color="#ffe090"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-4, 4, -4]} intensity={0.4} color="#3b82f6" />
      <pointLight position={[4, 1, 4]} intensity={0.25} color="#8b5cf6" />

      <Suspense fallback={<RoomSkeleton />}>
        <RoomScene isFullscreen onLoad={onLoad} />
        <Environment preset="apartment" />
        <ContactShadows
          position={[0, -1.8, 0]}
          opacity={0.5}
          scale={10}
          blur={3}
          far={6}
        />

        {/* Cinematic mode: animate camera + lights */}
        {cinematicPlaying && (
          <CinematicCamera
            playing={cinematicPlaying}
            onComplete={onCinematicComplete}
            onTick={onCinematicTick}
            ambientRef={ambientRef}
            dirRef={dirRef}
          />
        )}

        {/* Free-explore mode: user controls */}
        {!cinematicPlaying && (
          <>
            <CameraRig isFullscreen />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              enablePan={false}
              minDistance={2}
              maxDistance={10}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 1.8}
              autoRotate={false}
            />
          </>
        )}
      </Suspense>
    </Canvas>
  );
});

// ─── Main exported component ──────────────────────────────────────────────────
export function RoomModel() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Cinematic state
  const [cinematicPlaying, setCinematicPlaying] = useState(false);
  const [cinematicDone, setCinematicDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const [subtitle, setSubtitle] = useState("");
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [introFadeOut, setIntroFadeOut] = useState(false);

  const subtitleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLoad = useCallback(() => setIsLoaded(true), []);

  // Show click hint after model loads
  useEffect(() => {
    if (!isLoaded) return;
    const t = setTimeout(() => setShowHint(true), 800);
    const t2 = setTimeout(() => setShowHint(false), 4500);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, [isLoaded]);

  // ESC to close fullscreen
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) setIsFullscreen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isFullscreen]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = isFullscreen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isFullscreen]);

  // Start cinematic when fullscreen opens
  useEffect(() => {
    if (isFullscreen && !cinematicDone) {
      setCinematicPlaying(true);
      setProgress(0);
      setSubtitle("");
      setIntroFadeOut(false);
    }
    if (!isFullscreen) {
      setCinematicPlaying(false);
    }
  }, [isFullscreen, cinematicDone]);

  // Subtitle fade management
  useEffect(() => {
    if (subtitleTimer.current) clearTimeout(subtitleTimer.current);
    if (subtitle) {
      setSubtitleVisible(true);
    } else {
      subtitleTimer.current = setTimeout(() => setSubtitleVisible(false), 500);
    }
  }, [subtitle]);

  const handleCinematicTick = useCallback((prog: number, sub: string) => {
    setProgress(prog);
    setSubtitle(sub);
  }, []);

  const finishCinematic = useCallback(() => {
    setIntroFadeOut(true);
    setTimeout(() => {
      setCinematicPlaying(false);
      setCinematicDone(true);
      setSubtitle("");
      setSubtitleVisible(false);
      setIntroFadeOut(false);
    }, 1200);
  }, []);

  const handleSkip = useCallback(() => {
    finishCinematic();
  }, [finishCinematic]);

  return (
    <>
      {/* ── Hero thumbnail ────────────────────────────────────────────────── */}
      <div
        className={`
          relative w-full h-full rounded-2xl overflow-hidden
          border border-border/50 bg-secondary/20
          transition-all duration-300 cursor-pointer
          hover:border-primary/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.12)]
          group
        `}
        onClick={() => isLoaded && setIsFullscreen(true)}
        role="button"
        aria-label="Click to view 3D room in fullscreen"
      >
        <MiniCanvas onLoad={handleLoad} />

        {/* Loading overlay */}
        <div
          className={`
            absolute inset-0 flex flex-col items-center justify-center gap-3
            bg-card/80 backdrop-blur-sm transition-opacity duration-700 pointer-events-none
            ${isLoaded ? "opacity-0" : "opacity-100"}
          `}
        >
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
            <div className="absolute inset-1 rounded-full border-2 border-primary/60 animate-spin" />
          </div>
          <span className="text-xs font-mono text-muted-foreground tracking-widest">
            loading scene…
          </span>
        </div>

        {/* Expand hint */}
        {isLoaded && (
          <div
            className={`
              absolute bottom-3 right-3 flex items-center gap-1.5
              px-2.5 py-1.5 rounded-lg bg-background/80 backdrop-blur-sm
              border border-border/50 text-xs text-muted-foreground
              transition-all duration-500
              ${showHint ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
              group-hover:opacity-100 group-hover:translate-y-0
            `}
          >
            <Maximize2 className="w-3 h-3" />
            click to explore
          </div>
        )}

        <div
          className={`
            absolute inset-0 rounded-2xl pointer-events-none
            ring-1 ring-inset ring-primary/0 group-hover:ring-primary/20
            transition-all duration-300
          `}
        />
      </div>

      {/* ── Fullscreen modal ──────────────────────────────────────────────── */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-md flex flex-col"
          style={{ animation: "fadeInUp 0.3s ease-out" }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-background/80 backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-mono text-muted-foreground">
                {cinematicPlaying ? "day in the life — Mangesh Sarde" : "room.glb — interactive 3D"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {!cinematicPlaying && (
                <span className="hidden sm:block text-xs text-muted-foreground/60 mr-3">
                  drag to orbit · scroll to zoom · ESC to close
                </span>
              )}
              <button
                onClick={() => setIsFullscreen(false)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                aria-label="Exit fullscreen"
              >
                <Minimize2 className="w-4 h-4" />
                <span className="hidden sm:inline">Exit</span>
              </button>
            </div>
          </div>

          {/* Canvas + overlays */}
          <div className="flex-1 relative overflow-hidden">
            <FullscreenCanvas
              onLoad={handleLoad}
              cinematicPlaying={cinematicPlaying}
              onCinematicComplete={finishCinematic}
              onCinematicTick={handleCinematicTick}
            />

            {/* ── CINEMATIC OVERLAYS ─────────────────────────────────────── */}
            {(cinematicPlaying || introFadeOut) && (
              <div
                className="absolute inset-0 pointer-events-none flex flex-col justify-between"
                style={{
                  opacity: introFadeOut ? 0 : 1,
                  transition: "opacity 1.2s ease-in-out",
                }}
              >
                {/* Vignette frame */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
                    pointerEvents: "none",
                  }}
                />

                {/* Skip button (top-right, pointer-events on) */}
                <div className="relative z-10 flex justify-end px-6 pt-2 pointer-events-auto">
                  <button
                    onClick={handleSkip}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 text-xs text-white/70 hover:text-white hover:bg-black/60 transition-all"
                  >
                    <SkipForward className="w-3 h-3" />
                    Skip intro
                  </button>
                </div>

                {/* Subtitle — bottom centre */}
                <div className="relative z-10 flex flex-col items-center gap-3 pb-10 px-6">
                  <div
                    className="max-w-xl text-center transition-all duration-700"
                    style={{
                      opacity: subtitleVisible && subtitle ? 1 : 0,
                      transform: subtitleVisible && subtitle ? "translateY(0)" : "translateY(6px)",
                    }}
                  >
                    <span
                      className="inline-block px-4 py-2 rounded-lg text-sm font-mono tracking-wide"
                      style={{
                        background: "rgba(0,0,0,0.55)",
                        backdropFilter: "blur(12px)",
                        color: "rgba(255,255,255,0.92)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        textShadow: "0 1px 4px rgba(0,0,0,0.8)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {subtitle}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-64 h-0.5 rounded-full overflow-hidden bg-white/10">
                    <div
                      className="h-full bg-primary/70 transition-all duration-300"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-white/30 tracking-widest">
                    {Math.round(progress * CINEMATIC_DURATION)}s / {CINEMATIC_DURATION}s
                  </span>
                </div>
              </div>
            )}

            {/* ── FREE EXPLORE HINT ─────────────────────────────────────── */}
            {!cinematicPlaying && !introFadeOut && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-4 py-2 rounded-full bg-background/70 backdrop-blur-sm border border-border/30 text-xs text-muted-foreground/70 pointer-events-none">
                <span className="flex items-center gap-1.5">
                  <RotateCcw className="w-3 h-3" /> Drag to orbit
                </span>
                <span className="w-px h-3 bg-border/50" />
                <span className="flex items-center gap-1.5">
                  <ZoomIn className="w-3 h-3" /> Scroll to zoom
                </span>
                <span className="w-px h-3 bg-border/50" />
                <span>ESC to close</span>
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: scale(0.98) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </>
  );
}

// Preload the GLB as soon as this module is imported
useGLTF.preload("/models/roommerged.glb");