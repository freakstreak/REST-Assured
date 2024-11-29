class UserQueries {
  public UserByEmailWithPassword = `query ($email: String) {
    users(where: {email: {_eq: $email}}) {
      id
      name
      email
      password
    }
  }`;

  public UserByEmail = `query ($email: String) {
    users(where: {email: {_eq: $email}}) {
      id
      name
      email
    }
  }`;

  public CreateUser = `mutation ($name: String, $email: String, $password: String) {
    insert_users_one(object: {name: $name, email: $email, password: $password}) {
      id
      name
      email
    }
  }`;

  public UserById = `query ($id: uuid) {
    users_by_pk(id: $id) {
      id
      name
      email
    }
  }`;
}

export default new UserQueries();
