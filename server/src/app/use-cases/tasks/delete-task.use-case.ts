import { TaskRepository } from "@app/repositories";
import { Task } from "@domain/models";
import { ErrorUtil } from "@utils/error.util";

export class DeleteTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(id: string): Promise<{
    deleted: boolean;
    task: Task;
  }> {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw ErrorUtil.notFoundError("Tag not found.");
    }

    const deletedTask = await this.taskRepository.delete(id);
    return deletedTask;
  }
}
