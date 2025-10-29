
import React from 'react';
// FIX: Import the `CaseStudy` type.
import type { SkillCategory, ExperienceItem, Project, CaseStudy } from './types';

// Icons
const CodeBracketIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" /></svg>
);
const ServerStackIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 006 9v.75a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 9.75V9a2.25 2.25 0 00-2.25-2.25H8.25A2.25 2.25 0 006 6.878zM6 15a2.25 2.25 0 00-2.25 2.25v.75a2.25 2.25 0 002.25 2.25h12A2.25 2.25 0 0020.25 18v-.75a2.25 2.25 0 00-2.25-2.25H6z" /></svg>
);
const CircleStackIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" /></svg>
);
const WrenchScrewdriverIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.528-1.036.94-2.13.992-3.217l-.001-2.062a3.375 3.375 0 00-3.375-3.375H5.25l-1.708 1.708c-.15.15-.242.354-.242.565v3.375c0 .621.504 1.125 1.125 1.125H5.25v2.25c0 .621.504 1.125 1.125 1.125h2.25M11.42 15.17l-3.286-3.287c-1.081 1.081-1.081 2.837 0 3.918l3.286 3.287c1.081 1.081 2.837 1.081 3.918 0l-3.286-3.287z" /></svg>
);
const LightBulbIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M9.938 6.026a8.25 8.25 0 10-1.878 1.878M12 12.75h.008v.008H12v-.008z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v.01M12 21v-.01M4.05 4.05l.007.007M19.95 19.95l-.007-.007M3 12h.01M21 12h-.01M4.05 19.95l.007-.007M19.95 4.05l-.007.007" /></svg>
);

const SparklesIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 21.75l-.648-1.188a2.25 2.25 0 01-1.423-1.423L13.25 18.5l1.188-.648a2.25 2.25 0 011.423-1.423L16.25 15l.648 1.188a2.25 2.25 0 011.423 1.423L19.5 18.5l-1.188.648a2.25 2.25 0 01-1.423 1.423z" /></svg>
);

const PaintBrushIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a4.5 4.5 0 016.364 6.364L9.493 23.584l-6.364-6.364L16.862 3.487zM7.5 16.5l-3 3" /></svg>
);

const ArrowsPathIcon: React.FC<{className?: string}> = ({className}) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0l-3-3m3 3l3-3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
);

// Logos
const ACSLogo: React.FC<{className?: string}> = ({className}) => (
    <div className={className || "w-14 h-14 flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-md"}>
        <span className="text-white font-bold text-xl">ACS</span>
    </div>
);

const AskJayLogo: React.FC<{className?: string}> = ({className}) => (
    <div className={className || "w-14 h-14 flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-md"}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
    </div>
);

const ProfessionalDevelopmentLogo: React.FC<{className?: string}> = ({className}) => (
  <div className={className || "w-14 h-14 flex-shrink-0 flex items-center justify-center bg-gray-700 rounded-md"}>
      <LightBulbIcon className="h-7 w-7 text-cyan-400" />
  </div>
);


