import { prisma } from "../../lib/prisma.js";

export async function createComment(req, res) {
  const content = req.body.content;
  const postId = req.params.postId;
  const authorId = req.user.id;
  const comment = await prisma.comment.create({
    data: {
      content,
      postId,
      authorId,
    },
  });
  res.status(201).json(comment);
}
