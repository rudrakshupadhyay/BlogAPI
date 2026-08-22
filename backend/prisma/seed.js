import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import config from "../src/config/config.js";
import posts from "./samplePosts.js";
async function main() {
  const password = await bcrypt.hash(config.ADMIN_PASSWORD, 10);

  const admin = await prisma.user.create({
    data: {
      username: "admin",
      name: "Admin User",
      password,
      roles: "admin",
    },
  });

  const user = await prisma.user.create({
    data: {
      username: "john",
      name: "John Doe",
      password,
      roles: "reader",
    },
  });
  
  let createdPostId;

  for (const post of posts) {
    const createdPost = await prisma.post.create({
      data: {
        ...post,
        publishedAt: post.published ? new Date() : null,
        authorId: admin.id,
      },
    });

    if (!createdPostId) {
      createdPostId = createdPost.id;
    }
  }

  await prisma.comment.create({
    data: {
      content: "Great post!",
      postId: createdPostId,
      authorId: user.id,
    },
  });
  console.log("Database seeded successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
