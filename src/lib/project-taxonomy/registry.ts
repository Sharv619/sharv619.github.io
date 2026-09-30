// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { SkillDefinition, SkillCategory, SkillKind } from "./types";

export const SKILL_DEFINITIONS: SkillDefinition[] = [
  { key: "typescript", label: "TypeScript", category: "languages", aliases: ["ts"], kind: "language" },
  { key: "javascript", label: "JavaScript", category: "languages", aliases: ["js"], kind: "language" },
  { key: "python", label: "Python", category: "languages", aliases: ["py"], kind: "language" },
  { key: "go", label: "Go", category: "languages", aliases: ["golang"], kind: "language" },
  { key: "rust", label: "Rust", category: "languages", aliases: [], kind: "language" },
  { key: "java", label: "Java", category: "languages", aliases: [], kind: "language" },
  { key: "kotlin", label: "Kotlin", category: "languages", aliases: [], kind: "language" },
  { key: "swift", label: "Swift", category: "languages", aliases: [], kind: "language" },
  { key: "dart", label: "Dart", category: "languages", aliases: [], kind: "language" },
  { key: "csharp", label: "C#", category: "languages", aliases: ["c#"], kind: "language" },
  { key: "cpp", label: "C++", category: "languages", aliases: ["c++", "cpp"], kind: "language" },
  { key: "c", label: "C", category: "languages", aliases: [], kind: "language" },
  { key: "ruby", label: "Ruby", category: "languages", aliases: [], kind: "language" },
  { key: "php", label: "PHP", category: "languages", aliases: [], kind: "language" },
  { key: "sql", label: "SQL", category: "languages", aliases: [], kind: "language" },
  { key: "shell", label: "Shell", category: "languages", aliases: ["bash", "sh", "zsh"], kind: "language" },
  { key: "html", label: "HTML", category: "languages", aliases: [], kind: "language" },
  { key: "css", label: "CSS", category: "languages", aliases: [], kind: "language" },

  { key: "react", label: "React", category: "appStack", aliases: ["reactjs", "react.js"], kind: "framework" },
  { key: "nextjs", label: "Next.js", category: "appStack", aliases: ["next", "next.js", "nextjs"], kind: "framework" },
  { key: "nodejs", label: "Node.js", category: "appStack", aliases: ["node", "node.js", "nodejs"], kind: "runtime" },
  { key: "express", label: "Express.js", category: "appStack", aliases: ["express.js"], kind: "framework" },
  { key: "fastapi", label: "FastAPI", category: "appStack", aliases: [], kind: "framework" },
  { key: "flutter", label: "Flutter", category: "appStack", aliases: [], kind: "framework" },
  { key: "django", label: "Django", category: "appStack", aliases: [], kind: "framework" },
  { key: "flask", label: "Flask", category: "appStack", aliases: [], kind: "framework" },
  { key: "tailwind", label: "Tailwind CSS", category: "appStack", aliases: ["tailwind css", "tailwind-css", "@tailwindcss/postcss"], kind: "framework" },
  { key: "vite", label: "Vite", category: "appStack", aliases: [], kind: "tool" },
  { key: "framer-motion", label: "Framer Motion", category: "appStack", aliases: ["framer motion", "framer-motion"], kind: "library" },
  { key: "axios", label: "Axios", category: "appStack", aliases: [], kind: "library" },
  { key: "pydantic", label: "Pydantic", category: "appStack", aliases: [], kind: "library" },
  { key: "zod", label: "Zod", category: "appStack", aliases: [], kind: "library" },
  { key: "graphql", label: "GraphQL", category: "appStack", aliases: [], kind: "tool" },
  { key: "rest-api", label: "REST APIs", category: "appStack", aliases: ["api", "rest", "rest api"], kind: "concept" },
  { key: "pwa", label: "PWA", category: "appStack", aliases: [], kind: "concept" },
  { key: "streamlit", label: "Streamlit", category: "appStack", aliases: [], kind: "framework" },
  { key: "uvicorn", label: "Uvicorn", category: "appStack", aliases: [], kind: "tool" },

  { key: "gemini", label: "Gemini", category: "aiData", aliases: ["gemini api", "google ai sdk", "google-generativeai", "@google/generative-ai", "@ai-sdk/google", "ai sdk"], kind: "platform" },
  { key: "ollama", label: "Ollama", category: "aiData", aliases: [], kind: "platform" },
  { key: "mistral", label: "Mistral AI", category: "aiData", aliases: ["mistralai", "mistral-7b"], kind: "platform" },
  { key: "openai", label: "OpenAI API", category: "aiData", aliases: ["openai api", "gpt"], kind: "platform" },
  { key: "rag", label: "RAG", category: "aiData", aliases: ["retrieval augmented generation"], kind: "concept" },
  { key: "langchain", label: "LangChain", category: "aiData", aliases: [], kind: "framework" },
  { key: "llamaindex", label: "LlamaIndex", category: "aiData", aliases: ["llama-index", "llama index"], kind: "framework" },
  { key: "vector-db", label: "Vector Database", category: "aiData", aliases: ["vector", "chromadb", "faiss", "pinecone", "weaviate"], kind: "tool" },
  { key: "embeddings", label: "Embeddings", category: "aiData", aliases: ["embedding", "sentence transformers", "sentence-transformers"], kind: "concept" },
  { key: "llm", label: "LLM", category: "aiData", aliases: ["large language model"], kind: "concept" },
  { key: "ml", label: "Machine Learning", category: "aiData", aliases: ["machine learning", "ml"], kind: "concept" },
  { key: "pytorch", label: "PyTorch", category: "aiData", aliases: ["torch"], kind: "framework" },
  { key: "tensorflow", label: "TensorFlow", category: "aiData", aliases: [], kind: "framework" },
  { key: "scikit-learn", label: "Scikit-learn", category: "aiData", aliases: ["scikit", "scikit learn", "scikit-learn"], kind: "framework" },
  { key: "numpy", label: "NumPy", category: "aiData", aliases: [], kind: "library" },
  { key: "pandas", label: "Pandas", category: "aiData", aliases: [], kind: "library" },
  { key: "isolation-forest", label: "Isolation Forest", category: "aiData", aliases: ["isolation forest"], kind: "concept" },
  { key: "entropy", label: "Entropy Scoring", category: "aiData", aliases: ["entropy scoring"], kind: "concept" },
  { key: "mcp", label: "MCP", category: "aiData", aliases: ["model context protocol", "@modelcontextprotocol/sdk"], kind: "protocol" },
  { key: "prompt-engineering", label: "Prompt Engineering", category: "aiData", aliases: ["prompt engineering"], kind: "concept" },
  { key: "ai-code-review", label: "AI-Assisted Code Review", category: "aiData", aliases: ["ai code review", "ai review", "code review", "ai-assisted code review"], kind: "concept" },

  { key: "docker", label: "Docker", category: "infraDataSecurity", aliases: ["dockerfile", "docker compose", "docker-compose", "docker-compose.yml", "docker-compose.yaml", "compose.yml", "compose.yaml"], kind: "tool" },
  { key: "kubernetes", label: "Kubernetes", category: "infraDataSecurity", aliases: ["k8s"], kind: "platform" },
  { key: "aws", label: "AWS", category: "infraDataSecurity", aliases: ["amazon web services", "aws ec2", "aws lambda", "aws actions", "amazonaws"], kind: "platform" },
  { key: "vercel", label: "Vercel", category: "infraDataSecurity", aliases: [], kind: "platform" },
  { key: "github-actions", label: "GitHub Actions", category: "infraDataSecurity", aliases: ["github actions", "ci/cd", "ci cd", "ci-cd"], kind: "tool" },
  { key: "github-pages", label: "GitHub Pages", category: "infraDataSecurity", aliases: ["github pages", "deploy-pages", "configure-pages"], kind: "platform" },
  { key: "terraform", label: "Terraform", category: "infraDataSecurity", aliases: ["hcl"], kind: "tool" },
  { key: "nginx", label: "Nginx", category: "infraDataSecurity", aliases: [], kind: "tool" },
  { key: "firebase", label: "Firebase", category: "infraDataSecurity", aliases: ["firestore", "cloud functions", "firebase storage", "firebase hosting"], kind: "platform" },
  { key: "supabase", label: "Supabase", category: "infraDataSecurity", aliases: [], kind: "platform" },
  { key: "mongodb", label: "MongoDB", category: "infraDataSecurity", aliases: ["mongodb atlas", "mongoose"], kind: "platform" },
  { key: "postgres", label: "PostgreSQL", category: "infraDataSecurity", aliases: ["postgresql", "pg"], kind: "platform" },
  { key: "sqlite", label: "SQLite", category: "infraDataSecurity", aliases: [], kind: "platform" },
  { key: "jwt", label: "JWT", category: "infraDataSecurity", aliases: ["jsonwebtoken", "bcrypt", "authentication"], kind: "concept" },
  { key: "security", label: "Security", category: "infraDataSecurity", aliases: ["owasp", "security audit", "vulnerability scanning"], kind: "concept" },
  { key: "adguard", label: "AdGuard", category: "infraDataSecurity", aliases: [], kind: "tool" },

  { key: "vitest", label: "Vitest", category: "quality", aliases: [], kind: "tool" },
  { key: "jest", label: "Jest", category: "quality", aliases: [], kind: "tool" },
  { key: "playwright", label: "Playwright", category: "quality", aliases: ["@playwright/test"], kind: "tool" },
  { key: "testing-library", label: "React Testing Library", category: "quality", aliases: ["testing library", "react testing library", "@testing-library/react", "@testing-library/jest-dom"], kind: "tool" },
  { key: "pytest", label: "Pytest", category: "quality", aliases: [], kind: "tool" },
  { key: "eslint", label: "ESLint", category: "quality", aliases: [], kind: "tool" },
  { key: "prettier", label: "Prettier", category: "quality", aliases: [], kind: "tool" },
  { key: "supertest", label: "Supertest", category: "quality", aliases: [], kind: "tool" },

  { key: "cli", label: "CLI", category: "other", aliases: ["command line"], kind: "tool" },
  { key: "git-hooks", label: "Git Hooks", category: "other", aliases: ["git hooks", "git-hooks", "pre-commit"], kind: "tool" },
  { key: "npm", label: "npm", category: "other", aliases: ["package manager"], kind: "tool" },
  { key: "prisma", label: "Prisma", category: "other", aliases: ["@prisma/client"], kind: "tool" },
  { key: "lucide", label: "Lucide", category: "other", aliases: ["lucide react", "lucide-react"], kind: "library" },
  { key: "threejs", label: "Three.js", category: "other", aliases: ["three.js", "three"], kind: "library" },
  { key: "web", label: "Web", category: "other", aliases: ["frontend", "backend", "fullstack", "full stack"], kind: "concept" },
  { key: "developer-tools", label: "Developer Tools", category: "other", aliases: ["developer tools", "devtools"], kind: "concept" },
  { key: "project-management", label: "Project Management", category: "other", aliases: ["project management", "project-management"], kind: "concept" },
  { key: "voice", label: "Voice", category: "other", aliases: ["voice input", "voice reminder"], kind: "concept" },
];

const definitionMap = new Map<string, SkillDefinition>();
for (const def of SKILL_DEFINITIONS) {
  definitionMap.set(def.key, def);
  for (const alias of def.aliases) {
    definitionMap.set(alias.toLowerCase(), def);
  }
}

export function getSkillDefinition(key: string): SkillDefinition | undefined {
  return definitionMap.get(key.toLowerCase());
}

export function getAllSkillDefinitions(): SkillDefinition[] {
  return SKILL_DEFINITIONS;
}

export function getSkillDefinitionsByCategory(category: SkillCategory): SkillDefinition[] {
  return SKILL_DEFINITIONS.filter((d) => d.category === category);
}