export const SKILLS_DATA: any = {
  fullstack: [
    {
      title: 'Languages & Frameworks',
      skills: [
        { name: 'JS/TS, Dart, HTML/CSS', icon: <CodeBracketIcon /> },
        { name: 'React / Next.js', icon: <CodeBracketIcon /> },
        { name: 'Flutter', icon: <CodeBracketIcon /> },
        { name: 'Node.js / Express.js', icon: <CodeBracketIcon /> },
        { name: 'Tailwind CSS, Material-UI', icon: <CodeBracketIcon /> },
      ],
    },
    {
      title: 'Backend & Databases',
      skills: [
        { name: 'MongoDB / Atlas', icon: <CircleStackIcon /> },
        { name: 'RESTful APIs', icon: <CircleStackIcon /> },
        { name: 'Authentication (JWT)', icon: <CircleStackIcon /> },
        { name: 'SSR & Perf. Optimization', icon: <CircleStackIcon /> },
      ],
    },
    {
      title: 'Cloud & DevOps',
      skills: [
        { name: 'AWS (EC2, S3)', icon: <ServerStackIcon /> },
        { name: 'Docker', icon: <ServerStackIcon /> },
        { name: 'CI/CD (GitHub Actions)', icon: <ServerStackIcon /> },
        { name: 'Nginx & Security', icon: <ServerStackIcon /> },
      ],
    },
    {
      title: 'Development Tools',
      skills: [
          { name: 'Git / GitHub', icon: <WrenchScrewdriverIcon /> },
          { name: 'Agile/Scrum', icon: <WrenchScrewdriverIcon /> },
          { name: 'Technical Documentation', icon: <WrenchScrewdriverIcon /> },
          { name: 'Testing & Code Review', icon: <WrenchScrewdriverIcon /> },
      ],
    },
  ],
  frontend: [
    {
        title: 'Core Frontend',
        skills: [
            { name: 'React / Next.js', icon: <CodeBracketIcon /> },
            { name: 'TypeScript', icon: <CodeBracketIcon /> },
            { name: 'Flutter / Dart', icon: <CodeBracketIcon /> },
            { name: 'Tailwind CSS', icon: <CodeBracketIcon /> },
        ],
    },
    {
        title: 'UI/UX & State',
        skills: [
            { name: 'UI/UX Implementation', icon: <PaintBrushIcon /> },
            { name: 'API Integration', icon: <PaintBrushIcon /> },
            { name: 'State Management (Context)', icon: <PaintBrushIcon /> },
            { name: 'Component Libraries', icon: <PaintBrushIcon /> },
        ],
    },
    {
        title: 'Performance',
        skills: [
            { name: 'Load Time Optimization', icon: <WrenchScrewdriverIcon /> },
            { name: 'SSR Strategies', icon: <WrenchScrewdriverIcon /> },
            { name: 'Image Optimization', icon: <WrenchScrewdriverIcon /> },
            { name: 'Caching Mechanisms', icon: <WrenchScrewdriverIcon /> },
        ],
    },
    {
        title: 'Tools & Platform',
        skills: [
            { name: 'Git / GitHub', icon: <WrenchScrewdriverIcon /> },
            { name: 'Docker (Basics)', icon: <ServerStackIcon /> },
            { name: 'AWS (Basics)', icon: <ServerStackIcon /> },
            { name: 'CI/CD Awareness', icon: <ArrowsPathIcon /> },
        ],
    }
  ],
  devops: [
    {
        title: 'Cloud & Infrastructure',
        skills: [
            { name: 'AWS (EC2, S3)', icon: <ServerStackIcon /> },
            { name: 'Infrastructure Provisioning', icon: <ServerStackIcon /> },
            { name: 'Security Hardening', icon: <ServerStackIcon /> },
            { name: 'Nginx', icon: <ServerStackIcon /> },
        ],
    },
    {
        title: 'CI/CD & Automation',
        skills: [
            { name: 'Docker', icon: <ArrowsPathIcon /> },
            { name: 'GitHub Actions', icon: <ArrowsPathIcon /> },
            { name: 'CI/CD Pipeline Engineering', icon: <ArrowsPathIcon /> },
            { name: 'Automated Deployments', icon: <ArrowsPathIcon /> },
        ],
    },
    {
        title: 'Databases & Reliability',
        skills: [
            { name: 'MongoDB / Atlas', icon: <CircleStackIcon /> },
            { name: 'Incident Response', icon: <CircleStackIcon /> },
            { name: 'System Recovery', icon: <CircleStackIcon /> },
            { name: 'Data Restoration', icon: <CircleStackIcon /> },
        ],
    },
    {
        title: 'Core Tools',
        skills: [
            { name: 'Git / GitHub', icon: <WrenchScrewdriverIcon /> },
            { name: 'Bash/Shell Scripting', icon: <WrenchScrewdriverIcon /> },
            { name: 'Technical Documentation', icon: <WrenchScrewdriverIcon /> },
            { name: 'Stakeholder Communication', icon: <WrenchScrewdriverIcon /> },
        ],
    },
  ],
  aiAutomation: [
    {
        title: 'AI & Automation',
        skills: [
            { name: 'n8n & Automation', icon: <SparklesIcon /> },
            { name: 'Ollama & Local LLMs', icon: <SparklesIcon /> },
            { name: 'Gemini API', icon: <SparklesIcon /> },
            { name: 'AI Coding Agents', icon: <SparklesIcon /> },
        ],
    },
    {
        title: 'AI/ML Projects',
        skills: [
            { name: 'RAG Architecture', icon: <LightBulbIcon /> },
            { name: 'AIOps & Diagnostics', icon: <LightBulbIcon /> },
            { name: 'Knowledge Graphs', icon: <LightBulbIcon /> },
            { name: 'Git Pre-Hook Reviewer', icon: <LightBulbIcon /> },
        ],
    },
    {
        title: 'Prompt Engineering',
        skills: [
            { name: 'Vibecoding', icon: <PaintBrushIcon /> },
            { name: 'Context Optimization', icon: <PaintBrushIcon /> },
            { name: 'System Prompts', icon: <PaintBrushIcon /> },
            { name: 'Tool Integration', icon: <PaintBrushIcon /> },
        ],
    },
    {
        title: 'Portfolio Projects',
        skills: [
            { name: 'AI Career Co-Pilot', icon: <CodeBracketIcon /> },
            { name: 'CI/CD Simulator', icon: <CodeBracketIcon /> },
            { name: 'Knowledge Pipeline', icon: <CodeBracketIcon /> },
            { name: 'This Portfolio', icon: <CodeBracketIcon /> },
        ],
    },
  ],
  aiAutomation: [
    {
        title: 'AI & Automation',
        skills: [
            { name: 'n8n & Automation', icon: <SparklesIcon /> },
            { name: 'Ollama & Local LLMs', icon: <SparklesIcon /> },
            { name: 'Gemini API', icon: <SparklesIcon /> },
            { name: 'AI Coding Agents', icon: <SparklesIcon /> },
        ],
    },
    {
        title: 'AI/ML Projects',
        skills: [
            { name: 'RAG Architecture', icon: <LightBulbIcon /> },
            { name: 'AIOps & Diagnostics', icon: <LightBulbIcon /> },
            { name: 'Knowledge Graphs', icon: <LightBulbIcon /> },
            { name: 'Git Pre-Hook Reviewer', icon: <LightBulbIcon /> },
        ],
    },
    {
        title: 'Prompt Engineering',
        skills: [
            { name: 'Vibecoding', icon: <PaintBrushIcon /> },
            { name: 'Context Optimization', icon: <PaintBrushIcon /> },
            { name: 'System Prompts', icon: <PaintBrushIcon /> },
            { name: 'Tool Integration', icon: <PaintBrushIcon /> },
        ],
    },
    {
        title: 'Portfolio Projects',
        skills: [
            { name: 'AI Career Co-Pilot', icon: <CodeBracketIcon /> },
            { name: 'CI/CD Simulator', icon: <CodeBracketIcon /> },
            { name: 'Knowledge Pipeline', icon: <CodeBracketIcon /> },
            { name: 'This Portfolio', icon: <CodeBracketIcon /> },
        ],
    },
  ],
};

