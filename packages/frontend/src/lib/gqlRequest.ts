import { GraphQLClient } from "graphql-request";
import { getCookie, deleteCookie } from "cookies-next";
import * as jose from "jose";

const HASURA_GRAPHQL_URL = process.env.NEXT_PUBLIC_HASURA_GRAPHQL_URL || "";

const getToken = (req?: Request, res?: Response) => {
  const storedUser = getCookie("user", { req, res });

  const token = storedUser ? JSON.parse(storedUser as string).token : null;

  return token;
};

async function middleware(request: RequestInit) {
  const token = getToken();

  try {
    const secret = new TextEncoder().encode(
      process.env.NEXT_PUBLIC_JWT_SECRET_KEY
    );

    await jose.jwtVerify(token, secret);
  } catch (error) {
    console.error(error);

    localStorage.removeItem("user");
    deleteCookie("user");

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

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
