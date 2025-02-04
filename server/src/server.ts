import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import coockieParser from "cookie-parser";
import * as rfs from "rotating-file-stream";
import path from "path";
import authRoutes from "./infra/routes/auth.routes";
import tagRoutes from "./infra/routes/tags.routes";
import taskRoutes from "./infra/routes/tasks.routes";
import workspaceRoutes from "./infra/routes/workspaces.routes";
import { errorHandler } from "./presentation/http/middlewares/error-handler.middleware";

import { environment } from "./config/config";

dotenv.config();

const app = express();

const accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

app.use(morgan("combined", { stream: accessLogStream }));
app.use(express.json());
app.use(coockieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(errorHandler);

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tags", tagRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/workspaces", workspaceRoutes);

const PORT = environment.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
