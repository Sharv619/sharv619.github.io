# SEO and canonical domain

## Canonical domain

The canonical public origin is `https://www.himanshulade.com/`. Next.js metadata, canonical links, Open Graph URLs, structured data, `robots.txt`, the sitemap, and the GitHub Pages `CNAME` file use the `www` hostname and HTTPS consistently. Routes use trailing slashes because `next.config.ts` enables `trailingSlash`.

## Sitemap and robots

Next.js generates `/robots.txt` and `/sitemap.xml` during every static export from `src/app/robots.ts` and `src/app/sitemap.ts`.

- Crawling is allowed site-wide; `/_next/` is not blocked.
- The sitemap contains real, canonical routes only and never includes URL fragments.
- Project routes come from the same GitHub-backed build-time data used to render the site.
- `lastmod` uses the build timestamp, so every successful deployment refreshes it.

## Regenerate and deploy

Run `npm run build` to regenerate the static `out/` export. Pushing to `main`, triggering the Pages workflow manually, sending its `refresh-project-feed` repository dispatch, or waiting for its daily schedule rebuilds and deploys the site. The workflow supplies `GITHUB_TOKEN`, so current public GitHub project data is rendered into static HTML. Builds without a token use the curated fallback project data.

## Verify after deployment

1. Confirm GitHub Pages is configured with `www.himanshulade.com` as its custom domain and HTTPS enforcement is enabled.
2. Confirm DNS points `www` to `sharv619.github.io`; configure the apex domain to redirect to `https://www.himanshulade.com/` through the DNS or domain provider if needed.
3. Open `https://www.himanshulade.com/robots.txt` and confirm it references `https://www.himanshulade.com/sitemap.xml`.
4. Open the sitemap and confirm every `<loc>` uses the branded domain and no URL contains `#`.
5. View the homepage source and confirm canonical and `og:url` values use the branded domain.
6. Submit `https://www.himanshulade.com/sitemap.xml` in Google Search Console for the canonical-domain property and request reindexing of the homepage and key routes.
7. Ensure the deployed Lambda `ALLOWED_ORIGINS` environment variable includes both `https://www.himanshulade.com` and `https://himanshulade.com`, then redeploy the Lambda if its current value does not.
