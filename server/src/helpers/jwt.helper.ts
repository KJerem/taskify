import jwt, { JwtPayload } from "jsonwebtoken";
import { Response } from "express";
import { ErrorUtil } from "@utils/error.util";
import { environment } from "@config/config";
import { User } from "@domain/models";



export class JwtHelper {
  // Static properties
  private static atSecret: string;
  private static atExpiresIn: string;
  private static rtSecret: string;
  private static rtExpiresIn: string;

  // Static initialization method to set up the secret and expiresIn values
  public static initialize(
    atSecret: string = environment.jwtATSecret,
    atExpiresIn: string = environment.jwtATExpiresIn,
    rtSecret: string = environment.jwtRTSecret,
    rtExpiresIn: string = environment.jwtRTExpiresIn
  ): void {
    this.atSecret = atSecret;
    this.atExpiresIn = atExpiresIn;
    this.rtSecret = rtSecret;
    this.rtExpiresIn = rtExpiresIn;
  }

  // Static method to generate token
  public static generateAccessToken(payload: JwtPayload): string {
    if (!this.atSecret || !this.atExpiresIn) {
      throw new Error("JWT Helper not initialized.");
    }
    return jwt.sign(payload, this.atSecret, { expiresIn: this.atExpiresIn });
  }

  public static generateRefreshToken(payload: JwtPayload): string {
    if (!this.rtSecret || !this.rtExpiresIn) {
      throw new Error("JWT Helper not initialized.");
    }
    return jwt.sign(payload, this.rtSecret, { expiresIn: this.rtExpiresIn });
  }

  // Static method to verify token
  public static verifyAccessToken(token: string): JwtPayload {
    if (!this.atSecret) {
      throw ErrorUtil.authenticationError("JWT Helper not initialized.");
    }
    try {
      return jwt.verify(token, this.atSecret) as JwtPayload;
    } catch (error: any) {
      throw ErrorUtil.authenticationError("Invalid or expired token");
    }
  }

  public static verifyRefreshToken(token: string): JwtPayload {
    if (!this.rtSecret) {
      throw ErrorUtil.authenticationError("JWT Helper not initialized.");
    }
    try {
      return jwt.verify(token, this.rtSecret) as JwtPayload;
    } catch (error: any) {
      throw ErrorUtil.authenticationError("Invalid or expired token");
    }
  }

  // public static sendToken(user: User, statusCode: number, res: Response) {
  //   const accessToken = this.generateAccessToken({
  //     sub: user.id,
  //     email: user.email,
  //   });
  //   const refreshToken = this.generateRefreshToken({
  //     sub: user.id,
  //     email: user.email,
  //   });

  //   res.cookie("access_token", accessToken, accessTokenOptions);
  //   res.cookie("refresh_token", refreshToken, refreshTokenOptions);

  //   return res.status(statusCode).json({
  //     isSucceed: true,
  //     user,
  //     accessToken,
  //   });
  // }
}
