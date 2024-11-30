class SchemaQueries {
  public createApplication = `mutation InsetApplicationSchema($applicationId: Int!, $name: String) {
      insert_application_schemas_one(object: {application_id: $applicationId, name: $name}) {
        name
        json
        application_id
        model_path
        ddl_path
        created_at
      }
    }
    `;
}
