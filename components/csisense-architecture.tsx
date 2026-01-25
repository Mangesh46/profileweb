"use client"

import { useState } from "react"
import { cn } from "../lib/utils"

const architecture = {
  sensing: {
    label: "Sensing Layer",
    color: "#06b6d4",
    items: [
      { id: "tx", label: "Wi-Fi Tx Node", desc: "CSI Transmitter" },
      { id: "rx", label: "Wi-Fi Rx Node", desc: "CSI Receiver" },
      { id: "grid", label: "7×7 Grid", desc: "Monitored Area" },
    ],
  },
  pcPipeline: {
    label: "PC Pipeline (Offline)",
    color: "#8b5cf6",
    items: [
      { id: "preprocess", label: "Preprocessing", desc: "Denoising & filtering" },
      { id: "features", label: "Feature Extraction", desc: "Time/Freq domain" },
      { id: "training", label: "ML Training", desc: "SVM/RF/CNN models" },
      { id: "eval", label: "Evaluation", desc: "Accuracy & ROC" },
    ],
  },
  embeddedPipeline: {
    label: "Embedded Pipeline (Real-time)",
    color: "#10b981",
    items: [
      { id: "capture", label: "CSI Capture", desc: "On-device acquisition" },
      { id: "inference", label: "Inference", desc: "Lightweight ML" },
      { id: "decision", label: "Decision", desc: "Presence detection" },
    ],
  },
  app: {
    label: "Mobile App Layer",
    color: "#f59e0b",
    items: [
      { id: "dashboard", label: "React Native", desc: "Companion app" },
      { id: "alerts", label: "Notifications", desc: "Intrusion alerts" },
    ],
  },
}

export function CSISenseArchitecture() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className="w-full h-full p-4 sm:p-6 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
        {/* Sensing Layer - Full Width */}
        <div
          className="md:col-span-2 rounded-lg border-2 p-4"
          style={{
            borderColor: `${architecture.sensing.color}40`,
            backgroundColor: `${architecture.sensing.color}05`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: architecture.sensing.color }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: architecture.sensing.color }}
            >
              {architecture.sensing.label}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary-foreground ml-auto">
              Privacy-First: No Cameras
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {architecture.sensing.items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "px-4 py-3 rounded-md border transition-all duration-200 cursor-pointer text-center",
                  hoveredItem === item.id ? "scale-105" : "",
                )}
                style={{
                  borderColor: hoveredItem === item.id ? architecture.sensing.color : `${architecture.sensing.color}30`,
                  backgroundColor:
                    hoveredItem === item.id ? `${architecture.sensing.color}20` : `${architecture.sensing.color}08`,
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="text-xs font-medium text-foreground">{item.label}</div>
                <div className="text-[10px] text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* PC Pipeline */}
        <div
          className="rounded-lg border-2 p-4"
          style={{
            borderColor: `${architecture.pcPipeline.color}40`,
            backgroundColor: `${architecture.pcPipeline.color}05`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: architecture.pcPipeline.color }} />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: architecture.pcPipeline.color }}
            >
              {architecture.pcPipeline.label}
            </span>
          </div>
          <div className="space-y-2">
            {architecture.pcPipeline.items.map((item, i) => (
              <div key={item.id} className="relative">
                <div
                  className={cn(
                    "px-3 py-2 rounded-md border transition-all duration-200 cursor-pointer",
                    hoveredItem === item.id ? "scale-[1.02]" : "",
                  )}
                  style={{
                    borderColor:
                      hoveredItem === item.id ? architecture.pcPipeline.color : `${architecture.pcPipeline.color}30`,
                    backgroundColor:
                      hoveredItem === item.id
                        ? `${architecture.pcPipeline.color}20`
                        : `${architecture.pcPipeline.color}08`,
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="text-xs font-medium text-foreground">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground">{item.desc}</div>
                </div>
                {i < architecture.pcPipeline.items.length - 1 && (
                  <div className="flex justify-center py-1">
                    <svg width="12" height="16" className="text-muted-foreground">
                      <path d="M6 0 L6 12 L3 9 M6 12 L9 9" stroke="currentColor" fill="none" strokeWidth="1.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Embedded Pipeline */}
        <div
          className="rounded-lg border-2 p-4"
          style={{
            borderColor: `${architecture.embeddedPipeline.color}40`,
            backgroundColor: `${architecture.embeddedPipeline.color}05`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: architecture.embeddedPipeline.color }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: architecture.embeddedPipeline.color }}
            >
              {architecture.embeddedPipeline.label}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-chart-3/20 text-chart-3 ml-auto">{"<"}1s Latency</span>
          </div>
          <div className="space-y-2">
            {architecture.embeddedPipeline.items.map((item, i) => (
              <div key={item.id} className="relative">
                <div
                  className={cn(
                    "px-3 py-2 rounded-md border transition-all duration-200 cursor-pointer",
                    hoveredItem === item.id ? "scale-[1.02]" : "",
                  )}
                  style={{
                    borderColor:
                      hoveredItem === item.id
                        ? architecture.embeddedPipeline.color
                        : `${architecture.embeddedPipeline.color}30`,
                    backgroundColor:
                      hoveredItem === item.id
                        ? `${architecture.embeddedPipeline.color}20`
                        : `${architecture.embeddedPipeline.color}08`,
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="text-xs font-medium text-foreground">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground">{item.desc}</div>
                </div>
                {i < architecture.embeddedPipeline.items.length - 1 && (
                  <div className="flex justify-center py-1">
                    <svg width="12" height="16" className="text-chart-3">
                      <path d="M6 0 L6 12 L3 9 M6 12 L9 9" stroke="currentColor" fill="none" strokeWidth="1.5" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile App - Full Width */}
        <div
          className="md:col-span-2 rounded-lg border-2 p-4"
          style={{
            borderColor: `${architecture.app.color}40`,
            backgroundColor: `${architecture.app.color}05`,
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: architecture.app.color }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: architecture.app.color }}>
              {architecture.app.label}
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {architecture.app.items.map((item) => (
              <div
                key={item.id}
                className={cn(
                  "px-4 py-3 rounded-md border transition-all duration-200 cursor-pointer text-center",
                  hoveredItem === item.id ? "scale-105" : "",
                )}
                style={{
                  borderColor: hoveredItem === item.id ? architecture.app.color : `${architecture.app.color}30`,
                  backgroundColor:
                    hoveredItem === item.id ? `${architecture.app.color}20` : `${architecture.app.color}08`,
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="text-xs font-medium text-foreground">{item.label}</div>
                <div className="text-[10px] text-muted-foreground">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex flex-wrap gap-4 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded border-2"
              style={{
                borderColor: architecture.pcPipeline.color,
                backgroundColor: `${architecture.pcPipeline.color}20`,
              }}
            />
            <span>Offline Training</span>
          </div>
          <div className="flex items-center gap-1">
            <div
              className="w-3 h-3 rounded border-2"
              style={{
                borderColor: architecture.embeddedPipeline.color,
                backgroundColor: `${architecture.embeddedPipeline.color}20`,
              }}
            />
            <span>Real-time Inference</span>
          </div>
        </div>
      </div>
    </div>
  )
}
