import httpError from "http-errors";

export class AuthService {
  register(data: any) {
    throw httpError.BadRequest("Method not implemented.");
  }

  login(data: any) {
    throw httpError.BadRequest("Method not implemented.");
  }
}

export const authService = new AuthService();
