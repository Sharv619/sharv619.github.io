import { describe, expect, it } from 'vitest';
import {
  extractPackageJsonSkills,
  extractPythonDependencySkills,
  extractPyprojectSkills,
  extractWorkflowSkills,
  isPortfolioRepository,
  mergeTechnologies,
  normalizeRepositoryProject,
  summarizeReadme,
} from '../../src/lib/github-projects';
import type { GitHubRepository } from '../../src/lib/github-projects';

const baseRepo: GitHubRepository = {
  id: 1,
  name: 'network-guardian-ai',
  full_name: 'Sharv619/network-guardian-ai',
  private: false,
  fork: false,
  archived: false,
  description: 'AI-powered network threat detection.',
  html_url: 'https://github.com/Sharv619/network-guardian-ai',
  homepage: '',
  language: 'Python',
  topics: ['portfolio', 'ai', 'fastapi'],
  stargazers_count: 4,
  forks_count: 1,
  pushed_at: '2026-04-01T00:00:00Z',
  updated_at: '2026-04-02T00:00:00Z',
};

describe('github-projects', () => {
  it('includes public non-fork repos when configured for all projects', () => {
    expect(isPortfolioRepository(baseRepo)).toBe(true);
    expect(isPortfolioRepository({ ...baseRepo, fork: true })).toBe(false);
    expect(isPortfolioRepository({ ...baseRepo, private: true })).toBe(false);
    expect(isPortfolioRepository({ ...baseRepo, topics: ['ai'] })).toBe(true);
  });

  it('supports a topic filter for curated project feeds', () => {
    expect(isPortfolioRepository(baseRepo, 'portfolio')).toBe(true);
    expect(isPortfolioRepository({ ...baseRepo, topics: ['ai'] }, 'portfolio')).toBe(false);
  });

  it('summarizes readme content into a clean paragraph', () => {
    const summary = summarizeReadme(`# Network Guardian AI

![screenshot](./demo.png)

Network Guardian AI detects suspicious network behavior with a three-stage machine learning pipeline, combining entropy scoring, isolation forests, and a FastAPI service for real-time analysis.`);

    expect(summary).toContain('detects suspicious network behavior');
    expect(summary).not.toContain('screenshot');
  });

  it('merges languages and topics without duplicates or the configured feed topic', () => {
    expect(mergeTechnologies('TypeScript', { TypeScript: 20, JavaScript: 10 }, ['portfolio', 'nextjs', 'ai'], 'portfolio', ['vitest'])).toEqual([
      'TypeScript',
      'JavaScript',
      'Next.js',
      'AI',
      'Vitest',
    ]);
  });

  it('normalizes noisy GitHub language labels', () => {
    expect(mergeTechnologies('Dockerfile', { HCL: 20, Makefile: 10, Smarty: 5 }, [], 'all')).toEqual([
      'Docker',
      'Terraform',
    ]);
  });

  it('extracts package manifest skills', () => {
    const skills = extractPackageJsonSkills(JSON.stringify({
      dependencies: {
        next: '^16.0.0',
        react: '^19.0.0',
        '@modelcontextprotocol/sdk': '^1.0.0',
      },
      devDependencies: {
        vitest: '^4.0.0',
        '@testing-library/react': '^16.0.0',
      },
      scripts: {
        lint: 'eslint',
      },
    }));

    expect(skills).toEqual(['Next.js', 'React', 'MCP', 'Vitest', 'React Testing Library', 'ESLint']);
  });

  it('extracts Python manifest and workflow skills', () => {
    expect(extractPythonDependencySkills('fastapi==0.110.0\nsentence-transformers>=2.0\npytest')).toEqual([
      'FastAPI',
      'Sentence Transformers',
      'Pytest',
    ]);
    expect(extractPyprojectSkills('[project]\ndependencies = ["pydantic", "scikit-learn"]')).toEqual([
      'Pydantic',
      'Scikit-learn',
    ]);
    expect(extractWorkflowSkills(['uses: actions/deploy-pages@v4\nrun: npm run test:run # vitest'])).toEqual([
      'GitHub Actions',
      'GitHub Pages',
      'Vitest',
    ]);
  });

  it('normalizes GitHub repos into portfolio projects', () => {
    const project = normalizeRepositoryProject(baseRepo, {
      languages: { Python: 100, TypeScript: 40 },
      manifestSkills: ['Docker', 'GitHub Actions'],
      readme: 'Short intro.\n\nThis project monitors network traffic, scores suspicious payloads, and exposes detection results through a production-minded API surface.',
    });

    expect(project.title).toBe('Network Guardian AI');
    expect(project.slug).toBe('network-guardian-ai');
    expect(project.githubUrl).toBe(baseRepo.html_url);
    expect(project.technologies).toContain('Python');
    expect(project.technologies).toContain('FastAPI');
    expect(project.technologies).toContain('Docker');
    expect(project.technologies).toContain('GitHub Actions');
    expect(project.archived).toBe(false);
    expect(project.architectureDetails).toContain('GitHub Signals');
  });
});
