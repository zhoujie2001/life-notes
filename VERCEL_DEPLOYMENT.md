# Vercel Deployment Notes

## Root Directory

This project is a Next.js application located at the repository root.

In Vercel, set:

```text
Root Directory: ./
Framework Preset: Next.js
Install Command: npm ci
Build Command: npm run build
Output Directory: .next
Node.js Version: 20.x
```

Do not set the Root Directory to `github-pages` or any other subdirectory. The `package.json` containing the `next` dependency is located in the repository root.

## Why this matters

If Vercel reports:

```text
No Next.js version detected. Make sure your package.json has "next" in dependencies or devDependencies.
```

it usually means Vercel is building from the wrong directory and cannot see the root `package.json`.

## GitHub Pages

The static GitHub Pages landing page is exposed through the root `index.html` file. GitHub Pages can use:

```text
Deploy from a branch → main → /root
```
