import axios from "axios";
import client from "@/lib/gqlRequest";

import { GET_SCHEMAS } from "@/queries/getSchemas";

import { Schema } from "@/types/schema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createSchema = async (applicationId: string) => {
  const response = await axios.post(`${API_URL}/schema`, {
    applicationId,
  });

  return response.data;
};

export const getSchemas = async (applicationId: string) => {
  const response = (await client.request(GET_SCHEMAS, {
    id: applicationId,
  })) as { application_schemas: Schema[] };

  return response.application_schemas;
};

// export const generateSchema = async (applicationId: string) => {
//   const response = await axios.post(`${API_URL}/schema`, {
//     applicationId,
//   });

//   return response.data;
// };
