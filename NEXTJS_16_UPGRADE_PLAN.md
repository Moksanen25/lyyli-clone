# Next.js 16 Upgrade Plan

## Current Status

- **Current Version**: Next.js 15.5.7 (critical security vulnerability fixed)
- **Target Version**: Next.js 16.0.7
- **Upgrade Type**: Major version upgrade (breaking changes expected)

## Pre-Upgrade Checklist

### 1. Current Dependencies Status

- ✅ Next.js: 15.5.7 (critical vulnerability fixed)
- ⚠️ React: 19.2.0 (should upgrade to 19.2.1+)
- ⚠️ react-intersection-observer: 9.16.0 (major update to 10.0.0 available)
- ⚠️ Missing packages: rehype-autolink-headings, rehype-slug, remark-autolink-headings, remark-slug

### 2. Remaining Security Issues

- **High**: `trim-newlines` vulnerability in `mdx@0.3.1`
  - Fix requires downgrading to `mdx@0.2.3` (breaking change)
  - Consider alternative MDX solutions or wait for `mdx` package update

## Upgrade Steps

### Phase 1: Preparation (Before Upgrade)

1. **Backup Current State**

   ```bash
   git checkout -b upgrade/nextjs-16
   git commit -am "Backup before Next.js 16 upgrade"
   ```

2. **Update Related Dependencies First**

   ```bash
   # Update React to latest 19.x
   npm install react@19.2.1 react-dom@19.2.1 @types/react@19.2.7 @types/react-dom@19.2.3

   # Update other dependencies
   npm install next-intl@4.5.8
   npm install framer-motion@12.23.25
   npm install prettier@3.7.4
   npm install eslint@9.39.1
   npm install @playwright/test@1.57.0
   ```

3. **Install Missing Packages**

   ```bash
   npm install rehype-autolink-headings@7.1.0 rehype-slug@6.0.0 remark-autolink-headings@7.0.1 remark-slug@7.0.1
   ```

4. **Run Tests**
   ```bash
   npm run test
   npm run typecheck
   npm run build
   ```

### Phase 2: Automated Upgrade (Recommended)

1. **Use Next.js Codemod**

   ```bash
   npx @next/codemod@canary upgrade latest
   ```

   This will:
   - Update `package.json` dependencies
   - Make necessary code modifications
   - Handle most breaking changes automatically

2. **Manual Package Update (Alternative)**
   ```bash
   npm install next@16.0.7 react@19.2.1 react-dom@19.2.1 eslint-config-next@16.0.7 @next/mdx@16.0.7 @next/bundle-analyzer@16.0.7
   ```

### Phase 3: Breaking Changes to Address

#### 3.1 Cache Components

- **Change**: New `"use cache"` directive for explicit caching
- **Action**: Review caching strategy, update components that need explicit cache control
- **Files to check**: All server components, API routes

#### 3.2 Middleware Changes

- **Change**: `middleware.ts` may need to be renamed to `proxy.ts` (verify with Next.js 16 docs)
- **Action**: Check if you have middleware, update accordingly
- **Files to check**:
  - `src/middleware.ts` (uses next-intl middleware)
  - `src/lib/api/middleware.ts`
  - **Note**: Your middleware uses `next-intl/middleware` - verify compatibility with Next.js 16

#### 3.3 Node.js Version

- **Requirement**: Node.js 20.9 or later
- **Current**: Node.js 22.14.0 ✅ (meets requirement)
- **Action**: No action needed

#### 3.4 Turbopack (Default Bundler)

- **Change**: Turbopack becomes default bundler
- **Action**: Test build with Turbopack, may need to adjust build configuration
- **Note**: Can opt-out if needed, but recommended to use

#### 3.5 React 19 Compatibility

- **Change**: Ensure React 19.2.1+ is used
- **Action**: Already planned in Phase 1

#### 3.6 TypeScript Configuration

