"use client"

import { FileText, Shield, ExternalLink, X } from "lucide-react"

interface ProofModalProps {
  title: string
  previewUrl: string
  viewUrl: string
  onClose: () => void
}

export function ProofModal({ title, previewUrl, viewUrl, onClose }: ProofModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-card border border-border rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxHeight: "90vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <FileText className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{title}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Shield className="w-3 h-3 text-emerald-500" />
                <span className="text-[10px] text-muted-foreground">
                  Hosted on Google Drive · View only
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
            <a
              href={viewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-secondary border border-border hover:border-primary/40 text-muted-foreground hover:text-foreground transition-all"
            >
              <ExternalLink className="w-3 h-3" />
              Open in Drive
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center bg-secondary border border-border hover:border-primary/40 text-muted-foreground hover:text-foreground transition-all"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Embedded Google Drive preview */}
        <div style={{ height: "70vh" }}>
          <iframe
            src={previewUrl}
            className="w-full h-full"
            allow="autoplay"
            title={`Proof: ${title}`}
            style={{ border: "none" }}
          />
        </div>
      </div>
    </div>
  )
}

export function ProofButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-medium border transition-all mt-2
        border-primary/30 text-primary bg-primary/5 hover:bg-primary/10 hover:border-primary/50"
    >
      <FileText className="w-3 h-3" />
      View Proof
    </button>
  )
}
