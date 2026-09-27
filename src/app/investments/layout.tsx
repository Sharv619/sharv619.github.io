import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Experimental Archive - Himanshu Lade",
  description: "An archive of exploratory notes outside the main software engineering portfolio narrative.",
  path: "/investments/",
});

export default function InvestmentsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
