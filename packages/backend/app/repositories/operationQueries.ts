class OperationQueries {
    public getFeatureIdByModelId = `query MyQuery2($id: Int!) {
        application_schemas_by_pk(id: $id) {
            id
            name
        }
    }`;

    public addOperationId = `mutation MyMutation($application_schema_id: Int!, $name: String! {
        insert_operations_one(object: {is_authenticated: true, is_async: true, is_media: true, name: $name, application_schema_id: $application_schema_id}) {
            id
            name
        }
    }`

    public getFeatureNameByOperationId = `query MyQuery2($id: Int!) {
        operations_by_pk(id: $id) {
            name
            application_schema {
            name
            }
        }
    }`

    public updateOpertaionName = `mutation MyMutation2($id: Int!, $name: String!) {
        update_operations_by_pk(pk_columns: {id: $id}, _set: {name: $name}) {
            id
            name
        }
    }`

    public deleteOperation = `
        mutation MyMutation3($id: Int!) {
            delete_operations_by_pk(id: $id) {
                id
            }
        }
    `;
}

export default new OperationQueries();