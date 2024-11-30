import { gql } from "graphql-request";

export const UPDATE_STATUS = gql`
  mutation updateStatus($id: Int!, $status: application_status!) {
    update_applications_by_pk(
      pk_columns: { id: $id }
      _set: { status: $status }
    ) {
      id
      name
      status
    }
  }
`;
