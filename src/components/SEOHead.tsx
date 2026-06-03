"use client";

import { useEffect } from "react";
import { personalInfo, skills } from "@/lib/data";

const generateStructuredData = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personalInfo.name,
    jobTitle: personalInfo.title,
    description: personalInfo.bio,
    url: "https://sharv619.github.io",
    sameAs: [
      "https://github.com/Sharv619",
      "https://linkedin.com/in/himanshu-lade",
      "https://twitter.com/himanshu_lade"
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
      "@id": "https://sharv619.github.io"
    }
  };

  return JSON.stringify(structuredData, null, 2);
};

export default function SEOHead() {
  useEffect(() => {
    const addMeta = (property: string, content: string) => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', property);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    };

    addMeta('og:title', `${personalInfo.name} - ${personalInfo.title}`);
    addMeta('og:description', personalInfo.bio);
    addMeta('og:image', personalInfo.avatar);
    addMeta('og:url', 'https://sharv619.github.io');
    addMeta('og:type', 'profile');

    const addTwitterMeta = (name: string, content: string) => {
      const meta = document.createElement('meta');
      meta.setAttribute('name', name);
      meta.setAttribute('content', content);
      document.head.appendChild(meta);
    };

    addTwitterMeta('twitter:card', 'summary_large_image');
    addTwitterMeta('twitter:title', personalInfo.name);
    addTwitterMeta('twitter:description', personalInfo.bio);
    addTwitterMeta('twitter:image', personalInfo.avatar);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = generateStructuredData();
    document.head.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return null;
}
