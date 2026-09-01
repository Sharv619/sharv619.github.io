import { describe, it, expect } from 'vitest';
import { analyzeQueryComplexity, getModelForComplexity } from '../../src/lib/assistant/rag-client';

describe('Smart Routing', () => {
  describe('analyzeQueryComplexity', () => {
    it('identifies simple greetings', () => {
      expect(analyzeQueryComplexity('hi')).toBe('simple');
      expect(analyzeQueryComplexity('hello')).toBe('simple');
      expect(analyzeQueryComplexity('who are you')).toBe('simple');
    });

    it('identifies complex technical queries', () => {
      expect(analyzeQueryComplexity('explain the architecture in detail')).toBe('complex');
      expect(analyzeQueryComplexity('how to implement this')).toBe('complex');
      expect(analyzeQueryComplexity('compare vs other solutions')).toBe('complex');
    });

    it('defaults to medium for unknown queries', () => {
      expect(analyzeQueryComplexity('what is react')).toBe('medium');
      expect(analyzeQueryComplexity('tell me about aws')).toBe('medium');
    });
  });

  describe('getModelForComplexity', () => {
    it('returns synthetic rag for simple queries', () => {
      expect(getModelForComplexity('simple')).toBe('synthetic-rag');
    });

    it('returns synthetic rag for complex queries', () => {
      expect(getModelForComplexity('complex')).toBe('synthetic-rag');
    });

    it('returns synthetic rag for medium queries', () => {
      expect(getModelForComplexity('medium')).toBe('synthetic-rag');
    });
  });
});
