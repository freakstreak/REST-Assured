import { Response } from "express";
import * as jwt from "jsonwebtoken";
import { env } from "../providers/locals";
import Config from "../config";
import axios from "axios";

export class Common {
  /**
   * Server response
   */
  public static Response(
    res: Response,
    success: boolean,
    message: string,
    data: any
  ) {
    return res.json({ success, message, data });
  }

  public async GQLRequest({ variables, query }) {
    const headers = {
      "content-type": "application/json",
      "x-hasura-admin-secret": Config.HASURA_ADMIN_SECRET,
    };

    return await axios({
      url: `${Config.HASURA_GRAPHQL_URL}`,
      method: "POST",
      headers: headers,
      data: {
        query,
        variables,
      },
    });
  }

  /**
   * Validate JWT token
   */
  public static async ValidateToken(_token: string) {
    try {
      let decoded = jwt.verify(
        _token.replace("Bearer ", ""),
        Config.JWT_SECRET_KEY
      );

      return decoded;
    } catch (err) {
      throw err;
    }
  }
}