export const EXPERIENCE_DATA: ExperienceItem[] = [
    {
        company: 'Ask Jay Services',
        role: 'Software Engineer (Contract)',
        duration: 'May 2025 - Oct 2025 (6 months)',
        logo: <AskJayLogo />,
        points: [
          {
            title: 'Flutter Marketplace Application',
            description: 'Architected and built a Flutter application from scratch with three user portals (Client, Subcontractor, Admin), implementing authentication and state management.',
          },
          {
            title: 'AWS Hands-on Experience',
            description: 'Gained 6 months of hands-on experience with AWS (EC2, S3, RDS) while working on the Ask Jay contract, provisioning infrastructure and managing deployments.',
          },
          {
            title: 'Mission-Critical Disaster Recovery',
            description: 'Led recovery following database failure, restoring 100% of application services by provisioning secure AWS EC2 infrastructure and MongoDB Atlas with zero data loss.',
          },
          {
            title: 'Performance Improvement',
            description: 'Achieved 88% performance improvement (25s → 3s load times) through optimization of Next.js application including server-side rendering and caching.',
          },
          {
            title: 'CI/CD Pipeline',
            description: 'Engineered a complete CI/CD pipeline using Docker and GitHub Actions for reliable one-command deployments.',
          },
        ],
      },
    {
        company: 'Professional Development',
        role: 'Self-Directed Learning',
        duration: 'Feb 2024 - May 2025',
        logo: <ProfessionalDevelopmentLogo />,
        points: [
          {
            title: 'AI/ML & DevOps Focus',
            description: 'Completed intensive self-directed learning in AI/ML engineering, RAG architectures, and modern DevOps practices.',
          },
          {
            title: 'Portfolio Development',
            description: 'Built a portfolio of 6+ production-ready applications using React, Next.js, Flutter, Gemini API, AWS, and Docker.',
          },
          {
            title: 'Advanced Skill Acquisition',
            description: 'Developed expertise in state management patterns, CI/CD pipelines, and offline-first PWA architectures.',
          },
        ],
      },
    {
        company: 'Australian Computer Society',
        role: 'Cloud Engineering Intern',
        duration: 'Sep 2023 - Feb 2024',
        logo: <ACSLogo />,
        points: [
          {
            title: 'Frontend Development',
            description: 'Contributed to a MERN + TypeScript platform for 10,000+ users, improving page load performance by 30% through React component optimization.',
          },
          {
            title: 'Security Remediation',
            description: 'Executed security testing based on OWASP Top 10 guidelines, implementing fixes that strengthened application security.',
          },
          {
            title: 'Agile Collaboration',
            description: 'Collaborated in an Agile team with senior engineers, QA, and stakeholders to deliver features on sprint schedules.',
          },
        ],
      },
];

