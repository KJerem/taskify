import { z } from "zod";

export const AddWorkspaceDTO = z.object({
  name: z.string().min(1, "Name is required"),
  image: z.union([
    z.instanceof(File),
    z.string().transform((val) => val === "" ? undefined : val),
  
  ]).optional(),
});



export type AddWorkspaceDTOType = z.infer<typeof AddWorkspaceDTO>;
