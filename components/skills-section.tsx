"use client"

import { Badge } from "../components/ui/badge"
import { Code2, Radio, Cloud, BarChart3 } from "lucide-react"

const skills = [
  {
    category: "Full Stack Development",
    icon: Code2,
    color: "#3b82f6",
    items: ["React", "Node.js", "Express.js", "MongoDB", "JavaScript", "Python", "REST APIs"],
  },
  {
    category: "5G & IoT Systems",
    icon: Radio,
    color: "#10b981",
    items: ["Network Slicing", "Free5GC", "ESP32", "IoT Protocols", "5G Core", "Telemetry"],
  },
  {
    category: "Cloud & DevOps",
    icon: Cloud,
    color: "#8b5cf6",
    items: ["Docker", "Git", "CI/CD", "AWS", "Microservices", "Linux"],
  },
  {
    category: "Data & Analytics",
    icon: BarChart3,
    color: "#f59e0b",
    items: ["Python", "Pandas", "Chart.js", "Signal Processing", "Machine Learning"],
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5"
          >
            Technical Expertise
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Skills & Technologies</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Comprehensive expertise across embedded systems, full-stack development, and wireless communications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.category}
              className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group"
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors"
                style={{ backgroundColor: `${skill.color}15` }}
              >
                <skill.icon className="w-6 h-6" style={{ color: skill.color }} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-4">{skill.category}</h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded border border-border"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
