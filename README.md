# Fastident Dental Clinic Website

Fastident is a responsive dental clinic website built with `React`, `Vite`, `Tailwind CSS`, and `motion`. The site includes a cleaner header, mobile-friendly page layouts, service pages, testimonials, contact details, and a multi-step booking flow.

## Stack

- `React 18`
- `Vite 6`
- `Tailwind CSS 4`
- `lucide-react`
- `motion`

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

Vite outputs the production files to `dist`.

## Project structure

- `src/app/App.tsx`: main app layout, navigation, sections, and modals
- `src/main.tsx`: application entry point
- `src/styles/`: global theme and styling files

## Deployment on Vercel

This project is ready to deploy as a standard Vite app.

### Option 1: Deploy with Git

1. Push the project to GitHub, GitLab, or Bitbucket.
2. Import the repository into Vercel.
3. Vercel should detect the project automatically.
4. Use these settings if Vercel asks:

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

### Option 2: Deploy with Vercel CLI

```bash
npm install -g vercel
vercel
```

For production deployment:

```bash
vercel --prod
```

## Notes

- The site is built as a single-page app.
- Static assets are bundled by Vite during the production build.
- If you update contact details, service pricing, or clinic copy, edit `src/app/App.tsx`.
