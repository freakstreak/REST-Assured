import { gql } from "graphql-request";

export const GET_USER_APPLICATIONS = gql`
  query getUserApplications($userId: uuid!, $query: String = "") {
    applications(
      where: { user_id: { _eq: $userId }, name: { _ilike: $query } }
    ) {
      id
      name
      status
      created_at
      description
      updated_at
    }
  }
`;
