export interface ProjectJournalSection {
  title: string;
  lines: string[];
}

export function parseArchitectureDetails(details: string): { overview: string; details: ProjectJournalSection[] } {
  const blocks = details.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  const overview = blocks[0] || "";
  const parsed = blocks.slice(1).map((block) => {
    const lines = block.split("\n").map((line) => cleanLine(line)).filter(Boolean);
    const firstLine = lines[0] || "Details";
    const isHeading = firstLine.endsWith(":") || !firstLine.startsWith("•");
    const title = formatJournalSectionTitle(cleanTitle(isHeading ? firstLine : "Details"));
    const sectionLines = (isHeading ? lines.slice(1) : lines).map((line) => line.replace(/^•\s*/, "")).filter(Boolean);

    return {
      title,
      lines: sectionLines.length > 0 ? sectionLines : [firstLine],
    };
  });

  return {
    overview,
    details: parsed.length > 0 ? parsed : [{ title: "Build notes", lines: [overview] }],
  };
}

export function formatJournalSectionTitle(title: string): string {
  const titles: Record<string, string> = {
    Problem: "Why I started it",
    Solution: "What I tried",
    Outcome: "Where it landed",
    "What I built / designed": "What took shape",
    "Technical highlights": "Under the hood",
    Status: "Where it stands",
    "GitHub Signals": "Repo notes",
    Details: "Build notes",
  };

  return titles[title] || title;
}

function cleanLine(line: string): string {
  return line.replace(/\*\*(.*?)\*\*/g, "$1").trim();
}

function cleanTitle(title: string): string {
  return title.replace(/:$/, "").replace(/^•\s*/, "");
}
