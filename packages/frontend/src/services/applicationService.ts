import client from "@/lib/gqlRequest";

import { GET_USER_APPLICATIONS } from "@/queries/getUserApplications";
import { GET_APPLICATION_BY_ID } from "@/queries/getApplicationById";

import { CREATE_APPLICATION } from "@/mutations/createApplication";
import { UPDATE_STATUS } from "@/mutations/updateStatus";
import { Application } from "@/types/application";
import { Step } from "@/types/step";
import axios from "axios";
import { GET_LATEST_APPLICATION_DEPLOYMENT } from "@/queries/getApplicationDeployment";
import { ApplicationDeployment } from "@/types/applicationDeployment";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUserApplications = async (userId: string) => {
  const result = (await client.request(GET_USER_APPLICATIONS, {
    userId,
  })) as { applications: Application[] };

  return result.applications;
};

export const startDeployment = async (applicationId: string) => {
  const response = await axios.post(`${API_URL}/deploy`, {
    applicationId,
  });

  return response.data;
};

export const getApplicationById = async (id: string) => {
  const result = (await client.request(GET_APPLICATION_BY_ID, {
    id,
  })) as { applications: Application[] };

  return result.applications[0];
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

export const getLatestDeployment = async (
  applicationId: string | undefined
) => {
  const response = (await client.request(GET_LATEST_APPLICATION_DEPLOYMENT, {
    applicationId,
  })) as ApplicationDeployment;

  return response?.applications_by_pk?.deployments;
};

export const updateStatus = async ({
  id,
  status,
}: {
  id: string;
  status: Step;
}) => {
  const result = (await client.request(UPDATE_STATUS, {
    id,
    status,
  })) as { update_applications_by_pk: Application };

  return result.update_applications_by_pk;
};
