"use client"

import { useState } from "react"
import { cn } from "../lib/utils"
import { Cpu, Radio, Server, Brain, Database, Monitor, ArrowRight } from "lucide-react"

const layers = [
  {
    id: "wearable",
    label: "Edge Device",
    icon: Cpu,
    color: "#3b82f6",
    items: [
      { id: "mcu", label: "ESP32 MCU", desc: "Dual-core 240MHz" },
      { id: "imu", label: "MPU-6050 IMU", desc: "6-axis motion" },
      { id: "optical", label: "MAX30102", desc: "HR & SpO₂" },
    ],
  },
  {
    id: "comm",
    label: "Communication",
    icon: Radio,
    color: "#06b6d4",
    items: [
      { id: "wifi", label: "Wi-Fi 802.11", desc: "2.4GHz LPWAN sim" },
      { id: "protocol", label: "REST/JSON", desc: "HTTP payloads" },
    ],
  },
  {
    id: "edge",
    label: "Edge Computing",
    icon: Server,
    color: "#10b981",
    items: [
      { id: "flask", label: "Flask API", desc: "Telemetry ingestion" },
      { id: "signal", label: "DSP Pipeline", desc: "FFT filtering" },
    ],
  },
  {
    id: "ml",
    label: "ML Inference",
    icon: Brain,
    color: "#f59e0b",
    items: [
      { id: "model", label: "CNN-BiLSTM", desc: "Activity classification" },
      { id: "intent", label: "Intent Classifier", desc: "Priority routing" },
    ],
  },
  {
    id: "data",
    label: "Data Store",
    icon: Database,
    color: "#8b5cf6",
    items: [{ id: "mongodb", label: "MongoDB", desc: "Time-series DB" }],
  },
  {
    id: "viz",
    label: "Visualization",
    icon: Monitor,
    color: "#ec4899",
    items: [{ id: "react", label: "React Dashboard", desc: "Real-time UI" }],
  },
]

export function AirShoesArchitecture() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null)

  return (
    <div className="w-full h-full p-4 sm:p-6 overflow-auto">
      {/* Horizontal Flow Diagram */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {layers.map((layer, idx) => {
          const Icon = layer.icon
          return (
            <div key={layer.id} className="relative">
              {/* Layer Card */}
              <div
                className={cn(
                  "rounded-lg border-2 p-3 transition-all duration-300 h-full",
                  hoveredLayer === layer.id ? "scale-[1.02]" : "",
                )}
                style={{
                  borderColor: hoveredLayer === layer.id ? layer.color : `${layer.color}40`,
                  backgroundColor: hoveredLayer === layer.id ? `${layer.color}15` : `${layer.color}08`,
                }}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-3 pb-2 border-b" style={{ borderColor: `${layer.color}30` }}>
                  <div
                    className="w-7 h-7 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: `${layer.color}20` }}
                  >
                    <Icon className="w-4 h-4" style={{ color: layer.color }} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: layer.color }}>
                    {layer.label}
                  </span>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {layer.items.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "px-2 py-1.5 rounded border transition-all duration-200 cursor-pointer",
                        hoveredItem === item.id ? "scale-[1.02]" : "",
                      )}
                      style={{
                        borderColor: hoveredItem === item.id ? layer.color : `${layer.color}25`,
                        backgroundColor: hoveredItem === item.id ? `${layer.color}20` : "transparent",
                      }}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="text-[11px] font-semibold text-foreground">{item.label}</div>
                      <div className="text-[9px] text-muted-foreground">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Arrow connector - only show between cards, not after last */}
              {idx < layers.length - 1 && (
                <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-muted-foreground animate-pulse" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Data Flow Summary */}
      <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
        <h4 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">Data Flow Pipeline</h4>
        <div className="flex flex-wrap items-center gap-2 text-[10px]">
          <span className="px-2 py-1 rounded bg-[#3b82f6]/20 text-[#3b82f6] font-medium">Sensor Data</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span className="px-2 py-1 rounded bg-[#06b6d4]/20 text-[#06b6d4] font-medium">Wi-Fi TX</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span className="px-2 py-1 rounded bg-[#10b981]/20 text-[#10b981] font-medium">Edge Processing</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span className="px-2 py-1 rounded bg-[#f59e0b]/20 text-[#f59e0b] font-medium">ML Inference</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span className="px-2 py-1 rounded bg-[#8b5cf6]/20 text-[#8b5cf6] font-medium">Store</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span className="px-2 py-1 rounded bg-[#ec4899]/20 text-[#ec4899] font-medium">Dashboard</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex flex-wrap gap-4 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
            <span>Alert path (URLLC simulation)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span>Standard telemetry (eMBB)</span>
          </div>
        </div>
      </div>
    </div>
  )
}
