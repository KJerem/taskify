import { Router } from "express";
import { validate } from "@presentation/http/middlewares/validate.middleware";
import { TagRepository } from "@app/repositories";
import prisma from "@infra/prisma/prisma.client";
import {
  CreateTagUseCase,
  GetTagByIdUseCase,
  GetAllTagsUseCase,
  UpdateTagUseCase,
  DeleteTagUseCase,
} from "@app/use-cases";
import { TagController } from "@presentation/http/controllers";
import { TagDTO } from "@domain/dto";
import { authenticate } from "@presentation/middlewares/auth.middleware";

const router = Router();

const tagRepository = new TagRepository(prisma);
const createTagUseCase = new CreateTagUseCase(tagRepository);
const getByIdTagUseCase = new GetTagByIdUseCase(tagRepository);
const getAllTagUseCase = new GetAllTagsUseCase(tagRepository);
const updateTagUseCase = new UpdateTagUseCase(tagRepository);
const deleteTagUseCase = new DeleteTagUseCase(tagRepository);

const tagController = new TagController(
  createTagUseCase,
  getByIdTagUseCase,
  getAllTagUseCase,
  updateTagUseCase,
  deleteTagUseCase
);

router.post("/create", validate(TagDTO), authenticate, (req, res) =>
  tagController.create(req, res)
);

router.get("/:id", (req, res) => tagController.getById(req, res));

router.get("/", (req, res) => tagController.getAll(req, res));

router.put("/:id/edit", validate(TagDTO), authenticate, (req, res) =>
  tagController.update(req, res)
);

router.delete("/:id/delete", authenticate, (req, res) =>
  tagController.delete(req, res)
);

export default router;
