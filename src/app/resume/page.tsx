import { resumeData } from "@/lib/resumeData";
import ResumeHeader from "@/components/ResumeHeader";
import ProfessionalSummary from "@/components/ProfessionalSummary";
import TechnicalSkills from "@/components/TechnicalSkills";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";
import { getPortfolioProjects } from "@/lib/github-projects";
import type { Project } from "@/lib/data";

export const metadata = {
  title: "Himanshu Lade - Resume",
  description: "Professional resume of Himanshu Lade, Software Engineer focused on backend systems, production reliability, cloud deployment, and AI-assisted workflow automation.",
  keywords: ["resume", "CV", "Himanshu Lade", "Software Engineer", "portfolio", "developer"],
};

interface ResumeProject {
  title: string;
  description: string;
  techStack: string[];
  achievements: string[];
  githubUrl?: string;
  liveUrl?: string;
  updatedAt?: string;
  status?: string;
  stats?: string;
}

function mapGitHubProjectToResumeProject(project: Project): ResumeProject {
  const signals = [
    project.primaryLanguage ? `Primary language: ${project.primaryLanguage}` : "",
    project.pushedAt || project.updatedAt ? "Recently active public repository" : "",
    project.evidenceProfile?.signals.some((signal) => signal.key === "github-actions" && signal.present)
      ? "Includes GitHub Actions workflow evidence"
      : "",
    project.evidenceProfile?.signals.some((signal) => signal.key === "docker" && signal.present)
      ? "Includes Docker/deployment evidence"
      : "",
  ].filter(Boolean);

  const achievements = signals.length > 0
    ? signals.slice(0, 2)
    : [
        "Pulled from Himanshu's public GitHub repository feed",
        "Technology stack inferred from repository metadata, languages, topics, and manifests",
      ];

  return {
    title: project.title,
    description: project.description,
    techStack: project.technologies.slice(0, 7),
    achievements,
    githubUrl: project.githubUrl,
    liveUrl: project.liveUrl,
    updatedAt: project.pushedAt || project.updatedAt,
    status: project.archived ? "Archived" : "Active",
    stats: `${project.stars || 0} stars · ${project.forks || 0} forks`,
  };
}

function mapStaticResumeProject(project: typeof resumeData.projects[number]): ResumeProject {
  return {
    ...project,
    status: "Curated",
  };
}

async function getResumeProjects(): Promise<{ projects: ResumeProject[]; sourceLabel: string }> {
  const githubProjects = await getPortfolioProjects();
  const activeProjects = githubProjects
    .filter((project) => !project.archived)
    .slice(0, 6)
    .map(mapGitHubProjectToResumeProject);

  if (activeProjects.length > 0) {
    return {
      projects: activeProjects,
      sourceLabel: "Live GitHub feed",
    };
  }

  return {
    projects: resumeData.projects.map(mapStaticResumeProject),
    sourceLabel: "Curated fallback",
  };
}

export default async function ResumePage() {
  const { projects, sourceLabel } = await getResumeProjects();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Resume Header */}
        <ResumeHeader data={resumeData.personalInfo} />
        
        {/* Professional Summary */}
        <ProfessionalSummary summary={resumeData.professionalSummary} />
        
        {/* Technical Skills */}
        <TechnicalSkills skills={resumeData.technicalSkills} />
        
        {/* Professional Experience */}
        <ExperienceSection experience={resumeData.experience} />
        
        {/* Notable Projects */}
        <ProjectsSection projects={projects} sourceLabel={sourceLabel} />
        
        {/* Education */}
        <EducationSection education={resumeData.education} />
      </div>
    </div>
  );
}
