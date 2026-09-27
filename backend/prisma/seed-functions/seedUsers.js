// backend/prisma/seed-functions/seedUsers.js
import bcrypt from "bcrypt";
import { prisma } from "../../lib/prisma.js";
import config from "../../src/config/config.js";
import { usersSeedData } from "../seed-data/users.js";

export async function seedUsers() {
  const adminPasswordHash = await bcrypt.hash(config.ADMIN_PASSWORD, 10);
  const readerPasswordHash = await bcrypt.hash(config.READER_PASSWORD, 10);

  let createdCount = 0;

  for (const user of usersSeedData) {
    const passwordHash =
      user.role === "READER" ? readerPasswordHash : adminPasswordHash;

    const existingUser = await prisma.user.findUnique({
      where: { username: user.username },
    });

    if (existingUser) {
      await prisma.user.update({
        where: { username: user.username },
        data: {
          name: user.name,
          role: user.role,
          password: passwordHash,
        },
      });
      continue;
    }

    await prisma.user.create({
      data: {
        username: user.username,
        name: user.name,
        role: user.role,
        password: passwordHash,
      },
    });

    createdCount += 1;
  }

  console.log(
    `Seeded users: ${createdCount} created; existing users were updated safely.`,
  );
  return true;
}
