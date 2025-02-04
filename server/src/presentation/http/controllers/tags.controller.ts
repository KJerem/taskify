import { Request, Response } from "express";

import {
  CreateTagUseCase,
  DeleteTagUseCase,
  GetAllTagsUseCase,
  GetTagByIdUseCase,
  UpdateTagUseCase,
} from "@app/use-cases";

export class TagController {
  constructor(
    private createTagUseCase: CreateTagUseCase,
    private getByIdTagUseCase: GetTagByIdUseCase,
    private getAllTagUseCase: GetAllTagsUseCase,
    private updateTagUseCase: UpdateTagUseCase,
    private deleteTagUseCase: DeleteTagUseCase
  ) {}

  async create(req: Request, res: Response) {
    try {
      const tag = await this.createTagUseCase.execute(req.body);
      res.status(201).json({ succeed: true, tag });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      console.log(req.params.id)
      const tag = await this.getByIdTagUseCase.execute(req.params.id);
      res.status(200).json({ succeed: true, tag });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const tags = await this.getAllTagUseCase.execute();
      res.status(200).json({ succeed: true, tags });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const tag = await this.updateTagUseCase.execute(req.params.id, req.body);
      res.status(200).json({ succeed: true, tag });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const response = await this.deleteTagUseCase.execute(req.params.id);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
