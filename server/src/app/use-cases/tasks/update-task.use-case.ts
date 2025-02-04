import { TaskRepository } from "@app/repositories";
import { UpdateTaskDTOType } from "@domain/dto";
import { Task } from "@domain/models";
import { ErrorUtil } from "@utils/error.util";

export class UpdateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(id: string, data: UpdateTaskDTOType): Promise<Task> {
    const existingTask = await this.taskRepository.findById(id);
    if (!existingTask) {
      throw ErrorUtil.notFoundError("Task not found");
    }

    const task = await this.taskRepository.update(id, data);
    return task;
  }
}
