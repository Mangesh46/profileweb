"use client"

import { useState, memo, useEffect, useCallback } from "react"
import { Badge } from "./ui/badge"
import { GitHubReadmeProject } from "./github-readme-project"
import { MermaidDiagram } from "./mermaid-diagram"
import {
  Award, ChevronRight, LayoutGrid, Box, GitBranch,
  GitCommit, Play, Globe, Cpu, ExternalLink,
} from "lucide-react"
import { cn } from "../lib/utils"
import type { ProjectMeta } from "../app/api/readme/[repo]/route"

// ─── Types ────────────────────────────────────────────────────────────────────

type ProjectType = "hardware" | "website" | "research"
type RightTab = "architecture" | "readme" | "video" | "live"

interface Project {
  id: string
  repo: string
  title: string
  subtitle: string
  achievement: string
  description: string
  highlights: string[]
  tech: string[]
  accentColor: string
  type: ProjectType
}

// ─── Project Data ─────────────────────────────────────────────────────────────

const projects: Project[] = [
  {
    id: "airshoes",
    repo: "AirShoes",
    title: "AirShoes v1.0",
    subtitle: "Edge-Aware Smart Wearable with Application-Intent Simulation",
    achievement: "2nd Prize — VNIT Nagpur 5G Lab",
    description:
      "Research IoT wearable that investigates application-level intent classification within a simulated 5G network slicing context. The device declares traffic intent — fall alert vs. bulk telemetry — and the backend adapts analytics accordingly, mirroring network slicing at the application layer.",
    highlights: [
      "ESP32 MCU with IMU & optical sensors (MPU + MAX30100-class)",
      "CNN-BiLSTM model for gait & activity recognition",
      "3-tier intent framework: Alert · Health · Telemetry",
      "Flask REST API + real-time React dashboard",
    ],
    tech: ["ESP32", "Python Flask", "React", "MongoDB", "TensorFlow", "CNN-BiLSTM", "5G Concepts"],
    accentColor: "#3b82f6",
    type: "hardware",
  },
  {
    id: "csisense",
    repo: "CSISense",
    title: "CSISense v1.0",
    subtitle: "Wi-Fi CSI-Based Smart Fencing System",
    achievement: "Research Prototype — PC Pipeline Complete",
    description:
      "Privacy-preserving smart fencing system that detects human presence by analysing subtle disturbances in Wi-Fi Channel State Information — no cameras, no dedicated sensors. Dual-pipeline design: PC for model training, ESP32 for real-time embedded inference.",
    highlights: [
      "Wi-Fi CSI amplitude & phase analysis (802.11n/ac)",
      "Dual pipeline: PC training (SVM/RF/CNN) + ESP32 real-time inference",
      "Lightweight model for on-device constrained deployment",
      "React Native companion app for alerts & visualisation",
    ],
    tech: ["ESP-IDF", "C/C++", "Python", "TensorFlow", "Scikit-learn", "React Native", "MATLAB"],
    accentColor: "#10b981",
    type: "hardware",
  },
  {
    id: "mlcompress",
    repo: "mlcompress",
    title: "MLCompress",
    subtitle: "Neural Image Compression Codec in Rust",
    achievement: "Research Project — 7.8x compression achieved",
    description:
      "High-performance neural image compression codec written in Rust. Trains compression models in PyTorch, exports to ONNX, then runs portable inference for any target. Combines learned latent representations with Zstd entropy coding, achieving ~7.8x compression ratio on real images.",
    highlights: [
      "ONNX-portable neural encoder/decoder (PyTorch → Rust)",
      "Hybrid pipeline: learned latents + Zstd entropy coding",
      "Custom MLC file format with metadata header",
      "~7.8x ratio on 1356×2040 PNG (3.9 MB → 0.5 MB)",
    ],
    tech: ["Rust", "ONNX Runtime", "Python", "PyTorch", "Zstd", "Signal Processing"],
    accentColor: "#a855f7",
    type: "research",
  },
  {
    id: "crackathon",
    repo: "crackathon",
    title: "Crackathon",
    subtitle: "Road Damage Detection — IIT Bombay",
    achievement: "IIT Bombay Crackathon — Team sardemv",
    description:
      "YOLOv8s road damage detection system trained at 1024px resolution on Tesla P100. The key insight: thin cracks vanish at the standard 640px — pushing to 1024px was the single biggest accuracy gain. Detects 5 damage classes with per-image YOLO .txt prediction output.",
    highlights: [
      "YOLOv8s at 1024×1024 — critical for fine crack visibility",
      "5 classes: longitudinal, transverse, alligator cracks, corruption, potholes",
      "Augmentation: flip, scale, brightness & contrast variation",
      "Trained on Kaggle Tesla P100, validated on RTX 2050",
    ],
    tech: ["YOLOv8", "Python", "PyTorch", "Kaggle", "Computer Vision", "Object Detection"],
    accentColor: "#f97316",
    type: "research",
  },
  {
    id: "crophealth",
    repo: "crop-health-dashboard",
    title: "Crop Health Dashboard",
    subtitle: "AI-Powered Agricultural Monitoring System",
    achievement: "3rd Rank — National Competition, YCCE Nagpur",
    description:
      "Precision agriculture tool that approximates NDVI, EVI, and NDWI vegetation indices from ordinary phone photos — no multispectral camera or drone required. Processes a field image in under 5 seconds and returns health classification, pest risk, and irrigation recommendations.",
    highlights: [
      "NDVI / EVI / NDWI approximation from standard RGB field photos",
      "92% accuracy in vegetation health classification (5 zones)",
      "Pest risk assessment + smart irrigation scheduling",
      "Full pipeline processes in < 5s — deployable on regular servers",
    ],
    tech: ["React", "Python Flask", "NumPy", "PIL", "Recharts", "REST API", "Computer Vision"],
    accentColor: "#22c55e",
    type: "website",
  },
  {
    id: "dhims",
    repo: "DHIMS",
    title: "DHIMS v2.0",
    subtitle: "Digital Healthcare Management System",
    achievement: "National Finalist — IIT Indore",
    description:
      "Full-stack student healthcare platform consolidating three legacy React apps and two disconnected backends into a single cloud-deployable monorepo. Every prescription and certificate carries a SHA-256 tamper-evident hash — any alteration invalidates the document, making all records cryptographically auditable.",
    highlights: [
      "SHA-256 verification hash on every prescription & certificate",
      "Groq / Llama 3.3 70B health assistant (14,400 free req/day)",
      "OTP email verification, JWT auth, role-based access",
      "Deployed: Vercel (frontend) + Railway (backend) + MongoDB Atlas",
    ],
    tech: ["React 18", "Node.js", "Express", "MongoDB", "JWT", "Groq AI", "Nodemailer", "SHA-256"],
    accentColor: "#f59e0b",
    type: "website",
  },
]

