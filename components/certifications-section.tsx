"use client"

import { Badge } from "../components/ui/badge"
import { Award, GraduationCap, CheckCircle2 } from "lucide-react"

const certifications = [
  {
    title: "Qualcomm Certification Track",
    status: "In Progress",
    items: [
      "5G Primer",
      "Fundamentals of Cellular Communication & 5G",
      "5G-Advanced & 6G",
      "Cellular Handset & IoT Design",
      "AI Technical Foundations",
    ],
    icon: GraduationCap,
    color: "#3b82f6",
  },
]

const awards = [
  {
    title: "2nd Prize — VNIT Nagpur Summer School 5G Lab",
    project: "Smart Shoe IoT Project",
    year: "2024",
  },
  {
    title: "3rd Rank — National Competition at YCCE Nagpur",
    project: "Crop Health Dashboard",
    year: "2025",
  },
  {
    title: "National Finalist — IIT Indore (Fluxus 2025)",
    project: "Healthcare Management System Hackathon",
    year: "2025",
  },
  {
    title: "International Conference Presenter — IIT BHU",
    project: "Spirit'25 Health-Tech Hackathon",
    year: "2025",
  },
]

export function CertificationsSection() {
  return (
    <section id="certifications" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5"
          >
            Achievements
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Certifications & Awards</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Certifications */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Certifications
            </h3>
            {certifications.map((cert) => (
              <div key={cert.title} className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-start justify-between mb-4">
                  <h4 className="font-semibold text-foreground">{cert.title}</h4>
                  <Badge variant="outline" className="text-xs border-chart-4/30 text-chart-4 bg-chart-4/5">
                    {cert.status}
                  </Badge>
                </div>
                <ul className="space-y-2">
                  {cert.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-chart-3 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Awards */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-chart-4" />
              Awards & Recognition
            </h3>
            <div className="space-y-4">
              {awards.map((award, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-card border border-border hover:border-chart-4/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-chart-4/10 flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-chart-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm">{award.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{award.project}</p>
                    </div>
                    <span className="text-xs text-muted-foreground font-mono">{award.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
