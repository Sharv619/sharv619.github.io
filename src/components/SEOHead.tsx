import { personalInfo, skills } from "@/lib/data";
import { canonicalUrl } from "@/lib/seo";

const generateStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    description: personalInfo.bio,
    url: canonicalUrl("/"),
    sameAs: [
      "https://github.com/Sharv619",
      "https://linkedin.com/in/himanshu-lade",
      "https://x.com/lifeofhimanshoe",
      "https://himanshulade.com"
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: personalInfo.location
    },
    hasOccupation: {
      "@type": "Occupation",
      name: personalInfo.title,
      skills: Object.values(skills).flat()
    },
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "AWS",
      "AI-assisted workflows",
      "Full-Stack Development",
      "DevOps",
      "CI/CD"
    ],
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl("/")
    }
  };

  return JSON.stringify(structuredData, null, 2);
};

export default function SEOHead() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateStructuredData() }}
    />
  );
}
