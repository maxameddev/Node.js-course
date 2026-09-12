// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

// const express = require("express");
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
// const mongoose = require("mongoose");
import mongoose from "mongoose";
import { logger } from "./middlewares/logger.js";
// import errorHandler from "./middlewares/errorhandler.js";
import { errorHandler } from "./middlewares/errorhandler.js";
import { protect } from "./middlewares/auth.js";
import { getProfile } from "./controllers/users.js";
import taskRoutes from "./routes/Task.js";
import {
  apiLimiter,
  authLimiter,
  corsMiddleware,
} from "./middlewares/security.js";


const app = express();
const PORT = process.env.PORT || 3000;

import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import uploadRoutes from "./routes/upload.js";
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './utils/swagger.js';

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.use(helmet());
app.use(corsMiddleware);
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(logger);
app.use(apiLimiter);
app.use(express.json());

/**
 * @swagger
 * /:
 *   get:
 *     summary: API health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: API is running
 */
app.get("/", (req, res) => {
  res.send("Kusoo dhawoow Node.js API");
});

app.use("/users", authLimiter, userRoutes);
app.use("/admin", adminRoutes);
app.use("/upload", uploadRoutes);
app.use("/tasks", taskRoutes);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Get the current user's profile
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user profile
 *       401:
 *         description: JWT is missing, invalid, or expired
 */
app.get("/profile", protect, getProfile);

// import notFoundMiddleware from "./middlewares/notfound.js";
import notFound from "./middlewares/notfound.js";
app.use(notFound);
app.use(errorHandler);
mongoose
  .connect(process.env.MONGO_URI_prod, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
