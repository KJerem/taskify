import { TagRepository } from "@app/repositories";
import { Tag } from "@domain/models";
import { ErrorUtil } from "@utils/error.util";

export class GetTagByIdUseCase {
    constructor(private readonly tagRepository: TagRepository) {}
  async execute(id: string): Promise<Tag> {
    const tag = await this.tagRepository.findById(id);

    if (!tag) {
      throw ErrorUtil.notFoundError("Tag not found.");
    }

    return tag;
  }
}

export class GetAllTagsUseCase {
    constructor(private readonly tagRepository: TagRepository) {}
    async execute() {
      const tags = await this.tagRepository.findMany();
      return tags;
    }
  }