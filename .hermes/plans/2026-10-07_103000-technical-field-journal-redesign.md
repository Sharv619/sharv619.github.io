# Technical Field Journal Redesign Plan

## Goal
Create a plan for redesigning Himanshu Lade's portfolio as a "Technical Field Journal" that presents his work as verifiable evidence-based engineering while preserving all existing functionality.

## Current Context / Assumptions
- Repository: `/home/lade/GitHub/sharv619.github.io`
- Current branch: `feat/repo-aware-rag` (ahead 1 commit from origin)
- Tech stack: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4
- Key existing functionality to preserve:
  - Automatic GitHub project ingestion
  - Repository-aware RAG assistant
  - Light/dark theme toggle
  - Static generation and SEO
  - Responsive mobile/desktop layouts
  - Routes: `/`, `/resume`, `/projects/*`, `/chatbot`, `/about`, etc.
- Professional claims and data must remain unchanged and verifiable

## Architecture / Proposed Approach
Implement the "Technical Field Journal" design system using the existing React/Next.js/Tailwind stack. The design treats the portfolio as an engineer's field notebook with grid paper backgrounds, marginalia evidence tabs, and physical notebook metaphors. Implementation will:
1. Create reusable design tokens and UI components
2. Redesign homepage sections using notebook metaphor
3. Integrate evidence system with GitHub data
4. Style the RAG assistant as a notebook sticky note
5. Preserve all existing routes and functionality
6. Ensure accessibility, performance, and SEO compliance

## Step-by-Step Tasks

### Phase 1: Foundation & Design System
**Task 1.1: Create design tokens file**
- File: `src/styles/tokens.css`
- Content: CSS variables for colors, typography, spacing per design specification
- Verification: Check file exists with correct variables

**Task 1.2: Update globals.css to use tokens**
- File: `src/app/globals.css`
- Changes: Import tokens.css and apply base styles
- Verification: Run `npm run lint` passes

**Task 1.3: Create EvidenceTab component**
- File: `src/components/ui/EvidenceTab.tsx`
- Content: Reusable yellow sticky note component with hover effects
- Verification: Component renders with correct styles

**Task 1.4: Create NotebookCard component**
- File: `src/components/ui/NotebookCard.tsx`
- Content: Base card with margin line, elevation, and hover effects
- Verification: Component applies correct box-shadow and transform

**Task 1.5: Create Typography component**
- File: `src/components/ui/Typography.tsx`
- Content: Centralized typography with IBM Plex font variants
- Verification: Component applies correct font families

### Phase 2: Layout & Navigation
**Task 2.1: Implement fixed navigation bar**
- File: `src/components/Layout/Navbar.tsx`
- Content: Logo, nav links, theme toggle, assistant button with active states
- Verification: Navigation displays correctly on all breakpoints

**Task 2.2: Create MainLayout container**
- File: `src/layout/MainLayout.tsx`
- Content: Sets max-width, gutter, and vertical rhythm
- Verification: Content centers correctly with proper spacing

**Task 2.3: Update theme toggle functionality**
- File: `src/components/ThemeToggle.tsx`
- Content: Leather tab icon that flips on click, persists preference
- Verification: Theme persists across reloads

### Phase 3: Section Implementation
**Task 3.1: Implement Hero section**
- File: `src/views/Home/Hero.tsx`
- Content: Two-page notebook spread with avatar, positioning, evidence tabs, CTAs
- Verification: Hero displays correctly in light/dark modes

**Task 3.2: Implement Case Studies section**
- File: `src/views/Home/CaseStudies.tsx`
- Content: Fetch from knowledge base, render as CaseStudySpread components
- Verification: Case studies show with marginalia evidence tabs

**Task 3.3: Implement GitHub Project Explorer**
- File: `src/views/Home/ProjectExplorer.tsx`
- Content: Responsive grid of NotebookCard components with language tags
- Verification: Projects display with correct GitHub data

**Task 3.4: Implement Experience Timeline**
- File: `src/views/Home/ExperienceTimeline.tsx`
- Content: Vertical binding line with stitching dots, alternating entries
- Verification: Timeline shows career progression correctly

**Task 3.5: Implement Alter Ego Builds**
- File: `src/views/Home/AlterEgoBuilds.tsx`
- Content: Filtered Project Explorer for experimental builds
- Verification: Only alter-ego projects display

