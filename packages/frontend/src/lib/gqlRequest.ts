import { GraphQLClient } from "graphql-request";
import { getCookie } from "cookies-next";

const HASURA_GRAPHQL_URL = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL || "";

const getToken = (req?: Request, res?: Response) => {
  const storedUser = getCookie("user", { req, res });

  const token = storedUser ? JSON.parse(storedUser as string).token : null;

  return token;
};

async function middleware(request: RequestInit) {
  const token = getToken();

  return {
    ...request,
    headers: {
      ...request.headers,
      Authorization: `Bearer ${token}`,
      // "x-hasura-admin-secret": "admin-secret", // TODO: remove this and use the token
      "content-type": "application/json",
    },
  };
}

export const client = new GraphQLClient(HASURA_GRAPHQL_URL, {
  // @ts-expect-error requestMiddleware is not typed
  requestMiddleware: middleware,
});

export default client;
