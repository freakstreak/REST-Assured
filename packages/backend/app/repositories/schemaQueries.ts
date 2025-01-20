class SchemaQueries {
  public createApplicationSchemas = `mutation InsetApplicationSchema($objects: [application_schemas_insert_input!] = {}) {
    insert_application_schemas(objects: $objects) {
      returning {
        created_at
        id
        json
        name
        status
        application_id
      }
    }
  }
  `;

  public updateApplicationSchema = `mutation updateApplicationSchema($id: Int!, $json: jsonb, $status: String) {
      update_application_schemas_by_pk(pk_columns: {id: $id}, _set: {json: $json, status: $status}) {
          id
          json
          status
          application_id
          model_path
          ddl_path
          created_at
      }}`;
}

export default new SchemaQueries();
