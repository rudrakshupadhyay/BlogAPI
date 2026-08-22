import { prisma } from "../../lib/prisma.js";

export async function getPublishedPosts(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);

    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);

    const skip = (page - 1) * limit;

    const [posts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        where: {
          published: true,
        },
        skip,
        take: limit,
        orderBy: {
          publishedAt: "desc",
        },
      }),

      prisma.post.count({
        where: {
          published: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalPosts / limit);

    res.status(200).json({
      posts,
      pagination: {
        page,
        limit,
        totalPosts,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("Error fetching published posts:", error);

    res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
}
