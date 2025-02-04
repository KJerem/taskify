import { Request, Response } from "express";
import { LoginUserUseCase, RegisterUserUseCase } from "@app/use-cases";
import { JwtHelper } from "@helpers/jwt.helper";

interface ITokenOptions {
  expires: Date;
  maxAge: number;
  httpOnly: boolean;
  sameSite: "lax" | "strict" | "none" | undefined;
  secure?: boolean;
}

// // parse environment variables to integrates with fallback values
// const accessTokenExpire = parseInt(
//   process.env.ACCESS_TOKEN_EXPIRE || "300",
//   10
// );
// const refreshTokenExpire = parseInt(
//   process.env.REFRESH_TOKEN_EXPIRE || "1200",
//   10
// );

// options for cookies
export const accessTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
  maxAge: 1 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export const refreshTokenOptions: ITokenOptions = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  maxAge: 3 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: "lax",
};

export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase
  ) {}
  async register(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.registerUserUseCase.execute(req.body);
      res.cookie("access_token", response.accessToken, accessTokenOptions);
      res.cookie("refresh_token", response.refreshToken, refreshTokenOptions);

      res.status(201).json({
        isSucceed: true,
        message: "User registered successfully",
        user: response.user,
        accessToken: response.accessToken,
      });
    } catch (error: any) {
      res.status(error.statusCode || 400).json({ error: error.message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const response = await this.loginUserUseCase.execute(req.body);
      res.cookie("access_token", response.accessToken, accessTokenOptions);
      res.cookie("refresh_token", response.refreshToken, refreshTokenOptions);

      res.status(200).json({
        isSucceed: true,
        user: response.user,
        accessToken: response.accessToken,
      });
    } catch (error: any) {
      res.status(error.statusCode || 401).json({ error: error.message });
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
    try {
      res.cookie("access_token", "", { maxAge: 1 });
      res.cookie("refresh_token", "", { maxAge: 1 });

      res.status(200).json({
        success: true,
        message: "Logged out successfully !",
      });
    } catch (error: any) {
      res.status(error.statusCode || 401).json({ error: error.message });
    }
  }

  async updateAccessToken(req: Request, res: Response): Promise<void> {
    try {
      const refresh_token = req.cookies.refresh_token as string;

      const decoded = JwtHelper.verifyRefreshToken(refresh_token);

      if (!decoded) {
        res.status(400).json({
          message: "Could not refresh token !",
        });
      }

      const session = req.user;
      if (!session) {
        res.status(400).json({
          message: "Please login for access thid resource !",
        });
      }

      const accessToken = JwtHelper.generateAccessToken({
        sub: session?.id,
        email: session?.email,
      });
      const refreshToken = JwtHelper.generateRefreshToken({
        sub: session?.id,
        email: session?.email,
      });

      res.cookie("access_token", accessToken, accessTokenOptions);
      res.cookie("refresh_token", refreshToken, refreshTokenOptions);
      res.status(200).json({
        success: true,
        accessToken,
      });
    } catch (error: any) {
      res.status(error.statusCode || 401).json({ error: error.message });
    }
  }

  async getLoggedUser(req: Request, res: Response): Promise<void> {
    try {
      const user = req.user;
      res.status(200).json({ isSucceed: true, user });
    } catch (error: any) {
      res.status(error.statusCode || 401).json({ error: error.message });
    }
  }
}
