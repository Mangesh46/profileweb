# profileweb

Personal portfolio built with **Next.js 16** — featuring a live GitHub README
sync engine, Mermaid architecture diagrams, and a Google Drive proof-of-work system.

**Live → [profile-henna-delta.vercel.app](https://profile-henna-delta.vercel.app)**

---

## How It Works

### 1. GitHub README Sync Engine
`app/api/readme/[repo]/route.ts`

Each project card on the site is **driven by that project's own README**.
The API route fetches `README.md` from any repo (public or private via `GITHUB_TOKEN`),
parses a `PROFILE_CARD` metadata block, and extracts:

- **Stage badge** — `Ideation / In Progress / Completed / Deployed / Archived`
- **YouTube video** — unlisted videos embed inline; private videos show a link-out card
- **Story & Motivation** — rendered from `## 🎯 Story & Motivation` section
- **Current Progress** — rendered from `## 📊 Current Progress` section
- **Mermaid architecture diagram** — auto-extracted from any ` ```mermaid ``` ` block

Add this block to any project's README and it appears on the portfolio automatically:

```markdown
<!-- PROFILE_CARD
stage: In Progress
updated: 2025-06-01
youtube_id: YOUR_VIDEO_ID
youtube_unlisted: true
live_url: https://your-demo.vercel.app
-->
```

Cache: 5-minute revalidation. Manual refresh via the ↻ button bypasses cache with `?t=` bust.

---

### 2. Mermaid Architecture Diagrams
`components/mermaid-diagram.tsx`

Renders Mermaid diagrams pulled live from project READMEs.
Dark-themed to match the site, with zoom in/out/reset controls.
Loaded dynamically (no SSR) to keep bundle size small.

---

### 3. Google Drive Proof System
`lib/useDriveProofs.ts`

Certificates, awards, and internship letters are stored in a **Google Drive folder**.
The filename *is* the card data — no database, no config file.
Upload a file → card appears. Delete it → card disappears.

**Naming convention:**
```
cert_{Issuer}_{Title}_{Period}.pdf
award_{Org}_{Result}_{Year}.pdf
internship_{Company}_{Period}.pdf
```

**Examples:**
```
cert_NPTEL_Applied-Linear-Algebra_Jul-Oct-2025.pdf
cert_Google-Cloud_AI-and-ML_2025.pdf
award_VNIT-Nagpur_2nd-Prize-Summer-School_2025.pdf
internship_Sarvaksh-Communications_Aug-2025-to-Jan-2026.pdf
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS v3 + shadcn/ui |
| Diagrams | Mermaid.js v11 |
| Icons | Lucide React |
| Proofs | Google Drive API v3 |
| Deployment | Vercel (primary) |

---

## Environment Variables

```env
# Required for private repo README access
GITHUB_TOKEN=ghp_...

# Required for certifications/awards section
NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID=your_folder_id
NEXT_PUBLIC_GOOGLE_API_KEY=your_api_key
```

---

## Local Development

```bash
git clone https://github.com/Mangesh46/profileweb.git
cd profileweb
npm install
cp .env.example .env.local   # add your tokens
npm run dev
# http://localhost:3000
```

---

## Project Structure

```
profileweb/
├── app/
│   ├── api/readme/[repo]/route.ts   # GitHub README fetch + parse engine
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── github-readme-project.tsx    # Project card with tabs + stage badge
│   ├── mermaid-diagram.tsx          # Diagram renderer with zoom controls
│   ├── *-architecture.tsx           # Per-project static architecture fallbacks
│   └── ...                          # Section components
└── lib/
    └── useDriveProofs.ts            # Google Drive file → proof card parser
```

---

## Contact

- **Email**: mangeshsarde6@gmail.com
- **LinkedIn**: [linkedin.com/in/mangesh-sarde](https://linkedin.com/in/mangesh-sarde)
- **GitHub**: [github.com/Mangesh46](https://github.com/Mangesh46)
