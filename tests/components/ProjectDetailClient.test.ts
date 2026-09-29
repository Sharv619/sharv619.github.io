import { describe, expect, it } from "vitest";

import { formatJournalSectionTitle, parseArchitectureDetails } from "../../src/components/ProjectDetailClient";

describe("ProjectDetailClient journal formatting", () => {
  it("turns portfolio headings into personal build-journal headings", () => {
    expect(formatJournalSectionTitle("Problem")).toBe("Why I started it");
    expect(formatJournalSectionTitle("What I built / designed")).toBe("What took shape");
    expect(formatJournalSectionTitle("Technical highlights")).toBe("Under the hood");
    expect(formatJournalSectionTitle("GitHub Signals")).toBe("Repo notes");
  });

  it("preserves project notes while changing their presentation", () => {
    const result = parseArchitectureDetails(`A small tool I wanted for myself.

Problem:
• Repeating the same task was getting old.

Status:
• Still a prototype.`);

    expect(result.overview).toBe("A small tool I wanted for myself.");
    expect(result.details).toEqual([
      { title: "Why I started it", lines: ["Repeating the same task was getting old."] },
      { title: "Where it stands", lines: ["Still a prototype."] },
    ]);
  });
});
