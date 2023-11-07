import httpError from "http-errors";

export class AuthService {
  async register(data: any) {
    throw httpError.BadRequest("Method not implemented.");
  }

  async login(data: any) {
    throw httpError.BadRequest("Method not implemented.");
  }
}

export const authService = new AuthService();
