"use client"

import { useState, memo, useEffect, useCallback } from "react"
import { Badge } from "./ui/badge"
import { AirShoesArchitecture } from "./airshoes-architecture"
import { CSISenseArchitecture } from "./csisense-architecture"
import { DHIMSArchitecture } from "./dhims-architecture"
import { GitHubReadmeProject } from "./github-readme-project"
import { MermaidDiagram } from "./mermaid-diagram"
import { Award, ChevronRight, LayoutGrid, Box, GitBranch } from "lucide-react"
import { cn } from "../lib/utils"
import type { ProjectMeta } from "../app/api/readme/[repo]/route"

const projects = [
  {
    id: "airshoes",
    repo: "AirShoes",
    title: "AirShoes v1.0",
    subtitle: "Edge-Aware Smart Wearable with Application-Intent Simulation",
    achievement: "2nd Prize — VNIT Nagpur 5G Lab",
    description:
      "Research-oriented IoT wearable system focusing on edge computing, application-declared intent, and low-latency data pipelines. Network slicing semantics simulated at the application layer.",
    highlights: [
      "ESP32 MCU with IMU & optical sensors",
      "Flask REST API with CNN-BiLSTM inference",
      "Intent-based latency simulation",
      "Real-time React dashboard",
    ],
    tech: ["ESP32", "Python Flask", "React", "MongoDB", "TensorFlow", "5G Concepts"],
    accentColor: "#3b82f6",
    FallbackDiagram: AirShoesArchitecture,
  },
  {
    id: "csisense",
    repo: "CSISense",
    title: "CSISense v1.0",
    subtitle: "Wi-Fi CSI-Based Smart Fencing System",
    achievement: "Research Project",
    description:
      "Privacy-preserving Wi-Fi human presence detection system with dual-pipeline design for PC-based training and embedded real-time inference using Channel State Information.",
    highlights: [
      "Wi-Fi CSI signal analysis (no cameras)",
      "Dual pipeline: PC training + ESP32 inference",
      "SVM/Random Forest/CNN models",
      "React Native companion app",
    ],
    tech: ["Python", "ESP32", "Signal Processing", "Machine Learning", "React Native"],
    accentColor: "#10b981",
    FallbackDiagram: CSISenseArchitecture,
  },
  {
    id: "mlcompress",
    repo: "mlcompress",
    title: "MLCompress",
    subtitle: "Neural Image Compression Codec in Rust",
    achievement: "Research Project",
    description:
      "High-performance neural image compression codec combining ONNX-based deep learning with Zstd entropy coding. Achieves ~7.8x compression ratio on real images. Written in Rust for low-latency inference.",
    highlights: [
      "Neural encoder/decoder via ONNX Runtime",
      "Hybrid: learned latents + Zstd entropy coding",
      "Custom MLC file format with metadata header",
      "~7.8x compression ratio on real images",
    ],
    tech: ["Rust", "ONNX Runtime", "Python", "Zstd", "Neural Networks", "Signal Processing"],
    accentColor: "#a855f7",
    FallbackDiagram: AirShoesArchitecture,
  },
  {
    id: "crackathon",
    repo: "crackathon",
    title: "Crackathon",
    subtitle: "Road Damage Detection — IIT Bombay",
    achievement: "IIT Bombay Crackathon — Team sardemv",
    description:
      "YOLOv8s-based road damage detection system trained at 1024px resolution on Tesla P100. Detects 5 damage types: longitudinal/transverse/alligator cracks, potholes, and other corruption.",
    highlights: [
      "YOLOv8s at 1024×1024 — fine crack detection",
      "5 damage classes: cracks, potholes, corruption",
      "Trained on Kaggle Tesla P100",
      "YOLO TXT prediction format with confidence scores",
    ],
    tech: ["YOLOv8", "Python", "PyTorch", "Kaggle", "Computer Vision", "Object Detection"],
    accentColor: "#f97316",
    FallbackDiagram: AirShoesArchitecture,
  },
  {
    id: "crophealth",
    repo: "crop-health-dashboard",
    title: "Crop Health Dashboard",
    subtitle: "AI-Powered Agricultural Monitoring System",
    achievement: "3rd Rank — National Competition, YCCE Nagpur",
    description:
      "Real-time crop monitoring system using vegetation index analysis (NDVI, EVI, NDWI) from field images. Classifies health zones, assesses pest risk, and recommends smart irrigation.",
    highlights: [
      "NDVI / EVI / NDWI index calculation from images",
      "92% accuracy in vegetation health classification",
      "Real-time pest risk assessment",
      "Smart irrigation scheduling recommendations",
    ],
    tech: ["React", "Python Flask", "NumPy", "PIL", "Recharts", "REST API"],
    accentColor: "#22c55e",
    FallbackDiagram: AirShoesArchitecture,
  },
  {
    id: "dhims",
    repo: "DHIMS",
    title: "DHIMS",
    subtitle: "Digital Healthcare Management System",
    achievement: "National Finalist — IIT Indore",
    description:
      "Full-stack healthcare management web application with MERN stack. Patient records, appointments, scheduling, and secure data handling for Health-Tech innovation.",
    highlights: [
      "MERN Stack architecture",
      "Role-based access control",
      "Appointment scheduling system",
      "15-20% admin overhead reduction",
    ],
    tech: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "REST API"],
    accentColor: "#f59e0b",
    FallbackDiagram: DHIMSArchitecture,
  },
]

