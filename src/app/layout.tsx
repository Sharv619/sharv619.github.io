import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { personalInfo, experience, projects, skills } from "@/lib/data";
import ThemeProvider from "@/components/ThemeProvider";
import AvailabilityBanner from "@/components/AvailabilityBanner";
import SEOHead from "@/components/SEOHead";
import ChatbotProvider from "@/components/ChatbotProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: `${personalInfo.name} - ${personalInfo.title}`,
  description: personalInfo.bio,
  keywords: ["developer", "portfolio", "software engineer", "web development", "react", "nextjs"],
  authors: [{ name: personalInfo.name }],
  openGraph: {
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: personalInfo.bio,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalInfo.name} - ${personalInfo.title}`,
    description: personalInfo.bio,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
