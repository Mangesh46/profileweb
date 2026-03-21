"use client"

import { useEffect, useState } from "react"

// ─────────────────────────────────────────────────────────────────
//  SETUP — add these two lines to your .env.local file:
//
//  NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID=1hYvdXzzDXVoS-RGTRUi5yc0YzmX0vmUe
//  NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key_here
//
//  FILE NAMING CONVENTION (prefix tells the site where to show it):
//
//  cert_nptel_linear_algebra.pdf        → Certifications section
//  cert_google_cloud_aiml.pdf           → Certifications section
//  cert_nit_warangal_5g6g.pdf           → Certifications section
//  award_vnit_2nd_prize.pdf             → Awards section
//  award_iit_indore_finalist.pdf        → Awards section
//  internship_sarvaksh.pdf              → Experience section
//
//  To REMOVE a proof: delete the file from Google Drive. Done.
//  To ADD a proof:    upload a file with the right prefix. Done.
// ─────────────────────────────────────────────────────────────────

export interface DriveFile {
  id: string
  name: string
  viewUrl: string
  previewUrl: string
}

export interface DriveProofs {
  certs: DriveFile[]
  awards: DriveFile[]
  internships: DriveFile[]
  loading: boolean
  error: string | null
}

function toPreviewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/preview`
}

function toViewUrl(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`
}

// Match a Drive filename to a card using keyword matching
// e.g. "cert_nptel_linear_algebra.pdf" matches keywords ["nptel"]
export function matchFile(files: DriveFile[], ...keywords: string[]): DriveFile | undefined {
  return files.find((f) => {
    const name = f.name.toLowerCase()
    return keywords.some((kw) => name.includes(kw.toLowerCase()))
  })
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

        const all: DriveFile[] = (data.files || []).map((f: { id: string; name: string }) => ({
          id: f.id,
          name: f.name,
          viewUrl: toViewUrl(f.id),
          previewUrl: toPreviewUrl(f.id),
        }))

        setState({
          certs: all.filter((f) => f.name.startsWith("cert_")),
          awards: all.filter((f) => f.name.startsWith("award_")),
          internships: all.filter((f) => f.name.startsWith("internship_")),
          loading: false,
          error: null,
        })
      })
      .catch((err) => {
        setState((s) => ({ ...s, loading: false, error: err.message }))
      })
  }, [])

  return state
}
