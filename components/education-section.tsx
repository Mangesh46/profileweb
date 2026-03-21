"use client"

import { Badge } from "../components/ui/badge"
import { GraduationCap, Calendar, BookOpen, Award } from "lucide-react"

const education = [
  {
    degree: "B.Tech. in Electronics and Communication Engineering",
    institution: "Shri Ramdeobaba College of Engineering and Management (RCOEM)",
    location: "Nagpur, Maharashtra",
    duration: "2023 – 2027",
    cgpa: "8.85 / 10.0",
    status: "Ongoing",
    expectedGraduation: "August 2027",
    backlogs: "No Active Backlogs",
    color: "#3b82f6",
    coursework: [
      "Data Structures and Algorithms",
      "Python Programming",
      "Database Management Systems",
      "Signals and Systems",
      "Microprocessors and Embedded Systems",
    ],
  },
]

export function EducationSection() {
  return (
    <section id="education" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5"
          >
            Academic Background
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Education</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Strong academic foundation in electronics, communication, and computer science.
          </p>
        </div>

        <div className="space-y-6">
          {education.map((edu, idx) => (
            <div
              key={idx}
              className="relative overflow-hidden p-6 sm:p-8 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 group"
            >
              {/* Decorative accent bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1 rounded-l-xl"
                style={{ backgroundColor: edu.color }}
              />

              <div className="grid sm:grid-cols-3 gap-6 pl-4">
                {/* Left: Main Info */}
                <div className="sm:col-span-2 space-y-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${edu.color}15` }}
                      >
                        <GraduationCap className="w-5 h-5" style={{ color: edu.color }} />
                      </div>
                      <Badge
                        variant="outline"
                        className="text-[10px] px-2 py-0.5"
                        style={{ color: edu.color, borderColor: `${edu.color}40`, backgroundColor: `${edu.color}10` }}
                      >
                        {edu.status}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {edu.degree}
                    </h3>
                    <p className="text-base font-semibold text-primary/80 mt-1">{edu.institution}</p>

                    <div className="flex flex-wrap gap-4 mt-2">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {edu.duration}
                      </span>
                      <span className="text-xs text-muted-foreground">📍 {edu.location}</span>
                    </div>
                  </div>

                  {/* Relevant Coursework */}
                  <div>
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2.5">
                      <BookOpen className="w-4 h-4 text-primary" />
                      Relevant Coursework
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="px-2.5 py-1 text-xs rounded-md bg-secondary text-secondary-foreground border border-border"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: CGPA & Meta */}
                <div className="flex flex-col justify-center items-center sm:items-end gap-4">
                  <div className="text-center sm:text-right">
                    <div
                      className="text-4xl font-extrabold tabular-nums"
                      style={{ color: edu.color }}
                    >
                      {edu.cgpa.split(" /")[0]}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">CGPA / 10.0</div>
                  </div>

                  <div className="flex flex-col gap-2 text-center sm:text-right">
                    <div className="flex items-center gap-1.5 justify-center sm:justify-end text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      Expected: {edu.expectedGraduation}
                    </div>
                    <div className="flex items-center gap-1.5 justify-center sm:justify-end">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium bg-emerald-500/10 text-emerald-600 border border-emerald-500/20">
                        <Award className="w-3 h-3" />
                        {edu.backlogs}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
