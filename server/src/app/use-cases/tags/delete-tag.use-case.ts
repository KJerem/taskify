import { TagRepository } from "@app/repositories";
import { TagDTOType } from "@domain/dto";
import { Tag } from "@domain/models";
import { ErrorUtil } from "@utils/error.util";

export class DeleteTagUseCase {
  constructor(private readonly tagRepository: TagRepository) {}
  async execute(id: string): Promise<{
    deleted: boolean;
    tag: Tag;
  }> {
    const existingTag = await this.tagRepository.findById(id);
    if (!existingTag) {
      throw ErrorUtil.notFoundError("Tag not found.");
    }

    const deletedTag = await this.tagRepository.delete(id);
    return deletedTag;
  }
}
