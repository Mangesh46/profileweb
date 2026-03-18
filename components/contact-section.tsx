// "use client"

// import { Badge } from "../components/ui/badge"
// import { Button } from "../components/ui/button"
// import { Github, Linkedin, Mail, MapPin, FileText, ExternalLink } from "lucide-react"

// export function ContactSection() {
//   const email = "mangeshsarde6@gmail.com"
//   const linkedIn = "https://linkedin.com/in/mangesh-sarde"
//   const github = "https://github.com/Mangesh46"

//   const handleContactClick = () => {
//     const subject = encodeURIComponent("Opportunity Discussion - Embedded Systems Engineer")
//     const body = encodeURIComponent(
//       "Hi Mangesh,\n\nI came across your portfolio and would like to discuss a potential opportunity.\n\n[Please describe the opportunity here]\n\nBest regards,",
//     )
//     window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self")
//   }

//   return (
//     <section id="contact" className="relative py-24 bg-secondary/30">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="mb-12">
//           <Badge
//             variant="outline"
//             className="mb-4 px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5"
//           >
//             Get in Touch
//           </Badge>
//           <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Let's Connect</h2>
//           <p className="mt-4 text-muted-foreground max-w-2xl">
//             Open to opportunities in embedded systems, IoT, and wireless communications. Let's discuss how I can
//             contribute to your team.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-12">
//           {/* Contact Info */}
//           <div className="space-y-8">
//             <div className="space-y-6">
//               <a
//                 href={`mailto:${email}`}
//                 className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
//               >
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//                   <Mail className="w-5 h-5 text-primary" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="text-sm text-muted-foreground">Email</div>
//                   <div className="font-medium text-foreground">{email}</div>
//                 </div>
//                 <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
//               </a>

//               <a
//                 href={linkedIn}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
//               >
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//                   <Linkedin className="w-5 h-5 text-primary" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="text-sm text-muted-foreground">LinkedIn</div>
//                   <div className="font-medium text-foreground">linkedin.com/in/mangesh-sarde</div>
//                 </div>
//                 <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
//               </a>

//               <a
//                 href={github}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
//               >
//                 <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
//                   <Github className="w-5 h-5 text-primary" />
//                 </div>
//                 <div className="flex-1">
//                   <div className="text-sm text-muted-foreground">GitHub</div>
//                   <div className="font-medium text-foreground">github.com/Mangesh46</div>
//                 </div>
//                 <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
//               </a>

//               <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
//                 <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
//                   <MapPin className="w-5 h-5 text-chart-3" />
//                 </div>
//                 <div>
//                   <div className="text-sm text-muted-foreground">Location</div>
//                   <div className="font-medium text-foreground">Nagpur, India</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* CTA Card - No backend form */}
//           <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 via-card to-chart-2/10 border border-primary/20">
//             <div className="flex items-center gap-3 mb-6">
//               <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
//                 <FileText className="w-6 h-6 text-primary" />
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold text-foreground">Ready to Connect?</h3>
//                 <p className="text-sm text-muted-foreground">Let's discuss opportunities</p>
//               </div>
//             </div>

//             <p className="text-muted-foreground mb-8 leading-relaxed">
//               I'm actively seeking roles in <span className="text-primary font-medium">embedded systems</span>,
//               <span className="text-primary font-medium"> IoT development</span>, and
//               <span className="text-primary font-medium"> wireless communications</span> at leading semiconductor
//               companies like Qualcomm, Intel, NVIDIA, and Broadcom.
//             </p>

//             <div className="space-y-4">
//               <Button onClick={handleContactClick} className="w-full h-12 text-base font-semibold" size="lg">
//                 <Mail className="w-5 h-5 mr-2" />
//                 Send Email
//               </Button>

//               <div className="grid grid-cols-2 gap-3">
//                 <Button variant="outline" className="h-11 bg-transparent" asChild>
//                   <a href={linkedIn} target="_blank" rel="noopener noreferrer">
//                     <Linkedin className="w-4 h-4 mr-2" />
//                     LinkedIn
//                   </a>
//                 </Button>
//                 <Button variant="outline" className="h-11 bg-transparent" asChild>
//                   <a href={github} target="_blank" rel="noopener noreferrer">
//                     <Github className="w-4 h-4 mr-2" />
//                     GitHub
//                   </a>
//                 </Button>
//               </div>
//             </div>

//             <div className="mt-8 pt-6 border-t border-border/50">
//               <div className="flex items-center justify-between text-sm">
//                 <span className="text-muted-foreground">Availability</span>
//                 <span className="flex items-center gap-2 text-chart-3 font-medium">
//                   <span className="w-2 h-2 rounded-full bg-chart-3 animate-pulse"></span>
//                   Open to Opportunities
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-16 pt-8 border-t border-border text-center">
//           <p className="text-sm text-muted-foreground">
//             © 2025 Mangesh Sarde
//           </p>
//         </div>
//       </div>
//     </section>
//   )
// }
"use client"

import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { Github, Linkedin, Mail, MapPin, FileText, ExternalLink } from "lucide-react"

export function ContactSection() {
  const email = "mangeshsarde6@gmail.com"
  const linkedIn = "https://linkedin.com/in/mangesh-sarde"
  const github = "https://github.com/Mangesh46"

  const handleContactClick = () => {
    const subject = encodeURIComponent("Opportunity Discussion - Software & Embedded Systems Engineer")
    const body = encodeURIComponent(
      "Hi Mangesh,\n\nI came across your portfolio and would like to discuss a potential opportunity.\n\n[Please describe the opportunity here]\n\nBest regards,",
    )
    window.open(`mailto:${email}?subject=${subject}&body=${body}`, "_self")
  }

  return (
    <section id="contact" className="relative py-24 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-3 py-1 text-xs font-mono border-primary/30 text-primary bg-primary/5"
          >
            Get in Touch
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Let's Connect</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Open to opportunities in software engineering, embedded systems, and wireless communications. Let's discuss how I can
            contribute to your team.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="space-y-6">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Email</div>
                  <div className="font-medium text-foreground">{email}</div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>

              <a
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Linkedin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">LinkedIn</div>
                  <div className="font-medium text-foreground">linkedin.com/in/mangesh-sarde</div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>

              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Github className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">GitHub</div>
                  <div className="font-medium text-foreground">github.com/Mangesh46</div>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border">
                <div className="w-12 h-12 rounded-lg bg-chart-3/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div className="font-medium text-foreground">Nagpur, India</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Card */}
          <div className="p-8 rounded-xl bg-gradient-to-br from-primary/10 via-card to-chart-2/10 border border-primary/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Ready to Connect?</h3>
                <p className="text-sm text-muted-foreground">Let's discuss opportunities</p>
              </div>
            </div>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Open to opportunities in{" "}
              <span className="text-primary font-medium">software engineering</span>,{" "}
              <span className="text-primary font-medium">embedded systems</span>, and{" "}
              <span className="text-primary font-medium">wireless communications</span>.
            </p>

            <div className="space-y-4">
              <Button onClick={handleContactClick} className="w-full h-12 text-base font-semibold" size="lg">
                <Mail className="w-5 h-5 mr-2" />
                Send Email
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-11 bg-transparent" asChild>
                  <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" className="h-11 bg-transparent" asChild>
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border/50">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Availability</span>
                <span className="flex items-center gap-2 text-chart-3 font-medium">
                  <span className="w-2 h-2 rounded-full bg-chart-3 animate-pulse"></span>
                  Open to Opportunities
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Mangesh Sarde
          </p>
        </div>
      </div>
    </section>
  )
}