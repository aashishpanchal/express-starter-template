import {ApiRes} from 'exutile';

/**
 * Controller handling authentication related operations
 */
export class AuthController {
  /**
   * Handles user login
   */
  async login() {
    return ApiRes.ok('Login handler');
  }

  /**
   * Handles new user registration
   */
  async register() {
    return ApiRes.ok('Register handler');
  }

  /**
   * Refreshes user authentication token
   */
  async refresh(req: Request, res: Response) {}

  /**
   * Handles user logout
   */
  async logout(req: Request, res: Response) {
    return ApiRes.ok('Logged out successfully');
  }
}
