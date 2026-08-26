import { Router } from "express";
import * as commentController from "../controllers/comment.controllers.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
const commentRouter = Router();

/*
POST /api/comments/:postId
*/
commentRouter.post("/:postId", authenticate, commentController.createComment);

export default commentRouter;
