import { Router } from "express";
import * as adminRequestController from "../controllers/adminRequest.controllers.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const adminRequestRouter = Router();

/*
post /api/admin-request;
*/
adminRequestRouter.post(
  "/",
  authenticate,
  authorize("READER"),
  adminRequestController.createAdminRequest,
);

export default adminRequestRouter;
