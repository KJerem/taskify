import { Workspace as PrismaWorkspace } from "@prisma/client";
import { Workspace } from "@domain/models";

export class WorkspaceMapper {
  static toDomain(workspace: PrismaWorkspace): Workspace {
    return {
      id: workspace.id,
      name: workspace.name,
      imageUrl: workspace.imageUrl ?? undefined,
      userId: workspace.userId,
    };
  }
}
