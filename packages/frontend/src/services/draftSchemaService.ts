import axios from "axios";
import client from "@/lib/gqlRequest";

import { GET_DRAFT_SCHEMAS } from "@/queries/getDraftSchemas";

import { DraftSchema } from "@/types/draftSchema";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getDraftSchemas = async (applicationId: string) => {
  const result = (await client.request(GET_DRAFT_SCHEMAS, {
    applicationId,
  })) as { application_draft_schemas: DraftSchema[] };

  return result.application_draft_schemas?.[0];
};

export const generateFeatures = async (applicationId: string) => {
  const response = await axios.post(`${API_URL}/draft-schema`, {
    applicationId,
  });

  return response.data;
};

export const updateDraftSchema = async ({
  draftSchemaId,
  feedback,
}: {
  draftSchemaId: string;
  feedback: string;
}) => {
  const response = await axios.put(`${API_URL}/draft-schema`, {
    draftSchemaId,
    feedback,
  });

  return response.data;
};