- **Action**: Review `tsconfig.json` for any deprecated options
- **Files to check**: `tsconfig.json`

### Phase 4: Code Updates

1. **Update Imports** (if needed)
   - Check for deprecated Next.js imports
   - Update any deprecated API usage

2. **Update Configuration Files**
   - `next.config.ts` (exists - uses TypeScript)
   - `next-intl.config.js`
   - **Specific checks for your config**:
     - `experimental.mdxRs: true` - verify MDX RS support in Next.js 16
     - `experimental.optimizePackageImports` - verify still supported
     - Custom webpack configuration - may need updates for Turbopack
     - `output: 'standalone'` - verify compatibility

3. **Update Custom Hooks/Utilities**
   - Check for any Next.js API changes
   - Update any deprecated patterns

### Phase 5: Testing

1. **Type Checking**

   ```bash
   npm run typecheck
   ```

2. **Linting**

   ```bash
   npm run lint
   ```

3. **Build Test**

   ```bash
   npm run build
   ```

4. **Unit Tests**

   ```bash
   npm run test
   ```

5. **E2E Tests**

   ```bash
   npm run e2e
   ```

6. **Manual Testing**
   - Test all pages
   - Test all features
   - Test internationalization (next-intl)
   - Test animations (framer-motion)
   - Test responsive design

### Phase 6: Performance Testing

1. **Lighthouse Tests**

   ```bash
   npm run lighthouse:test
   ```

2. **Bundle Analysis**

   ```bash
   npm run build
   # Check bundle size changes
   ```

3. **Web Vitals**
   ```bash
   npm run web-vitals:test
   ```

### Phase 7: Deployment

1. **Staging Deployment**
   - Deploy to staging environment
   - Monitor for errors
   - Test all critical paths

2. **Production Deployment**
   - Deploy during low-traffic period
   - Monitor error rates
   - Have rollback plan ready

## Known Issues & Considerations

### MDX Package Vulnerability

- **Issue**: `mdx@0.3.1` has high severity vulnerability in `trim-newlines`
- **Options**:
  1. Wait for `mdx` package update
  2. Consider alternative MDX solutions
  3. Accept risk if MDX is only used in development

### react-intersection-observer Major Update

- **Current**: 9.16.0
- **Target**: 10.0.0
- **Action**: Review breaking changes before upgrading
- **Test**: Ensure intersection observer functionality still works

### Tailwind CSS v4 Alpha

- **Current**: 4.0.0-alpha.25
- **Status**: Still in alpha, may have breaking changes
- **Action**: Monitor for stable release, test thoroughly

## Rollback Plan

If upgrade fails:

1. **Git Rollback**

   ```bash
   git checkout main
   git branch -D upgrade/nextjs-16
   ```

2. **Package Rollback**

   ```bash
   npm install next@15.5.7 eslint-config-next@15.5.7 @next/mdx@15.5.7 @next/bundle-analyzer@15.5.7
   ```

3. **Restore from Backup**
   - Restore from git commit before upgrade
   - Restore `package-lock.json` if needed

## Timeline Estimate

- **Phase 1 (Preparation)**: 1-2 hours
- **Phase 2 (Automated Upgrade)**: 30 minutes
- **Phase 3-4 (Breaking Changes & Code Updates)**: 2-4 hours
- **Phase 5 (Testing)**: 2-3 hours
- **Phase 6 (Performance Testing)**: 1 hour
- **Phase 7 (Deployment)**: 1-2 hours

**Total Estimated Time**: 8-13 hours

## Resources

- [Next.js 16 Upgrade Guide](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js 16 Release Notes](https://nextjs.org/blog/next-16)
- [Next.js Codemod](https://nextjs.org/docs/app/getting-started/upgrading)

## Notes

- Always test in a separate branch first
- Keep main branch stable during upgrade
- Document any custom workarounds needed
- Update this plan based on actual upgrade experience
