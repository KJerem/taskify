import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { JwtHelper } from "@helpers/jwt.helper";

const prisma = new PrismaClient();

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      res.status(401).json({
        error:
          "Authorization token missing or invalid, please login to access this resource",
      });
      return;
    }

    /**
     *  cette logique dans le cas d'un seul token
     */
    // const authHeader = req.headers.authorization;

    // if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // res.status(401).json({
    //   error: "Authorization token missing or invalid, please login to access this resource",
    // });
    //   return;
    // }

    // const token = authHeader.split(" ")[1];

    const decodedToken = JwtHelper.verifyAccessToken(access_token);

    if (!decodedToken) {
      res.status(401).json({
        error: "Invalid or expired token",
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decodedToken.sub },
    });

    if (!user) {
      res.status(404).json({
        error: "User not found",
      });
      return;
    }

    req.user = user;

    next();
  } catch (error: any) {
    res
      .status(401)
      .json({ error: "Authentication failed", details: error.message });
  }
};
