"use client"

import { useState, useMemo } from "react"
import { Badge } from "../components/ui/badge"
import { Input } from "../components/ui/input"
import { Trophy, Calendar, Users, Award, Search, Filter, ChevronDown } from "lucide-react"
import { cn } from "../lib/utils"

const competitions = [
  {
    id: 1,
    title: "Health-Tech and AI Hackathon",
    organization: "IIT BHU (Spirit '25)",
    date: "Mar 2025",
    status: "winner",
    type: "hackathon",
    teamSize: "Individual",
    result: "International Conference Presenter",
    icon: "healthcare",
    color: "#10b981",
  },
  {
    id: 2,
    title: "Healthcare Management System Hackathon",
    organization: "IIT Indore (Fluxus 2025)",
    date: "Feb 2025",
    status: "finalist",
    type: "hackathon",
    teamSize: "Team DHIMS",
    result: "National Finalist",
    icon: "healthcare",
    color: "#3b82f6",
  },
  {
    id: 3,
    title: "VNIT Nagpur 5G Summer School",
    organization: "VNIT Nagpur",
    date: "Jun 2024",
    status: "winner",
    type: "competition",
    teamSize: "Individual",
    result: "2nd Prize",
    icon: "telecom",
    color: "#f59e0b",
  },
  {
    id: 4,
    title: "Pratikruti 2024",
    organization: "YCCE Nagpur",
    date: "Feb 2025",
    status: "winner",
    type: "competition",
    teamSize: "Team",
    result: "3rd Rank National",
    icon: "tech",
    color: "#8b5cf6",
  },
  {
    id: 5,
    title: "Bitathon 2025",
    organization: "BITS Pilani",
    date: "Jan 2025",
    status: "completed",
    type: "hackathon",
    teamSize: "Individual",
    result: "Completed",
    icon: "code",
    color: "#06b6d4",
  },
  {
    id: 6,
    title: "Postman API Hackathon 4.0",
    organization: "BITS Pilani",
    date: "Jan 2025",
    status: "completed",
    type: "hackathon",
    teamSize: "Team Diesel",
    result: "Participation",
    icon: "api",
    color: "#ec4899",
  },
  {
    id: 7,
    title: "HP Power Lab",
    organization: "HP",
    date: "Nov 2024",
    status: "completed",
    type: "workshop",
    teamSize: "Team Diesel",
    result: "Completed",
    icon: "hardware",
    color: "#64748b",
  },
  {
    id: 8,
    title: "EY Techathon 6.0",
    organization: "EY",
    date: "Nov 2025",
    status: "completed",
    type: "hackathon",
    teamSize: "Individual",
    result: "Completed",
    icon: "enterprise",
    color: "#fbbf24",
  },
  {
    id: 9,
    title: "Agents in Production Hackathon",
    organization: "IIT Delhi",
    date: "Oct 2025",
    status: "completed",
    type: "hackathon",
    teamSize: "Individual",
    result: "Participation",
    icon: "ai",
    color: "#a855f7",
  },
  {
    id: 10,
    title: "ISEA ISAP CTF 2026",
    organization: "ISEA",
    date: "Dec 2025",
    status: "completed",
    type: "ctf",
    teamSize: "Team Cywarrior",
    result: "Completed",
    icon: "security",
    color: "#ef4444",
  },
  {
    id: 11,
    title: "Ingenium PRAGYAN'26 - Hardware Hackathon",
    organization: "PRAGYAN'26",
    date: "Dec 2025",
    status: "completed",
    type: "hackathon",
    teamSize: "Team Minus One",
    result: "Completed",
    icon: "hardware",
    color: "#14b8a6",
  },
  {
    id: 12,
    title: "Crack the Case – National Competition",
    organization: "National",
    date: "Oct 2025",
    status: "completed",
    type: "case-study",
    teamSize: "Team Cracker",
    result: "Participation",
    icon: "business",
    color: "#f97316",
  },
]

const statusConfig = {
  winner: { label: "Winner", color: "#10b981", bg: "bg-emerald-500/10" },
  finalist: { label: "Finalist", color: "#3b82f6", bg: "bg-blue-500/10" },
  completed: { label: "Completed", color: "#64748b", bg: "bg-slate-500/10" },
}

const typeFilters = ["all", "hackathon", "competition", "workshop", "ctf", "case-study"]

export function CompetitionsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const filteredCompetitions = useMemo(() => {
    return competitions.filter((comp) => {
      const matchesSearch =
        comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        comp.organization.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = typeFilter === "all" || comp.type === typeFilter
      return matchesSearch && matchesType
    })
  }, [searchTerm, typeFilter])

  const stats = useMemo(() => {
    const winners = competitions.filter((c) => c.status === "winner").length
    const finalists = competitions.filter((c) => c.status === "finalist").length
    const hackathons = competitions.filter((c) => c.type === "hackathon").length
    return { total: competitions.length, winners, finalists, hackathons }
  }, [])

  return (
    <section id="competitions" className="relative py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs font-mono border-chart-4/30 text-chart-4 bg-chart-4/5"
          >
            Competition Track Record
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Hackathons & Competitions</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Active participation in national and international hackathons, demonstrating problem-solving skills and
            technical expertise across diverse domains.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="text-3xl font-bold text-primary">{stats.total}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Total Events</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="text-3xl font-bold text-chart-3">{stats.winners}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Awards Won</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="text-3xl font-bold text-chart-1">{stats.finalists}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Finals Reached</div>
          </div>
          <div className="p-4 rounded-xl bg-card border border-border text-center">
            <div className="text-3xl font-bold text-chart-2">{stats.hackathons}</div>
            <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">Hackathons</div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search competitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
            <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
          </button>
        </div>

        {/* Filter Pills */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 mb-6 p-4 rounded-lg bg-secondary/50 border border-border">
            {typeFilters.map((type) => (
              <button
                key={type}
                onClick={() => setTypeFilter(type)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize",
                  typeFilter === type
                    ? "bg-primary text-primary-foreground"
                    : "bg-background text-muted-foreground hover:text-foreground border border-border",
                )}
              >
                {type === "all" ? "All Types" : type.replace("-", " ")}
              </button>
            ))}
          </div>
        )}

        {/* Competitions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCompetitions.map((comp) => {
            const status = statusConfig[comp.status as keyof typeof statusConfig]
            return (
              <div
                key={comp.id}
                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${comp.color}15` }}
                  >
                    <Trophy className="w-5 h-5" style={{ color: comp.color }} />
                  </div>
                  <Badge
                    variant="outline"
                    className={cn("text-[10px]", status.bg)}
                    style={{ color: status.color, borderColor: `${status.color}40` }}
                  >
                    {status.label}
                  </Badge>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-foreground text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
                  {comp.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">{comp.organization}</p>

                {/* Result Badge */}
                {(comp.status === "winner" || comp.status === "finalist") && (
                  <div
                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-medium mb-3"
                    style={{ backgroundColor: `${comp.color}15`, color: comp.color }}
                  >
                    <Award className="w-3 h-3" />
                    {comp.result}
                  </div>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {comp.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
                    <Users className="w-3 h-3" />
                    {comp.teamSize}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* No Results */}
        {filteredCompetitions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No competitions found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}
