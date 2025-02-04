import { Router } from "express";
import prisma from "@infra/prisma/prisma.client";
import { validate } from "@presentation/http/middlewares/validate.middleware";
import { WorkspaceRepository } from "@app/repositories";
import {
  CreateWorkspaceUseCase,
  DeleteWorkspaceUseCase,
  GetAllWorkspacesUseCase,
  GetWorkspaceByIdUseCase,
  UpdateWorkspaceUseCase,
} from "@app/use-cases";
import { WorkspaceController } from "@presentation/http/controllers";
import { AddWorkspaceDTO } from "@domain/dto";
import { authenticate } from "@presentation/middlewares/auth.middleware";
import multer from "multer";
 

const router = Router();
const upload = multer({ dest: "uploads/" });
const workspaceRepository = new WorkspaceRepository(prisma);
const createWorkspaceUseCase = new CreateWorkspaceUseCase(workspaceRepository);
const getAllWorkspacesUseCase = new GetAllWorkspacesUseCase(
  workspaceRepository
);
const getWorkspaceByIdUseCase = new GetWorkspaceByIdUseCase(
  workspaceRepository
);
const updateWorkspaceUseCase = new UpdateWorkspaceUseCase(workspaceRepository);
const deleteWorkspaceUseCase = new DeleteWorkspaceUseCase(workspaceRepository);

const workspaceController = new WorkspaceController(
  createWorkspaceUseCase,
  getWorkspaceByIdUseCase,
  getAllWorkspacesUseCase,
  updateWorkspaceUseCase,
  deleteWorkspaceUseCase
);

router.post("/create" ,upload.single("image"), validate(AddWorkspaceDTO), authenticate, (req, res) =>
  workspaceController.create(req, res)
);

router.get("/", authenticate, (req, res) =>
  workspaceController.getAll(req, res)
);

router.patch("/:id/edit", validate(AddWorkspaceDTO), authenticate, (req, res) =>
  workspaceController.update(req, res)
);

router.delete("/:id/delete", authenticate, (req, res) =>
  workspaceController.delete(req, res)
);
export default router;