export const PROJECTS_DATA: Project[] = [
    {
      title: 'AI Career Co-Pilot (RAG Architecture)',
      description: 'Built a Retrieval-Augmented Generation system embedding a 47-page knowledge base to provide contextually accurate career advice, with a real-time chat interface and Markdown export.',
      tags: ['React', 'TypeScript', 'Gemini API', 'RAG Architecture', 'localStorage'],
      imageUrl: 'https://picsum.photos/seed/project4/600/400',
      githubUrl: '#',
      featured: true,
    },
    {
      title: 'Interactive CI/CD Simulator (AIOps)',
      description: 'Developed an educational DevOps platform with AI-powered diagnostics using Google Search grounding to provide real-time, cited remediation steps for simulated build failures.',
      tags: ['React', 'TypeScript', 'Gemini API', 'Google Search', 'useReducer'],
      imageUrl: 'https://picsum.photos/seed/project7/600/400',
      githubUrl: '#',
      featured: true,
    },
    {
      title: 'Knowledge Management Pipeline & DevPath',
      description: 'Created an automated pipeline transforming unstructured notes (PDF, Markdown) into interactive D3.js knowledge graphs, packaged as an offline-first PWA with XSS protection.',
      tags: ['React', 'TypeScript', 'D3.js', 'Gemini API', 'PWA', 'DOMPurify'],
      imageUrl: 'https://picsum.photos/seed/project6/600/400',
      githubUrl: '#',
      featured: true,
    },
];

// FIX: Added the missing `CASE_STUDIES_DATA` constant.
export const CASE_STUDIES_DATA: CaseStudy[] = [
    {
      id: 'disaster-recovery',
      title: 'Mission-Critical Disaster Recovery',
      subtitle: 'AWS & MongoDB Atlas',
      icon: <ServerStackIcon />,
      situation: 'A critical database failure caused a complete application outage, jeopardizing user data and business operations.',
      task: 'Restore 100% of application services with zero data loss and implement a robust, secure, and scalable infrastructure to prevent future incidents.',
      action: [
        'Provisioned a secure AWS EC2 instance to host the application backend.',
        'Migrated the database to MongoDB Atlas for enhanced reliability and scalability.',
        'Performed a point-in-time recovery of the database, ensuring no data was lost.',
        'Re-established application services and validated full functionality.'
      ],
      result: 'Achieved 100% service restoration with zero data loss. The new infrastructure on AWS and MongoDB Atlas significantly improved reliability and security.'
    },
    {
      id: 'performance-improvement',
      title: 'Frontend Performance Optimization',
      subtitle: 'Next.js & Caching',
      icon: <CodeBracketIcon />,
      situation: 'The main application dashboard was experiencing slow load times, up to 25 seconds, leading to a poor user experience.',
      task: 'Drastically reduce the dashboard load time and improve overall application responsiveness.',
      action: [
        'Analyzed the Next.js application performance using profiling tools to identify bottlenecks.',
        'Implemented server-side rendering (SSR) to pre-render pages.',
        'Introduced strategic caching for frequently accessed data.',
        'Optimized React components and bundle sizes.'
      ],
      result: 'Reduced dashboard load times by 88%, from 25 seconds down to 3 seconds, resulting in a significantly improved user experience and engagement.'
    },
    {
        id: 'cicd-pipeline',
        title: 'Automated CI/CD Pipeline',
        subtitle: 'Docker & GitHub Actions',
        icon: <WrenchScrewdriverIcon />,
        situation: 'The deployment process was manual, error-prone, and time-consuming, hindering development velocity and release reliability.',
        task: 'Engineer a fully automated CI/CD pipeline to enable reliable, one-command deployments.',
        action: [
          'Containerized the application using Docker to ensure consistent environments.',
          'Configured a GitHub Actions workflow to automatically build, test, and deploy the application on every push to the main branch.',
          'Integrated automated testing to catch bugs early in the development cycle.'
        ],
        result: 'Streamlined the deployment process, reducing deployment time by over 95% and eliminating manual deployment errors. Enabled the team to ship features faster and with higher confidence.'
    },
];
