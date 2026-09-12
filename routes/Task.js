import express from 'express';
import {
  createTask,
  getMyTasks,
  updateTask,
  deleteTask
} from '../controllers/Taskcontroller.js';
import { protect } from '../middlewares/auth.js';
import { validate } from '../middlewares/validatezod.js';
import { taskValidationSchema } from '../schemas/Taskschemas.js';

const router = express.Router();

router.use(protect);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a task for the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Task created
 *       400:
 *         description: Validation failed
 *       401:
 *         description: JWT is missing, invalid, or expired
 */
router.post('/', validate(taskValidationSchema), createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks created by the logged-in user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of the user's tasks
 *       401:
 *         description: JWT is missing, invalid, or expired
 */
router.get('/', getMyTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update one of the logged-in user's tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 */
router.put('/:id', validate(taskValidationSchema), updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete one of the logged-in user's tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB task ID
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */
router.delete('/:id', deleteTask);

export default router;
