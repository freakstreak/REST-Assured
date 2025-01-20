class ApplicationQueries {
  public createApplication = `mutation MyMutation($name: String, $description: String, $user_id: uuid, $filePath: String) {
        insert_applications_one(object: {name: $name, description: $description, user_id: $user_id, status: "Features Generation", file_path: $filePath}) {
          id
          name
          status
    			file_path
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
      file_path
      application_draft_schemas {
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
        route_name
       }
    }
  }`;
}

export default new ApplicationQueries();
