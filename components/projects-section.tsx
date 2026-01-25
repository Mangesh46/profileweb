"use client"

import { useState } from "react"
import { Badge } from "../components/ui/badge"
import { AirShoesArchitecture } from "../components/airshoes-architecture"
import { CSISenseArchitecture } from "../components/csisense-architecture"
import { DHIMSArchitecture } from "../components/dhims-architecture"
import { Award, ChevronRight } from "lucide-react"
import { cn } from "../lib/utils"

const projects = [
  {
    id: "airshoes",
    title: "AirShoes v1.0",
    subtitle: "Edge-Aware Smart Wearable with Application-Intent Simulation",
    status: "COMPLETED",
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
    color: "primary",
    component: AirShoesArchitecture,
  },
  {
    id: "csisense",
    title: "CSISense v1.0",
    subtitle: "Wi-Fi CSI-Based Smart Fencing System",
    status: "COMPLETED",
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
    color: "accent",
    component: CSISenseArchitecture,
  },
  {
    id: "dhims",
    title: "DHIMS",
    subtitle: "Digital Healthcare Management System",
    status: "COMPLETED",
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
    color: "chart-3",
    component: DHIMSArchitecture,
  },
]

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(projects[0].id)
  const currentProject = projects.find((p) => p.id === activeProject)!

  return (
    <section id="projects" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5"
          >
            Featured Work
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">System Architecture Projects</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Research-oriented embedded systems and IoT projects with professional architecture documentation suitable
            for semiconductor company reviews.
          </p>
        </div>

        {/* Project Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                activeProject === project.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80",
              )}
            >
              {project.title}
            </button>
          ))}
        </div>

        {/* Project Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Project Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-xl bg-card border border-border">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-foreground">{currentProject.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{currentProject.subtitle}</p>
                </div>
                <Badge variant="outline" className="text-xs border-chart-3/30 text-chart-3 bg-chart-3/5">
                  {currentProject.status}
                </Badge>
              </div>

              {currentProject.achievement && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/20 mb-4">
                  <Award className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-primary">{currentProject.achievement}</span>
                </div>
              )}

              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{currentProject.description}</p>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider">Key Features</h4>
                <ul className="space-y-2">
                  {currentProject.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {currentProject.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Architecture Diagram */}
          <div className="lg:col-span-2">
            <div className="p-6 rounded-xl bg-card border border-border h-full">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider">System Architecture</h4>
                <Badge variant="outline" className="text-xs font-mono">
                  Interactive Diagram
                </Badge>
              </div>
              <div className="aspect-[16/10] bg-background rounded-lg border border-border overflow-hidden">
                <currentProject.component />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
