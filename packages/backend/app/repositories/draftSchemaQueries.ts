class DraftSchemaQueries {
  public createDraftSchema = `mutation createDraftSchema($applicationId: Int, $json: jsonb, $status: String) {
    insert_application_draft_schemas_one(object: {application_id: $applicationId, , json: $json, status: $status}) {
      id
      json
      status
    }}`;

  public getDraftSchemaByApplicationId = `query getDraftSchema($applicationId: Int) {
    application_draft_schemas(where: {application_id: {_eq: $applicationId}}) {
        id
        json
        status
        application {
          id
          description
        }
    }}`;

  public getDraftSchemaById = `query getDraftSchema($id: Int!) {
        application_draft_schemas_by_pk(id: $id) {
        id
        status
        json
        application {
          id
          description
        }
      }
    }`;

  public updateDraftSchema = `mutation updateDraftSchema($id: Int!, $json: jsonb, $status: String) {
    update_application_draft_schemas_by_pk(pk_columns: {id: $id}, _set: {json: $json, status: $status}) {
        id
        json
        status
    }}`;
}

export default new DraftSchemaQueries();
