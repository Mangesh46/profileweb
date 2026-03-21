"use client"

import { useEffect, useState } from "react"

// ─────────────────────────────────────────────────────────────────
//  SETUP — add these to your .env.local (and Vercel env vars):
//
//  NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID=1hYvdXzzDXVoS-RGTRUi5yc0YzmX0vmUe
//  NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key_here
//
// ─────────────────────────────────────────────────────────────────
//  FILE NAMING CONVENTION — the filename IS the card data:
//
//  CERTIFICATES:
//    cert_{Issuer}_{Title}_{Period}.pdf
//    cert_NPTEL_Applied-Linear-Algebra_Jul-Oct-2025.pdf
//    cert_Google-Cloud_AI-and-ML_2025.pdf
//    cert_NIT-Warangal_5G-6G-Wireless-Technology_2025.pdf
//    cert_Qualcomm_Certification-Track_In-Progress.pdf
//
//  AWARDS:
//    award_{Org}_{Result}_{Year}.pdf
//    award_VNIT-Nagpur_2nd-Prize-Summer-School_2025.pdf
//    award_IIT-Indore_National-Finalist_2025.pdf
//
//  INTERNSHIPS:
//    internship_{Company}_{Period}.pdf
//    internship_Sarvaksh-Communications_Aug-2025-to-Jan-2026.pdf
//
//  Rules:
//    - Use hyphens (-) for spaces within a field
//    - Use underscores (_) only as field separators
//    - Upload a file → card appears automatically on next page load
//    - Delete a file → card disappears automatically
// ─────────────────────────────────────────────────────────────────

// Converts "NIT-Warangal" → "NIT Warangal"
function decode(s: string): string {
  return s.replace(/-/g, " ")
}

// Assign a color based on the issuer/org string (consistent per name)
const COLORS = [
  "#10b981", "#3b82f6", "#8b5cf6", "#f59e0b",
  "#06b6d4", "#ec4899", "#f97316", "#14b8a6",
]
function colorFor(s: string): string {
  let hash = 0
  for (let i = 0; i < s.length; i++) hash = s.charCodeAt(i) + ((hash << 5) - hash)
  return COLORS[Math.abs(hash) % COLORS.length]
}

export interface CertCard {
  title: string
  issuer: string
  period: string
  status: string
  color: string
  file: DriveFile
}

export interface AwardCard {
  org: string
  result: string
  year: string
  color: string
  file: DriveFile
}

export interface InternshipCard {
  company: string
  period: string
  color: string
  file: DriveFile
}

export interface DriveFile {
  id: string
  name: string
  viewUrl: string
  previewUrl: string
}

export interface DriveProofs {
  certs: CertCard[]
  awards: AwardCard[]
  internships: InternshipCard[]
  loading: boolean
  error: string | null
}

function toPreviewUrl(id: string) {
  return `https://drive.google.com/file/d/${id}/preview`
}
function toViewUrl(id: string) {
  return `https://drive.google.com/file/d/${id}/view?usp=sharing`
}

function parseFile(f: { id: string; name: string }): DriveFile {
  return {
    id: f.id,
    name: f.name,
    viewUrl: toViewUrl(f.id),
    previewUrl: toPreviewUrl(f.id),
  }
}

// cert_NPTEL_Applied-Linear-Algebra_Jul-Oct-2025.pdf
// → { issuer: "NPTEL", title: "Applied Linear Algebra", period: "Jul-Oct 2025" }
function parseCert(f: { id: string; name: string }): CertCard | null {
  const base = f.name.replace(/\.[^.]+$/, "") // remove extension
  const parts = base.split("_")
  if (parts.length < 4) return null
  const issuer = decode(parts[1])
  const title = decode(parts[2])
  const period = decode(parts[3])
  const status = period.toLowerCase().includes("progress") ? "In Progress" : "Completed"
  return { title, issuer, period, status, color: colorFor(issuer), file: parseFile(f) }
}

// award_VNIT-Nagpur_2nd-Prize-Summer-School_2025.pdf
// → { org: "VNIT Nagpur", result: "2nd Prize Summer School", year: "2025" }
function parseAward(f: { id: string; name: string }): AwardCard | null {
  const base = f.name.replace(/\.[^.]+$/, "")
  const parts = base.split("_")
  if (parts.length < 4) return null
  const org = decode(parts[1])
  const result = decode(parts[2])
  const year = decode(parts[3])
  return { org, result, year, color: colorFor(org), file: parseFile(f) }
}

// internship_Sarvaksh-Communications_Aug-2025-to-Jan-2026.pdf
// → { company: "Sarvaksh Communications", period: "Aug 2025 to Jan 2026" }
function parseInternship(f: { id: string; name: string }): InternshipCard | null {
  const base = f.name.replace(/\.[^.]+$/, "")
  const parts = base.split("_")
  if (parts.length < 3) return null
  const company = decode(parts[1])
  const period = decode(parts[2])
  return { company, period, color: colorFor(company), file: parseFile(f) }
}

export function useDriveProofs(): DriveProofs {
  const [state, setState] = useState<DriveProofs>({
    certs: [],
    awards: [],
    internships: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const folderId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY

    if (!folderId || !apiKey) {
      setState((s) => ({
        ...s,
        loading: false,
        error: "Missing NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID or NEXT_PUBLIC_GOOGLE_API_KEY in .env.local",
      }))
      return
    }

    const url =
      `https://www.googleapis.com/drive/v3/files` +
      `?q='${folderId}'+in+parents+and+trashed=false` +
      `&fields=files(id,name)` +
      `&pageSize=100` +
      `&key=${apiKey}`

    fetch(url)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setState((s) => ({ ...s, loading: false, error: data.error.message }))
          return
        }

        const files: { id: string; name: string }[] = data.files || []

        const certs = files
          .filter((f) => f.name.startsWith("cert_"))
          .map(parseCert)
          .filter(Boolean) as CertCard[]

        const awards = files
          .filter((f) => f.name.startsWith("award_"))
          .map(parseAward)
          .filter(Boolean) as AwardCard[]

        const internships = files
          .filter((f) => f.name.startsWith("internship_"))
          .map(parseInternship)
          .filter(Boolean) as InternshipCard[]

        setState({ certs, awards, internships, loading: false, error: null })
      })
      .catch((err) => {
        setState((s) => ({ ...s, loading: false, error: err.message }))
      })
  }, [])

  return state
}
