import { WorkspaceRepository } from "@app/repositories";
import { Workspace } from "@domain/models";
import { ErrorUtil } from "@utils/error.util";

export class GetWorkspaceByIdUseCase {
    constructor(private readonly workspaceRepository: WorkspaceRepository) {}
  async execute(id: string): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findById(id);

    if (!workspace) {
      throw ErrorUtil.notFoundError("Workspace not found.");
    }

    return workspace;
  }
}

export class GetAllWorkspacesUseCase {
    constructor(private readonly workspaceRepository: WorkspaceRepository) {}
    async execute(userId: string) {
      const workspaces = await this.workspaceRepository.findByUserId(userId);
      return workspaces;
    }
  }