// ─── Tab config per project type ──────────────────────────────────────────────

type TabDef = { id: RightTab; label: string; icon: React.ReactNode; badge?: string }

function getTabsForProject(project: Project, meta?: ProjectMeta | null): TabDef[] {
  const tabs: TabDef[] = [
    { id: "architecture", label: "Architecture", icon: <LayoutGrid className="w-3.5 h-3.5" /> },
  ]
  // Show the video tab for hardware projects always (placeholder shown until meta loads)
  if (project.type === "hardware") {
    tabs.push({ id: "video", label: "Demo Video", icon: <Play className="w-3.5 h-3.5" /> })
  }
  // Show live tab for website projects always (placeholder shown until meta loads)
  if (project.type === "website") {
    tabs.push({ id: "live", label: "Live Demo", icon: <Globe className="w-3.5 h-3.5" /> })
  }
  tabs.push({
    id: "readme",
    label: "Story & Status",
    icon: <Box className="w-3.5 h-3.5" />,
    badge: "LIVE",
  })
  return tabs
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

// Single fetch per repo, shared across all panels for the active project
function useProjectMeta(repo: string) {
  const [meta, setMeta] = useState<ProjectMeta | null | undefined>(undefined)
  useEffect(() => {
    setMeta(undefined) // reset to loading state on repo change
    fetch(`/api/readme/${repo}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data: ProjectMeta | null) => setMeta(data))
      .catch(() => setMeta(null))
  }, [repo])
  return meta
}

// ─── Type badge metadata ──────────────────────────────────────────────────────

const TYPE_META: Record<ProjectType, { label: string; icon: React.ReactNode; className: string }> = {
  hardware: {
    label: "Hardware",
    icon: <Cpu className="w-3 h-3" />,
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
  website: {
    label: "Website",
    icon: <Globe className="w-3 h-3" />,
    className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  },
  research: {
    label: "Research",
    icon: <GitCommit className="w-3 h-3" />,
    className: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  },
}

// ─── Shared sub-components ────────────────────────────────────────────────────

function NoDiagramState({ accentColor, repo }: { accentColor: string; repo: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-5 p-8 select-none">
      <div className="relative w-52 h-32 opacity-50">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-11 h-11 rounded-xl border-2 flex items-center justify-center animate-pulse"
          style={{ borderColor: accentColor, backgroundColor: `${accentColor}18` }}
        >
          <GitCommit className="w-4 h-4" style={{ color: accentColor }} />
        </div>
        <div
          className="absolute bottom-0 left-6 w-10 h-10 rounded-xl border-2 flex items-center justify-center"
          style={{ borderColor: accentColor, backgroundColor: `${accentColor}10` }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>
        <div
          className="absolute bottom-0 right-6 w-10 h-10 rounded-xl border-2 flex items-center justify-center"
          style={{ borderColor: accentColor, backgroundColor: `${accentColor}10` }}
        >
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: accentColor }} />
        </div>
        <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
          <line x1="104" y1="44" x2="42" y2="88" stroke={accentColor} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
          <line x1="104" y1="44" x2="166" y2="88" stroke={accentColor} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
          <line x1="104" y1="44" x2="104" y2="76" stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
        </svg>
      </div>
      <div className="text-center space-y-2">
        <p className="text-sm font-semibold text-foreground/50 tracking-wide">Diagram coming soon</p>
        <p className="text-[11px] text-muted-foreground/60 font-mono leading-relaxed">
          Add a{" "}
          <code className="px-1.5 py-0.5 rounded bg-secondary text-[10px]">```mermaid</code>
          {" "}block under{" "}
          <code className="px-1.5 py-0.5 rounded bg-secondary text-[10px]">## Architecture</code>
          {" "}in{" "}
          <a
            href={`https://github.com/Mangesh46/${repo}#readme`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 transition-opacity hover:opacity-80"
            style={{ color: accentColor }}
          >
            README
          </a>
        </p>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="w-full space-y-4 animate-pulse opacity-20">
        <div className="flex justify-center">
          <div className="h-9 w-32 bg-muted rounded-xl" />
        </div>
        <div className="flex justify-between px-6">
          <div className="h-8 w-20 bg-muted rounded-lg" />
          <div className="h-8 w-20 bg-muted rounded-lg" />
          <div className="h-8 w-20 bg-muted rounded-lg" />
        </div>
        <div className="flex justify-center gap-4">
          <div className="h-6 w-24 bg-muted rounded" />
          <div className="h-6 w-16 bg-muted rounded" />
        </div>
      </div>
    </div>
  )
}

// ─── Panel components ─────────────────────────────────────────────────────────

function ArchitecturePanel({ project, meta }: { project: Project; meta: ProjectMeta | null | undefined }) {
  const mermaidDiagram = meta === undefined ? undefined : meta?.mermaidDiagram ?? null

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
          System Architecture
        </p>
        {mermaidDiagram === undefined && (
          <span className="text-[10px] text-muted-foreground font-mono animate-pulse">
            fetching from GitHub...
          </span>
        )}
        {mermaidDiagram && (
          <span className="flex items-center gap-1 text-[10px] text-emerald-500 font-mono">
            <GitBranch className="w-3 h-3" />
            live from README
          </span>
        )}
        {mermaidDiagram === null && (
          <span className="text-[10px] text-muted-foreground/50 font-mono">diagram pending</span>
        )}
      </div>
      <div className="aspect-[16/10] bg-background rounded-lg border border-border overflow-hidden">
        {mermaidDiagram === undefined && <LoadingSkeleton />}
        {mermaidDiagram && <MermaidDiagram chart={mermaidDiagram} className="w-full h-full p-3" />}
        {mermaidDiagram === null && (
          <NoDiagramState accentColor={project.accentColor} repo={project.repo} />
        )}
      </div>
    </div>
  )
}

function VideoPanel({ project, meta }: { project: Project; meta: ProjectMeta | null | undefined }) {
  const youtubeId = meta?.youtubeId
  if (!youtubeId) {
    return (
      <div className="p-6">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-3">
          Demo Video
        </p>
        <div className="aspect-video bg-background rounded-lg border border-border flex flex-col items-center justify-center gap-4 select-none">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 opacity-40"
            style={{ borderColor: project.accentColor, backgroundColor: `${project.accentColor}18` }}
          >
            <Play className="w-6 h-6 ml-1" style={{ color: project.accentColor }} />
          </div>
          <p className="text-sm font-semibold text-foreground/40 tracking-wide">Video coming soon</p>
          <p className="text-[11px] text-muted-foreground/50 font-mono">
            Add <code className="px-1.5 py-0.5 rounded bg-secondary">youtube_id: YOUR_ID</code> to the README PROFILE_CARD block
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
          Demo Video
        </p>
        <a
          href={`https://www.youtube-nocookie.com/watch?v=${youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px] text-red-400 font-mono hover:text-red-300 transition-colors"
        >
          <ExternalLink className="w-3 h-3" />
          Open on YouTube
        </a>
      </div>
      <div className="aspect-video rounded-lg border border-border overflow-hidden bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={`${project.title} demo`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          loading="lazy"
        />
      </div>
    </div>
  )
}

function LivePanel({ project, meta }: { project: Project; meta: ProjectMeta | null | undefined }) {
  const liveUrl = meta?.liveUrl
  if (!liveUrl) {
    return (
      <div className="p-6">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider mb-3">
          Live Demo
        </p>
        <div className="aspect-video bg-background rounded-lg border border-border flex flex-col items-center justify-center gap-4 select-none">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 opacity-40"
            style={{ borderColor: project.accentColor, backgroundColor: `${project.accentColor}18` }}
          >
            <Globe className="w-6 h-6" style={{ color: project.accentColor }} />
          </div>
          <p className="text-sm font-semibold text-foreground/40 tracking-wide">Live demo coming soon</p>
          <p className="text-[11px] text-muted-foreground/50 font-mono">
            Add <code className="px-1.5 py-0.5 rounded bg-secondary">live_url: https://...</code> to the README PROFILE_CARD block
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
          Live Demo
        </p>
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[10px] font-mono transition-colors hover:opacity-80"
          style={{ color: project.accentColor }}
        >
          <ExternalLink className="w-3 h-3" />
          Open in new tab
        </a>
      </div>
      <div className="aspect-video rounded-lg border border-border overflow-hidden bg-background">
        <iframe
          src={liveUrl}
          title={`${project.title} live demo`}
          className="w-full h-full"
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      </div>
    </div>
  )
}

function ReadmePanel({ project }: { project: Project }) {
  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <div
          className="w-5 h-5 rounded-md flex items-center justify-center"
          style={{ backgroundColor: `${project.accentColor}20` }}
        >
          <Box className="w-3 h-3" style={{ color: project.accentColor }} />
        </div>
        <span className="text-xs text-muted-foreground">
          Pulled live from{" "}
          <a
            href={`https://github.com/Mangesh46/${project.repo}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-mono"
          >
            Mangesh46/{project.repo}
          </a>{" "}
          README
        </span>
      </div>
      <GitHubReadmeProject repo={project.repo} />
    </div>
  )
}

// ─── Project card (sidebar) ───────────────────────────────────────────────────

const ProjectCard = memo(function ProjectCard({
  project,
  isActive,
  onClick,
}: {
  project: Project
  isActive: boolean
  onClick: () => void
}) {
  const typeMeta = TYPE_META[project.type]

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left p-4 rounded-xl border transition-all duration-200 group",
        isActive
          ? "bg-card border-primary/40 shadow-sm"
          : "bg-card/50 border-border hover:border-border/80 hover:bg-card"
      )}
    >
      <div className="flex items-start gap-3">
        <span
          className={cn(
            "mt-1 w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all",
            isActive ? "scale-125" : "opacity-60 group-hover:opacity-100"
          )}
          style={{ backgroundColor: project.accentColor }}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <p className={cn(
              "text-sm font-semibold transition-colors truncate",
              isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
            )}>
              {project.title}
            </p>
            <span className={cn(
              "flex items-center gap-1 px-1.5 py-0.5 rounded border text-[9px] font-medium flex-shrink-0",
              typeMeta.className
            )}>
              {typeMeta.icon}
              {typeMeta.label}
            </span>
          </div>
          <p className="text-xs text-muted-foreground truncate">{project.subtitle}</p>
        </div>
        <ChevronRight className={cn(
          "w-4 h-4 flex-shrink-0 mt-0.5 transition-all",
          isActive ? "text-primary rotate-90" : "text-muted-foreground/40 group-hover:text-muted-foreground"
        )} />
      </div>
    </button>
  )
})

// ─── Main Section ─────────────────────────────────────────────────────────────

export function ProjectsSection() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const [rightTab, setRightTab] = useState<RightTab>("architecture")

  const current = projects.find((p) => p.id === activeId)!

  // Single fetch for the active project — all panels share this data
  const meta = useProjectMeta(current.repo)

  // Tabs driven by project type + what the README actually provides
  const tabs = getTabsForProject(current, meta)

  const handleProjectSelect = useCallback((id: string) => {
    setActiveId(id)
    setRightTab("architecture") // always reset on project switch; meta loads fresh
  }, [])

  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5"
          >
            Featured Work
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            Projects & Research
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Hardware systems, web apps, and research projects. Architecture diagrams and status
            sync live from each project&apos;s GitHub README.
          </p>
          <div className="flex items-center gap-3 mt-4">
            {(Object.entries(TYPE_META) as [ProjectType, (typeof TYPE_META)[ProjectType]][]).map(([key, meta]) => (
              <span
                key={key}
                className={cn("flex items-center gap-1.5 px-2 py-1 rounded-md border text-[11px] font-medium", meta.className)}
              >
                {meta.icon}
                {meta.label}
              </span>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-6 items-start">

          {/* Left sidebar */}
          <div className="space-y-3">
            <div className="space-y-2">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  isActive={p.id === activeId}
                  onClick={() => handleProjectSelect(p.id)}
                />
              ))}
            </div>

            <div className="p-5 rounded-xl bg-card border border-border space-y-4">
              {current.achievement && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <Award className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-xs font-medium text-primary leading-snug">
                    {current.achievement}
                  </span>
                </div>
              )}

              <p className="text-xs text-muted-foreground leading-relaxed">{current.description}</p>

              <div>
                <h4 className="text-[10px] font-semibold text-foreground uppercase tracking-widest mb-2">
                  Key Features
                </h4>
                <ul className="space-y-1.5">
                  {current.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <ChevronRight className="w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-[10px] font-semibold text-foreground uppercase tracking-widest mb-2">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {current.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] bg-secondary text-secondary-foreground rounded border border-border"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="rounded-xl bg-card border border-border overflow-hidden">
            <div className="flex border-b border-border bg-secondary/20">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setRightTab(tab.id)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-3 text-xs font-medium transition-all border-b-2",
                    rightTab === tab.id
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.badge && (
                    <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-mono">
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {rightTab === "architecture" && <ArchitecturePanel project={current} meta={meta} />}
            {/* {rightTab === "video"        && <VideoPanel project={current} meta={meta} />} */}
            {rightTab === "live"         && <LivePanel project={current} meta={meta} />}
            {rightTab === "readme"       && <ReadmePanel project={current} />}
          </div>
        </div>
      </div>
    </section>
  )
}
