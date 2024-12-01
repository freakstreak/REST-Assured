import { gql } from "graphql-request";

export const GET_LATEST_APPLICATION_DEPLOYMENT = gql`
  query MyQuery($applicationId: Int!) {
    applications_by_pk(id: $applicationId) {
      deployments(order_by: { created_at: desc }) {
        id
        log_json
        status
        created_at
        updated_at
      }
    }
  }
`;
