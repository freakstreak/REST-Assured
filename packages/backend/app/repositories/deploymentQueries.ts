class DeploymentQueries {
  public createDeployment = `mutation MyMutation($applicationId: Int!) {
  insert_deployments_one(object: {application_id: $applicationId}) {
        id
        log_json
        status
        application_id
        created_at
      }
    }
    `;

  // public updateDeployment =

  public getDeploymentById = `query MyQuery($applicationId: Int!) {
      deployments(where: {application_id: {_eq: $applicationId}}) {
        application_id
        created_at
        log_json
        id
        status
      }
    }
    `;

  public getLatestDeployment = `query MyQuery($applicationId: Int!) {
      applications_by_pk(id: $applicationId) {
        deployments(order_by: {created_at: desc}) {
          id
          log_json
          status
          created_at
          updated_at
        }
      }
    }
    `;
}
