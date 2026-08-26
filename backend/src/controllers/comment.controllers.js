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

export async function deleteComment(req, res) {
  const commentId = req.params.commentId;
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  await prisma.comment.delete({
    where: { id: commentId },
  });
  res.status(200).json({ message: "Comment deleted successfully" });
}
