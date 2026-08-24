import { Router } from "express";
import * as postController from "../controllers/post.controllers.js";
import { authenticate } from "../middleware/authenticate.middleware.js";

const postRouter = Router();
/*
GET /api/posts?page=1&limit=10
*/
postRouter.get("/", postController.getPublishedPosts);
/*
GET /api/posts/:slug
*/
postRouter.get("/:slug", authenticate, postController.getPostBySlug);

export default postRouter;
