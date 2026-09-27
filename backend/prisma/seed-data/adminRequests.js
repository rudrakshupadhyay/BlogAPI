// backend/prisma/seed-data/adminRequests.js
export const adminRequestsSeedData = [
  {
    user: "nina.ross",
    reason:
      "I want to manage content publishing and review workflows for the editorial team.",
    genre: "backend",
    status: "APPROVED",
    createdAt: "2024-12-01T09:00:00.000Z",
    expiresAt: "2024-12-08T09:00:00.000Z",
  },
  {
    user: "ava.morgan",
    reason:
      "I would like to help moderate posts and approve publication changes across the blog.",
    genre: "content",
    status: "APPROVED",
    createdAt: "2024-12-02T14:00:00.000Z",
    expiresAt: "2024-12-09T14:00:00.000Z",
  },
  {
    user: "liam.hughes",
    reason:
      "I need admin access to manage dashboard metrics and moderation queues.",
    genre: "admin",
    status: "APPROVED",
    createdAt: "2024-12-03T10:15:00.000Z",
    expiresAt: "2024-12-10T10:15:00.000Z",
  },
  {
    user: "sophia.lee",
    reason:
      "I want to help manage publishing and content review without affecting reader permissions.",
    genre: "content",
    status: "APPROVED",
    createdAt: "2024-12-04T16:20:00.000Z",
    expiresAt: "2024-12-11T16:20:00.000Z",
  },
  {
    user: "noah.price",
    reason:
      "I need access to review and maintain posts for backend engineering topics and security guidance.",
    genre: "backend",
    status: "APPROVED",
    createdAt: "2024-12-05T12:40:00.000Z",
    expiresAt: "2024-12-12T12:40:00.000Z",
  },
  {
    user: "clara.fernandez",
    reason:
      "I would like admin access to help publish frontend and product content with better review flow.",
    genre: "frontend",
    status: "APPROVED",
    createdAt: "2024-12-06T11:10:00.000Z",
    expiresAt: "2024-12-13T11:10:00.000Z",
  },

  {
    user: "emma.garcia",
    reason:
      "I want to contribute more to article review, especially around frontend best practices and accessibility.",
    genre: "frontend",
    status: "PENDING",
    createdAt: "2025-01-12T08:30:00.000Z",
    expiresAt: "2025-01-19T08:30:00.000Z",
  },
  {
    user: "david.nguyen",
    reason:
      "I am interested in helping review content and approve posts that align with engineering standards.",
    genre: "backend",
    status: "PENDING",
    createdAt: "2025-01-13T15:40:00.000Z",
    expiresAt: "2025-01-20T15:40:00.000Z",
  },
  {
    user: "michael.patel",
    reason:
      "I would like to help moderate comments and support content quality checks for the blog.",
    genre: "community",
    status: "PENDING",
    createdAt: "2025-01-14T09:50:00.000Z",
    expiresAt: "2025-01-21T09:50:00.000Z",
  },
  {
    user: "olivia.brown",
    reason:
      "I want the ability to manage editorial review and help with the publishing workflow.",
    genre: "content",
    status: "PENDING",
    createdAt: "2025-01-15T13:20:00.000Z",
    expiresAt: "2025-01-22T13:20:00.000Z",
  },

  {
    user: "jordan.wilson",
    reason:
      "I am applying to help with moderator tooling and public-facing content approvals.",
    genre: "community",
    status: "REJECTED",
    createdAt: "2025-01-07T11:00:00.000Z",
    expiresAt: "2025-01-14T11:00:00.000Z",
  },
  {
    user: "zoe.miller",
    reason:
      "I would like to participate in content review and help assess article quality.",
    genre: "content",
    status: "REJECTED",
    createdAt: "2025-01-08T09:20:00.000Z",
    expiresAt: "2025-01-15T09:20:00.000Z",
  },
];
