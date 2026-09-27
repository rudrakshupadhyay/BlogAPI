import { prisma } from "../../lib/prisma.js";
import { validateComment } from "../utils/validate.js";
import { validationResult, matchedData } from "express-validator";

export const createComment = [
  ...validateComment,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { content, postId } = matchedData(req);
    const authorId = req.user.id;
    const comment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
      },
    });
    res.status(201).json(comment);
  },
];

export async function deleteComment(req, res) {
  const commentId = req.params.commentId;
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });

  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  try {
    if (comment.authorId !== req.user.id && req.user.role !== "OWNER") {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment" });
    }
  } catch (error) {
    console.error("Error checking comment authorization:", error);
    return res
      .status(500)
      .json({ message: "Failed to check comment authorization" });
  }

  await prisma.comment.delete({
    where: { id: commentId },
  });
  res.status(200).json({ message: "Comment deleted successfully" });
}

export async function updateComment(req, res) {
  const commentId = req.params.commentId;
  const content = req.body.content;
  const comment = await prisma.comment.findUnique({
    where: { id: commentId },
  });
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }

  if (comment.authorId !== req.user.id && req.user.role !== "OWNER") {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this comment" });
  }

  const updatedComment = await prisma.comment.update({
    where: { id: commentId },
    data: { content },
  });
  res.status(200).json(updatedComment);
}
