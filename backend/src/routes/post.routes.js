import { Router } from "express";
import * as postController from "../controllers/post.controllers.js";

const postRouter = Router();
/*
GET /api/posts?page=1&limit=10
*/
postRouter.get("/", postController.getPublishedPosts);

export default postRouter;
