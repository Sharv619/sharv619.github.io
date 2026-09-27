import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Portfolio Assistant - Himanshu Lade",
  description: "Ask the portfolio assistant about Himanshu Lade's experience, projects, and skills.",
  path: "/chatbot/",
});

export default function ChatbotLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
