import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";
import adminRequestRouter from "./routes/adminRequest.routes.js";
import cors from "cors";
import config from "./config/config.js";
const app = express();

app.use(
  cors({
    origin: config.ORIGIN,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);
app.use("/api/admin-request", adminRequestRouter);
export default app;
