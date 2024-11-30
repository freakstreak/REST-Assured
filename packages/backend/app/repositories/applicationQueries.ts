class ApplicationQueries {
  public createApplication = `mutation MyMutation($name: String, $description: String, $user_id: uuid) {
        insert_applications_one(object: {name: $name, description: $description, user_id: $user_id, status: "Features Generation"}) {
          id
          name
          status
          created_at
          description
          updated_at
          user_id
        }
    }`;

  public getApplicationById = `query MyQuery($id: Int!) {
    applications_by_pk(id: $id) {
      id
      name
      status
      description
      application_draft_schema {
        id
        json
      }
      application_schemas {
        id
        name
        json
        model_path
        ddl_path
        status
       }
    }
  }`;
}

export default new ApplicationQueries();
