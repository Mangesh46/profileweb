"use client"

import { useState, memo } from "react"
import { Badge } from "./ui/badge"
import { AirShoesArchitecture } from "./airshoes-architecture"
import { CSISenseArchitecture } from "./csisense-architecture"
import { DHIMSArchitecture } from "./dhims-architecture"
import { GitHubReadmeProject } from "./github-readme-project"
import { Award, ChevronRight, LayoutGrid, Box } from "lucide-react"
import { cn } from "../lib/utils"

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
    component: AirShoesArchitecture,
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
    component: CSISenseArchitecture,
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
    component: DHIMSArchitecture,
  },
]

type RightTab = "architecture" | "readme"

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
            Research-oriented embedded systems and IoT projects. Select a project to explore its
            architecture, motivation, and live status — synced directly from GitHub.
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
            {/* Tab bar */}
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
              <div className="p-6">
                <div className="aspect-[16/10] bg-background rounded-lg border border-border overflow-hidden">
                  <current.component />
                </div>
                <p className="mt-3 text-[10px] text-muted-foreground font-mono text-center">
                  Interactive system architecture diagram
                </p>
              </div>
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