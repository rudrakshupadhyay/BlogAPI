import { Router } from "express";
import * as adminRequestController from "../controllers/adminRequest.controllers.js";
import { authenticate } from "../middleware/authenticate.middleware.js";
import authorize from "../middleware/authorize.middleware.js";

const adminRequestRouter = Router();

/*
POST /api/admin-request;
*/
adminRequestRouter.post(
  "/",
  authenticate,
  authorize("READER"),
  adminRequestController.createAdminRequest,
);

/*
GET /api/admin-request;
*/
adminRequestRouter.get(
  "/",
  authenticate,
  authorize("OWNER"),
  adminRequestController.getAllAdminRequests,
);

/*
PATCH /api/admin-request/:requestId;
*/
adminRequestRouter.patch(
  "/:requestId",
  authenticate,
  authorize("OWNER"),
  adminRequestController.updateAdminRequestStatus,
);
export default adminRequestRouter;
