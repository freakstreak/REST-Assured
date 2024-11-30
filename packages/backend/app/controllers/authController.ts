import { Request } from "express";
import bcrypt from "bcrypt";

import { Common } from "../common";
import { CreateToken } from "../helpers/token";
import UserQueries from "../repositories/userQueries";
import { validationResult } from "express-validator";

class AuthController {
  public static async signup(req: Request, res: any): Promise<any> {
    try {
      const { name, email, password } = req.body.input || req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return Common.ValidationErrorResponse(res, errors.array());
      }

      // check if user already exists
      const userExist = await Common.GQLRequest({
        variables: { email: email },
        query: UserQueries.UserByEmail,
      });

      if (userExist.data?.data?.users?.length > 0) {
        return Common.Response(res, false, "User already exists!", null);
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // graphql query
      const { data } = await Common.GQLRequest({
        variables: { name, email, password: hashedPassword },
        query: UserQueries.CreateUser,
      });

      if (data?.errors) {
        return Common.Response(res, false, data?.errors[0].message, null);
      }

      console.log(data);
      if (!data?.data?.insert_users_one) {
        return Common.Response(res, false, "Something went wrong!", null);
      }

      const user = data?.data?.insert_users_one;

      // create Token for authentication
      const token = CreateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        "https://hasura.io/jwt/claims": {
          "x-hasura-default-role": "user",
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-user-id": user.id,
        }
      });

      return Common.Response(res, true, "Sign up successfully!", {
        ...user,
        ...token,
      });
    } catch (error) {
      console.log("error", error);
      return Common.Response(res, false, error.message);
    }
  }

  public static async login(req: Request, res: any): Promise<any> {
    const { email, password } = req.body.input || req.body;

    try {
      const { data } = await Common.GQLRequest({
        variables: { email: email },
        query: UserQueries.UserByEmailWithPassword,
      });

      // error handling
      if (
        !data ||
        !data.data ||
        !data.data.users ||
        data.data.users.length === 0
      ) {
        const error = (data.errors && data.errors) || "Something went wrong!";
        return Common.Response(res, false, error, null);
      }

      const user = data.data.users[0];

      // check password with the hashed password
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return Common.Response(res, false, "Invalid Password", null);
      }

      // remove password from user object
      delete user.password;

      // create Token for authentication
      const token = CreateToken({
        id: user.id,
        name: user.name,
        email: user.email,
        "https://hasura.io/jwt/claims": {
          "x-hasura-default-role": "user",
          "x-hasura-allowed-roles": ["user"],
          "x-hasura-user-id": user.id,
        }
      });

      return Common.Response(res, true, "Sign in successfully!", {
        ...user,
        ...token,
      });
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }

  public static async me(req: any, res: any): Promise<any> {    
    const token = req.headers["authorization"] as string;

    if (!token) {
      return Common.Response(res, false, "Access denied", null);
    }

    try {
      // graphql query
      const { data } = await Common.AuthGQLRequest({
        variables: { email: req.user.email },
        query: UserQueries.UserByEmail,
        token: token.split(" ")[1],
      });

      console.log(data);

      if (data && data.data && data.data.users && data.data.users[0]) {
        return res.json(data.data.users[0]);
      }

      return res.json({});
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default AuthController;
