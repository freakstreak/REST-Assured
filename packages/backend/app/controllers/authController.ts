import { Request, Response } from "express";
import bcrypt from "bcrypt";

import { Common } from "../common";
import { CreateToken } from "../helpers/token";

class AuthController {
  public static async signup(req: Request, res: Response) {
    // Signup logic here
  }

  public static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      // find user by email
      const user: any = {};
      // logic ends here

      // error handling
      if (!user) {
        const error = "Something went wrong!";
        return Common.Response(res, false, error, null);
      }

      // check password with the hashed password
      const validPassword = await bcrypt.compare(user.password, password);
      if (!validPassword) {
        return Common.Response(res, false, "Invalid Password", null);
      }

      // create Token for authentication
      const token = CreateToken(user);

      return res.json({
        success: true,
        message: "Sign in successfully!",
        data: {
          ...user,
          ...token,
        },
      });
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }

  public static async user(req: Request, res: Response) {
    // User logic here
  }

  public static async logout(req: Request, res: Response) {
    // Login logic here
  }
}

export default AuthController;
