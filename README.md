# Lyyli - AI-Powered Communication Platform

This is a [Next.js](https://nextjs.org) project for the Lyyli AI communication platform, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Getting Started

**IMPORTANT**: Always run commands from the main project directory!

First, ensure you're in the correct directory:

```bash
cd /Users/mikko.oksanen/Desktop/Content\ AI\ Oy/Cursor/lyyli-clone-fresh
```

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/[locale]/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load fonts.

## 📚 Project Documentation

### Quick Links
- **[Architecture](./docs/architecture/)** - Project structure and organization
- **[Guides](./docs/guides/)** - Setup and testing guides
- **[Features](./docs/features/)** - Feature documentation and implementation details
- **[Compliance](./docs/compliance/)** - GDPR and security documentation
- **[Implementation Summaries](./docs/implementation-summaries/)** - Historical implementation records
- **[Rules](./rules/)** - Brand and development rules

### Key Documents
- [Project Structure](./docs/architecture/PROJECT_STRUCTURE.md) - Complete project organization
- [Testing Guide](./docs/guides/TESTING.md) - Testing setup and best practices
- [Monitoring Setup](./docs/guides/MONITORING_SETUP.md) - Observability configuration
- [GDPR Compliance](./docs/compliance/GDPR_COMPLIANCE.md) - Privacy and compliance info
- [Cleanup Plan](./CLEANUP_PLAN.md) - Current cleanup and optimization efforts

## 🏗️ Project Structure

```
lyyli-clone-fresh/           # ← MAIN PROJECT DIRECTORY
├── src/                     # Source code
│   ├── app/                 # Next.js app directory (routes)
│   ├── components/          # React components
│   ├── lib/                 # Utility functions and libraries
│   ├── hooks/               # React hooks
│   ├── middleware/          # Server middleware
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
├── content/                 # MDX content (blog, legal)
├── docs/                    # Documentation
│   ├── architecture/        # System design and structure
│   ├── guides/              # Setup and how-to guides
│   ├── features/            # Feature documentation
│   ├── compliance/          # Legal and compliance docs
│   └── implementation-summaries/  # Historical records
├── rules/                   # Brand and development rules
├── scripts/                 # Build and utility scripts
├── e2e/                     # End-to-end tests
├── archive/                 # Archived old files
└── [configuration files]
```

## ⚠️ Important Notes

- **Always work from the main directory**: `/lyyli-clone-fresh/`
- **Never work from subdirectories** like `/lyyli-clone-fresh/lyyli-clone/`
- **Check `pwd`** if you're unsure about your location
- **All source files are in `src/`**

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Type checking
npm run type-check
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
