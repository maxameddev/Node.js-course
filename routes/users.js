// const router = express.Router();
import { Router } from "express";
const router = Router();

import { login, register } from "../controllers/users.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/user.js";

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       201:
 *         description: User registered and JWT returned
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       400:
 *         description: Validation error or email already in use
 */
router.post("/register", validate(registerSchema), register);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in and receive a JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TokenResponse'
 *       401:
 *         description: Invalid email or password
 *       429:
 *         description: Too many login attempts
 */
router.post("/login", validate(loginSchema), login);

export default router;
