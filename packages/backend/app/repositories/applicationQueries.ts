class ApplicationQueries {
    public createApplication = `mutation MyMutation($name: String, $description: String, $user_id: uuid) {
        insert_applications_one(object: {name: $name, description: $description, user_id: $user_id, status: "Application Details"}) {
          id
          name
          status
          created_at
          description
          updated_at
          user_id
        }
    }`;
}

export default new ApplicationQueries();