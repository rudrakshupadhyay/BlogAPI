import { prisma } from "../../lib/prisma.js";
import { body } from "express-validator";

export const validateRegistration = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be between 3 and 20 characters")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers, and underscores")
    .custom(async (value) => {
      const existingUser = await prisma.user.findUnique({
        where: { username: value },
      });
      if (existingUser) {
        throw new Error("Username is already taken");
      }
    }),

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Name must be between 3 and 50 characters")
    .matches(/^[A-Za-z\s'-]+$/)
    .withMessage(
      "First name can only contain letters, spaces, hyphens, and apostrophes.",
    ),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateAdminRequest = [
  body("reason")
    .trim()
    .notEmpty()
    .withMessage("Reason is required")
    .isLength({ min: 1, max: 255 })
    .withMessage("Reason must be between 1 and 255 characters"),

  body("genre")
    .optional({ nullable: true, checkFalsy: true })
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Genre must be between 1 and 100 characters"),
];
