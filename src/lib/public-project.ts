import type { Project } from "@/lib/data";

export function toPublicProject(project: Project): Project {
  const { evidenceProfile, evidenceRecommendations, ...publicProject } = project;

  void evidenceProfile;
  void evidenceRecommendations;

  return publicProject;
}

export function toPublicProjects(projects: Project[]): Project[] {
  return projects.map(toPublicProject);
}
