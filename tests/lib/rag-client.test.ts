import { describe, it, expect } from 'vitest';
import { getFallbackResponse, getKnowledgeBaseResponse } from '../../src/lib/assistant/fallback-responses';

describe('RAG Client', () => {
  describe('getFallbackResponse', () => {
    it('returns greeting for hi/hello messages', () => {
      expect(getFallbackResponse('hi')).toContain('Assistant');
      expect(getFallbackResponse('hello')).toContain('Assistant');
      expect(getFallbackResponse('hey there')).toContain('Assistant');
    });

    it('handles typo-like greeting punctuation in demo knowledge responses', () => {
      const result = getKnowledgeBaseResponse('hel;lo');

      expect(result.response).toContain('Assistant');
      expect(result.sources.some((source) => source.id === 'profile-himanshu-lade')).toBe(true);
    });

    it('answers what do you do as a profile question in demo mode', () => {
      const result = getKnowledgeBaseResponse('what do you do?');

      expect(result.response).toContain("Himanshu");
      expect(result.response).toContain("Software Engineer");
      expect(result.sources.some((source) => source.id === 'personal')).toBe(true);
    });

    it('returns projects for project queries', () => {
      const response = getFallbackResponse('what projects has himanshu built');
      expect(response).toContain('GitHub');
      expect(response).toContain('Production Recovery');
      expect(response).toContain('codeflow-hook');
    });

    it('routes AI project queries to project answers in demo mode', () => {
      const result = getKnowledgeBaseResponse('ai projects');

      expect(result.response).toMatch(/Network Guardian AI|AWS Bedrock|Pilly|codeflow-hook/i);
      expect(result.sources.length).toBeGreaterThan(0);
      expect(result.sources[0].section).not.toBe('Knowledge Base: Skills');
    });

    it('routes AI ML queries to project answers instead of broad skills', () => {
      const result = getKnowledgeBaseResponse('AI ML');

      expect(result.response).toMatch(/Network Guardian AI|Pilly|BackPocket|AWS Bedrock/i);
      expect(result.sources[0].section).not.toBe('Knowledge Base: Skills');
    });

    it('returns skills for skill queries', () => {
      const response = getFallbackResponse('what are his technical skills');
      expect(response).toContain('JavaScript');
      expect(response).toContain('React');
      expect(response).toContain('AWS');
    });

    it('returns experience for job queries', () => {
      const response = getFallbackResponse('tell me about his experience');
      expect(response).toContain('Ask Jay Services');
      expect(response).toContain('production recovery');
    });

    it('returns default for unknown queries', () => {
      const response = getFallbackResponse('random question');
      expect(response).toBeDefined();
      expect(response.length).toBeGreaterThan(0);
    });
  });

  describe('getKnowledgeBaseResponse', () => {
    it('returns project answers with knowledge base sources', () => {
      const result = getKnowledgeBaseResponse('tell me about network guardian');

      expect(result.response).toContain('Network Guardian AI');
      expect(result.response).toContain('FastAPI');
      expect(result.sources.some((source) => source.id === 'network-guardian-ai')).toBe(true);
    });

    it('returns skill answers from the knowledge base', () => {
      const result = getKnowledgeBaseResponse('what skills does he have');

      expect(result.response).toContain('TypeScript');
      expect(result.response).toContain('AWS');
      expect(result.sources[0].section).toContain('Skills');
    });

    it('returns experience answers from the knowledge base', () => {
      const result = getKnowledgeBaseResponse('what work experience does he have');

      expect(result.response).toContain('Ask Jay Services');
      expect(result.response).toContain('Australian Computer Society');
      expect(result.sources.some((source) => source.section.includes('Experience'))).toBe(true);
    });
  });
});
