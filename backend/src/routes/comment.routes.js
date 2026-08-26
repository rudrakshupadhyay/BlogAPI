import { Router } from "express";
import * as commentController from "../controllers/comment.controllers.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
const commentRouter = Router();

/*
POST /api/comments/:postId
*/
commentRouter.post("/:postId", authenticate, commentController.createComment);
/*
DELETE /api/comments/:commentId
*/
commentRouter.delete("/:commentId", authenticate, commentController.deleteComment);
export default commentRouter;
