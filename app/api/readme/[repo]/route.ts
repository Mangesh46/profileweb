import { NextRequest, NextResponse } from "next/server"

const GITHUB_USER = "Mangesh46"

export interface ProjectMeta {
  stage: "Ideation" | "In Progress" | "Completed" | "Archived"
  stageColor: string
  updated: string
  youtubeId?: string
  story?: string
  currentProgress?: string
  rawReadme?: string
}

const STAGE_COLORS: Record<string, string> = {
  Ideation: "#f59e0b",
  "In Progress": "#3b82f6",
  Completed: "#10b981",
  Archived: "#64748b",
}

/**
 * Parses the special PROFILE_CARD front-matter block from README:
 *
 * <!-- PROFILE_CARD
 * stage: In Progress
 * updated: 2025-03-14
 * youtube_id: dQw4w9WgXcQ
 * -->
 */
function parseReadme(content: string): ProjectMeta {
  const meta: ProjectMeta = {
    stage: "Completed",
    stageColor: STAGE_COLORS["Completed"],
    updated: new Date().toISOString().split("T")[0],
  }

  // Parse PROFILE_CARD comment block
  const metaMatch = content.match(/<!--\s*PROFILE_CARD([\s\S]*?)-->/)
  if (metaMatch) {
    const metaBlock = metaMatch[1]
    const stageMatch = metaBlock.match(/stage:\s*(.+)/)
    const updatedMatch = metaBlock.match(/updated:\s*(.+)/)
    const ytMatch = metaBlock.match(/youtube_id:\s*(.+)/)

    if (stageMatch) {
      const stage = stageMatch[1].trim() as ProjectMeta["stage"]
      meta.stage = stage
      meta.stageColor = STAGE_COLORS[stage] || "#64748b"
    }
    if (updatedMatch) meta.updated = updatedMatch[1].trim()
    if (ytMatch) meta.youtubeId = ytMatch[1].trim()
  }

  // Extract ## 🎯 Story & Motivation section
  const storyMatch = content.match(
    /##\s*(?:🎯\s*)?(?:Story\s*(?:&|and)\s*Motivation|Motivation|Story)[^\n]*\n([\s\S]*?)(?=\n##|\n<!--|\z)/i
  )
  if (storyMatch) {
    meta.story = storyMatch[1].trim()
  }

  // Extract ## 📊 Current Progress / Stage section
  const progressMatch = content.match(
    /##\s*(?:📊\s*)?(?:Current\s*(?:Progress|Stage)|Progress|Stage\s*Details)[^\n]*\n([\s\S]*?)(?=\n##|\n<!--|\z)/i
  )
  if (progressMatch) {
    meta.currentProgress = progressMatch[1].trim()
  }

  meta.rawReadme = content
  return meta
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ repo: string }> }
) {
  const { repo } = await params

  try {
    const url = `https://raw.githubusercontent.com/${GITHUB_USER}/${repo}/main/README.md`
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // cache for 1 hour, auto re-fetch on redeploy
      headers: {
        Accept: "text/plain",
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    })

    if (!res.ok) {
      // Try master branch fallback
      const fallbackUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${repo}/master/README.md`
      const fallbackRes = await fetch(fallbackUrl, { next: { revalidate: 3600 } })
      if (!fallbackRes.ok) {
        return NextResponse.json({ error: "README not found" }, { status: 404 })
      }
      const content = await fallbackRes.text()
      return NextResponse.json(parseReadme(content))
    }

    const content = await res.text()
    return NextResponse.json(parseReadme(content))
  } catch {
    return NextResponse.json({ error: "Failed to fetch README" }, { status: 500 })
  }
}