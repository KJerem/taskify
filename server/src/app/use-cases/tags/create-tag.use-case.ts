import { TagRepository } from "@app/repositories";
import { TagDTOType } from "@domain/dto";
import { Tag } from "@domain/models";

export class CreateTagUseCase {
    constructor(private readonly tagRepository: TagRepository) {}
  async execute(data: TagDTOType): Promise<Tag> {
    const existingTag = await this.tagRepository.findByName(data.name)
    if (existingTag) {
      throw new Error("Tag with this name already exists.");
    }

    const tag = await this.tagRepository.create(data);
    return tag;
  }
}
