import { prisma } from "../../lib/prisma.js";
import bcrypt from "bcrypt";
import { validateRegistration } from "../utils/validate.js";
import { validationResult, matchedData } from "express-validator";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import config from "../config/config.js";

export const registerUser = [
  ...validateRegistration,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, name, password } = matchedData(req);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        name,
        password: hashedPassword,
      },
    });
    const refreshToken = jwt.sign({ id: newUser.id }, config.JWT_SECRET, {
      expiresIn: "7d",
    });

    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await prisma.session.create({
      data: {
        userId: newUser.id,
        refreshTokenHash: refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"] || "Unknown",
      },
    });
    const accessToken = jwt.sign(
      { id: newUser.id, sessionId: session.id },
      config.JWT_SECRET,
      {
        expiresIn: "15m",
      },
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({
      message: "User registered successfully",
      user: newUser,
      accessToken,
    });
  },
];
