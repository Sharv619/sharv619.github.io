import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { personalInfo } from "@/lib/data";
import { createPageMetadata, SITE_URL } from "@/lib/seo";
import ThemeProvider from "@/components/ThemeProvider";
import AvailabilityBanner from "@/components/AvailabilityBanner";
import SEOHead from "@/components/SEOHead";
import ChatbotProvider from "@/components/ChatbotProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createPageMetadata({
    title: `${personalInfo.name} | Full-Stack AI & Systems Engineer Australia`,
    description: personalInfo.bio,
    path: "/",
  }),
  keywords: [
    "Himanshu Lade",
    "full-stack AI engineer Australia",
    "software engineer Sydney",
    "local-first AI developer Australia",
    "workflow automation engineer",
    "technical SEO specialist Australia",
    "production recovery engineer",
    "reliability engineer Sydney",
  ],
  authors: [{ name: personalInfo.name }],
  icons: {
    icon: [
      {
        url: `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3e%3ctext x='16' y='22' font-family='Arial,sans-serif' font-size='18' font-weight='bold' text-anchor='middle' fill='%23000'%3eHL%3c/text%3e%3c/svg%3e`,
        type: "image/svg+xml",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && new Date().getHours() >= 18)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.add('light');
                }
              })();
            `,
          }}
        />
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
        <link rel="preconnect" href="https://github.com" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <SEOHead />
        <ThemeProvider>
          <AvailabilityBanner />
          <ChatbotProvider>
            {children}
          </ChatbotProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
