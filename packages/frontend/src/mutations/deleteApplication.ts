import { gql } from "graphql-request";

export const DELETE_APPLICATION = gql`
  mutation deleteApplication($id: Int!) {
    delete_applications_by_pk(id: $id) {
      id
    }
  }
`;
