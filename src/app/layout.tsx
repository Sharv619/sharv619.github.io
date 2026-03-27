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
  icons: {
    icon: [
      {
        url: `data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3e%3ctext x='16' y='22' font-family='Arial,sans-serif' font-size='18' font-weight='bold' text-anchor='middle' fill='%23000'%3eHL%3c/text%3e%3c/svg%3e`,
        type: "image/svg+xml",
      },
    ],
  },
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
