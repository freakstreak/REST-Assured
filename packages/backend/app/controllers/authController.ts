import { Request, Response } from "express";
import { jwtDecode } from "jwt-decode";

class AuthController {
  public static async signup(req: Request, res: Response) {
    // Signup logic here
  }

  public static async login(req: Request, res: Response) {
    // Login logic here
  }

  public static async user(req: Request, res: Response) {
    // User logic here
  }

  public static async logout(req: Request, res: Response) {
    // Login logic here
  }
}

export default AuthController;
