import { personalInfo, skills, socialLinks } from "@/lib/data";
import { canonicalUrl } from "@/lib/seo";

const profileUrl = canonicalUrl("/");
const personId = `${profileUrl}#person`;
const websiteId = `${profileUrl}#website`;
const profileId = `${profileUrl}#profile`;

function generateStructuredData() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: profileUrl,
        name: personalInfo.name,
        description: personalInfo.bio,
        inLanguage: "en-AU",
      },
      {
        "@type": "ProfilePage",
        "@id": profileId,
        url: profileUrl,
        name: `${personalInfo.name} engineering portfolio`,
        description: personalInfo.bio,
        inLanguage: "en-AU",
        isPartOf: { "@id": websiteId },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: personalInfo.name,
        jobTitle: personalInfo.title,
        description: personalInfo.bio,
        url: profileUrl,
        sameAs: [socialLinks.github, socialLinks.linkedin, socialLinks.twitter],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Sydney",
          addressRegion: "NSW",
          addressCountry: "AU",
        },
        hasOccupation: {
          "@type": "Occupation",
          name: personalInfo.title,
          occupationLocation: {
            "@type": "Country",
            name: "Australia",
          },
          skills: Object.values(skills).flat(),
        },
        knowsAbout: [
          "Full-stack software engineering",
          "Local-first AI",
          "Workflow automation",
          "Production recovery",
          "Software reliability",
          "Technical SEO",
          "Personal infrastructure",
          "React",
          "Next.js",
          "TypeScript",
          "Python",
          "AWS",
          "Docker",
        ],
        mainEntityOfPage: { "@id": profileId },
      },
    ],
  });
}

export default function SEOHead() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
    />
  );
}
