import { motion } from "framer-motion";
import Link from "next/link";
import { projects, slugify } from "@/lib/data";

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: slugify(project.title),
  }));
}

interface ProjectPageProps {
  params: { slug: string };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = params;

  // Find the project by matching the slug
  const project = projects.find((project) => slugify(project.title) === slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">The project you're looking for doesn't exist.</p>
          <Link
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
          >
            View All Projects →
          </Link>
        </div>
      </div>
    );
  }

  const projectIndex = projects.findIndex(p => p.title === project.title);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {project.title}
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Detail */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg"
          >
            {/* Project Header */}
            <div className="p-8 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div className="flex-1 mr-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                    About This Project
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 mt-4 md:mt-0 md:flex-shrink-0">
                  <h4 className="w-full text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Technologies Used:
                  </h4>
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Architecture Details */}
            <div className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                Architecture & Technical Implementation
              </h3>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {project.architectureDetails.split('\n\n').map((paragraph, paraIndex) => (
                  <div key={paraIndex} className="mb-6">
                    {paragraph.split('\n').map((line, lineIndex) => (
                      <p key={lineIndex} className={`text-gray-600 dark:text-gray-300 leading-relaxed mb-2 ${line.startsWith('•') ? 'ml-4' : ''} ${line.includes('**') ? 'font-semibold' : ''}`}>
                        {line.startsWith('•') && (
                          <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                        )}
                        <span className={line.includes('**') ? 'font-semibold' : ''}>
                          {line.replace(/\*\*(.*?)\*\*/g, '$1')}
                        </span>
                      </p>
                    ))}
                  </div>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4 pt-8 mt-8 border-t border-gray-200 dark:border-gray-700">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
                  >
                    View Live Demo →
                  </a>
                )}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  View Source Code →
                </a>
                <Link
                  href="/projects"
                  className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300"
                >
                  View All Projects →
                </Link>
              </div>
            </div>

            {/* Investment Planning Note (only for Codeflow Hook project) */}
            {projectIndex === 1 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-6 border-t border-blue-200 dark:border-blue-800">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Future Planning: Strategic Assets & AI Governance
                </h4>
                <p className="text-blue-800 dark:text-blue-200 mb-4">
                  Building on the architectural patterns demonstrated in this project, future development focuses on DeFi protocol governance and complex digital asset management.
                </p>
                <Link
                  href="/investments"
                  className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors duration-300"
                >
                  Read more about Future Planning/scope →
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
