import { Request, Response } from "express";

import {
  CreateWorkspaceUseCase,
  DeleteWorkspaceUseCase,
  GetAllWorkspacesUseCase,
  GetWorkspaceByIdUseCase,
  UpdateWorkspaceUseCase,
} from "@app/use-cases";
export class WorkspaceController {
  constructor(
    private createWorkspaceUseCase: CreateWorkspaceUseCase,
    private getWorkspaceByIdUseCase: GetWorkspaceByIdUseCase,
    private getAllWorkspacesUseCase: GetAllWorkspacesUseCase,
    private updateWorkspaceUseCase: UpdateWorkspaceUseCase,
    private deleteWorkspaceUseCase: DeleteWorkspaceUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      console.log('user');
      console.log(req.user);
      
      if (!req.user || !req.user.id) {
        res.status(403).json({ error: "User is not authenticated" });
        return;
      }
      const { name } = req.body;
      const imageUrl = req.file?.path;
      // const { name, image } = req.body;

      const workspaceData = {
        name,
        image: imageUrl,
        userId: req.user.id,
      };

      const workspace = await this.createWorkspaceUseCase.execute(
        workspaceData
      );

      res.status(201).json({ isSucceed: true, workspace });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const workspace = await this.getWorkspaceByIdUseCase.execute(
        req.params.id
      );
      res.status(200).json({ isSucceed: true, workspace });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      if (!req.user || !req.user.id) {
        res.status(403).json({ error: "User is not authenticated" });
        return;
      }
      const workspaces = await this.getAllWorkspacesUseCase.execute(
        req.user.id
      );
      res.status(200).json({ isSucceed: true, workspaces });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const workspace = await this.updateWorkspaceUseCase.execute(
        req.params.id,
        req.body
      );
      res.status(200).json({ isSucceed: true, workspace });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const response = await this.deleteWorkspaceUseCase.execute(req.params.id);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
