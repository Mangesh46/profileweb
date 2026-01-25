"use client"

import { Github, Linkedin, Mail, ExternalLink, ChevronDown } from "lucide-react"
import { Badge } from "../components/ui/badge"

const socialLinks = [
  { icon: Github, href: "https://github.com/Mangesh46", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mangesh-sarde", label: "LinkedIn" },
  { icon: Mail, href: "mailto:mangeshsarde6@gmail.com", label: "Email" },
]

const highlights = ["5G & Network Systems", "IoT & Edge Computing", "Embedded Systems", "Signal Processing"]

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge
                variant="outline"
                className="px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5"
              >
                Open to Opportunities
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                <span className="text-balance">Embedded Systems</span>
                <br />
                <span className="text-primary">Engineer</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Specializing in IoT, 5G systems, and edge computing. Building intelligent wearable systems and wireless
                communication solutions for next-generation semiconductor applications.
              </p>
            </div>

            {/* Highlight Tags */}
            <div className="flex flex-wrap gap-2">
              {highlights.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-md border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
              <a
                href="#projects"
                className="ml-4 flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
              >
                View Projects
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "3+", label: "Major Projects", sublabel: "IoT & 5G Systems" },
                { value: "5+", label: "Competitions", sublabel: "National & International" },
                { value: "2nd", label: "VNIT Prize", sublabel: "5G Lab Summer School" },
                { value: "IIT", label: "Conference", sublabel: "Spirit'25 IIT BHU" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
                >
                  <div className="text-3xl font-bold text-primary group-hover:text-primary/80 transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mt-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs font-mono">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  )
}
