const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const helmet = require("helmet");
const morgan = require("morgan");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("combined"));
app.use(errorHandler);
// Mount routes BEFORE 404
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
// Root test
app.get("/", (req, res) => {
  res.json({ message: "API Running" });
});

module.exports = app;
