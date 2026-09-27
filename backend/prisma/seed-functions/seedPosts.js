// backend/prisma/seed-functions/seedPosts.js
import { prisma } from "../../lib/prisma.js";
import generateUniqueSlug from "../../src/utils/generateSlug.js";
import { postsSeedData } from "../seed-data/posts.js";

export async function seedPosts() {
  const users = await prisma.user.findMany({
    select: { id: true, username: true },
  });

  const userMap = new Map(users.map((user) => [user.username, user.id]));

  let createdCount = 0;

  for (const post of postsSeedData) {
    const authorId = userMap.get(post.author);

    if (!authorId) {
      console.warn(
        `Skipping post "${post.title}" because author "${post.author}" was not found.`,
      );
      continue;
    }

    const slug = await generateUniqueSlug(post.title);

    const existingPost = await prisma.post.findUnique({
      where: { slug },
    });

    if (existingPost) {
      continue;
    }

    await prisma.post.create({
      data: {
        title: post.title,
        content: post.content,
        slug,
        published: post.published,
        featured: post.featured,
        authorId,
        createdAt: new Date(post.createdAt),
        updatedAt: new Date(post.createdAt),
        publishedAt:
          post.published && post.publishedAt
            ? new Date(post.publishedAt)
            : null,
      },
    });

    createdCount += 1;
  }

  console.log(`Seeded posts: ${createdCount} created.`);
  return true;
}
