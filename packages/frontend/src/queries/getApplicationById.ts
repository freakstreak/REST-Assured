import { gql } from "graphql-request";

export const GET_APPLICATION_BY_ID = gql`
  query getApplicationById($id: Int) {
    applications(where: { id: { _eq: $id } }) {
      id
      name
      description
      created_at
      status
      updated_at
    }
  }
`;
