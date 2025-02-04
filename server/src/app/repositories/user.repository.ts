import { PrismaClient } from "@prisma/client";
import { UserMapper } from "@domain/mappers";
import { User } from "@domain/models/user";
import { RegisterDTOType } from "@domain/dto";

export class UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? UserMapper.toDomain(user) : null;
  }

  async create(data: RegisterDTOType): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return UserMapper.toDomain(user);
  }
}
