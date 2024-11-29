import { HttpStatusCode } from "../enums/HttpStatusCode";
import { BaseError } from "./BaseError";

export class InternalServerError extends BaseError {
  constructor(
    name: string,
    httpCode = HttpStatusCode.INTERNAL_SERVER,
    isOperational = true,
    description = "internal server error"
  ) {
    super(name, httpCode, description, isOperational);
  }
}
