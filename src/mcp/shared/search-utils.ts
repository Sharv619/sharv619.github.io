import { readdirSync, readFileSync, statSync } from "fs";
import { join } from "path";
import { DEFAULT_IGNORES, isSensitivePath, repoRoot, shouldIgnorePath, toRepoPath } from "./fs-utils";

export interface SearchMatch {
  path: string;
  line: number;
  text: string;
}

export function findReferences(query: string, mode: "text" | "regex", ignore: string[] = DEFAULT_IGNORES): SearchMatch[] {
  const matches: SearchMatch[] = [];
  const pattern = mode === "regex" ? new RegExp(query) : null;

  function visit(currentPath: string): void {
    const relativePath = toRepoPath(currentPath);
    if (relativePath && shouldIgnorePath(relativePath, ignore)) {
      return;
    }

    const stat = statSync(currentPath);
    if (stat.isDirectory()) {
      readdirSync(currentPath)
        .sort()
        .forEach((entry) => visit(join(currentPath, entry)));
      return;
    }

    if (!stat.isFile() || isSensitivePath(relativePath) || isLikelyBinary(relativePath)) {
      return;
    }

    let content = "";
    try {
      content = readFileSync(currentPath, "utf8");
    } catch {
      return;
    }

    content.split(/\r?\n/).forEach((lineText, index) => {
      const found = pattern ? pattern.test(lineText) : lineText.includes(query);
      if (found) {
        matches.push({ path: relativePath, line: index + 1, text: lineText.trim() });
      }
    });
  }

  visit(repoRoot());
  return matches;
}

function isLikelyBinary(path: string): boolean {
  return /\.(png|jpe?g|gif|webp|ico|pdf|docx|zip|gz|tar|woff2?)$/i.test(path);
}
