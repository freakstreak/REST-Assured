import { gql } from "graphql-request";

export const GET_SCHEMAS = gql`
  query getSchemas($id: Int) {
    application_schemas(where: { application_id: { _eq: $id } }) {
      id
      name
      json
    }
  }
`;
