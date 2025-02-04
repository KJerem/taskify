import { Workspace as IWorkspace, PrismaClient } from "@prisma/client";
import { Workspace } from "@domain/models";
import { AddWorkspaceDTOType } from "@domain/dto";
import { WorkspaceMapper } from "@domain/mappers";

export class WorkspaceRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: any): Promise<Workspace> {
    const createdWorkspace = await this.prisma.workspace.create({ data });
    return WorkspaceMapper.toDomain(createdWorkspace);
  }

  async findById(id: string): Promise<Workspace | null> {
    const workspace = await this.prisma.workspace.findUnique({ where: { id } });
    return workspace ? WorkspaceMapper.toDomain(workspace) : null;
  }

  async findByName(name: string): Promise<Workspace | null> {
    const workspace = await this.prisma.workspace.findFirst({
      where: { name },
    });
    return workspace ? WorkspaceMapper.toDomain(workspace) : null;
  }

  async findByUserId(userId: string): Promise<Workspace[]> {
    const workspaces = await this.prisma.workspace.findMany({ where: { userId } });
    return workspaces.map((workspace: IWorkspace) => WorkspaceMapper.toDomain(workspace));
  }

  async findMany(): Promise<Workspace[]> {
    const workspaces = await this.prisma.workspace.findMany();
    return workspaces.map((workspace: IWorkspace) => WorkspaceMapper.toDomain(workspace));
  }

  async update(id: string, updatedData: AddWorkspaceDTOType): Promise<Workspace> {
    const updatedWorkspace = await this.prisma.workspace.update({
      where: { id },
      data: updatedData,
    });
    return WorkspaceMapper.toDomain(updatedWorkspace);
  }

  async delete(id: string): Promise<{
    deleted: boolean;
    workspace: Workspace;
  }> {
    const deletedWorkspace = await this.prisma.workspace.delete({ where: { id } });
    return {
      deleted: true,
      workspace: WorkspaceMapper.toDomain(deletedWorkspace),
    };
  }
}
