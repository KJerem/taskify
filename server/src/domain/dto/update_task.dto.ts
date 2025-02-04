import { Priority, Status } from "@prisma/client";
import { z } from "zod";

export const UpdateTaskDTO = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().nullable(),
  dueDate: z.date().nullable(),
  priority: z.nativeEnum(Priority),
  status: z.nativeEnum(Status).default("TODO"),
  tagId: z.string().uuid(),
  estimatedTime: z.number().nullable(),
});

export type UpdateTaskDTOType = z.infer<typeof UpdateTaskDTO>;
