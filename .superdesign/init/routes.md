# Routes

| Route | Entry | Shared layout |
| --- | --- | --- |
| / | src/app/page.tsx | RootLayout + HomePageClient + Navigation |
| /projects | src/app/projects/page.tsx | RootLayout + ProjectsPageClient |
| /projects/[slug] | src/app/projects/[slug]/page.tsx | RootLayout + ProjectDetailClient |
| /projects/[slug]/case-study | src/app/projects/[slug]/case-study/page.tsx | RootLayout + CaseStudyDetailClient |
| /case-studies | src/app/case-studies/page.tsx | RootLayout |
| /case-studies/[slug] | src/app/case-studies/[slug]/page.tsx | RootLayout + CaseStudyDetailClient |
| /case-studies/backpocket-os-ai | src/app/case-studies/backpocket-os-ai/page.tsx | RootLayout |
| /resume | src/app/resume/page.tsx | RootLayout + Navigation |
| /chatbot | src/app/chatbot/page.tsx | RootLayout |
| /investments | src/app/investments/page.tsx | RootLayout |

The home page renders Navigation, Hero, FeaturedCaseStudies, About, Experience, Projects, Certifications, and Contact. Projects are generated from the GitHub snapshot at build time. Dynamic routes are statically exported.

