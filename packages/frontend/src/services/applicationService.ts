import client from "@/lib/gqlRequest";

import { GET_USER_APPLICATIONS } from "@/queries/getUserApplications";
import { CREATE_APPLICATION } from "@/mutations/createApplication";
import { Application } from "@/types/application";

export const getUserApplications = async (userId: string) => {
  const result = (await client.request(GET_USER_APPLICATIONS, {
    userId,
  })) as { applications: Application[] };

  return result.applications;
};

export const createApplication = async ({
  name,
  description,
}: {
  name: string;
  description: string;
}) => {
  const result = (await client.request(CREATE_APPLICATION, {
    name,
    description,
  })) as { createApplication: { data: { id: string } } };

  return result.createApplication;
};
