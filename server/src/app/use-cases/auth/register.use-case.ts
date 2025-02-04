import { UserRepository } from "@app/repositories";
import { RegisterDTOType } from "@domain/dto";
import { JwtHelper, HashHelper } from "@helpers/index";
import { ErrorUtil } from "@utils/error.util";

export class RegisterUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: RegisterDTOType) {
    JwtHelper.initialize();
    HashHelper.initialize();

    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser)
      throw ErrorUtil.authenticationError("User already exists");

    const hashedPassword = await HashHelper.hash(data.password);

    const user = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    const accessToken = JwtHelper.generateAccessToken({
      sub: user.id,
      email: user.email,
    });
    const refreshToken = JwtHelper.generateRefreshToken({
      sub: user.id,
      email: user.email,
    });

    return {
      accessToken,
      refreshToken,
      user
    };
  }
}
