import { resumeData } from "@/lib/resumeData";
import ResumeHeader from "@/components/ResumeHeader";
import ProfessionalSummary from "@/components/ProfessionalSummary";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import EducationSection from "@/components/EducationSection";

export const metadata = {
  title: "Himanshu Lade - Resume",
  description: "Professional resume of Himanshu Lade, Software Engineer specializing in high-performance infrastructure, AI integration, and system reliability.",
  keywords: ["resume", "CV", "Himanshu Lade", "Software Engineer", "portfolio", "developer"],
};

export default function ResumePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Resume Header */}
        <ResumeHeader data={resumeData.personalInfo} />
        
        {/* Professional Summary */}
        <ProfessionalSummary summary={resumeData.professionalSummary} />
        
        {/* Professional Experience */}
        <ExperienceSection experience={resumeData.experience} />
        
        {/* Notable Projects */}
        <ProjectsSection projects={resumeData.projects} />
        
        {/* Education */}
        <EducationSection education={resumeData.education} />
      </div>
    </div>
  );
}