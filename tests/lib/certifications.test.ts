import { describe, expect, it } from 'vitest';
import { sortCertifications } from '../../src/lib/certifications';

describe('certifications', () => {
  it('sorts newest certifications first', () => {
    const certifications = sortCertifications([
      { title: 'Older', issuer: 'LinkedIn Learning', issuedAt: '2024-01-01' },
      { title: 'Newer', issuer: 'LinkedIn Learning', issuedAt: '2025-01-01' },
    ]);

    expect(certifications.map((certification) => certification.title)).toEqual(['Newer', 'Older']);
  });
});
