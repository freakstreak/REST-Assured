import axios from "axios";

import { Endpoint } from "@/types/endpoint";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getEndpoints = async (id: string) => {
  const response = await axios.post(`${API_URL}/endpoints`, {
    applicationId: id,
  });

  return response.data.data;
};

export const createOperations = async (data: Endpoint[]) => {
  const response = await axios.post(`${API_URL}/operation`, {
    data,
  });

  return response.data;
};

export const createOperationEndpoints = async (applicationId: string) => {
  const response = await axios.post(`${API_URL}/operation-endpoint`, {
    applicationId,
  });

  return response.data;
};
