import { ErrorUtil } from "@utils/error.util";
import { LoginDTOType } from "@domain/dto";
import { UserRepository } from "@app/repositories";
import { JwtHelper, HashHelper } from "@helpers/index";

export class LoginUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: LoginDTOType) {
    JwtHelper.initialize();
    HashHelper.initialize();

    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      throw ErrorUtil.authenticationError("Invalid email or password");
    }

    const isPasswordValid = HashHelper.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw ErrorUtil.authenticationError("Invalid email or password");
    }

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
