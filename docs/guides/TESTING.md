# Testing Guide

This project includes comprehensive unit tests for the accordion functionality in the FeaturesAccordionLayout component.

## Running Tests

### Install Dependencies
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

## Test Coverage

The `FeaturesAccordionLayout` component has **100% test coverage** across:
- **Statements**: 100%
- **Branches**: 100%
- **Functions**: 100%
- **Lines**: 100%

## What the Tests Cover

### 1. Component Rendering
- ✅ Renders the correct heading "Comprehensive feature overview"
- ✅ Renders all 13 feature items with proper titles
- ✅ Starts with all accordion items closed

### 2. Accordion Functionality
- ✅ Expands an accordion item when clicked
- ✅ Collapses an accordion item when clicked again
- ✅ Allows multiple accordion items to be open simultaneously
- ✅ Rotates chevron icon when accordion item is expanded/collapsed

### 3. Accessibility
- ✅ Proper ARIA attributes (`aria-expanded`, `aria-controls`, `aria-labelledby`)
- ✅ Correct button IDs and content panel relationships
- ✅ Role attributes for screen readers

### 4. User Experience
- ✅ Smooth transitions for expand/collapse animations
- ✅ State maintenance during re-renders
- ✅ Handles rapid clicking without breaking

### 5. Edge Cases
- ✅ Multiple items can be open at the same time
- ✅ State consistency across interactions
- ✅ Proper event handling

## Test Structure

Tests are located in: `src/components/features/__tests__/FeaturesAccordionLayout.test.tsx`

The test suite uses:
- **Jest** as the test runner
- **@testing-library/react** for component testing
- **@testing-library/jest-dom** for custom matchers
- **@testing-library/user-event** for user interactions

## Mocking

The tests include mocks for:
- `next-intl` translations
- React hooks and global objects
- SVG elements and DOM queries

## Running Specific Tests

To run only the accordion tests:
```bash
npm test -- FeaturesAccordionLayout
```

To run tests matching a specific pattern:
```bash
npm test -- --testNamePattern="expands"
```

## Debugging Tests

To debug failing tests, you can:
1. Add `debugger;` statements in your test code
2. Use `console.log()` to inspect component state
3. Run tests with `--verbose` flag for more output

## Continuous Integration

The test suite is designed to run in CI/CD environments and will fail if:
- Any test fails
- Coverage drops below 100% for the tested component
- TypeScript compilation errors occur
