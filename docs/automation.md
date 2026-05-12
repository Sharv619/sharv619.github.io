# Portfolio Automation

## Refresh Projects When Another Repo Changes

The portfolio deploy workflow listens for `repository_dispatch` events with the type `refresh-project-feed`. Add this workflow to any public source repo that should refresh the portfolio after a push:

```yaml
name: Refresh portfolio

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  refresh:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger portfolio rebuild
        run: |
          curl -L -X POST \
            -H "Accept: application/vnd.github+json" \
            -H "Authorization: Bearer ${{ secrets.PORTFOLIO_DISPATCH_TOKEN }}" \
            -H "X-GitHub-Api-Version: 2022-11-28" \
            https://api.github.com/repos/Sharv619/sharv619.github.io/dispatches \
            -d '{"event_type":"refresh-project-feed","client_payload":{"repository":"${{ github.repository }}","ref":"${{ github.ref_name }}","sha":"${{ github.sha }}"}}'
```

Create `PORTFOLIO_DISPATCH_TOKEN` in the source repo secrets. A fine-grained GitHub token should target `Sharv619/sharv619.github.io` and allow repository dispatch access through write access to repository contents. For a classic token, use `public_repo` for public-only repositories or `repo` if private repos are involved.

## LinkedIn Learning Certifications

LinkedIn Learning has official enterprise/admin reporting and xAPI integrations for learning activity. Use that route if the account is managed through an organization with API access.

For an individual LinkedIn Learning account, avoid browser scraping or storing LinkedIn cookies. The safe fallback is to add completed certificates to `src/lib/certifications.ts` after completing a course:

```ts
export const certifications: Certification[] = [
  {
    title: "Course Title",
    issuer: "LinkedIn Learning",
    issuedAt: "2026-05-01",
    credentialUrl: "https://www.linkedin.com/learning/certificates/...",
    skills: ["TypeScript", "React"],
  },
];
```

The homepage certifications section renders automatically when that list has entries.
The `skills` values also feed into the homepage Skills section, so a certificate can add skills before those skills appear in a project.
