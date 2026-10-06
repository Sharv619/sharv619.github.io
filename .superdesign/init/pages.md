# Page Dependency Trees

## / Home
Entry: src/app/page.tsx
- src/components/HomePageClient.tsx
  - src/components/Navigation.tsx
    - src/components/ThemeToggle.tsx
    - src/components/ChatbotProvider.tsx
  - src/components/Hero.tsx
  - src/components/FeaturedCaseStudies.tsx
  - src/components/About.tsx
  - src/components/Experience.tsx
  - src/components/Projects.tsx
    - src/components/Skills.tsx
  - src/components/Certifications.tsx
  - src/components/Contact.tsx
- src/lib/github-projects.ts
- src/lib/flagship-case-studies.ts

## /projects
Entry: src/app/projects/page.tsx
- src/components/ProjectsPageClient.tsx
- src/lib/github-projects.ts
- src/lib/public-project.ts

## /projects/[slug]
Entry: src/app/projects/[slug]/page.tsx
- src/components/ProjectDetailClient.tsx
  - src/components/Navigation.tsx
  - src/components/Contact.tsx
- src/lib/github-projects.ts
- src/lib/public-project.ts

## /case-studies/[slug]
Entry: src/app/case-studies/[slug]/page.tsx
- src/components/CaseStudyDetailClient.tsx
  - src/components/Navigation.tsx
  - src/components/Contact.tsx
- src/lib/flagship-case-studies.ts

## /resume
Entry: src/app/resume/page.tsx
- src/components/Navigation.tsx

## /chatbot
Entry: src/app/chatbot/page.tsx
- src/hooks/usePortfolioChat.ts