**Task 3.6: Implement Contact section**
- File: `src/views/Home/Contact.tsx`
- Content: Form with IBM Plex inputs, contact info section
- Verification: Form validates and submit works

**Task 3.7: Implement Footer**
- File: `src/components/Layout/Footer.tsx`
- Content: Copyright text and build info
- Verification: Footer displays correctly

### Phase 4: RAG Assistant Integration
**Task 4.1: Restyle AssistantChat component**
- File: `src/components/AssistantChat.tsx`
- Content: Yellow sticky note (closed), notebook page (open) with evidence tabs
- Verification: Assistant toggles correctly and shows evidence sources

**Task 4.2: Implement evidence modal for assistant**
- File: `src/components/ui/EvidenceModal.tsx`
- Content: Modal showing source links when evidence tab clicked
- Verification: Modal displays correct source information

### Phase 5: Evidence System & Validation
**Task 5.1: Create evidence resolver utility**
- File: `src/lib/evidence/resolver.ts`
- Content: Resolve evidence IDs to URLs (GitHub commits, audit reports)
- Verification: Returns correct URLs for test evidence IDs

**Task 5.2: Update knowledge base processing**
- File: `src/lib/process-knowledge-base.ts`
- Content: Extract evidence references and validate against GitHub data
- Verification: Processed knowledge base includes evidence markers

**Task 5.3: Create evidence display components**
- File: `src/components/ui/EvidenceBadge.tsx`
- Content: Red verification circle for verified achievements
- Verification: Badge appears on verified timeline achievements

### Phase 6: Testing & Validation
**Task 6.1: Run linting**
- Command: `npm run lint`
- Expected: No ESLint errors

**Task 6.2: Run tests**
- Command: `npm test:run`
- Expected: All tests pass

**Task 6.3: Build production bundle**
- Command: `npm run build`
- Expected: Successful build with .next folder created

**Task 6.4: Test responsiveness**
- Manual verification: Check layout at mobile (<640px), tablet (640-1024px), desktop (>1024px) widths

**Task 6.5: Test accessibility**
- Manual verification: Keyboard navigation works, focus visible, contrast ratios adequate

**Task 6.6: Add changelog entry**
- File: `changelogs.md`
- Content: `- [(07/10/2026),10:30,00]{Implemented Technical Field Journal redesign with evidence-based notebook metaphor preserving all existing functionality}`
- Verification: Entry added in correct format

## Risks, Tradeoffs, and Open Questions

**Risks:**
1. Over-designing with notebook metaphor hurting readability
   - Mitigation: Strict hierarchy - textures only in backgrounds/borders, content remains crisp
2. Evidence tabs becoming visually overwhelming
   - Mitigation: Limit to 2-3 evidence tabs per section, use subtle styling
3. Performance impact from complex components
   - Mitigation: Use CSS transforms, enable GPU acceleration, respect prefers-reduced-motion
4. Accessibility issues with custom components
   - Mitigation: Test with screen readers, ensure proper ARIA labels, keyboard navigable

**Tradeoffs:**
1. Slightly increased bundle size for custom components vs. utility-first approach
   - Justified by unique visual identity and evidence system
2. More complex implementation than standard Tailwind utility classes
   - Justified by reusable component library and design consistency
3. Evidence system adds processing overhead
   - Justified by core positioning as evidence-based engineer

**Open Questions:**
1. Should the avatar be a line art sketch or actual photo treated as field note?
   - Recommendation: Line art sketch for consistency with notebook metaphor
2. How much GitHub data should be displayed in project cards vs. detailed views?
   - Recommendation: Cards show name, language tags, description, evidence badge; details in modals
3. Should evidence tabs be click-to-reveal or hover-to-reveal?
   - Recommendation: Click-to-reveal for accessibility and intentional interaction
4. How to handle case studies without public evidence due to NDAs?
   - Recommendation: Descriptive evidence tabs labeled "NDA-restricted - descriptive evidence only"

## Success Criteria
- Visual design matches field journal specification with notebook metaphor
- All existing functionality preserved (GitHub ingestion, RAG assistant, routes, etc.)
- Lighthouse score >90 for performance, accessibility, SEO, best practices
- Zero critical accessibility violations
- Professional claims unchanged and verifiable via evidence system
- GitHub repository ingestion continues to update project explorer automatically
- Design works correctly in both light and dark modes
- Mobile navigation is thumb-friendly and intuitive