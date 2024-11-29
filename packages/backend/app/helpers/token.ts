import Config from "../config";
import { env } from "../providers/locals";
import * as jwt from "jsonwebtoken";

/**
 * Create Token
 *
 * commenting out refresh token logic for now
 */
function CreateToken(payload: any) {
  const expiresIn = Config.JWT_EXPIRES_IN;
  //   const refreshExpiry = env("JWT_REFRESH_EXPIRES_IN", "7d");

  const token = jwt.sign(payload, Config.JWT_SECRET_KEY, {
    expiresIn: expiresIn,
  });

  //   const refreshToken = jwt.sign(payload, env("JWT_REFRESH_SECRET"), {
  //     expiresIn: refreshExpiry,
  //   });

  return {
    // refresh_token: refreshToken,
    // refresh_token_expires_in: refreshExpiry,
    token: token,
    expiresIn,
  };
}

export { CreateToken };
