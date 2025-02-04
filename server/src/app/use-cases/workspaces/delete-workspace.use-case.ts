import { WorkspaceRepository } from "@app/repositories";
import { Workspace } from "@domain/models";
import { ErrorUtil } from "@utils/error.util";

export class DeleteWorkspaceUseCase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}
  async execute(id: string): Promise<{
    deleted: boolean;
    workspace: Workspace;
  }> {
    const existingWorkspace = await this.workspaceRepository.findById(id);
    if (!existingWorkspace) {
      throw ErrorUtil.notFoundError("Workspace not found.");
    }

    const deletedWorkspace = await this.workspaceRepository.delete(id);
    return deletedWorkspace;
  }
}
