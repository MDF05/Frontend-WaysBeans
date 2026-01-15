# Deployment Guide

This guide covers how to deploy the WaysBean Frontend.

## Build Process
The application is built using Vite, which bundles the code for production.

```bash
# 1. Install dependencies
npm install

# 2. Build the project
npm run build
# This creates a 'dist/' directory with static files.
```

## Platform Specific Instructions

### Vercel (Recommended)
1.  Connect your GitHub repository.
2.  Framework Preset: **Vite**.
3.  Build Command: `npm run build`.
4.  Output Directory: `dist`.
5.  Add `VITE_API_BASE_URL` in the Environment Variables settings.

### Netlify
1.  Connect Git repo.
2.  Build command: `npm run build`.
3.  Publish directory: `dist`.

### Static Hosting (Apache/Nginx)
Simply upload the contents of the `dist` folder to your public HTML directory.
Ensure your server is configured to handle client-side routing (SPA fallback to index.html).

**Nginx Example:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```
