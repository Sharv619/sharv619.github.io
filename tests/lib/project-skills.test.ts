import { describe, expect, it } from 'vitest';
import { deriveSkillCategories } from '../../src/lib/project-skills';
import type { Project } from '../../src/lib/data';

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
    expect(categories.find((category) => category.title === 'AI & Data')?.items).toEqual(['AI', 'RAG']);
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
    expect(categories.find((category) => category.title === 'AI & Data')?.items).toEqual(['AI SDK']);
    expect(categories.find((category) => category.title === 'Testing & Quality')?.items).toEqual(['React Testing Library', 'Vitest']);
  });

  it('includes supplemental skills from certifications', () => {
    const categories = deriveSkillCategories([], ['SQL', 'AWS', 'Prompt Engineering']);

    expect(categories.find((category) => category.title === 'Languages')?.items).toEqual(['SQL']);
    expect(categories.find((category) => category.title === 'AI & Data')?.items).toEqual(['Prompt Engineering']);
    expect(categories.find((category) => category.title === 'Infrastructure, Data & Security')?.items).toEqual(['AWS']);
  });
});
