const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const { protect } = require("../middleware/authMiddleware");
const { body } = require("express-validator");
const { validate } = require("../middleware/validationMiddleware");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

router.use(protect);

/**
 * @swagger
 * /api/v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully
 */
router.post(
  "/",
  [body("title").notEmpty().withMessage("Title is required")],
  validate,
  createTask,
);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get tasks (User gets own tasks, Admin gets all)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", getTasks);

router.route("/:id").put(updateTask).delete(deleteTask);

module.exports = router;
