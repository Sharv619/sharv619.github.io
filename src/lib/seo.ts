import type { Metadata } from "next";

export const SITE_NAME = "Himanshu Lade";
export const SITE_URL = "https://www.himanshulade.com";
export const DEFAULT_OG_IMAGE = "/avatar-960.webp";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
}

export function canonicalUrl(path: string): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, "");
  const normalizedPath = path === "/"
    ? "/"
    : `/${cleanPath}${cleanPath.includes(".") ? "" : "/"}`;

  return new URL(normalizedPath, SITE_URL).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageMetadataOptions): Metadata {
  const url = canonicalUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_AU",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
    robots: {
      index: true,
      follow: true,
    },
    category: "technology",
  };
}
