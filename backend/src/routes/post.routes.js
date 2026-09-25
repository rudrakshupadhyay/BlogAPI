import { Router } from "express";
import * as postController from "../controllers/post.controllers.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
import authorize from "../middleware/authorize.middleware.js";
const postRouter = Router();
/*
GET /api/posts?page=1&limit=10
*/
postRouter.get("/", postController.getPublishedPosts);
/*
GET /api/posts/:slug
*/
postRouter.get("/:slug", authenticate, postController.getPostBySlug);

/*
POST /api/posts
*/
postRouter.post(
  "/",
  authenticate,
  authorize("ADMIN", "OWNER"),
  postController.createPost,
);

/*
DELETE /api/posts/:slug
*/
postRouter.delete(
  "/:slug",
  authenticate,
  authorize("ADMIN", "OWNER"),
  postController.deletePostBySlug,
);

/*
PATCH /api/posts/:slug
*/
postRouter.patch(
  "/:slug",
  authenticate,
  authorize("ADMIN", "OWNER"),
  postController.updatePostBySlug,
);

export default postRouter;
