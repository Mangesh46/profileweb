# Mangesh Sarde - Portfolio

A professional portfolio website showcasing embedded systems, IoT, and wireless communications projects. Built with Next.js and optimized for GitHub Pages deployment.

## Live Demo

**[https://mangesh46.github.io/profile](https://mangesh46.github.io/profile)**

---

## Deployment to GitHub Pages (Step-by-Step)

### Prerequisites
- Node.js 18+ installed
- Git installed
- A GitHub account

### Step 1: Clone the Repository
```bash
git clone https://github.com/Mangesh46/profile.git
cd profile
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Test Locally (Optional)
```bash
npm run dev
```
Open [http://localhost:3000/profile](http://localhost:3000/profile) to view it.

### Step 4: Build for Static Export
```bash
npm run build
```
This creates an `out` folder with all static files.

### Step 5: Push to GitHub
```bash
git add .
git commit -m "Ready for GitHub Pages"
git push origin main
```

### Step 6: Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/Mangesh46/profile`
2. Click **Settings** (gear icon)
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically run and deploy your site

### Step 7: Access Your Site

After the workflow completes (2-3 minutes), your site will be live at:
```
https://mangesh46.github.io/profile
```

---

## Manual Deployment (Alternative)

If you prefer manual deployment without GitHub Actions:

### Step 1: Build the Static Site
```bash
npm run build
```

### Step 2: Deploy the `out` Folder

You can deploy the `out` folder to any static hosting:
- **GitHub Pages**: Use `gh-pages` branch
- **Netlify**: Drag and drop the `out` folder
- **Vercel**: Connect the repository

### Using gh-pages branch (Manual)
```bash
# Install gh-pages package
npm install -D gh-pages

# Add deploy script to package.json (already added)
npm run deploy
```

---

## Project Structure

```
profile/
├── app/
│   ├── globals.css      # Global styles & Tailwind config
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Main portfolio page
├── components/
│   ├── architecture/    # Project architecture diagrams
│   ├── ui/              # shadcn/ui components
│   └── *.tsx            # Section components
├── .github/
│   └── workflows/
│       └── deploy.yml   # GitHub Actions deployment
├── next.config.mjs      # Next.js config for static export
└── package.json
```

---

## Configuration

### Changing the Base Path

If your repository name is different from `profile`, update these files:

**next.config.mjs:**
```js
basePath: '/your-repo-name',
assetPrefix: '/your-repo-name',
```

**.github/workflows/deploy.yml:**
```yaml
destination_dir: your-repo-name
```

---

## Technologies Used

- **Framework**: Next.js 14 (Static Export)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

---

## Features

- Fully static - No backend required
- Responsive design - Mobile-first approach
- Interactive architecture diagrams
- Telecom/Qualcomm-inspired theme
- Dark mode optimized
- SEO optimized

---

## Customization

### Update Personal Information

Edit the components in `/components/` folder:
- `hero-section.tsx` - Name, title, stats
- `contact-section.tsx` - Email, LinkedIn, GitHub links
- `projects-section.tsx` - Project details
- `competitions-section.tsx` - Hackathon achievements

### Update Theme Colors

Edit `app/globals.css` to change the color scheme.

---

## License

MIT License - Feel free to use this template for your own portfolio.

---

## Contact

- **Email**: sardemangesh92@gmail.com
- **LinkedIn**: [linkedin.com/in/mangesh-sarde](https://linkedin.com/in/mangesh-sarde)
- **GitHub**: [github.com/Mangesh46](https://github.com/Mangesh46)
