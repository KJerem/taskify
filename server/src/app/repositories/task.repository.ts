import { Task as ITask, PrismaClient } from "@prisma/client";
import { Task } from "@domain/models";
import { AddTaskDTOType } from "@domain/dto";
import { TaskMapper } from "@domain/mappers";
import { UpdateTaskDTOType } from "@domain/dto/update_task.dto";

export class TaskRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: any): Promise<Task> {
    const createdTask = await this.prisma.task.create({ data });
    return TaskMapper.toDomain(createdTask);
  }

  async findById(id: string): Promise<Task | null> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    return task ? TaskMapper.toDomain(task) : null;
  }

  async findByUserId(userId: string): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({ where: { userId } });
    return tasks.map((task: ITask) => TaskMapper.toDomain(task));
  }

  async update(id: string, updatedData: UpdateTaskDTOType): Promise<Task> {
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: updatedData,
    });
    return TaskMapper.toDomain(updatedTask);
  }

  async delete(id: string): Promise<{
    deleted: boolean;
    task: Task;
  }> {
    const deletedTask = await this.prisma.task.delete({ where: { id } });
    return {
      deleted: true,
      task: TaskMapper.toDomain(deletedTask),
    };
  }
}
