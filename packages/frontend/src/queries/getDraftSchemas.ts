import { gql } from "graphql-request";

export const GET_DRAFT_SCHEMAS = gql`
  query getDraftSchemas($applicationId: Int) {
    application_draft_schemas(
      where: { application_id: { _eq: $applicationId } }
    ) {
      id
      json
      status
    }
  }
`;