type RightTab = "architecture" | "readme"

function useMermaidDiagram(repo: string) {
  const [diagram, setDiagram] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    fetch(`/api/readme/${repo}`)
      .then(r => r.ok ? r.json() : null)
      .then((data: ProjectMeta | null) => {
        setDiagram(data?.mermaidDiagram ?? null)
      })
      .catch(() => setDiagram(null))
  }, [repo])

  return diagram
}

const ProjectCard = memo(function ProjectCard({
  project,
  isActive,
  onClick,
}: {
  project: (typeof projects)[0]
  isActive: boolean
  onClick: () => void
}) {
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
          <p className={cn(
            "text-sm font-semibold transition-colors",
            isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
          )}>
            {project.title}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">{project.subtitle}</p>
        </div>
        <ChevronRight className={cn(
          "w-4 h-4 flex-shrink-0 mt-0.5 transition-all",
          isActive ? "text-primary rotate-90" : "text-muted-foreground/40 group-hover:text-muted-foreground"
        )} />
      </div>
    </button>
  )
})

function ArchitecturePanel({ project }: { project: (typeof projects)[0] }) {
  const mermaidDiagram = useMermaidDiagram(project.repo)
  const { FallbackDiagram } = project

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
          <span className="text-[10px] text-muted-foreground font-mono">
            static diagram
          </span>
        )}
      </div>

      <div className="aspect-[16/10] bg-background rounded-lg border border-border overflow-hidden">
        {mermaidDiagram === undefined && <FallbackDiagram />}
        {mermaidDiagram && (
          <MermaidDiagram chart={mermaidDiagram} className="w-full h-full p-3" />
        )}
        {mermaidDiagram === null && <FallbackDiagram />}
      </div>

      {mermaidDiagram === null && (
        <p className="mt-2 text-[10px] text-muted-foreground font-mono text-center">
          Add a{" "}
          <code className="bg-secondary px-1 rounded">```mermaid</code>
          {" "}block under{" "}
          <code className="bg-secondary px-1 rounded">## Architecture</code>
          {" "}in your README to replace this
        </p>
      )}
    </div>
  )
}

export function ProjectsSection() {
  const [activeId, setActiveId] = useState(projects[0].id)
  const [rightTab, setRightTab] = useState<RightTab>("architecture")

  const current = projects.find((p) => p.id === activeId)!

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
            System Architecture Projects
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Research-oriented embedded systems and IoT projects. Architecture diagrams and status
            sync live from each project&apos;s GitHub README.
          </p>
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
                  onClick={() => setActiveId(p.id)}
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

              <p className="text-xs text-muted-foreground leading-relaxed">
                {current.description}
              </p>

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
              <button
                onClick={() => setRightTab("architecture")}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 text-xs font-medium transition-all border-b-2",
                  rightTab === "architecture"
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                Architecture
              </button>
              <button
                onClick={() => setRightTab("readme")}
                className={cn(
                  "flex items-center gap-2 px-5 py-3 text-xs font-medium transition-all border-b-2",
                  rightTab === "readme"
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                <Box className="w-3.5 h-3.5" />
                Story & Status
                <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[9px] font-mono">
                  LIVE
                </span>
              </button>
            </div>

            {rightTab === "architecture" && (
              <ArchitecturePanel project={current} />
            )}

            {rightTab === "readme" && (
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: `${current.accentColor}20` }}
                  >
                    <Box className="w-3 h-3" style={{ color: current.accentColor }} />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Pulled live from{" "}
                    <a
                      href={`https://github.com/Mangesh46/${current.repo}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline font-mono"
                    >
                      Mangesh46/{current.repo}
                    </a>
                    {" "}README
                  </span>
                </div>
                <GitHubReadmeProject repo={current.repo} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}