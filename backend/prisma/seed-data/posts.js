// backend/prisma/seed-data/posts.js
export const postsSeedData = [
  {
    title: "Authentication Patterns for Modern Frontends",
    content:
      "<h2>Authentication is a product decision</h2><p>Modern frontend apps rarely live in a single server-side-rendered page. They often combine client-side navigation, APIs, and multiple identity providers. That means the authentication model has to be explicit and predictable.</p><p>It is not enough to protect routes; we must protect data, actions, and state transitions. A frontend can rely on refresh tokens, access tokens, and short-lived sessions, but the real win happens when the backend enforces boundaries.</p><ul><li>Keep access tokens short-lived.</li><li>Use refresh rotation.</li><li>Validate claims on every important action.</li></ul><p>A well-designed flow reduces the number of surprise bugs and makes authorization easier to reason about.</p>",
    published: true,
    featured: true,
    author: "ava.morgan",
    createdAt: "2024-12-03T09:15:00.000Z",
    publishedAt: "2024-12-05T12:00:00.000Z",
  },
  {
    title: "Designing a Healthy API Error Contract",
    content:
      "<h2>Errors should be useful, not noisy</h2><p>Most API failures are not dramatic. They are ordinary cases like validation problems, missing records, or permission errors. The experience gets frustrating when the client receives vague messages or inconsistent response shapes.</p><p>Good API design defines a predictable error contract. That includes status codes, a stable message format, and actionable error details when appropriate. The contract should help the frontend present better user feedback without leaking internal implementation details.</p><p>For example, the same model can expose validation failures with field names, while security errors remain generic.</p>",
    published: true,
    featured: false,
    author: "ava.morgan",
    createdAt: "2024-11-11T15:20:00.000Z",
    publishedAt: "2024-11-12T09:10:00.000Z",
  },
  {
    title: "Why Database Indexes Matter More Than You Think",
    content:
      "<h2>Indexes are not a performance trick</h2><p>We often think of indexes as an optimization problem, but they are really a query-shape problem. When your app asks for a record by a unique key, by a timestamp, or by an owner filter, the index decides whether the database can react in milliseconds or scan a large table.</p><p>The cost of a bad index is not just slow queries. It can also increase write latency and make maintenance harder. Good indexing starts with real access patterns and realistic production workloads.</p><ul><li>Index the columns used in filters.</li><li>Review composite index order.</li><li>Measure before adding more indexes.</li></ul>",
    published: true,
    featured: false,
    author: "ava.morgan",
    createdAt: "2024-10-18T10:05:00.000Z",
    publishedAt: "2024-10-19T09:00:00.000Z",
  },
  {
    title: "Pagination Without Losing User Context",
    content:
      "<h2>Paginators should preserve intent</h2><p>Pagination is often treated as a backend concern. In reality, it is a product feature. Users need to move between pages without losing their position, filters, or the feeling that the system is reliable.</p><p>Cursor-based pagination generally works better for feeds and dashboards because it preserves ordering and avoids unstable offset issues. Offset pagination is simpler, but it tends to produce odd page drift when records are inserted or updated between requests.</p><p>The right choice depends on what the product needs: stable navigation, filtered queries, and predictable ordering across highly dynamic data.</p>",
    published: true,
    featured: true,
    author: "ava.morgan",
    createdAt: "2024-09-28T18:40:00.000Z",
    publishedAt: "2024-09-29T08:45:00.000Z",
  },
  {
    title: "Drafting a Better Content Workflow",
    content:
      "<h2>Good editorial workflows reduce mistakes</h2><p>Content systems often break down when authors can publish immediately without any review path. A better workflow includes draft states, preview support, timestamps, and clearly defined publication rules.</p><p>Even for a small team, draft status matters. It gives authors room to iterate, track versions, and avoid publishing incomplete work. The frontend can also show whether a piece is published, scheduled, or archived.</p><p>That clarity is just as important as the writing itself.</p>",
    published: false,
    featured: false,
    author: "ava.morgan",
    createdAt: "2025-01-05T14:30:00.000Z",
    publishedAt: null,
  },
  {
    title: "Express Middleware Patterns That Scale",
    content:
      "<h2>Middleware is more than a logger</h2><p>Middleware is one of the most powerful parts of Express because it sits in the request lifecycle. It can normalize input, attach user context, measure performance, and reject unsafe requests before application code runs.</p><p>In large APIs, middleware should be narrow and explicit. Logging, authentication, validation, and rate limiting each have different responsibilities. Overloading a single middleware function with multiple behaviors makes the code harder to debug and harder to reuse.</p><p>Use middleware to isolate concerns, not to hide them.</p>",
    published: true,
    featured: false,
    author: "nina.ross",
    createdAt: "2024-12-12T11:05:00.000Z",
    publishedAt: "2024-12-13T07:45:00.000Z",
  },
  {
    title: "Understanding JWT Claims and Boundaries",
    content:
      "<h2>JWTs are not magic</h2><p>JWTs are easy to understand in a simple case and surprisingly hard to manage at scale. The token itself does not grant permission; it carries claims that the API then interprets.</p><p>That means the real boundary is not whether a token is signed, but whether the server trusts the claims and whether those claims are scoped appropriately. Short-lived access tokens, careful audience checks, and explicit role validation are key to healthy auth flows.</p><p>Developers should understand the trade-offs before shipping JWTs everywhere.</p>",
    published: true,
    featured: true,
    author: "nina.ross",
    createdAt: "2024-11-21T17:10:00.000Z",
    publishedAt: "2024-11-22T08:20:00.000Z",
  },
  {
    title: "Why SQL Joins Are Still Central to Modern Backends",
    content:
      "<h2>Relational data is still a core tool</h2><p>Many recent APIs rely on ORMs, but the underlying patterns in SQL still matter. Whether you are joining users to posts or orders to items, the database is designed to reason about relationships efficiently.</p><p>Understanding join behavior helps teams debug performance and predictability issues. Even with Prisma, a database can be slow when joined fields are unindexed or when the query shape is inefficient.</p><p>Good API design should reflect the actual relational model, not hide it completely.</p>",
    published: true,
    featured: false,
    author: "nina.ross",
    createdAt: "2024-10-02T16:00:00.000Z",
    publishedAt: "2024-10-03T11:30:00.000Z",
  },
  {
    title: "Prisma Tips for Safer Query Design",
    content:
      "<h2>Safety starts with intent</h2><p>Prisma makes query writing approachable, but it also encourages a stronger mental model around data access. The right query is one that is explicit about filters, includes, and update semantics.</p><p>When using nested creates or updates, it is easy to accidentally write broad operations. Good preprocessing, validation, and transaction boundaries keep the app stable even under load.</p><p>Prisma is a tool for clarity, not a substitute for good application design.</p>",
    published: true,
    featured: false,
    author: "nina.ross",
    createdAt: "2024-09-08T12:50:00.000Z",
    publishedAt: "2024-09-09T08:10:00.000Z",
  },
  {
    title: "How to Structure a Request Validation Layer",
    content:
      "<h2>Validation is a first-class concern</h2><p>Request validation is easiest to ignore until it becomes a real bug. When users submit malformed data, the API should respond quickly and consistently with field-level feedback.</p><p>A good validation layer checks both shape and business rules. It should reject impossible payloads, reject invalid enum values, and catch edge cases before they reach the database layer.</p><p>That saves time for both the frontend and the backend team.</p>",
    published: true,
    featured: false,
    author: "nina.ross",
    createdAt: "2025-01-02T09:20:00.000Z",
    publishedAt: "2025-01-03T10:05:00.000Z",
  },
  {
    title: "Writing Clean Controllers in Node.js",
    content:
      "<h2>A controller should orchestrate, not do everything</h2><p>Controllers naturally accumulate logic as an application grows. That is often a sign that responsibilities are being mixed together. A cleaner pattern is to keep transport concerns in the controller and push domain logic to services or utilities.</p><p>When controller code stays narrow, it becomes easier to test and easier to reason about. It also reduces the chance that unrelated concerns leak together.</p><p>Good Express controllers are simple, readable, and explicit.</p>",
    published: true,
    featured: false,
    author: "nina.ross",
    createdAt: "2024-12-28T07:25:00.000Z",
    publishedAt: "2024-12-29T10:15:00.000Z",
  },
  {
    title: "Reviewing Your PostgreSQL Query Plan",
    content:
      "<h2>Explain plans reveal hidden costs</h2><p>The fastest query is not always the one that looks cleanest. A query plan reveals whether Postgres is using indexes, scanning large tables, or performing expensive joins.</p><p>In practice, teams compile a query plan before they restructure a data model. That helps them answer questions like: is the database filtering early enough, and can it use a merge join or nested loop in an efficient way?</p><p>Readable SQL plus explain plans gives teams healthy confidence.</p>",
    published: false,
    featured: false,
    author: "nina.ross",
    createdAt: "2025-02-02T13:10:00.000Z",
    publishedAt: null,
  },
  {
    title: "REST APIs That Feel Predictable",
    content:
      "<h2>Predictability reduces client complexity</h2><p>REST endpoints are still common because they are easy to understand and easy to test. The problem is not REST itself; it is when APIs become inconsistent and rely on undocumented conventions.</p><p>Predictable routes, consistent payload shapes, and explicit pagination rules produce a better client experience. This is especially important when multiple frontend teams work from the same backend.</p><p>Designing for documentation and tooling is often what makes the API feel polished.</p>",
    published: true,
    featured: false,
    author: "liam.hughes",
    createdAt: "2024-11-17T08:50:00.000Z",
    publishedAt: "2024-11-18T11:40:00.000Z",
  },
  {
    title: "When to Use Cursor Pagination in a Feed",
    content:
      "<h2>Feeds are a different pagination problem</h2><p>Timeline-style interfaces are often a poor fit for offset-based pagination. Records are changing all the time, and the user expects a stable, continuous sequence.</p><p>Cursor pagination handles this better because it anchors the next page to the last item seen. That means fewer duplicate records and fewer cases where a user skips or repeats content due to data changes.</p><p>For dashboards and feeds, cursor-based paging is usually the safer default.</p>",
    published: true,
    featured: false,
    author: "liam.hughes",
    createdAt: "2024-10-25T15:30:00.000Z",
    publishedAt: "2024-10-26T12:10:00.000Z",
  },
  {
    title: "Handling File Uploads Without Security Bugs",
    content:
      "<h2>The file upload problem is bigger than storage</h2><p>Uploads often create a false sense of safety. A file can be stored correctly but still be unsafe if it is later served without validation or content restrictions.</p><p>The backend should validate type, size, and storage destination. The frontend may provide a better UX, but the server is the real security boundary.</p><p>That distinction matters when building features that allow user-generated content.</p>",
    published: true,
    featured: false,
    author: "liam.hughes",
    createdAt: "2024-09-23T09:35:00.000Z",
    publishedAt: "2024-09-24T06:10:00.000Z",
  },
  {
    title: "What Makes React State Hard to Debug",
    content:
      "<h2>State is rarely a single object</h2><p>Frontend bugs often appear when state is spread across components, forms, and async requests. Debugging becomes much harder when a single user action updates several state slices in slightly different ways.</p><p>Good state decisions keep the data model and UI lifecycle aligned. For example, request results, loading flags, and optimistic UI state should be separate enough to reason about.</p><p>That is why clean UI architecture matters as much as component rendering.</p>",
    published: true,
    featured: true,
    author: "liam.hughes",
    createdAt: "2024-11-09T14:40:00.000Z",
    publishedAt: "2024-11-10T09:50:00.000Z",
  },
  {
    title: "Designing a Better Admin Dashboard",
    content:
      "<h2>Dashboards should show patterns, not just numbers</h2><p>Admin panels become hard to manage when they only display raw metrics without context. Users need to know which items are rising, which ones are stale, and which flows are creating friction.</p><p>Good dashboard design pairs headline metrics with signals: recent activity, trend lines, and actionable filters. That helps the team identify what deserves attention next.</p><p>Metrics are useful when they support decisions.</p>",
    published: true,
    featured: false,
    author: "liam.hughes",
    createdAt: "2024-08-18T12:15:00.000Z",
    publishedAt: "2024-08-19T08:15:00.000Z",
  },
  {
    title: "CSS Layout Patterns That Survive Redesigns",
    content:
      "<h2>Layout systems should be resilient</h2><p>Flexible layouts are about more than grids. They require consistent spacing, a clear visual rhythm, and a small number of reliable patterns that can be reused across the interface.</p><p>Design systems become more durable when they favor composition over one-off tweaks. A solid card layout, consistent spacing scale, and predictable typography go a long way.</p><p>That kind of consistency reduces churn and helps product teams move faster.</p>",
    published: false,
    featured: false,
    author: "liam.hughes",
    createdAt: "2025-01-20T18:20:00.000Z",
    publishedAt: null,
  },
  {
    title: "Git Workflows for Collaborative Teams",
    content:
      "<h2>Git is a team process, not only a tool</h2><p>Many teams think of Git as a technical workflow, but it is also a communication system. Branch naming, review process, and merge hygiene affect how well the team can ship changes without surprises.</p><p>Clear workflows reduce the chance that a teammate accidentally overwrites a change or merges without context. A shared branch strategy makes the work easier to review and easier to roll back.</p><p>Git should support the team’s pace, not slow it down.</p>",
    published: true,
    featured: false,
    author: "sophia.lee",
    createdAt: "2024-12-15T10:45:00.000Z",
    publishedAt: "2024-12-16T07:00:00.000Z",
  },
  {
    title: "Shipping with Confidence in Node.js",
    content:
      "<h2>Confidence comes from repeatability</h2><p>Deployment systems are often the step where small mistakes become expensive. Whether the app runs on containers, a VM, or a managed host, repeatability matters more than any single dev tool.</p><p>Strong deployment habits include clear config, environment validation, health checks, and graceful error handling. Those things help the team respond to outages without panic.</p><p>Confidence is built from routines, not heroics.</p>",
    published: true,
    featured: true,
    author: "sophia.lee",
    createdAt: "2024-11-29T13:10:00.000Z",
    publishedAt: "2024-11-30T11:30:00.000Z",
  },
  {
    title: "Designing a Safer Authorization Model",
    content:
      "<h2>Authorization should be explicit</h2><p>Permission systems become messy when they are defined in ad hoc conditionals. A good approach separates the user's identity from their roles, and then evaluates those roles against a set of allowed actions.</p><p>When permissions remain clear, the app is easier to audit and easier to extend. This matters especially in admin-heavy applications with multiple roles and granular permissions.</p><p>Authorization is not a branding choice; it is an access policy.</p>",
    published: true,
    featured: false,
    author: "sophia.lee",
    createdAt: "2024-10-10T19:05:00.000Z",
    publishedAt: "2024-10-11T09:50:00.000Z",
  },
  {
    title: "Why Feature Flags Help Product Teams",
    content:
      "<h2>Feature flags reduce rollout risk</h2><p>New product ideas are often good, but the surrounding systems may not be ready for them. Feature flags let a team release gradually, measure usage, and fix issues before turning a feature on for everyone.</p><p>That makes the product team faster and safer at the same time. The trade-off is a bit more operational complexity, but a clean rollout strategy usually pays for itself.</p><p>Shared ownership of flags makes the release process more disciplined.</p>",
    published: true,
    featured: false,
    author: "sophia.lee",
    createdAt: "2024-09-12T10:05:00.000Z",
    publishedAt: "2024-09-13T12:00:00.000Z",
  },
  {
    title: "Monitoring a Node API in Production",
    content:
      "<h2>Monitoring gives your app a voice</h2><p>When a backend starts failing in production, the first question is rarely “what happened?” It is “what is the system telling us?” That is why good monitoring matters.</p><p>Logs, metrics, and traces all help in different ways. Logs explain context, metrics show trends, and traces explain latency and dependency chains. Together they give a better view than any single signal.</p><p>Production readiness is not about avoiding all issues; it is about finding them quickly and learning from them.</p>",
    published: true,
    featured: false,
    author: "sophia.lee",
    createdAt: "2025-01-09T16:00:00.000Z",
    publishedAt: "2025-01-10T14:55:00.000Z",
  },
  {
    title: "Building Accessible Forms for Real Users",
    content:
      "<h2>Accessible forms are not optional</h2><p>Forms are critical product surfaces. If they are hard to use, the app fails for many users long before the database is involved.</p><p>Good accessible forms include labels, clear validation states, sensible keyboard interactions, and readable error messaging. They should not depend on color alone to convey meaning.</p><p>That is a product decision, not an afterthought.</p>",
    published: false,
    featured: false,
    author: "sophia.lee",
    createdAt: "2025-02-05T08:10:00.000Z",
    publishedAt: null,
  },
  {
    title: "Understanding Data Structures Before Building Systems",
    content:
      "<h2>Good systems start with good shapes</h2><p>Applications and APIs often fail not because the code is long, but because the data model is too loose. A weak choice of structure makes later changes harder and more expensive.</p><p>Arrays, maps, trees, and queues are not theoretical. They are practical tools that improve processing logic, performance, and maintainability in a production context.</p><p>Data structures are part of product design.</p>",
    published: true,
    featured: false,
    author: "noah.price",
    createdAt: "2024-12-07T09:10:00.000Z",
    publishedAt: "2024-12-08T08:30:00.000Z",
  },
  {
    title: "Algorithm Trade-Offs in Real Applications",
    content:
      "<h2>There is no universal fast algorithm</h2><p>Different problems need different solutions. Sorting, searching, and graph traversal each have trade-offs depending on data size, access patterns, and memory constraints.</p><p>Good engineering decisions come from understanding the cost model: time complexity, space complexity, and whether the data is static or frequently changing.</p><p>That is how we avoid writing elegant solutions that do not scale.</p>",
    published: true,
    featured: false,
    author: "noah.price",
    createdAt: "2024-11-03T16:05:00.000Z",
    publishedAt: "2024-11-04T07:40:00.000Z",
  },
  {
    title: "Secure API Design for Public Applications",
    content:
      "<h2>Security decisions must be visible</h2><p>Public APIs are attacked in predictable ways: credential stuffing, injection attempts, authorization bypass, and abuse of expensive endpoints.</p><p>Good secure API design includes rate limiting, strict validation, audit logs, and simpler permission boundaries. It also means accepting that no endpoint is “safe” unless the surrounding system is equally protected.</p><p>Security is not a perfect state; it is a set of enforced habits.</p>",
    published: true,
    featured: true,
    author: "noah.price",
    createdAt: "2024-10-16T11:45:00.000Z",
    publishedAt: "2024-10-17T10:10:00.000Z",
  },
  {
    title: "Working with Prisma Transactions",
    content:
      "<h2>Transactions protect invariants</h2><p>Transactions are essential when a single business action touches multiple tables. This is especially important for order systems or approval flows where partial writes can create inconsistent state.</p><p>Prisma makes the code easier to read, but the real benefit is the invariant you preserve. If all steps succeed together, the state is valid. If any step fails, you revert the operation.</p><p>Healthy systems rely on these boundaries.</p>",
    published: true,
    featured: false,
    author: "noah.price",
    createdAt: "2024-09-20T15:20:00.000Z",
    publishedAt: "2024-09-21T07:15:00.000Z",
  },
  {
    title: "Common Mistakes in Express Route Design",
    content:
      "<h2>Smaller endpoints are easier to maintain</h2><p>Express route files often grow too quickly and start mixing unrelated concerns. That becomes a problem when teams need to debug a route and end up reading a giant function with validation, database access, and business logic all together.</p><p>Breaking routes into smaller responsibilities makes the app easier to review and easier to evolve. In other words, route design should model the system’s intent.</p><p>The cleanest route files are the ones that are easy to skip over quickly.</p>",
    published: true,
    featured: false,
    author: "noah.price",
    createdAt: "2024-08-27T09:40:00.000Z",
    publishedAt: "2024-08-28T06:30:00.000Z",
  },
  {
    title: "Frontend vs Backend Validation: Who Owns What?",
    content:
      "<h2>The best validation is layered</h2><p>Frontend validation improves UX and prevents obvious errors, but it cannot be the only line of defense. The backend must validate all inbound data because the client is not the security boundary.</p><p>That is why the best apps use layered validation: friendly feedback in the UI, strict rules in the server, and explicit error handling in the API layer.</p><p>Good validation is more than a form checklist.</p>",
    published: true,
    featured: false,
    author: "noah.price",
    createdAt: "2025-02-01T12:00:00.000Z",
    publishedAt: "2025-02-02T13:35:00.000Z",
  },
  {
    title: "How to Write Better Status Codes",
    content:
      "<h2>HTTP semantics are part of the API contract</h2><p>Status codes work best when they reflect the actual result. A validation error should not look like a server failure, and a missing record should not masquerade as a permission problem.</p><p>Strong API contracts use status codes as a signal to the client. This reduces ambiguity and helps both the frontend and backend respond consistently.</p><p>That clarity is part of developer experience, too.</p>",
    published: false,
    featured: false,
    author: "noah.price",
    createdAt: "2025-02-09T18:20:00.000Z",
    publishedAt: null,
  },
  {
    title: "Building Better Search Experiences",
    content:
      "<h2>Search should feel relevant, not random</h2><p>Users expect search to be helpful, which means relevance matters just as much as matching. Search systems need a sense of ranking, filters, and context around the query.</p><p>Even a basic search feature can be much more effective when it is built around real user tasks. Small improvements in indexing and ranking can have a large impact on discoverability.</p><p>Search is not just a lookup tool; it is a product decision.</p>",
    published: true,
    featured: false,
    author: "clara.fernandez",
    createdAt: "2024-12-18T08:25:00.000Z",
    publishedAt: "2024-12-19T10:10:00.000Z",
  },
  {
    title: "The Value of Small, Reusable UI Components",
    content:
      "<h2>Composition beats repetition</h2><p>UI work becomes much easier when the interface is built from a small set of reusable components. A button, modal, card, or status chip might look small on its own, but those repeated patterns reduce inconsistency.</p><p>When component primitives are consistent, the product grows faster and becomes easier to reason about. That is especially useful when multiple contributors work on the same frontend.</p><p>Reusable components are not just about style; they protect behavior too.</p>",
    published: true,
    featured: false,
    author: "clara.fernandez",
    createdAt: "2024-11-05T14:25:00.000Z",
    publishedAt: "2024-11-06T09:40:00.000Z",
  },
  {
    title: "Testing the Right Things in a Backend App",
    content:
      "<h2>Not every test is equally valuable</h2><p>Teams often spend too much effort on superficial tests rather than the behaviors that matter. A backend app needs tests that protect critical invariant changes: auth, permission flows, and data integrity rules.</p><p>Small, direct tests around edge cases are often more valuable than broad snapshots of entire controllers. They are easier to maintain and do a better job of preventing regressions.</p><p>Testing is a signal of trust, not decoration.</p>",
    published: true,
    featured: false,
    author: "clara.fernandez",
    createdAt: "2024-10-01T13:40:00.000Z",
    publishedAt: "2024-10-02T08:20:00.000Z",
  },
  {
    title: "How to Manage Long-Lived API Tokens Safely",
    content:
      "<h2>Token lifecycle should be deliberate</h2><p>When apps rely on long-lived credentials, the risks rise quickly. A token can be copied, logged, or rotated incorrectly without the team noticing.</p><p>Safe systems prefer short-lived access tokens and pin the refresh flow to a clear, revocable lifecycle. That makes revocation, rotation, and recovery much easier.</p><p>Token security is as much about lifecycle discipline as it is about encryption.</p>",
    published: true,
    featured: false,
    author: "clara.fernandez",
    createdAt: "2024-09-14T10:15:00.000Z",
    publishedAt: "2024-09-15T09:55:00.000Z",
  },
  {
    title: "Performance Budgeting for a Growing Frontend",
    content:
      "<h2>Performance is a product constraint</h2><p>Fast interfaces are not only a matter of hardware. They also reflect the way the app is structured and how much work it does before the user sees useful content.</p><p>Teams often improve performance by reducing re-renders, trimming dependencies, and making async flows more predictable. Over time, a small set of these decisions compounds into a much better UX.</p><p>Performance is a habit, not a single optimization.</p>",
    published: true,
    featured: true,
    author: "clara.fernandez",
    createdAt: "2024-08-24T18:00:00.000Z",
    publishedAt: "2024-08-25T08:10:00.000Z",
  },
  {
    title: "Why Content Models Need Clear Ownership",
    content:
      "<h2>Ownership reduces ambiguity</h2><p>Content systems usually work best when each content type has a clear owner. That owner is responsible for editing rules, publication pipeline, and the business logic tied to the content.</p><p>This makes operations easier, especially as the app grows. There is less confusion about which team should review a draft, which users can publish it, and which content is active.</p><p>Ownership is a product and technical edge case that pays off quickly.</p>",
    published: false,
    featured: false,
    author: "clara.fernandez",
    createdAt: "2025-02-11T12:30:00.000Z",
    publishedAt: null,
  },
  {
    title: "Scaling a Blog With Real Content Needs",
    content:
      "<h2>Blog systems need more than a post editor</h2><p>A growing blog demands pagination, filtering, moderation workflows, and a clear understanding of who can publish what. Without that structure, the content experience quickly becomes messy.</p><p>When these concerns are treated as real product features, the platform becomes easier to maintain and easier to use. That is what turns a basic CMS into a durable content platform.</p><p>Design for publication, discovery, and review from the beginning.</p>",
    published: true,
    featured: false,
    author: "clara.fernandez",
    createdAt: "2024-10-25T13:35:00.000Z",
    publishedAt: "2024-10-26T13:55:00.000Z",
  },
  {
    title: "Architecture Decisions That Age Well",
    content:
      "<h2>Architecture should reduce future friction</h2><p>Systems change over time. The best architecture choices are the ones that leave room for extra features, cleaner refactors, and easier debugging when the app matures.</p><p>That often means favoring separation of concerns, explicit boundaries, and slower but more deliberate expansion. It is less exciting than flying by the seat of your pants, but it ages better.</p><p>Healthy engineering is usually boring in the right way.</p>",
    published: true,
    featured: false,
    author: "clara.fernandez",
    createdAt: "2024-12-09T08:15:00.000Z",
    publishedAt: "2024-12-10T10:00:00.000Z",
  },
];
