import { TaskRepository } from "@app/repositories";
import { AddTaskDTOType } from "@domain/dto";
import { Task } from "@domain/models";

export class CreateTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(data: any): Promise<Task> {
    const task = await this.taskRepository.create(data);
    return task;
  }
}
