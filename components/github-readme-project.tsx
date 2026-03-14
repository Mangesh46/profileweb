"use client"

import { useEffect, useState, useCallback } from "react"
import { RefreshCw, Clock, GitBranch, Youtube, BookOpen, AlertCircle, ExternalLink } from "lucide-react"
import { cn } from "../lib/utils"
import type { ProjectMeta } from "../app/api/readme/[repo]/route"

interface GitHubReadmeProjectProps {
  repo: string
  className?: string
}

const STAGE_STYLES: Record<string, { bg: string; border: string; dot: string }> = {
  Ideation:      { bg: "bg-amber-500/10",   border: "border-amber-500/30",  dot: "bg-amber-400" },
  "In Progress": { bg: "bg-blue-500/10",    border: "border-blue-500/30",   dot: "bg-blue-400" },
  Completed:     { bg: "bg-emerald-500/10", border: "border-emerald-500/30", dot: "bg-emerald-400" },
  Archived:      { bg: "bg-slate-500/10",   border: "border-slate-500/30",  dot: "bg-slate-400" },
}

function MarkdownText({ text }: { text: string }) {
  const lines = text.split("\n")
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} className="h-1" />

        if (/^- \[x\]/i.test(line)) {
          return (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5 w-4 h-4 rounded border border-emerald-500/50 bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-2.5 h-2.5 text-emerald-500" fill="none" viewBox="0 0 10 8">
                  <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>{line.replace(/^- \[x\]\s*/i, "")}</span>
            </div>
          )
        }
        if (/^- \[ \]/.test(line)) {
          return (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-0.5 w-4 h-4 rounded border border-border bg-secondary flex-shrink-0" />
              <span>{line.replace(/^- \[ \]\s*/, "")}</span>
            </div>
          )
        }
        if (/^[-*]\s/.test(line)) {
          return (
            <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary/50 flex-shrink-0" />
              <span>{line.replace(/^[-*]\s+/, "")}</span>
            </div>
          )
        }
        return (
          <p key={i} className="text-sm text-muted-foreground leading-relaxed">
            {line}
          </p>
        )
      })}
    </div>
  )
}

/**
 * YouTubeEmbed
 *
 * isUnlisted = true  → video is unlisted, can be embedded directly (thumbnail + iframe on click)
 * isUnlisted = false → video is private, cannot be embedded; shows a styled link-out button instead
 *
 * Set in README PROFILE_CARD:
 *   youtube_id: YOUR_VIDEO_ID
 *   youtube_unlisted: true      ← omit or set false for private videos
 */
