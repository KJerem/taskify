import { User as PrismaUser } from '@prisma/client';
import { User } from "@domain/models";

export class UserMapper {
  static toDomain(user: PrismaUser): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    }
  }
}
