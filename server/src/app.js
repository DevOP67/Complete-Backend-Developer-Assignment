const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const { errorHandler } = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

/* =========================
   SECURITY & PARSING
========================= */
app.use(cors());
app.use(express.json());
app.use(helmet());

/* =========================
   LOGGING SETUP
========================= */

// Ensure logs folder exists
const logsDir = path.join(__dirname, "../logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

// Create write stream for access.log
const logStream = fs.createWriteStream(path.join(logsDir, "access.log"), {
  flags: "a",
});

// Log to file
app.use(morgan("combined", { stream: logStream }));

// Also log to console (optional but useful during dev)
app.use(morgan("dev"));

/* =========================
   ROUTES
========================= */

app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

/* =========================
   GLOBAL ERROR HANDLER
   (Must be LAST middleware)
========================= */
app.use(errorHandler);

module.exports = app;
