const SHORT_RESPONSE_LIMIT = 200;
const LONG_QUESTION_MIN_LENGTH = 120;
const LONG_QUESTION_PATTERNS = [
  /\b(explain|detail|detailed|deep dive|architecture|compare|why|how did|how does|walk me through)\b/i,
  /\b(implementation|technical|tradeoff|tradeoffs|decision|decisions|strategy)\b/i,
];

export function isLongQuestion(message: string): boolean {
  const trimmed = message.trim();

  return trimmed.length >= LONG_QUESTION_MIN_LENGTH
    || LONG_QUESTION_PATTERNS.some((pattern) => pattern.test(trimmed));
}

export function formatAssistantResponse(message: string, response: string, sources: Array<{ id: string; section: string; similarity?: number; url?: string; title?: string }> = []): string {
  let formatted = response;
  // Apply existing length/truncation logic
  if (isLongQuestion(message) || response.length <= SHORT_RESPONSE_LIMIT) {
    formatted = response;
  } else {
    const firstParagraph = response.split(/\n{2,}/)[0]?.trim() || response.trim();
    const firstSentence = firstParagraph.match(/^.+?[.!?](?:\s|$)/)?.[0]?.trim();
    const concise = firstSentence && firstSentence.length <= SHORT_RESPONSE_LIMIT
      ? firstSentence
      : firstParagraph;
    if (concise.length <= SHORT_RESPONSE_LIMIT) {
      formatted = concise;
    } else {
      const truncated = concise.slice(0, SHORT_RESPONSE_LIMIT + 1);
      const boundary = Math.max(
        truncated.lastIndexOf(" "),
        truncated.lastIndexOf(","),
        truncated.lastIndexOf(";")
      );
      formatted = `${truncated.slice(0, boundary > 120 ? boundary : SHORT_RESPONSE_LIMIT - 3).trim()}...`;
    }
  }
  // Append sources if any
  if (sources && sources.length > 0) {
    formatted += "\n\n**Sources:**\n";
    for (const s of sources) {
      const title = s.title || s.section;
      const url = s.url;
      if (url) {
        formatted += `- [${title}](${url})\n`;
      } else {
        formatted += `- ${title}\n`;
      }
    }
  }
  return formatted;
}