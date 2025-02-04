import { Router } from "express";
import { AuthController } from "@presentation/http/controllers";
import { UserRepository } from "@app/repositories/user.repository";
import { LoginUserUseCase, RegisterUserUseCase } from "@app/use-cases";
import prisma from "@infra/prisma/prisma.client";
import { validate } from "@presentation/http/middlewares/validate.middleware";
import { LoginDTO, RegisterDTO } from "@domain/dto";
import { authenticate } from "@presentation/middlewares/auth.middleware";

const router = Router();

const userRepository = new UserRepository(prisma);
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

const authController = new AuthController(
  registerUserUseCase,
  loginUserUseCase
);

router.post("/register", validate(RegisterDTO), (req, res) =>
  authController.register(req, res)
);
router.post("/login", validate(LoginDTO), (req, res) =>
  authController.login(req, res)
);

router.get("/me", authenticate, (req, res) => authController.getLoggedUser(req, res));

router.get("/refresh", authenticate, (req, res) => authController.updateAccessToken(req, res));

router.get("/logout", authenticate, (req, res) => authController.logout(req, res));

export default router;
