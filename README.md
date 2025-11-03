# Lyyli - AI-Powered Communication Platform

This is a [Next.js](https://nextjs.org) project for the Lyyli AI communication platform, bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd lyyli-clone-fresh
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory and add your environment variables:

```bash
# Example environment variables
NEXT_PUBLIC_API_URL=your-api-url
# Add other required environment variables
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

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

## 🏗️ Project Structure

```
lyyli-clone-fresh/
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
└── [configuration files]    # Config files (.env, next.config, etc.)
```

## 🛠️ Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run test coverage
npm run test:coverage

# Type checking
npm run typecheck

# Linting
npm run lint

# Lint and fix issues
npm run lint:fix

# Run end-to-end tests
npm run e2e

# Run end-to-end tests with UI
npm run e2e:ui
```

## 🧪 Testing

This project includes comprehensive testing:

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: API and component integration tests
- **E2E Tests**: Playwright for end-to-end testing

Run all tests:

```bash
npm test
```

For more details, see the [Testing Guide](./docs/guides/TESTING.md).

## 🌍 Internationalization

This project supports multiple languages using `next-intl`. Translation files are located in `src/translations/`.

Supported languages:

- English (`en`)
- Finnish (`fi`)

## 📦 Built With

- **[Next.js 15](https://nextjs.org/)** - React framework
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Tailwind CSS](https://tailwindcss.com/)** - Styling
- **[next-intl](https://next-intl-docs.vercel.app/)** - Internationalization
- **[MDX](https://mdxjs.com/)** - Markdown for content
- **[Jest](https://jestjs.io/)** - Testing framework
- **[Playwright](https://playwright.dev/)** - E2E testing

## 🔒 Security & Compliance

This project implements:

- GDPR compliance measures
- Security headers and CSP
- Rate limiting
- Input validation and sanitization

See [GDPR Compliance](./docs/compliance/GDPR_COMPLIANCE.md) for details.

## 📝 Learn More

To learn more about Next.js, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js)

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

1. Push your code to a Git repository
2. Import your project to Vercel
3. Add environment variables in the Vercel dashboard
4. Deploy!

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Environment Variables

Make sure to set up the following environment variables in your deployment:

- `NEXT_PUBLIC_API_URL` - API endpoint URL
- Other required variables (see `.env.example` if available)

## 📄 License

[Add your license information here]

## 🤝 Contributing

[Add contributing guidelines here]

## 📧 Contact

For questions or support, please contact [your contact information].
