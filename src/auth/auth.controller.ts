import httpStatus from "http-status";
import { Request, Response } from "express";
import { authService } from "./auth.service";

export class AuthController {
  register(req: Request, res: Response) {
    const result = authService.register(req.body);
    res.status(httpStatus.CREATED).json(result);
  }

  login(req: Request, res: Response) {
    const result = authService.login(req.body);
    res.status(httpStatus.OK).json(result);
  }
}

export const authController = new AuthController();
