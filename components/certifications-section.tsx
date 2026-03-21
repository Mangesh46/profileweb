"use client"

import { useState } from "react"
import { Badge } from "../components/ui/badge"
import { Award, GraduationCap, Loader2 } from "lucide-react"
import { useDriveProofs, type CertCard, type AwardCard } from "../lib/useDriveProofs"
import { ProofModal, ProofButton } from "../components/proof-modal"

// ─────────────────────────────────────────────────────────────────
//  NO HARDCODED DATA — everything is driven by your Drive folder.
//
//  To add a new certificate:
//    Upload → cert_NPTEL_Applied-Linear-Algebra_Jul-Oct-2025.pdf
//    Card appears automatically on next page load.
//
//  To remove a certificate:
//    Delete the file from Drive.
//    Card disappears automatically.
//
//  See lib/useDriveProofs.ts for full naming convention.
// ─────────────────────────────────────────────────────────────────

type ActiveProof = { title: string; previewUrl: string; viewUrl: string }

export function CertificationsSection() {
  const { certs, awards, loading, error } = useDriveProofs()
  const [activeProof, setActiveProof] = useState<ActiveProof | null>(null)

  return (
    <section id="certifications" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5"
          >
            Achievements
          </Badge>
          <div className="flex items-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Certifications & Awards</h2>
            {loading && <Loader2 className="w-5 h-5 text-muted-foreground animate-spin" />}
          </div>
          {error && (
            <p className="mt-2 text-xs text-amber-500 font-mono">
              ⚠ Drive: {error}
            </p>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Certifications — fully dynamic */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              Certifications
            </h3>

            {!loading && certs.length === 0 && (
              <p className="text-sm text-muted-foreground italic">
                No certificates found. Upload files named cert_Issuer_Title_Period.pdf to your Drive folder.
              </p>
            )}

            {certs.map((cert: CertCard) => (
              <div
                key={cert.file.id}
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
                    <ProofButton
                      onClick={() =>
                        setActiveProof({
                          title: `${cert.title} — ${cert.issuer}`,
                          previewUrl: cert.file.previewUrl,
                          viewUrl: cert.file.viewUrl,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Awards — fully dynamic */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-chart-4" />
              Awards & Recognition
            </h3>

            {!loading && awards.length === 0 && (
              <p className="text-sm text-muted-foreground italic">
                No awards found. Upload files named award_Org_Result_Year.pdf to your Drive folder.
              </p>
            )}

            {awards.map((award: AwardCard) => (
              <div
                key={award.file.id}
                className="p-4 rounded-xl bg-card border border-border hover:border-chart-4/30 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${award.color}15` }}
                  >
                    <Award className="w-5 h-5" style={{ color: award.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-foreground text-sm">{award.result}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{award.org}</p>
                    <ProofButton
                      onClick={() =>
                        setActiveProof({
                          title: `${award.result} — ${award.org}`,
                          previewUrl: award.file.previewUrl,
                          viewUrl: award.file.viewUrl,
                        })
                      }
                    />
                  </div>
                  <span className="text-xs text-muted-foreground font-mono flex-shrink-0">{award.year}</span>
                </div>
              </div>
            ))}
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
