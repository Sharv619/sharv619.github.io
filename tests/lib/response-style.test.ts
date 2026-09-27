import { describe, expect, it } from 'vitest';
import { formatAssistantResponse, isLongQuestion } from '../../src/lib/assistant/response-style';

describe('assistant response style', () => {
  it('keeps short-question answers under 200 characters', () => {
    const response = 'Himanshu worked as a Web Developer Intern at the Australian Computer Society from September 2023 to February 2024. He improved average page load time by 30% for a MERN application serving 10,000+ users, reviewed authentication issues, and collaborated in Agile sprints.';

    const formatted = formatAssistantResponse('hi', response);

    expect(formatted.length).toBeLessThanOrEqual(200);
    expect(formatted).toContain('Himanshu worked');
  });

  it('allows longer answers for detailed questions', () => {
    const response = 'Himanshu worked on production recovery, performance optimization, CI/CD, AWS-oriented deployment, and AI workflow tooling. This longer answer should stay intact for detailed prompts.';

    expect(isLongQuestion('Can you explain his AWS architecture in detail?')).toBe(true);
    expect(formatAssistantResponse('Can you explain his AWS architecture in detail?', response)).toBe(response);
  });
});
