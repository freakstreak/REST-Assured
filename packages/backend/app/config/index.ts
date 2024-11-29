import { env } from "../providers/locals";

const Config = {
  JWT_SECRET_KEY: env("JWT_SECRET", "secret"),
  JWT_EXPIRES_IN: env("JWT_EXPIRES_IN", "1d"),
  HASURA_GRAPHQL_URL: env(
    "HASURA_GRAPHQL_URL",
    "http://localhost:8080/v1/graphql"
  ),
  HASURA_GRAPHQL_ADMIN_SECRET: env("HASURA_ADMIN_SECRET", "secret"),
};

export default Config;
