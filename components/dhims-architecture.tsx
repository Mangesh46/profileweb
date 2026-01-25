"use client"

import { useState } from "react"
import { cn } from "../lib/utils"

const layers = [
  {
    id: "client",
    label: "Client Layer",
    color: "#3b82f6",
    items: [
      { id: "patient", label: "Patient Portal", desc: "Registration & booking" },
      { id: "doctor", label: "Doctor Portal", desc: "Schedule & records" },
      { id: "admin", label: "Admin Panel", desc: "Hospital management" },
    ],
  },
  {
    id: "api",
    label: "API / Application Layer",
    color: "#10b981",
    items: [
      { id: "auth", label: "Auth Module", desc: "JWT authentication" },
      { id: "patient-api", label: "Patient API", desc: "Record management" },
      { id: "appointment", label: "Appointment API", desc: "Scheduling logic" },
      { id: "validation", label: "Validation", desc: "Input sanitization" },
    ],
  },
  {
    id: "data",
    label: "Data Layer",
    color: "#8b5cf6",
    items: [
      { id: "users", label: "Users Collection", desc: "Patients, doctors, admins" },
      { id: "appointments", label: "Appointments", desc: "Scheduling data" },
      { id: "records", label: "Medical Records", desc: "Health data" },
      { id: "audit", label: "Audit Logs", desc: "Security tracking" },
    ],
  },
  {
    id: "security",
    label: "Security Layer",
    color: "#ef4444",
    items: [
      { id: "rbac", label: "RBAC", desc: "Role-based access" },
      { id: "encryption", label: "Encryption", desc: "Data protection" },
      { id: "logging", label: "Error Logging", desc: "Monitoring" },
    ],
  },
]

export function DHIMSArchitecture() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  return (
    <div className="w-full h-full p-4 sm:p-6 overflow-auto">
      <div className="space-y-4">
        {layers.map((layer, layerIndex) => (
          <div
            key={layer.id}
            className="rounded-lg border-2 p-4 transition-all duration-300"
            style={{
              borderColor: `${layer.color}40`,
              backgroundColor: `${layer.color}05`,
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.color }} />
              <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: layer.color }}>
                {layer.label}
              </span>
              {layer.id === "api" && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary-foreground ml-auto">
                  Node.js + Express
                </span>
              )}
              {layer.id === "data" && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-secondary text-secondary-foreground ml-auto">
                  MongoDB
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {layer.items.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    "px-3 py-2 rounded-md border transition-all duration-200 cursor-pointer",
                    hoveredItem === item.id ? "scale-105" : "",
                  )}
                  style={{
                    borderColor: hoveredItem === item.id ? layer.color : `${layer.color}30`,
                    backgroundColor: hoveredItem === item.id ? `${layer.color}20` : `${layer.color}08`,
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="text-xs font-medium text-foreground">{item.label}</div>
                  <div className="text-[10px] text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Connection arrows between layers */}
            {layerIndex < layers.length - 1 && (
              <div className="flex justify-center mt-3">
                <svg width="24" height="20" className="text-muted-foreground">
                  <path d="M12 0 L12 14 L8 10 M12 14 L16 10" stroke="currentColor" fill="none" strokeWidth="2" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Key Features */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-3 gap-2 text-[10px]">
          <div className="flex items-center gap-1 text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-chart-3" />
            <span>High Concurrency</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span>Stateless API</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span>Healthcare Security</span>
          </div>
        </div>
      </div>
    </div>
  )
}
