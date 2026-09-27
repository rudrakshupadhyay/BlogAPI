// backend/prisma/seed.js
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import config from "../src/config/config.js";
import { seedUsers } from "./seed-functions/seedUsers.js";
import { seedPosts } from "./seed-functions/seedPosts.js";
import { seedComments } from "./seed-functions/seedComments.js";
import { seedAdminRequests } from "./seed-functions/seedAdminRequests.js";

async function main() {
  const passwordHash = await bcrypt.hash(config.ADMIN_PASSWORD, 10);

  const owner = await prisma.user.upsert({
    where: { username: "owner.alex" },
    update: { name: "Alex Morgan", password: passwordHash, role: "OWNER" },
    create: {
      username: "owner.alex",
      name: "Alex Morgan",
      password: passwordHash,
      role: "OWNER",
    },
  });

  await seedUsers();
  await seedPosts();
  await seedComments();
  await seedAdminRequests();

  console.log("Database seed completed successfully.");
  console.log(`Owner exists: ${owner.username}`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
