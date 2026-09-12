import express from 'express';
import { upload } from '../middlewares/upload.js';
import { uploadFile } from '../controllers/uploadController.js';
import { protect } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * /upload/profilepicture:
 *   post:
 *     summary: Upload a profile picture to Cloudinary
 *     tags: [Upload]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required: [file]
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: File uploaded
 *       400:
 *         description: No file uploaded
 *       401:
 *         description: JWT is missing, invalid, or expired
 */
router.post('/profilepicture', protect, upload.single('file'), uploadFile);

export default router;
