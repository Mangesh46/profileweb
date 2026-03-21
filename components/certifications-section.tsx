"use client"

import { useState } from "react"
import { Badge } from "../components/ui/badge"
import { Award, GraduationCap, Loader2 } from "lucide-react"
import { useDriveProofs, matchFile, type DriveFile } from "../lib/useDriveProofs"
import { ProofModal, ProofButton } from "../components/proof-modal"

// ─────────────────────────────────────────────────────────────────
//  ADDING / REMOVING PROOF FILES — zero code changes needed.
//
//  Just drop a file into your Google Drive folder with the right name:
//
//    cert_nptel_linear_algebra.pdf     → shows on NPTEL card
//    cert_google_cloud_aiml.pdf        → shows on Google Cloud card
//    cert_nit_warangal_5g6g.pdf        → shows on NIT Warangal card
//    award_vnit_2nd_prize.pdf          → shows on VNIT award card
//    award_iit_indore_finalist.pdf     → shows on IIT Indore card
//
//  Delete the file from Drive to remove the proof button instantly.
// ─────────────────────────────────────────────────────────────────

const certifications = [
  {
    title: "Applied Linear Algebra for Signal Processing, Data Analytics and Machine Learning",
    issuer: "NPTEL",
    period: "Jul – Oct 2025",
    status: "Completed",
    color: "#10b981",
    // matches any file starting with cert_ that contains "nptel"
    keywords: ["nptel"],
  },
  {
    title: "AI and ML on Google Cloud",
    issuer: "Google Cloud",
    period: "2025",
    status: "Completed",
    color: "#3b82f6",
    keywords: ["google_cloud", "google cloud"],
  },
  {
    title: "5G/6G Wireless Technology",
    issuer: "NIT Warangal",
    period: "2025",
    status: "Completed",
    color: "#8b5cf6",
    keywords: ["nit_warangal", "nit warangal", "warangal"],
  },
  {
    title: "Qualcomm Certification Track",
    issuer: "Qualcomm",
    period: "In Progress",
    status: "In Progress",
    color: "#f59e0b",
    keywords: ["qualcomm"],
  },
]

const awards = [
  {
    title: "2nd Prize — VNIT Nagpur Summer School 2025",
    project: "AI-Powered Health Monitoring System (AirShoes v1.0)",
    year: "2025",
    keywords: ["vnit"],
  },
  {
    title: "National Finalist — IIT Indore Technology Competition 2025",
    project: "Digital Healthcare Information Management System (DHIMS)",
    year: "2025",
    keywords: ["iit_indore", "iit indore", "indore"],
  },
]

export function CertificationsSection() {
  const { certs, awards: awardFiles, loading, error } = useDriveProofs()
  const [activeProof, setActiveProof] = useState<DriveFile & { label: string } | null>(null)

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
          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Certifications & Awards</h2>
            {loading && (
              <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />
            )}
          </div>
          {error && (
            <p className="mt-2 text-xs text-amber-500 font-mono">
              ⚠ Drive API: {error} — add your API key to .env.local to enable proof buttons
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Certifications */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Certifications
            </h3>
            {certifications.map((cert) => {
              const file = !loading ? matchFile(certs, ...cert.keywords) : undefined
              return (
                <div
                  key={cert.title}
                  className="p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${cert.color}15` }}
                    >
                      <GraduationCap className="w-5 h-5" style={{ color: cert.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-medium text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
                          {cert.title}
                        </h4>
                        <Badge
                          variant="outline"
                          className="text-[10px] flex-shrink-0"
                          style={{
                            color: cert.status === "Completed" ? "#10b981" : "#f59e0b",
                            borderColor: cert.status === "Completed" ? "#10b98140" : "#f59e0b40",
                            backgroundColor: cert.status === "Completed" ? "#10b98110" : "#f59e0b10",
                          }}
                        >
                          {cert.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-muted-foreground font-mono">{cert.issuer}</span>
                        <span className="text-xs text-muted-foreground">·</span>
                        <span className="text-xs text-muted-foreground">{cert.period}</span>
                      </div>
                      {file && (
                        <ProofButton onClick={() => setActiveProof({ ...file, label: cert.title })} />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Awards */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-chart-4" />
              Awards & Recognition
            </h3>
            <div className="space-y-4">
              {awards.map((award, i) => {
                const file = !loading ? matchFile(awardFiles, ...award.keywords) : undefined
                return (
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
                        {file && (
                          <ProofButton onClick={() => setActiveProof({ ...file, label: award.title })} />
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground font-mono flex-shrink-0">{award.year}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {activeProof && (
        <ProofModal
          title={activeProof.label}
          previewUrl={activeProof.previewUrl}
          viewUrl={activeProof.viewUrl}
          onClose={() => setActiveProof(null)}
        />
      )}
    </section>
  )
}
