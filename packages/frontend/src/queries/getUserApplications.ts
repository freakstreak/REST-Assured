import { gql } from "graphql-request";

export const GET_USER_APPLICATIONS = gql`
  query getUserApplications($userId: uuid!) {
    applications(where: { user_id: { _eq: $userId } }) {
      id
      name
      status
      created_at
      description
      updated_at
    }
  }
`;
