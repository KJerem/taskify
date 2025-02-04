import { Router } from "express";
import prisma from "@infra/prisma/prisma.client";
import { validate } from "@presentation/http/middlewares/validate.middleware";
import { TaskRepository } from "@app/repositories";
import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  GetTasksByUserUseCase,
  UpdateTaskUseCase,
} from "@app/use-cases";
import { TaskController } from "@presentation/http/controllers";
import { AddTaskDTO, UpdateTaskDTO } from "@domain/dto";
import { authenticate } from "@presentation/middlewares/auth.middleware";

const router = Router();

const taskRepository = new TaskRepository(prisma);
const createTaskUseCase = new CreateTaskUseCase(taskRepository);
const getTasksByUserUseCase = new GetTasksByUserUseCase(taskRepository);
const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);

const taskController = new TaskController(
  createTaskUseCase,
  getTasksByUserUseCase,
  updateTaskUseCase,
  deleteTaskUseCase
);

router.post("/create", validate(AddTaskDTO), authenticate, (req, res) =>
  taskController.create(req, res)
);

router.get("/", authenticate, (req, res) =>
  taskController.getTasksByUser(req, res)
);

router.patch("/:id/edit", validate(UpdateTaskDTO), authenticate, (req, res) =>
  taskController.update(req, res)
);

router.delete("/:id/delete", authenticate, (req, res) =>
  taskController.delete(req, res)
);
export default router;
