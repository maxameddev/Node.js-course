import express from 'express';
import { protect } from '../middlewares/auth.js';
import { authorize } from '../middlewares/authorize.js';

const router = express.Router();

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Access the admin dashboard
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Admin dashboard welcome message
 *       401:
 *         description: JWT is missing, invalid, or expired
 *       403:
 *         description: User does not have permission
 */
router.get('/dashboard', protect, authorize('admin', 'student'), (req, res) => {
  res.json({
    message: `Welcome to the admin dashboard, ${req.user.name}`
  });
});

export default router;
