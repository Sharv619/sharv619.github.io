# Extractable Components

## Navigation
- Source: `src/components/Navigation.tsx`
- Category: layout
- Description: Fixed responsive top navigation with assistant and theme controls.
- Extractable props: activeItem, isScrolled, isMobileMenuOpen.
- Hardcoded: navigation labels, HL mark, resume and assistant actions.

## ThemeToggle
- Source: `src/components/ThemeToggle.tsx`
- Category: basic
- Description: Persistent light/dark mode button.
- Extractable props: theme.
- Hardcoded: sun and moon SVGs.

## SourceCard
- Source: `src/components/SourceCard.tsx`
- Category: basic
- Description: Expandable assistant source chips.
- Extractable props: sources, isExpanded.
- Hardcoded: evidence section icons and colors.

## FeaturedCaseStudies
- Source: `src/components/FeaturedCaseStudies.tsx`
- Category: basic
- Description: Three-card flagship case-study presentation.
- Extractable props: caseStudies, compact.
- Hardcoded: accent sequence and card layout.

## Projects
- Source: `src/components/Projects.tsx`
- Category: basic
- Description: Skills-filtered GitHub project explorer with carousel and personal workflows.
- Extractable props: projects, supplementalSkills.
- Hardcoded: section copy and carousel controls.

## AssistantChat
- Source: `src/components/AssistantChat.tsx`
- Category: basic
- Description: Floating repository-aware assistant panel with evidence sources.
- Extractable props: isOpen, onClose.
- Hardcoded: chat shell, status label, empty-state prompts.

