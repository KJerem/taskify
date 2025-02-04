import { Tag as ITag, PrismaClient } from "@prisma/client";
import { Tag } from "@domain/models";
import { TagDTOType } from "@domain/dto";
import { TagMapper } from "@domain/mappers";

export class TagRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: TagDTOType): Promise<Tag> {
    const createdTag = await this.prisma.tag.create({ data });
    return TagMapper.toDomain(createdTag);
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = await this.prisma.tag.findUnique({ where: { id } });
    return tag ? TagMapper.toDomain(tag) : null;
  }

  async findByName(name: string): Promise<Tag | null> {
    const tag = await this.prisma.tag.findUnique({ where: { name } });
    return tag ? TagMapper.toDomain(tag) : null;
  }

  async findMany(): Promise<Tag[]> {
    const tags = await this.prisma.tag.findMany();
    return tags.map((tag: ITag) => TagMapper.toDomain(tag));
  }

  async update(id: string, updatedData: TagDTOType): Promise<Tag> {
    const updatedTag = await this.prisma.tag.update({
      where: { id },
      data: updatedData,
    });
    return TagMapper.toDomain(updatedTag);
  }

  async delete(id: string): Promise<{
    deleted: boolean;
    tag: Tag;
  }> {
    const deletedTag = await this.prisma.tag.delete({ where: { id } });
    return {
      deleted: true,
      tag: TagMapper.toDomain(deletedTag),
    };
  }
}
