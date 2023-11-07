import httpStatus from "http-status";
import { Request, Response } from "express";
import { authService } from "./auth.service";

export class AuthController {
  async register(req: Request, res: Response) {
    const result = await authService.register(req.body);
    res.status(httpStatus.CREATED).json(result);
  }

  async login(req: Request, res: Response) {
    const result = await authService.login(req.body);
    res.status(httpStatus.OK).json(result);
  }
}

export const authController = new AuthController();
