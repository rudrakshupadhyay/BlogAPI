// backend/prisma/seed-data/comments.js
export const commentsSeedData = [
  {
    postTitle: "Authentication Patterns for Modern Frontends",
    author: "emma.garcia",
    content:
      "This is a helpful outline for frontend auth. I especially agree with keeping token lifetimes small.",
    createdAt: "2024-12-06T09:12:00.000Z",
  },
  {
    postTitle: "Authentication Patterns for Modern Frontends",
    author: "michael.patel",
    content:
      "The distinction between protecting routes and protecting actions is very relevant for real apps.",
    createdAt: "2024-12-07T11:04:00.000Z",
  },
  {
    postTitle: "Authentication Patterns for Modern Frontends",
    author: "zoe.miller",
    content: "Refresh token rotation is still underrated in many teams.",
    createdAt: "2024-12-08T15:42:00.000Z",
  },

  {
    postTitle: "Designing a Healthy API Error Contract",
    author: "david.nguyen",
    content:
      "I like the idea of a predictable error schema. It makes the frontend logic much cleaner.",
    createdAt: "2024-11-14T08:10:00.000Z",
  },
  {
    postTitle: "Designing a Healthy API Error Contract",
    author: "jordan.wilson",
    content:
      "This is exactly the kind of API design guidance that saves time during debugging.",
    createdAt: "2024-11-15T10:45:00.000Z",
  },

  {
    postTitle: "Why Database Indexes Matter More Than You Think",
    author: "grace.chen",
    content:
      "The reminder to measure real workload patterns is important. Indexing for assumptions is dangerous.",
    createdAt: "2024-10-20T12:00:00.000Z",
  },
  {
    postTitle: "Why Database Indexes Matter More Than You Think",
    author: "ryan.davis",
    content:
      "I had to learn this the hard way when writes got slower after a bad composite index.",
    createdAt: "2024-10-21T09:30:00.000Z",
  },

  {
    postTitle: "Pagination Without Losing User Context",
    author: "olivia.brown",
    content:
      "This is an excellent callout about anchors and stable ordering in feeds.",
    createdAt: "2024-09-30T14:05:00.000Z",
  },
  {
    postTitle: "Pagination Without Losing User Context",
    author: "avery.young",
    content:
      "Cursor pagination is much more user-friendly when your content is frequently changing.",
    createdAt: "2024-10-01T11:40:00.000Z",
  },

  {
    postTitle: "Express Middleware Patterns That Scale",
    author: "mia.hall",
    content:
      "Middleware is a great place to keep security and request context concerns isolated.",
    createdAt: "2024-12-14T08:00:00.000Z",
  },
  {
    postTitle: "Express Middleware Patterns That Scale",
    author: "logan.phillips",
    content:
      "I appreciate the “isolate concerns” framing. It is easy to mix too much into a single middleware layer.",
    createdAt: "2024-12-14T16:20:00.000Z",
  },

  {
    postTitle: "Understanding JWT Claims and Boundaries",
    author: "samantha.ward",
    content: "The token is only as good as the claims validation around it.",
    createdAt: "2024-11-24T10:05:00.000Z",
  },
  {
    postTitle: "Understanding JWT Claims and Boundaries",
    author: "benjamin.hill",
    content: "Audience + expiry + role checks really matter here.",
    createdAt: "2024-11-25T12:10:00.000Z",
  },

  {
    postTitle: "Prisma Tips for Safer Query Design",
    author: "charlie.ross",
    content:
      "Good reminder that Prisma does not remove the need for careful business assumptions.",
    createdAt: "2024-09-10T14:30:00.000Z",
  },

  {
    postTitle: "How to Structure a Request Validation Layer",
    author: "maya.perez",
    content:
      "This is the type of defensive backend work that pays off during production incidents.",
    createdAt: "2025-01-04T09:50:00.000Z",
  },
  {
    postTitle: "How to Structure a Request Validation Layer",
    author: "isabella.jackson",
    content:
      "Validation should be a product feature, not just a backend utility.",
    createdAt: "2025-01-05T13:20:00.000Z",
  },

  {
    postTitle: "Writing Clean Controllers in Node.js",
    author: "hannah.thomas",
    content: "This post makes the controller boundary feel much clearer.",
    createdAt: "2024-12-30T07:45:00.000Z",
  },
  {
    postTitle: "Writing Clean Controllers in Node.js",
    author: "nathan.cooper",
    content:
      "I agree that controllers should orchestrate, not absorb domain logic.",
    createdAt: "2024-12-31T17:15:00.000Z",
  },

  {
    postTitle: "REST APIs That Feel Predictable",
    author: "emma.garcia",
    content:
      "Predictability is one of the biggest hidden levers in API quality.",
    createdAt: "2024-11-19T11:20:00.000Z",
  },
  {
    postTitle: "REST APIs That Feel Predictable",
    author: "michael.patel",
    content:
      "Documentation and stable payloads really matter to frontend teams.",
    createdAt: "2024-11-20T08:35:00.000Z",
  },

  {
    postTitle: "When to Use Cursor Pagination in a Feed",
    author: "zoe.miller",
    content:
      "This is a good explanation of why offset pagination can make feeds feel chaotic.",
    createdAt: "2024-10-27T09:55:00.000Z",
  },
  {
    postTitle: "When to Use Cursor Pagination in a Feed",
    author: "grace.chen",
    content:
      "Feeds are one of those places where stable ordering matters a lot.",
    createdAt: "2024-10-28T18:10:00.000Z",
  },

  {
    postTitle: "Handling File Uploads Without Security Bugs",
    author: "david.nguyen",
    content:
      "This is exactly the kind of upload policy we need in production apps.",
    createdAt: "2024-09-25T10:00:00.000Z",
  },

  {
    postTitle: "What Makes React State Hard to Debug",
    author: "olivia.brown",
    content:
      "This is so true: state updates are rarely as simple as the UI suggests.",
    createdAt: "2024-11-11T15:40:00.000Z",
  },
  {
    postTitle: "What Makes React State Hard to Debug",
    author: "jordan.wilson",
    content:
      "I appreciate the reminder that async state and loading flags should be separated.",
    createdAt: "2024-11-12T14:20:00.000Z",
  },

  {
    postTitle: "Designing a Better Admin Dashboard",
    author: "emma.garcia",
    content:
      "The dashboard point is excellent. Data without context is just noise.",
    createdAt: "2024-08-20T09:05:00.000Z",
  },
  {
    postTitle: "Designing a Better Admin Dashboard",
    author: "charlie.ross",
    content: "Trends and actions are what make dashboards useful.",
    createdAt: "2024-08-21T12:25:00.000Z",
  },

  {
    postTitle: "Git Workflows for Collaborative Teams",
    author: "maya.perez",
    content:
      "Strong branch policies make teams much more confident when shipping.",
    createdAt: "2024-12-17T09:30:00.000Z",
  },
  {
    postTitle: "Git Workflows for Collaborative Teams",
    author: "henry.moore",
    content:
      "Good teams almost always get branch strategy right before they automate too much.",
    createdAt: "2024-12-18T16:05:00.000Z",
  },

  {
    postTitle: "Shipping with Confidence in Node.js",
    author: "lucas.white",
    content:
      "Confidence really does come from repeatability and observability.",
    createdAt: "2024-12-01T10:15:00.000Z",
  },
  {
    postTitle: "Shipping with Confidence in Node.js",
    author: "ella.green",
    content:
      "This is a good reminder that deployment is partly operational design.",
    createdAt: "2024-12-02T08:40:00.000Z",
  },

  {
    postTitle: "Designing a Safer Authorization Model",
    author: "james.baker",
    content:
      "Strong permission boundaries are still the most underappreciated part of backend design.",
    createdAt: "2024-10-12T13:00:00.000Z",
  },
  {
    postTitle: "Designing a Safer Authorization Model",
    author: "avery.young",
    content:
      "This is a useful framing: authorization is a policy, not just a check.",
    createdAt: "2024-10-13T07:55:00.000Z",
  },

  {
    postTitle: "Why Feature Flags Help Product Teams",
    author: "samantha.ward",
    content:
      "Feature toggles make experimentation much less risky if the rollout is disciplined.",
    createdAt: "2024-09-15T11:45:00.000Z",
  },

  {
    postTitle: "Monitoring a Node API in Production",
    author: "benjamin.hill",
    content:
      "Metrics and traces are a big part of making production debugging sane.",
    createdAt: "2025-01-11T21:10:00.000Z",
  },
  {
    postTitle: "Monitoring a Node API in Production",
    author: "nathan.cooper",
    content:
      "This is a good reminder to measure both error rate and latency together.",
    createdAt: "2025-01-12T09:45:00.000Z",
  },

  {
    postTitle: "Understanding Data Structures Before Building Systems",
    author: "mia.hall",
    content:
      "This is a practical reminder that underlying structures matter more than most engineers realize.",
    createdAt: "2024-12-09T10:20:00.000Z",
  },
  {
    postTitle: "Understanding Data Structures Before Building Systems",
    author: "logan.phillips",
    content: "Good systems have clear data shapes from the start.",
    createdAt: "2024-12-10T14:35:00.000Z",
  },

  {
    postTitle: "Algorithm Trade-Offs in Real Applications",
    author: "grace.chen",
    content:
      "This is a great callout about the cost model behind algorithm choices.",
    createdAt: "2024-11-05T17:10:00.000Z",
  },
  {
    postTitle: "Algorithm Trade-Offs in Real Applications",
    author: "ryan.davis",
    content:
      "It is easy to over-optimize for elegance and under-optimize for actual data size.",
    createdAt: "2024-11-06T12:55:00.000Z",
  },

  {
    postTitle: "Secure API Design for Public Applications",
    author: "olivia.brown",
    content:
      "The idea of security as a set of enforced habits is extremely practical.",
    createdAt: "2024-10-18T16:25:00.000Z",
  },
  {
    postTitle: "Secure API Design for Public Applications",
    author: "jordan.wilson",
    content:
      "Rate limiting and authorization boundaries matter as much as encryption.",
    createdAt: "2024-10-19T08:15:00.000Z",
  },

  {
    postTitle: "Working with Prisma Transactions",
    author: "hannah.thomas",
    content: "Transaction design is the clearest way to protect invariants.",
    createdAt: "2024-09-22T07:50:00.000Z",
  },
  {
    postTitle: "Working with Prisma Transactions",
    author: "samantha.ward",
    content: "This is a strong argument for explicit database boundaries.",
    createdAt: "2024-09-23T13:20:00.000Z",
  },

  {
    postTitle: "Common Mistakes in Express Route Design",
    author: "charlie.ross",
    content:
      "The route growth problem is very real in apps that start with one file and become sprawling fast.",
    createdAt: "2024-08-29T10:15:00.000Z",
  },

  {
    postTitle: "Frontend vs Backend Validation: Who Owns What?",
    author: "maya.perez",
    content:
      "This distinction is essential and too often skipped in course material.",
    createdAt: "2025-02-03T12:05:00.000Z",
  },
  {
    postTitle: "Frontend vs Backend Validation: Who Owns What?",
    author: "isabella.jackson",
    content: "Validation is layered: UX first, enforcement second.",
    createdAt: "2025-02-04T16:45:00.000Z",
  },

  {
    postTitle: "Building Better Search Experiences",
    author: "emma.garcia",
    content: "A good search experience is as much about ranking as matching.",
    createdAt: "2024-12-20T11:30:00.000Z",
  },

  {
    postTitle: "The Value of Small, Reusable UI Components",
    author: "david.nguyen",
    content: "The consistency argument is very strong for long-lived apps.",
    createdAt: "2024-11-07T13:25:00.000Z",
  },
  {
    postTitle: "The Value of Small, Reusable UI Components",
    author: "zoe.miller",
    content: "Component composition really does reduce churn over time.",
    createdAt: "2024-11-08T09:35:00.000Z",
  },

  {
    postTitle: "Testing the Right Things in a Backend App",
    author: "michael.patel",
    content: "This is the best reminder I have seen for test hygiene lately.",
    createdAt: "2024-10-03T18:45:00.000Z",
  },
  {
    postTitle: "Testing the Right Things in a Backend App",
    author: "james.baker",
    content: "Broad tests are nice, but the behavior tests matter more.",
    createdAt: "2024-10-04T08:10:00.000Z",
  },

  {
    postTitle: "How to Manage Long-Lived API Tokens Safely",
    author: "olivia.brown",
    content:
      "This is a good argument for short-lived access tokens and rotation.",
    createdAt: "2024-09-16T10:40:00.000Z",
  },

  {
    postTitle: "Performance Budgeting for a Growing Frontend",
    author: "lucas.white",
    content: "This is a useful product lens on frontend performance.",
    createdAt: "2024-08-26T13:45:00.000Z",
  },
  {
    postTitle: "Performance Budgeting for a Growing Frontend",
    author: "ella.green",
    content: "The “performance is a habit” framing is memorable and accurate.",
    createdAt: "2024-08-27T12:20:00.000Z",
  },

  {
    postTitle: "Why Content Models Need Clear Ownership",
    author: "nathan.cooper",
    content: "This makes sense for editorial flows and role boundaries.",
    createdAt: "2025-02-12T14:10:00.000Z",
  },

  {
    postTitle: "Scaling a Blog With Real Content Needs",
    author: "mia.hall",
    content:
      "A blog is not just writing; it is also access control and discovery.",
    createdAt: "2024-10-28T10:50:00.000Z",
  },
  {
    postTitle: "Scaling a Blog With Real Content Needs",
    author: "logan.phillips",
    content:
      "This is exactly what makes a CMS feel useful beyond a basic editor.",
    createdAt: "2024-10-29T09:15:00.000Z",
  },

  {
    postTitle: "Architecture Decisions That Age Well",
    author: "grace.chen",
    content:
      "A healthy system should reduce friction over time, not increase it.",
    createdAt: "2024-12-11T15:20:00.000Z",
  },
];
