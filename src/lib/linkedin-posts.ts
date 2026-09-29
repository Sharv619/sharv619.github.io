export interface LinkedInPost {
  activityId: string;
  title: string;
  excerpt: string;
  topics: string[];
  url: string;
}

export const linkedInActivityUrl = "https://www.linkedin.com/in/himanshu-lade/recent-activity/all/";

export const linkedinPosts: LinkedInPost[] = [
  {
    activityId: "7467418136775012352",
    title: "I rebuilt my portfolio as a searchable proof system",
    excerpt:
      "More than a prettier resume: the projects, repositories, case studies, skills, and RAG assistant now point back to evidence.",
    topics: ["Portfolio", "RAG", "Build in public"],
    url: "https://www.linkedin.com/posts/himanshu-lade_himanshu-lade-software-engineer-activity-7467418136775012352-hTOi",
  },
  {
    activityId: "7463110021308985345",
    title: "The hackathon photo was never the whole story",
    excerpt:
      "A note on the solo grind behind BackPocket, the people who kept the momentum alive, and the move toward local-first agentic loops.",
    topics: ["BackPocket", "Local first", "Hackathon"],
    url: "https://www.linkedin.com/posts/himanshu-lade_backpocketos-aisummit-wsti-activity-7463110021308985345-c0hS",
  },
  {
    activityId: "7432946122135990272",
    title: "A 2019 NLP paper brought me back to RAG",
    excerpt:
      "The tools changed from lexical affinity to embeddings and semantic search. The core engineering question stayed the same: context is everything.",
    topics: ["AI", "RAG", "NLP"],
    url: "https://www.linkedin.com/posts/himanshu-lade_ai-rag-nlp-activity-7432946122135990272-h6n6",
  },
];
