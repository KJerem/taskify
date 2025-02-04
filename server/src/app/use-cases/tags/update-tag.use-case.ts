import { TagRepository } from "@app/repositories";
import { TagDTOType } from "@domain/dto";
import { Tag } from "@domain/models";
import { ErrorUtil } from "@utils/error.util";

export class UpdateTagUseCase {
  constructor(private readonly tagRepository: TagRepository) {}
  async execute(id: string, data: TagDTOType): Promise<Tag> {
    const existingTag = await this.tagRepository.findById(id);

    if (existingTag && existingTag.id !== id) {
      throw ErrorUtil.validationError(
        `A tag with the name '${data.name}' already exists.`
      );
    }

    if (!existingTag) {
      throw ErrorUtil.notFoundError("Tag not found");
    }

    const tag = await this.tagRepository.update(id, data);
    return tag;
  }
}
