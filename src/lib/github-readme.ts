interface EncodedGitHubContent {
  content?: string;
  encoding?: string;
}

export function decodeGitHubBase64Content(content: EncodedGitHubContent): string {
  if (!content.content || content.encoding !== "base64") {
    return "";
  }

  return Buffer.from(content.content.replace(/\n/g, ""), "base64").toString("utf8");
}

export function getReadmeSourceUrl(githubUrl: string): string {
  const repoPath = getRepositoryPath(githubUrl);

  return repoPath ? `https://github.com/${repoPath}#readme` : githubUrl;
}

export function resolveGitHubReadmeUrl(href: string | undefined, githubUrl: string): string | undefined {
  if (!href) {
    return undefined;
  }

  if (/^(https?:|mailto:|tel:|#)/i.test(href)) {
    return href;
  }

  const repoPath = getRepositoryPath(githubUrl);

  if (!repoPath) {
    return href;
  }

  const normalizedHref = href.replace(/^\.\//, "");

  return `https://github.com/${repoPath}/blob/main/${normalizedHref}`;
}

export function resolveGitHubReadmeImage(src: string | undefined, githubUrl: string): string | undefined {
  if (!src) {
    return undefined;
  }

  if (/^(https?:|data:)/i.test(src)) {
    return src;
  }

  const repoPath = getRepositoryPath(githubUrl);

  if (!repoPath) {
    return src;
  }

  const normalizedSrc = src.replace(/^\.\//, "");

  return `https://raw.githubusercontent.com/${repoPath}/main/${normalizedSrc}`;
}

function getRepositoryPath(githubUrl: string): string {
  try {
    const url = new URL(githubUrl);
    const parts = url.pathname.split("/").filter(Boolean);

    if (url.hostname !== "github.com" || parts.length < 2) {
      return "";
    }

    return `${parts[0]}/${parts[1].replace(/\.git$/, "")}`;
  } catch {
    return "";
  }
}
