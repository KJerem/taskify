import { WorkspaceRepository } from "@app/repositories";
import { AddWorkspaceDTOType } from "@domain/dto";
import { Tag } from "@domain/models";
import { ErrorUtil } from "@utils/error.util";

export class UpdateWorkspaceUseCase {
  constructor(private readonly workspaceRepository: WorkspaceRepository) {}
  async execute(id: string, data: AddWorkspaceDTOType): Promise<Tag> {
    const workspace = await this.workspaceRepository.update(id, data);
    return workspace;
  }
}
