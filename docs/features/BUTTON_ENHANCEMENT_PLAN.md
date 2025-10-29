# Button Enhancement Plan for Lyyli.ai Project

## Executive Summary
This document outlines inconsistencies between button labels and their functionality, and proposes improvements to enhance user experience and conversion rates.

---

## Critical Issues Found

### 1. **Button Text vs Function Mismatches**

#### Issue A: "Book a demo" inconsistency
**Location**: About page, Home page hero
**Problem**: 
- About page: "Book a demo" (btn-primary) links to `app.lyyli.ai` instead of opening calendar
- Home page: "Book a demo" (btn-secondary) correctly opens calendar popup
**Impact**: Users expecting to book a demo get taken to sign-in page instead

#### Issue B: "Start free trial" vs "Get started" 
**Location**: Multiple CTAs throughout site
**Problem**: 
- Both terms lead to same action (sign in page)
- "Start free trial" implies free registration, but may redirect to sign-in for existing users
- No clear indication if trial requires signup or login
**Impact**: User confusion about next steps

#### Issue C: Mixed primary/secondary button usage
**Location**: About page CTA section
**Problem**:
- Both buttons go to same destination (app.lyyli.ai)
- Secondary button ("Start free trial") should be different action than primary ("Book a demo")
**Impact**: Wasted opportunity to guide users to appropriate action

---

## Proposed Solutions

### Solution 1: Standardize Demo Flow
**Goal**: Make "Book a demo" always open calendar popup

**Changes Required**:
1. **About page** (`src/app/[locale]/about/page.tsx` lines 69-74):
   - Change "Book a demo" button from Link to CalendarPopup component
   - Current: Links to app.lyyli.ai
   - Proposed: Opens calendar modal

2. **Consistency Check**:
   - Verify all "Book a demo" buttons use CalendarPopup
   - Update any hardcoded links to use CalendarPopup component

### Solution 2: Clarify Trial vs Sign-In
**Goal**: Make CTAs clear about user expectations

**Changes Required**:
1. **"Get started" button** (Home page hero):
   - **Text**: Change to "Start free 30-day trial"
   - **Alternative**: Keep "Get started" but add subtitle: "No credit card required"
   - **Action**: Link to `app.lyyli.ai` (appropriate - trial starts at signup)

2. **"Start free trial" buttons** (Pricing cards):
   - **Text**: Keep "Start free 30-day trial"
   - **Add tooltip/hover text**: "Start your free trial — no credit card required"
   - **Action**: Link to `app.lyyli.ai` (appropriate)

3. **Consider A/B testing**:
   - Alternative text: "Try Lyyli free — 30-day trial"
   - More direct call to action language

### Solution 3: Fix Primary/Secondary Hierarchy
**Goal**: Ensure primary button is most important action, secondary is alternative

**About Page CTA Section** (lines 110-130):
**Current State**:
- Primary: "Book a demo" → links to app.lyyli.ai
- Secondary: "Start free trial" → links to app.lyyli.ai

**Proposed State**:
- Primary: "Book a demo" → opens calendar popup (using CalendarPopup)
- Secondary: "Start free trial" → links to app.lyyli.ai for immediate access

**Rationale**: 
- Demo scheduling is consultative sale (higher priority = primary)
- Trial signup is self-service (alternative = secondary)

### Solution 4: Contact Form Button Improvement
**Current**: "Schedule discovery call" with icon
**Proposed**: "Submit & schedule discovery call"
**Rationale**: Makes it clear the form submission will trigger scheduling

**Alternative**: Split action
- Button 1: "Submit form" (submits contact form)
- Button 2: "Schedule discovery call" (opens calendar)

---

## Translation Updates Required

### English (src/translations/en.json):
```json
{
  "hero.ctaPrimary": "Start free 30-day trial",  // Changed from "Get started"
  "hero.ctaSecondary": "Book a demo",
  "about.cta.demo": "Book a demo",
  "about.cta.trial": "Start free 30-day trial",
  "contact.form.submit": "Schedule discovery call",  // Keep as-is or change to "Submit & schedule"
  "pricing.free.cta": "Start free 30-day trial",
  "pricing.launch.cta": "Start free 30-day trial",
  "pricing.growth.cta": "Start free 30-day trial",
  "cta.startTrial": "Start free 30-day trial",
  "cta.trialNote": "30-day trial with Launch plan. No credit card required."
}
```

