import { validateAdminRequest } from "../utils/validate.js";
import { validationResult, matchedData } from "express-validator";
import { prisma } from "../../lib/prisma.js";

export const createAdminRequest = [
  ...validateAdminRequest,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { reason, genre } = matchedData(req);
    const userId = req.user.id;
    const data = {
      reason,
      genre: genre || null,
      userId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set expiration date to 7 days from now
    };

    try {
      const existingRequest = await prisma.adminRequest.findFirst({
        where: {
          userId,
          status: "PENDING",
        },
      });

      if (existingRequest) {
        return res
          .status(409)
          .json({ error: "You already have a pending admin request." });
      }

      const adminRequest = await prisma.adminRequest.create({
        data,
      });

      res.status(201).json(adminRequest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];
