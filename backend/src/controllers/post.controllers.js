import { prisma } from "../../lib/prisma.js";
import { validatePost } from "../utils/validate.js";
import { validationResult, matchedData } from "express-validator";
import generateUniqueSlug from "../utils/generateSlug.js";

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
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
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

export const createPost = [
  ...validatePost,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, content, published, featured } = matchedData(req);

    try {
      const post = await prisma.post.create({
        data: {
          title,
          content,
          slug: await generateUniqueSlug(title),
          published,
          featured,
          authorId: req.user.id,
          publishedAt: published ? new Date() : null,
        },
      });

      res.status(201).json({
        post,
      });
    } catch (error) {
      console.error("Error creating post:", error);

      res.status(500).json({
        message: "Failed to create post",
      });
    }
  },
];

export async function deletePostBySlug(req, res) {
  try {
    const { slug } = req.params;
    const post = await prisma.post.findUnique({
      where: { slug },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newPost = await prisma.post.delete({
      where: { slug },
    });

    res.status(200).json({
      post: newPost,
    });
  } catch (error) {
    console.error("Error deleting post by slug:", error);

    res.status(500).json({
      message: "Failed to delete post",
    });
  }
}

export const updatePostBySlug = [
  ...validatePost,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { slug } = req.params;
    const { title, content, published, featured } = matchedData(req);
    try {
      const post = await prisma.post.findUnique({
        where: { slug },
      });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const updatedPost = await prisma.post.update({
        where: { slug },
        data: {
          title,
          content,
          published,
          featured,
        },
      });

      res.status(200).json({ post: updatedPost });
    } catch (error) {
      console.error("Error updating post by slug:", error);
      res.status(500).json({ message: "Failed to update post" });
    }
  },
];

export async function getMyPosts(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);

    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);

    const skip = (page - 1) * limit;

    const status = req.query.status;

    const where = {
      authorId: req.user.id,
    };

    if (status === "published") {
      where.published = true;
    }

    if (status === "unpublished") {
      where.published = false;
    }

    const [posts, totalPosts] = await Promise.all([
      prisma.post.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          updatedAt: "desc",
        },
      }),

      prisma.post.count({
        where,
      }),
    ]);

    const totalPages = Math.ceil(totalPosts / limit);

    return res.status(200).json({
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
    console.error("Error fetching user's posts:", error);

    return res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
}

export async function getMyPostsStatistics(req, res) {
  try {
    const where = {
      authorId: req.user.id,
    };

    const [publishedCount, unpublishedCount] = await Promise.all([
      prisma.post.count({
        where: {
          ...where,
          published: true,
        },
      }),
      prisma.post.count({
        where: {
          ...where,
          published: false,
        },
      }),
    ]);

    return res.status(200).json({
      published: publishedCount,
      unpublished: unpublishedCount,
      total: publishedCount + unpublishedCount,
    });
  } catch (error) {
    console.error("Error fetching user's posts statistics:", error);

    return res.status(500).json({
      message: "Failed to fetch posts statistics",
    });
  }
}

export async function getMyFeaturedPosts(req, res) {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit) || 10, 1), 50);
    const skip = (page - 1) * limit;

    const [featuredPosts, totalFeaturedPosts] = await Promise.all([
      prisma.post.findMany({
        where: {
          authorId: req.user.id,
          featured: true,
        },
        skip,
        take: limit,
        orderBy: {
          updatedAt: "desc",
        },
      }),

      prisma.post.count({
        where: {
          authorId: req.user.id,
          featured: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(totalFeaturedPosts / limit);

    return res.status(200).json({
      posts: featuredPosts,
      pagination: {
        page,
        limit,
        totalPosts: totalFeaturedPosts,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
    
  } catch (error) {
    console.error("Error fetching user's featured posts:", error);

    return res.status(500).json({
      message: "Failed to fetch featured posts",
    });
  }
}
