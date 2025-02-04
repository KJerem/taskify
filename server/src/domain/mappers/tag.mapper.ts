import { Tag as PrismaTag } from "@prisma/client";
import { Tag } from "@domain/models";

export class TagMapper {
  static toDomain(prismaTag: PrismaTag): Tag {
    return {
      id: prismaTag.id,
      name: prismaTag.name,
    };
  }
}
