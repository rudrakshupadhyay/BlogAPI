// backend/prisma/seed-functions/seedComments.js
import { prisma } from "../../lib/prisma.js";
import { commentsSeedData } from "../seed-data/comments.js";

export async function seedComments() {
  const users = await prisma.user.findMany({
    select: { id: true, username: true },
  });

  const userMap = new Map(users.map((user) => [user.username, user.id]));

  const posts = await prisma.post.findMany({
    select: { id: true, title: true },
  });

  const postMap = new Map(posts.map((post) => [post.title, post.id]));

  let createdCount = 0;

  for (const comment of commentsSeedData) {
    const postId = postMap.get(comment.postTitle);
    const authorId = userMap.get(comment.author);

    if (!postId || !authorId) {
      console.warn(
        `Skipping comment for "${comment.postTitle}" by "${comment.author}" due to missing user or post.`,
      );
      continue;
    }

    const existingComment = await prisma.comment.findFirst({
      where: {
        postId,
        authorId,
        content: comment.content,
      },
    });

    if (existingComment) {
      continue;
    }

    await prisma.comment.create({
      data: {
        content: comment.content,
        postId,
        authorId,
        createdAt: new Date(comment.createdAt),
        updatedAt: new Date(comment.createdAt),
      },
    });

    createdCount += 1;
  }

  console.log(`Seeded comments: ${createdCount} created.`);
  return true;
}
