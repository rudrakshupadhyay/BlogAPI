import { prisma } from "../../lib/prisma.js";

export async function getPublishedPosts(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);

    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);

    const skip = (page - 1) * limit;

    const search = req.query.search?.trim();

    const where = {
      published: true,
    };

    if (search) {
      where.title = {
        contains: search,
      };
    }

    const [posts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          publishedAt: "desc",
        },
        include: {
          author: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),

      prisma.post.count({
        where,
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

export async function getPostBySlug(req, res) {
  try {
    const { slug } = req.params;

    const post = await prisma.post.findUnique({
      where: {
        slug: slug,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.status(200).json({
      post,
    });
  } catch (error) {
    console.error("Error fetching post by slug:", error);

    res.status(500).json({
      message: "Failed to fetch post",
    });
  }
}
