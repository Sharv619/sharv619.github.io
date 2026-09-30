import { describe, expect, it } from 'vitest';
import { deriveSkillCategories, projectMatchesSkill } from '../../src/lib/project-skills';
import type { Project, ProjectSkill } from '../../src/lib/data';

function createProject(overrides: Partial<Project>): Project {
  return {
    title: 'Example Project',
    description: 'Example description',
    technologies: [],
    liveUrl: '',
    githubUrl: '',
    architectureDetails: '',
    ...overrides,
  };
}

function createProjectSkill(overrides: Partial<ProjectSkill>): ProjectSkill {
  return {
    key: 'test',
    label: 'Test',
    category: 'other',
    sources: [{ source: 'curated', rawValue: 'Test' }],
    ...overrides,
  };
}

describe('project-skills', () => {
  it('derives visible skills from project technologies', () => {
    const categories = deriveSkillCategories([
      createProject({
        technologies: ['TypeScript', 'React', 'Docker', 'AI'],
        primaryLanguage: 'TypeScript',
        languageBreakdown: { TypeScript: 100 },
      }),
      createProject({
        technologies: ['Python', 'FastAPI', 'RAG', 'Docker'],
        primaryLanguage: 'Python',
        languageBreakdown: { Python: 100 },
      }),
    ]);

    expect(categories.find((category) => category.title === 'Languages')?.items).toEqual(['Python', 'TypeScript']);
    expect(categories.find((category) => category.title === 'Frameworks & App Stack')?.items).toEqual(['FastAPI', 'React']);
    expect(categories.find((category) => category.title === 'AI & Data')?.items).toEqual(['RAG']);
    expect(categories.find((category) => category.title === 'Infrastructure, Data & Security')?.items).toEqual(['Docker']);
  });

  it('deduplicates repeated technologies within each project', () => {
    const categories = deriveSkillCategories([
      createProject({
        technologies: ['React', 'React', 'Docker'],
      }),
      createProject({
        technologies: ['Docker'],
      }),
    ]);

    expect(categories.find((category) => category.title === 'Infrastructure, Data & Security')?.items).toEqual(['Docker']);
    expect(categories.find((category) => category.title === 'Frameworks & App Stack')?.items).toEqual(['React']);
  });

  it('recognizes language technologies even without GitHub language enrichment', () => {
    const categories = deriveSkillCategories([
      createProject({
        technologies: ['TypeScript', 'Python', 'React'],
      }),
    ]);

    expect(categories.find((category) => category.title === 'Languages')?.items).toEqual(['Python', 'TypeScript']);
  });

  it('keeps Tailwind CSS in app stack and testing tools in quality', () => {
    const categories = deriveSkillCategories([
      createProject({
        technologies: ['Tailwind CSS', 'Vitest', 'React Testing Library', 'AI SDK'],
      }),
    ]);

    expect(categories.find((category) => category.title === 'Frameworks & App Stack')?.items).toEqual(['Tailwind CSS']);
    expect(categories.find((category) => category.title === 'AI & Data')?.items).toEqual(['Vercel AI SDK']);
    expect(categories.find((category) => category.title === 'Testing & Quality')?.items).toEqual(['React Testing Library', 'Vitest']);
  });

  it('places local AI and data infrastructure in their technical categories', () => {
    const categories = deriveSkillCategories([
      createProject({ technologies: ['Ollama', 'Isolation Forest', 'SQLite', 'Firebase'] }),
    ]);

    expect(categories.find((category) => category.title === 'AI & Data')?.items).toEqual(['Isolation Forest', 'Ollama']);
    expect(categories.find((category) => category.title === 'Infrastructure, Data & Security')?.items).toEqual(['Firebase', 'SQLite']);
  });

  it('includes supplemental skills from certifications', () => {
    const categories = deriveSkillCategories([], ['SQL', 'AWS', 'Prompt Engineering']);

    expect(categories.find((category) => category.title === 'Languages')?.items).toEqual(['SQL']);
    expect(categories.find((category) => category.title === 'AI & Data')?.items).toEqual(['Prompt Engineering']);
    expect(categories.find((category) => category.title === 'Infrastructure, Data & Security')?.items).toEqual(['AWS']);
  });

  it('merges equivalent evidence labels into canonical filters', () => {
    const categories = deriveSkillCategories([
      createProject({ technologies: ['Gemini API', 'AI Review', 'Testing Library'] }),
      createProject({ technologies: ['Google AI SDK', 'AI Code Review', 'React Testing Library'] }),
    ]);

    expect(categories.find((category) => category.title === 'AI & Data')?.items).toEqual(['AI-Assisted Code Review', 'Gemini']);
    expect(categories.find((category) => category.title === 'Testing & Quality')?.items).toEqual(['React Testing Library']);
  });

  it('hides generic topics and Flutter-generated platform languages', () => {
    const categories = deriveSkillCategories([
      createProject({
        technologies: ['Python', 'Flutter', 'Dart', 'Kotlin', 'C++', 'CMake', 'Full stack', 'Developer Tools', 'Portfolio'],
        primaryLanguage: 'Python',
        languageBreakdown: { Python: 1000, Dart: 500, Kotlin: 100, 'C++': 50, CMake: 25 },
      }),
    ]);

    expect(categories.find((category) => category.title === 'Languages')?.items).toEqual(['Dart', 'Python']);
    expect(categories.find((category) => category.title === 'Frameworks & App Stack')?.items).toEqual(['Flutter']);
    expect(categories.find((category) => category.title === 'Project Topics & Tools')).toBeUndefined();
  });

  it('matches canonical filters against every repository alias', () => {
    const geminiApiProject = createProject({ technologies: ['Gemini API'] });
    const googleAiSdkProject = createProject({ technologies: ['Google AI SDK'] });

    expect(projectMatchesSkill(geminiApiProject, 'Gemini')).toBe(true);
    expect(projectMatchesSkill(googleAiSdkProject, 'Gemini')).toBe(true);
    expect(projectMatchesSkill(geminiApiProject, 'RAG')).toBe(false);
  });

  describe('migration: skills field is used when available', () => {
    it('Project type accepts optional skills field', () => {
      const projectWithSkills: Project = createProject({
        technologies: ['TypeScript', 'React'],
        skills: [
          createProjectSkill({ key: 'typescript', label: 'TypeScript', category: 'languages' }),
          createProjectSkill({ key: 'react', label: 'React', category: 'appStack' }),
        ],
      });

      expect(projectWithSkills.skills).toHaveLength(2);
      expect(projectWithSkills.skills?.[0].key).toBe('typescript');
      expect(projectWithSkills.skills?.[1].key).toBe('react');
    });

    it('project without skills field still works', () => {
      const projectWithoutSkills: Project = createProject({
        technologies: ['TypeScript', 'React'],
      });

      expect(projectWithoutSkills.skills).toBeUndefined();
    });

    it('deriveSkillCategories reads from skills when available', () => {
      const project = createProject({
        technologies: ['TypeScript', 'React', 'Docker'],
        skills: [
          createProjectSkill({ key: 'python', label: 'Python', category: 'languages' }),
        ],
      });

      const categories = deriveSkillCategories([project]);

      expect(categories.find((c) => c.title === 'Languages')?.items).toEqual(['Python']);
      expect(categories.find((c) => c.title === 'Frameworks & App Stack')).toBeUndefined();
      expect(categories.find((c) => c.title === 'Infrastructure, Data & Security')).toBeUndefined();
      expect(categories.find((c) => c.title === 'Languages')?.items).not.toContain('TypeScript');
    });

    it('projectMatchesSkill matches against skills when available', () => {
      const project = createProject({
        technologies: ['TypeScript', 'React'],
        skills: [
          createProjectSkill({ key: 'python', label: 'Python', category: 'languages' }),
        ],
      });

      expect(projectMatchesSkill(project, 'TypeScript')).toBe(false);
      expect(projectMatchesSkill(project, 'React')).toBe(false);
      expect(projectMatchesSkill(project, 'Python')).toBe(true);
    });

    it('skills field accepts all SkillCategory values including uncategorized', () => {
      const project: Project = createProject({
        technologies: [],
        skills: [
          createProjectSkill({ key: 'lang', label: 'Language', category: 'languages' }),
          createProjectSkill({ key: 'stack', label: 'Stack', category: 'appStack' }),
          createProjectSkill({ key: 'ai', label: 'AI', category: 'aiData' }),
          createProjectSkill({ key: 'infra', label: 'Infra', category: 'infraDataSecurity' }),
          createProjectSkill({ key: 'qual', label: 'Quality', category: 'quality' }),
          createProjectSkill({ key: 'other', label: 'Other', category: 'other' }),
          createProjectSkill({ key: 'unknown', label: 'Unknown', category: 'uncategorized' }),
        ],
      });

      expect(project.skills).toHaveLength(7);
      const categories = new Set(project.skills!.map((s) => s.category));
      expect(categories.has('languages')).toBe(true);
      expect(categories.has('appStack')).toBe(true);
      expect(categories.has('aiData')).toBe(true);
      expect(categories.has('infraDataSecurity')).toBe(true);
      expect(categories.has('quality')).toBe(true);
      expect(categories.has('other')).toBe(true);
      expect(categories.has('uncategorized')).toBe(true);
    });

    it('SkillEvidence tracks source and rawValue', () => {
      const project: Project = createProject({
        technologies: [],
        skills: [
          createProjectSkill({
            key: 'gemini',
            label: 'Gemini',
            category: 'aiData',
            sources: [
              { source: 'github-language', rawValue: 'TypeScript' },
              { source: 'manifest', rawValue: '@google/generative-ai' },
              { source: 'override', rawValue: 'Gemini API' },
            ],
          }),
        ],
      });

      const skill = project.skills![0];
      expect(skill.sources).toHaveLength(3);
      expect(skill.sources[0].source).toBe('github-language');
      expect(skill.sources[0].rawValue).toBe('TypeScript');
      expect(skill.sources[1].source).toBe('manifest');
      expect(skill.sources[1].rawValue).toBe('@google/generative-ai');
      expect(skill.sources[2].source).toBe('override');
      expect(skill.sources[2].rawValue).toBe('Gemini API');
    });
  });
});
