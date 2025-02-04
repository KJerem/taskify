import { WorkspaceRepository } from "@app/repositories";
import { Workspace } from "@domain/models";

export class CreateWorkspaceUseCase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}
  async execute(data: any): Promise<Workspace> {
    const workspace = await this.workspaceRepository.create(data);
    return workspace;
  }
}
