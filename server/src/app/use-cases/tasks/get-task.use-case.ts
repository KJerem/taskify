import { TaskRepository } from "@app/repositories";
import { Task } from "@domain/models";
import { ErrorUtil } from "@utils/error.util";

export class GetTasksByUserUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(userId: string): Promise<Task[]> {
    const tasks = await this.taskRepository.findByUserId(userId);

    if (!tasks) {
      throw ErrorUtil.notFoundError("Tasks not found.");
    }

    return tasks;
  }
}
