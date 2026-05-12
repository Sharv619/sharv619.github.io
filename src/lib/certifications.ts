export interface Certification {
  title: string;
  issuer: string;
  issuedAt: string;
  credentialUrl?: string;
  skills?: string[];
}

export const certifications: Certification[] = [];

export function sortCertifications(items: Certification[]): Certification[] {
  return [...items].sort((left, right) => {
    const rightDate = Date.parse(right.issuedAt);
    const leftDate = Date.parse(left.issuedAt);

    return (Number.isNaN(rightDate) ? 0 : rightDate) - (Number.isNaN(leftDate) ? 0 : leftDate);
  });
}
