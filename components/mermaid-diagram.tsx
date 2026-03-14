"use client"

import { useEffect, useRef, useState, useId } from "react"
import { Loader2, AlertCircle, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"
import { cn } from "../lib/utils"

interface MermaidDiagramProps {
  chart: string
  className?: string
}

export function MermaidDiagram({ chart, className }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "")
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMsg, setErrorMsg] = useState("")
  const [zoom, setZoom] = useState(1)

  useEffect(() => {
    if (!chart?.trim()) return

    let cancelled = false

    async function render() {
      try {
        setStatus("loading")

        const mermaid = (await import("mermaid")).default

        mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          darkMode: true,
          themeVariables: {
            // Match your site's CSS variables
            primaryColor: "#1e40af",
            primaryTextColor: "#e2e8f0",
            primaryBorderColor: "#3b82f6",
            lineColor: "#64748b",
            secondaryColor: "#1e293b",
            tertiaryColor: "#0f172a",
            background: "#0f172a",
            mainBkg: "#1e293b",
            nodeBorder: "#334155",
            clusterBkg: "#1e293b",
            titleColor: "#e2e8f0",
            edgeLabelBackground: "#1e293b",
            fontFamily: "ui-monospace, monospace",
            fontSize: "13px",
          },
          flowchart: {
            htmlLabels: true,
            curve: "basis",
            padding: 15,
          },
          sequence: {
            diagramMarginX: 20,
            diagramMarginY: 10,
            actorMargin: 50,
            useMaxWidth: true,
          },
        })

        const uniqueId = `mermaid-${id}-${Date.now()}`
        const { svg } = await mermaid.render(uniqueId, chart.trim())

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg

          // Make SVG responsive
          const svgEl = containerRef.current.querySelector("svg")
          if (svgEl) {
            svgEl.style.width = "100%"
            svgEl.style.height = "100%"
            svgEl.style.maxWidth = "100%"
            svgEl.removeAttribute("width")
            svgEl.removeAttribute("height")
          }

          setStatus("success")
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMsg(err instanceof Error ? err.message : "Failed to render diagram")
          setStatus("error")
        }
      }
    }

    render()
    return () => { cancelled = true }
  }, [chart, id])

  return (
    <div className={cn("relative w-full h-full flex flex-col", className)}>
      {/* Zoom controls */}
      {status === "success" && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-1">
          <button
            onClick={() => setZoom(z => Math.min(z + 0.2, 2.5))}
            className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
            title="Zoom in"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(z => Math.max(z - 0.2, 0.4))}
            className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(1)}
            className="p-1 hover:bg-secondary rounded text-muted-foreground hover:text-foreground transition-colors"
            title="Reset zoom"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] text-muted-foreground font-mono px-1 min-w-[32px] text-center">
            {Math.round(zoom * 100)}%
          </span>
        </div>
      )}

      {/* Loading state */}
      {status === "loading" && (
        <div className="flex-1 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span className="text-xs">Rendering diagram...</span>
        </div>
      )}

      {/* Error state */}
      {status === "error" && (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 p-4">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-medium">Diagram syntax error</span>
          </div>
          <pre className="text-[10px] text-muted-foreground bg-secondary/50 rounded p-3 max-w-full overflow-auto border border-border max-h-24">
            {errorMsg}
          </pre>
          <p className="text-[10px] text-muted-foreground text-center">
            Check your <code className="bg-secondary px-1 rounded">```mermaid</code> block in the README
          </p>
        </div>
      )}

      {/* Diagram */}
      <div
        ref={containerRef}
        className={cn(
          "flex-1 overflow-auto transition-opacity duration-300",
          status === "success" ? "opacity-100" : "opacity-0 absolute",
        )}
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top center",
          transition: "transform 0.15s ease",
        }}
      />
    </div>
  )
}