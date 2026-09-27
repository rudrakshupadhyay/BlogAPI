// backend/prisma/seed-functions/seedAdminRequests.js
import { prisma } from "../../lib/prisma.js";
import { adminRequestsSeedData } from "../seed-data/adminRequests.js";

export async function seedAdminRequests() {
  const users = await prisma.user.findMany({
    select: { id: true, username: true },
  });

  const userMap = new Map(users.map((user) => [user.username, user.id]));

  let createdCount = 0;

  for (const request of adminRequestsSeedData) {
    const userId = userMap.get(request.user);

    if (!userId) {
      console.warn(
        `Skipping admin request for "${request.user}" because the user was not found.`,
      );
      continue;
    }

    const existingRequest = await prisma.adminRequest.findFirst({
      where: {
        userId,
        reason: request.reason,
        status: request.status,
        genre: request.genre ?? null,
      },
    });

    if (existingRequest) {
      continue;
    }

    await prisma.adminRequest.create({
      data: {
        userId,
        reason: request.reason,
        genre: request.genre ?? null,
        status: request.status,
        createdAt: new Date(request.createdAt),
        updatedAt: new Date(request.createdAt),
        expiresAt: request.expiresAt ? new Date(request.expiresAt) : null,
      },
    });

    createdCount += 1;
  }

  console.log(`Seeded admin requests: ${createdCount} created.`);
  return true;
}
