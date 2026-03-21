"use client"

import { useState } from "react"
import { Badge } from "../components/ui/badge"
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react"
import { useDriveProofs, type InternshipCard } from "../lib/useDriveProofs"
import { ProofModal } from "../components/proof-modal"

// ─────────────────────────────────────────────────────────────────
//  PROOF FILE NAMING:
//    internship_Sarvaksh-Communications_Aug-2025-to-Jan-2026.pdf
//
//  Upload to Drive → "View Internship Letter" button appears.
//  Delete from Drive → button disappears.
// ─────────────────────────────────────────────────────────────────

// Static experience data (role, highlights, tags stay in code)
// Only the proof document is fetched from Drive
const experiences = [
  {
    role: "Part-Time Intern",
    company: "Sarvaksh Communications Technologies Pvt. Ltd.",
    location: "Nagpur, Maharashtra",
    duration: "Aug 2025 – Jan 2026",
    type: "Part-Time Internship",
    color: "#10b981",
    // matches internship_ file that contains "sarvaksh"
    companyKeyword: "sarvaksh",
    highlights: [
      "Developed GlucoVision v3.1, an ESP32 ESP-NOW mesh and Raspberry Pi gateway system for real-time biosensor data acquisition.",
      "Resolved firmware issues and achieved less than 5% packet loss under high-concurrency BLE traffic.",
      "Built a Flask REST API dashboard for live time-series monitoring and alerting.",
      "Developed a Flutter Android app for real-time plantar pressure heat-map visualization.",
    ],
    tags: ["ESP32", "ESP-NOW", "BLE GATT", "Raspberry Pi", "Flask", "REST API", "Flutter", "Python"],
  },
]

type ActiveProof = { title: string; previewUrl: string; viewUrl: string }

export function ExperienceSection() {
  const { internships, loading } = useDriveProofs()
  const [activeProof, setActiveProof] = useState<ActiveProof | null>(null)

  return (
    <section id="experience" className="relative py-24 bg-secondary/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5"
          >
            Work Experience
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Professional Experience</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Hands-on industry experience building real-world embedded systems and IoT solutions.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border hidden sm:block" />
          <div className="space-y-8">
            {experiences.map((exp, idx) => {
              const proof: InternshipCard | undefined = !loading
                ? internships.find((f) =>
                    f.company.toLowerCase().includes(exp.companyKeyword)
                  )
                : undefined

              return (
                <div key={idx} className="relative sm:pl-20">
                  <div
                    className="hidden sm:flex absolute left-0 w-12 h-12 rounded-full items-center justify-center border-2 bg-card z-10"
                    style={{ borderColor: `${exp.color}40`, backgroundColor: `${exp.color}10` }}
                  >
                    <Briefcase className="w-5 h-5" style={{ color: exp.color }} />
                  </div>

                  <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                            {exp.role}
                          </h3>
                          <Badge
                            variant="outline"
                            className="text-[10px] px-2 py-0.5"
                            style={{
                              color: exp.color,
                              borderColor: `${exp.color}40`,
                              backgroundColor: `${exp.color}10`,
                            }}
                          >
                            {exp.type}
                          </Badge>
                        </div>
                        <p className="text-base font-semibold text-primary/80">{exp.company}</p>
                        <div className="flex items-center gap-4 mt-1.5">
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            {exp.location}
                          </span>
                          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {exp.duration}
                          </span>
                        </div>
                      </div>

                      {proof && (
                        <button
                          onClick={() =>
                            setActiveProof({
                              title: `Internship Letter — ${exp.company}`,
                              previewUrl: proof.file.previewUrl,
                              viewUrl: proof.file.viewUrl,
                            })
                          }
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border flex-shrink-0 transition-all
                            border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 hover:border-primary/50"
                        >
                          View Internship Letter
                        </button>
                      )}
                    </div>

                    <ul className="space-y-2.5 mb-5">
                      {exp.highlights.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: exp.color }} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 text-xs rounded-md bg-secondary text-secondary-foreground border border-border font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {activeProof && (
        <ProofModal
          title={activeProof.title}
          previewUrl={activeProof.previewUrl}
          viewUrl={activeProof.viewUrl}
          onClose={() => setActiveProof(null)}
        />
      )}
    </section>
  )
}
