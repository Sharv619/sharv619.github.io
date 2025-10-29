import React, { useState } from 'react';
import { SKILLS_DATA } from '../constants';

type SkillCategory = 'fullstack' | 'frontend' | 'devops' | 'aiAutomation';

const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory>('fullstack');

  const categories = [
    { key: 'fullstack' as SkillCategory, label: 'Full Stack', icon: '💻' },
    { key: 'frontend' as SkillCategory, label: 'Frontend', icon: '🎨' },
    { key: 'devops' as SkillCategory, label: 'DevOps', icon: '⚙️' },
    { key: 'aiAutomation' as SkillCategory, label: 'AI/Automation', icon: '🤖' }
  ];

  const selectedSkills = SKILLS_DATA[selectedCategory];

  return (
    <section id="skills" className="py-24 scroll-mt-16">
      <div className="container mx-auto px-4">
        <h2 className="text-gray-900 dark:text-gray-100 text-4xl font-bold text-center mb-12">
          Technical Skills
        </h2>

        {/* Category Selection */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-md font-semibold transition-all transform hover:scale-105 ${
                  selectedCategory === category.key
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {selectedSkills.map((category: any) => (
            <div key={category.title} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-blue-400 mb-4">{category.title}</h3>
              <ul className="space-y-3">
                {category.skills.map((skill: any) => (
                  <li key={skill.name} className="text-gray-700 dark:text-gray-300 flex items-center">
                    <span className="text-blue-500 mr-3">{React.cloneElement(skill.icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5' })}</span>
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
