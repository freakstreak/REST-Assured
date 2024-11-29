import { HttpStatusCode } from "../enums/HttpStatusCode";
import { BaseError } from "./BaseError";

export class BadRequest extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.BAD_REQUEST,
    isOperational = true,
    description = "bad request error"
  ) {
    super(name, httpCode, description, isOperational);
  }
}
