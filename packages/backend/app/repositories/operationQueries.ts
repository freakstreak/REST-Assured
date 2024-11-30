class OperationQueries {
    public getFeatureIdByModelId = `query MyQuery($id: Int!) {
        model_by_pk(id: $id) {
            feature_id
            feature {
                name
            }
        }
    }`;

    public addOperationId = `mutation MyMutation($feature_id: Int!, $model_id: Int!, $name: String!) {
        insert_operations_one(object: {is_authenticated: true, is_async: true, feature_id: $feature_id, is_media: true, model_id: $model_id, name: $name}) {
            id
            name
        }
    }`

    public getFeatureNameByOperationId = `query MyQuery2($id: Int!) {
    operations_by_pk(id: $id) {
        feature {
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
}

export default new OperationQueries();