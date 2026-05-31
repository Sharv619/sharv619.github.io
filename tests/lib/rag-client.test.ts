import { describe, it, expect } from 'vitest';
import { getFallbackResponse } from '../../src/lib/assistant/fallback-responses';

describe('RAG Client', () => {
  describe('getFallbackResponse', () => {
    it('returns greeting for hi/hello messages', () => {
      expect(getFallbackResponse('hi')).toContain('Assistant');
      expect(getFallbackResponse('hello')).toContain('Assistant');
      expect(getFallbackResponse('hey there')).toContain('Assistant');
    });

    it('returns projects for project queries', () => {
      const response = getFallbackResponse('what projects has himanshu built');
      expect(response).toContain('GitHub');
      expect(response).toContain('Production Recovery');
      expect(response).toContain('codeflow-hook');
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
});
