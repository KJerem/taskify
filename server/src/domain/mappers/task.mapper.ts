import { Task as PrismaTask } from '@prisma/client';
import { Task } from '@domain/models';

export class TaskMapper {
  static toDomain(prismaTask: PrismaTask): Task {
    return {
      id: prismaTask.id,
      title: prismaTask.title,
      description: prismaTask.description,
      dueDate: prismaTask.dueDate,
      priority: prismaTask.priority,
      status: prismaTask.status,
      estimatedTime: prismaTask.estimatedTime,
      actualTimeSpent: prismaTask.actualTimeSpent,
      userId: prismaTask.userId,
      tagId: prismaTask.tagId
    };
  }
}
