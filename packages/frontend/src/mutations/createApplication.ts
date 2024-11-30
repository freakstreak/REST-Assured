import { gql } from "graphql-request";

export const CREATE_APPLICATION = gql`
  mutation createApplication($name: String!, $description: String!) {
    createApplication(name: $name, description: $description) {
      data {
        id
      }
      message
      success
    }
  }
`;
