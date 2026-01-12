# React Router 7 + Cloudflare Workers

## Overview
A full-stack web application built with React Router 7 and Cloudflare Workers. Features server-side rendering (SSR) with React 19.

## Project Structure
- `app/` - React Router application code
  - `routes/` - Route components
  - `welcome/` - Welcome page assets
  - `root.tsx` - Root layout component
  - `routes.ts` - Route configuration
- `workers/` - Cloudflare Workers code
- `public/` - Static assets

## Development
- Start dev server: `npm run dev`
- Build: `npm run build`
- Preview build: `npm run preview`

## Tech Stack
- React 19
- React Router 7
- Tailwind CSS 4
- TypeScript
- Vite
- Cloudflare Workers (for deployment)

## Configuration
- Dev server runs on port 5000
- Uses Vite with hot module replacement
