import { z } from "zod";
  
  export const TagDTO = z.object({
    name: z.string(),
  });
  
  export type TagDTOType = z.infer<typeof TagDTO>;
  