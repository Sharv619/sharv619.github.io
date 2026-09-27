interface TechnicalSkillsProps {
  skills: {
    languages: string[];
    frameworks: string[];
    cloudDevOps: string[];
    aiData: string[];
  };
}

export default function TechnicalSkills({ skills }: TechnicalSkillsProps) {
  const skillCategories = [
    { title: "Languages", items: skills.languages },
    { title: "Frameworks & Libraries", items: skills.frameworks },
    { title: "Cloud & DevOps", items: skills.cloudDevOps },
    { title: "AI & Data Science", items: skills.aiData }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
        Technical Skills
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, index) => (
          <div key={index} className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 border-b-2 border-gray-200 dark:border-gray-700 pb-2">
              {category.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((skill, skillIndex) => (
                <span
                  key={skillIndex}
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