### Finnish (src/translations/fi.json):
```json
{
  "hero.ctaPrimary": "Aloita 30 päivän ilmainen kokeilu",
  "hero.ctaSecondary": "Varaa demo",
  "about.cta.demo": "Varaa demo",
  "about.cta.trial": "Aloita 30 päivän ilmainen kokeilu",
  "contact.form.submit": "Varaa kartoituskeskustelu",
  "pricing.free.cta": "Aloita 30 päivän ilmainen kokeilu",
  "pricing.launch.cta": "Aloita 30 päivän ilmainen kokeilu",
  "pricing.growth.cta": "Aloita 30 päivän ilmainen kokeilu",
  "cta.startTrial": "Aloita 30 päivän ilmainen kokeilu",
  "cta.trialNote": "30 päivän kokeilu Launch-suunnitelmalla. Ei luottokorttia tarvita."
}
```

---

## Button Consistency Matrix

| Location | Current Text | Current Action | Proposed Text | Proposed Action | Priority |
|----------|-------------|----------------|---------------|-----------------|----------|
| Home hero | "Get started" | Link to app.lyyli.ai | "Start free 30-day trial" | Link to app.lyyli.ai | Medium |
| Home hero | "Book a demo" | Opens calendar | "Book a demo" | Opens calendar | OK ✓ |
| About CTA | "Book a demo" | Links to app | "Book a demo" | Opens calendar | **High** |
| About CTA | "Start free trial" | Links to app | "Start free trial" | Links to app | OK ✓ |
| Pricing cards | "Start free trial" | Links to app | "Start free 30-day trial" | Links to app | Medium |
| Contact form | "Schedule discovery call" | Submits form | Keep or "Submit & schedule" | Submit form | Low |

---

## Implementation Priority

### **HIGH PRIORITY** (Critical for user experience)
1. Fix About page "Book a demo" button to open calendar
2. Standardize all "Book a demo" buttons to use CalendarPopup
3. Update translation keys for consistency

### **MEDIUM PRIORITY** (Improves clarity)
4. Change "Get started" to "Start free 30-day trial" on hero
5. Update all trial-related CTAs to include "30-day trial" clarification
6. Add hover tooltips to trial buttons explaining "No credit card required"

### **LOW PRIORITY** (Nice to have)
7. Enhance contact form button text
8. Add A/B testing for CTA variations
9. Consider adding CTA button icons for visual clarity

---

## Technical Changes Required

### Files to Modify:
1. `src/app/[locale]/about/page.tsx` - Lines 69-74, 110-130
2. `src/app/[locale]/page.tsx` - Line 65
3. `src/translations/en.json` - Multiple keys
4. `src/translations/fi.json` - Multiple keys
5. Potentially: `src/components/PricingCards.tsx` - CTA button text

### Key Code Changes:

**About page fix** (`src/app/[locale]/about/page.tsx`):
```tsx
// BEFORE (lines 69-74):
<a href="https://app.lyyli.ai" className="btn-primary" aria-label="Book a demo of Lyyli.ai">
  {t['about.cta.demo']}
</a>

// AFTER:
<CalendarPopup 
  className="btn-primary" 
  aria-label="Book a demo of Lyyli.ai"
  translations={{
    title: t["calendar.title"],
    subtitle: t["calendar.subtitle"],
    description: t["calendar.description"],
    loading: t["calendar.loading"],
    errorTitle: t["calendar.error.title"],
    errorDescription: t["calendar.error.description"],
    errorButton: t["calendar.error.button"],
    footerSecure: t["calendar.footer.secure"],
    footerContact: t["calendar.footer.contact"],
  }}
>
  {t['about.cta.demo']}
</CalendarPopup>
```

---

## Testing Checklist

After implementing changes:
- [ ] Test "Book a demo" buttons on all pages open calendar popup
- [ ] Verify "Start free trial" buttons lead to correct signup flow
- [ ] Check button hierarchy (primary vs secondary) is visually distinct
- [ ] Test on mobile and desktop
- [ ] Verify translations for both English and Finnish
- [ ] Check accessibility (screen readers, keyboard navigation)
- [ ] Validate hover states and transitions
- [ ] Test button loading states if applicable

---

## Notes

1. **Brand Consistency**: All CTAs should emphasize 30-day trial + no credit card
2. **User Journey**: Clear path from awareness (demo/trial) to signup (app.lyyli.ai)
3. **Accessibility**: Maintain WCAG compliance with proper aria-labels
4. **Analytics**: Consider tracking which CTA performs better for conversions

## Approval Required

**Please review and approve this plan before implementation.** 

Estimated time: 2-3 hours
Risk level: Low (mostly text/UI changes)

