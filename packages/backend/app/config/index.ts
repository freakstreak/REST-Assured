import { env } from "../providers/locals";

const Config = {
  APP_PORT: env("APP_PORT", 4000),
  JWT_SECRET_KEY: env("JWT_SECRET_KEY", "secret"),
  JWT_EXPIRES_IN: env("JWT_EXPIRES_IN", "1d"),
  HASURA_GRAPHQL_URL: env(
    "HASURA_GRAPHQL_URL",
    "http://localhost:8080/v1/graphql"
  ),
  HASURA_GRAPHQL_ADMIN_SECRET: env("HASURA_GRAPHQL_ADMIN_SECRET", "secret"),
  OPENAI_SECRET_KEY: env("OPENAI_SECRET_KEY"),
};

export default Config;
