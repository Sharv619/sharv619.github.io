import fs from "node:fs";
import path from "node:path";

import syntheticIndex from "../src/lib/synthetic-rag-index.json";

const outputPath = path.join(process.cwd(), "src/lib/synthetic-rag-index.json");

function validateIndex() {
  const ids = new Set<string>();

  for (const entry of syntheticIndex) {
    if (!entry.id || ids.has(entry.id)) {
      throw new Error(`Invalid or duplicate synthetic RAG entry id: ${entry.id}`);
    }

    ids.add(entry.id);

    if (!entry.title || entry.tags.length === 0 || entry.questions.length === 0 || !entry.answer || entry.sources.length === 0) {
      throw new Error(`Synthetic RAG entry is incomplete: ${entry.id}`);
    }
  }
}

validateIndex();
fs.writeFileSync(outputPath, `${JSON.stringify(syntheticIndex, null, 2)}\n`);
console.log(`Validated ${syntheticIndex.length} synthetic RAG entries at ${outputPath}`);
