export type ApplicationDeployment = {
  applications_by_pk: {
    deployments: Array<{
      id: string;
      status: string;
      created_at: string;
      updated_at: string;
    }>;
  };
};
