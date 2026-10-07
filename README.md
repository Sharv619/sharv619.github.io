### Hi there, I'm Himanshu
**Software Engineer focused on backend systems, production reliability, cloud deployment, and AI-assisted workflow automation.**

I'm a software engineer in Sydney building practical systems around real workflows: production recovery, CI/CD, cloud deployment, internal tools, and AI-assisted automation. My strongest work sits at the intersection of shipping features, debugging production issues, and making systems easier to operate.

Recent experience includes ransomware recovery, automation, and marketplace engineering at Ask Jay Services, where I restored 100% of production data with zero loss, reduced page load time from 25 seconds to 3 seconds, and established CI/CD and production deployment practices.

I also build prototypes and open-source tools to explore responsible AI workflows, developer tooling, and small-business automation. I label these clearly as MVPs, prototypes, or experiments when they are not production systems.

### Hosting and optional AWS backend

The public website is hosted with **GitHub Pages + Cloudflare**, not AWS, and uses `https://www.himanshulade.com/` as its canonical domain. AWS is used only for the optional chatbot/Synthetic RAG backend. See [`AWS_CURRENT_ARCHITECTURE.md`](./AWS_CURRENT_ARCHITECTURE.md) for the current resource inventory, recovery checklist, and intentionally unused services.

---
### 🛠️ Technologies & Tools I Use

**Languages & Frameworks:**
<p>
  <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"><img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript"/></a>
  <a href="https://react.dev/" target="_blank"><img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/></a>
  <a href="https://nextjs.org/" target="_blank"><img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/></a>
  <a href="https://nodejs.org/" target="_blank"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js"/></a>
  <a href="https://flutter.dev/" target="_blank"><img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white" alt="Flutter"/></a>
  <a href="https://dart.dev/" target="_blank"><img src="https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white" alt="Dart"/></a>
  <a href="https://tailwindcss.com/" target="_blank"><img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/></a>
</p>

**Cloud & DevOps:**
<p>
  <a href="https://aws.amazon.com/ec2/" target="_blank"><img src="https://img.shields.io/badge/AWS_EC2-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS EC2"/></a>
  <a href="https://www.docker.com/" target="_blank"><img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker"/></a>
  <a href="https://github.com/features/actions" target="_blank"><img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" alt="GitHub Actions"/></a>
  <a href="https://pm2.keymetrics.io/" target="_blank"><img src="https://img.shields.io/badge/PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white" alt="PM2"/></a>
  <a href="https://www.nginx.com/" target="_blank"><img src="https://img.shields.io/badge/Nginx-009639?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx"/></a>
  <a href="https://git-scm.com/" target="_blank"><img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white" alt="Git"/></a>
</p>

**Databases & Storage:**
<p>
  <a href="https://www.mongodb.com/cloud/atlas" target="_blank"><img src="https://img.shields.io/badge/MongoDB_Atlas-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Atlas"/></a>
  <a href="https://aws.amazon.com/s3/" target="_blank"><img src="https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazon-s3&logoColor=white" alt="AWS S3"/></a>
</p>

**Specialties & Methodologies:**
<p>
  <a href="https://owasp.org/www-project-top-ten/" target="_blank"><img src="https://img.shields.io/badge/Security_&_OWASP-DA2A2A?style=for-the-badge&logo=owasp&logoColor=white" alt="Security & OWASP"/></a>
  <a href="https://en.wikipedia.org/wiki/Site_Reliability_Engineering" target="_blank"><img src="https://img.shields.io/badge/Incident_Response-FF7800?style=for-the-badge" alt="Incident Response"/></a>
  <a href="https://en.wikipedia.org/wiki/Search_engine_optimization" target="_blank"><img src="https://img.shields.io/badge/Technical_SEO-4285F4?style=for-the-badge" alt="Technical SEO"/></a>
  <a href="https://www.atlassian.com/agile" target="_blank"><img src="https://img.shields.io/badge/Agile-0052CC?style=for-the-badge" alt="Agile"/></a>
</p>

---
### Recent Experience Highlights

- **Ask Jay Services:** Software Engineer, May-Oct 2025. Recovered a production system from ransomware with 100% data restored and zero loss, reduced page load time from 25 seconds to 3 seconds, built a shift-booking bot and three-sided Flutter marketplace, and established CI/CD practices.
- **Australian Computer Society:** Web Developer Intern, Sep 2023-Feb 2024. Improved MERN frontend performance by 33% for a production application serving 200+ active users, remediated 15+ OWASP Top 10 vulnerabilities, and built internal tooling.

---

### 💻 Projects

The portfolio separates flagship case studies from the broader GitHub project feed:

- **Production Recovery & Performance Rebuild** - NDA-safe case study for production recovery, cloud hardening, CI/CD, and performance work.
- **Pilly / MediMate Voice** - Firebase-backed responsible-AI medication support MVP. Not a medical product; no diagnosis, dosage advice, or real patient data.
- **codeflow-hook** - Open-source AI-assisted code review CLI published as an npm package with early usage traction.

The website project feed and repo-aware assistant are generated from public, non-fork GitHub repositories owned by `Sharv619`. By default they use `PORTFOLIO_GITHUB_TOPIC=all`; set this to a specific topic such as `portfolio` if the feed should be curated. The GitHub Pages workflow refreshes every six hours, imports repository metadata, README content, detected languages, topics, manifests, Docker files, and workflows, rebuilds the local BM25-style search index, and deploys the static site. A new public repository therefore becomes a portfolio project, a static detail page, and searchable assistant evidence on the next refresh without being added to a manual question bank. The public assistant runs entirely in the browser and does not call AWS or an LLM.

Automation details for repo push refreshes and certifications live in `docs/automation.md`.


---

### 📫 Let's Connect

I'm always open to connecting with fellow builders and exploring new opportunities:

<p>
  <a href="https://www.linkedin.com/in/himanshu-lade/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
  </a>
  <a href="mailto:himanshulade@hotmail.com">
    <img src="https://img.shields.io/badge/Email-0078D4?style=for-the-badge&logo=microsoft-outlook&logoColor=white" alt="Email"/>
  </a>
</p>
