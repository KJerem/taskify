import { Request, Response } from "express";

import {
  CreateTaskUseCase,
  DeleteTaskUseCase,
  GetTasksByUserUseCase,
  UpdateTaskUseCase,
} from "@app/use-cases";
import { AddTaskDTOType } from "@domain/dto";

export class TaskController {
  constructor(
    private createTaskUseCase: CreateTaskUseCase,
    private getTasksByUserIdUseCase: GetTasksByUserUseCase,
    private updateTaskUseCase: UpdateTaskUseCase,
    private deleteTaskUseCase: DeleteTaskUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      if (!req.user || !req.user.id) {
        res.status(403).json({ error: "User is not authenticated" });
        return;
      }

      const taskData = {
        ...req.body,
        userId: req.user?.id,
        dueDate: req.body.dueDate ? new Date(req.body.dueDate) : null,
      };
      const task = await this.createTaskUseCase.execute(taskData);
      res.status(201).json({ succeed: true, task });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTasksByUser(req: Request, res: Response) {
    try {
      if (!req.user?.id) {
        res.status(403).json({ error: "User is not authenticated" });
        return;
      }

      const tasks = await this.getTasksByUserIdUseCase.execute(req.user?.id);
      res.status(201).json({ succeed: true, tasks });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const task = await this.updateTaskUseCase.execute(
        req.params.id,
        req.body
      );
      res.status(201).json({ succeed: true, task });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const response = await this.deleteTaskUseCase.execute(req.params.id);
      res.status(201).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