function YouTubeEmbed({ videoId, isUnlisted }: { videoId: string; isUnlisted: boolean }) {
  const [showEmbed, setShowEmbed] = useState(false)

  // Private video — YouTube will reject embeds, show a link-out card instead
  if (!isUnlisted) {
    return (
      <a
        href={`https://youtu.be/${videoId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 rounded-xl bg-red-500/5 border border-red-500/20 hover:border-red-500/40 transition-all group"
      >
        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
          <Youtube className="w-5 h-5 text-red-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">Project Demo Video</p>
          <p className="text-xs text-muted-foreground">
            Private video — opens on YouTube
          </p>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors flex-shrink-0" />
      </a>
    )
  }

  // Unlisted video — can be embedded
  if (!showEmbed) {
    return (
      <button
        onClick={() => setShowEmbed(true)}
        className="relative w-full aspect-video rounded-xl overflow-hidden bg-black/80 group border border-border hover:border-red-500/30 transition-all"
        style={{
          backgroundImage: `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-white ml-1" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 bg-black/60 rounded text-[10px] text-white font-mono">
            Project Demo · Unlisted
          </span>
        </div>
      </button>
    )
  }

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden border border-border">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}

export function GitHubReadmeProject({ repo, className }: GitHubReadmeProjectProps) {
  const [meta, setMeta] = useState<ProjectMeta | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeTab, setActiveTab] = useState<"story" | "progress" | "video">("story")
  const [refreshing, setRefreshing] = useState(false)

  const fetchMeta = useCallback(async (bust = false) => {
    try {
      setError(false)
      const url = `/api/readme/${repo}${bust ? `?t=${Date.now()}` : ""}`
      const res = await fetch(url)
      if (!res.ok) throw new Error("Not found")
      const data: ProjectMeta = await res.json()
      setMeta(data)
    } catch {
      setError(true)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [repo])

  useEffect(() => { fetchMeta() }, [fetchMeta])

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchMeta(true)
  }

  const stageStyle = meta ? (STAGE_STYLES[meta.stage] || STAGE_STYLES["Completed"]) : null

  const tabs = [
    { id: "story"    as const, label: "Story",    icon: BookOpen,  show: !!meta?.story },
    { id: "progress" as const, label: "Progress", icon: GitBranch, show: !!meta?.currentProgress },
    { id: "video"    as const, label: "Video",    icon: Youtube,   show: !!meta?.youtubeId },
  ].filter(t => t.show)

  if (loading) {
    return (
      <div className={cn("p-5 rounded-xl bg-card border border-border", className)}>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-5 w-24 bg-secondary rounded animate-pulse" />
          <div className="h-5 w-16 bg-secondary rounded animate-pulse" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full bg-secondary rounded animate-pulse" />
          <div className="h-3 w-4/5 bg-secondary rounded animate-pulse" />
          <div className="h-3 w-3/5 bg-secondary rounded animate-pulse" />
        </div>
      </div>
    )
  }

  if (error || !meta) {
    return (
      <div className={cn("p-5 rounded-xl bg-card border border-border/50 opacity-60", className)}>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>
            README not found — add one to{" "}
            <code className="text-xs bg-secondary px-1 rounded">{repo}</code>
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("rounded-xl bg-card border border-border overflow-hidden", className)}>
      {/* Header bar */}
      <div className="px-5 py-3 border-b border-border flex items-center justify-between bg-secondary/20">
        <div className="flex items-center gap-3">
          {stageStyle && (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
                stageStyle.bg, stageStyle.border
              )}
              style={{ color: meta.stageColor }}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", stageStyle.dot)} />
              {meta.stage}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
            <Clock className="w-3 h-3" />
            Updated {meta.updated}
          </span>
        </div>

        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground transition-all"
          title="Sync from GitHub README"
        >
          <RefreshCw className={cn("w-3.5 h-3.5", refreshing && "animate-spin")} />
        </button>
      </div>

      {/* Tabs */}
      {tabs.length > 0 && (
        <div className="flex gap-0 border-b border-border">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-all border-b-2",
                activeTab === tab.id
                  ? "border-primary text-foreground bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              )}
            >
              <tab.icon className="w-3.5 h-3.5" />
              {tab.label}
              {/* Show lock icon on Video tab if private */}
              {tab.id === "video" && !meta.youtubeUnlisted && (
                <span className="text-[9px] font-mono text-muted-foreground/60 ml-0.5">🔒</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="p-5">
        {activeTab === "story" && meta.story && (
          <MarkdownText text={meta.story} />
        )}

        {activeTab === "progress" && meta.currentProgress && (
          <MarkdownText text={meta.currentProgress} />
        )}

        {activeTab === "video" && meta.youtubeId && (
          <YouTubeEmbed
            videoId={meta.youtubeId}
            isUnlisted={meta.youtubeUnlisted ?? false}
          />
        )}

        {((activeTab === "story" && !meta.story) ||
          (activeTab === "progress" && !meta.currentProgress) ||
          (activeTab === "video" && !meta.youtubeId)) && (
          <p className="text-sm text-muted-foreground italic">
            Add a{" "}
            <code className="bg-secondary px-1 rounded text-xs">
              ## {
                activeTab === "story" ? "🎯 Story & Motivation" :
                activeTab === "progress" ? "📊 Current Progress" : "Video"
              }
            </code>{" "}
            section to your README.
          </p>
        )}
      </div>
    </div>
  )
}