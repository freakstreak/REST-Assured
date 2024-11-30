import { Common } from "../common";
import operationQueries from "../repositories/operationQueries";

class OperationController {
    public static async createOperation(req: any, res: any): Promise<any> {
        try {
            const { name, modelId } = req.body.input || req.body;

            if (name !== 'create' || name !== 'read' || name !== 'update' || name !== 'delete') {
                return Common.Response(res, false, "Invalid operation name", null);
            }

            const getFeatureId = await Common.GQLRequest({
                variables: { id: modelId },
                query: operationQueries.getFeatureIdByModelId,
            });

            if (getFeatureId?.data?.errors) {
                return Common.Response(res, false, getFeatureId?.data?.errors[0].message, null);
            }

            if (!getFeatureId?.data?.data?.model_by_pk?.feature_id) {
                return Common.Response(res, false, "Model not found", null);
            }

            const featureId = getFeatureId?.data?.data?.model_by_pk?.feature_id;
            const featureName = getFeatureId?.data?.data?.model_by_pk?.feature?.name;

            //
            

            const { data } = await Common.GQLRequest({
                variables: { feature_id: featureId, model_id: modelId, name: name },
                query: operationQueries.addOperationId,
            })

            if (data?.errors) {
                return Common.Response(res, false, data?.errors[0].message, null);
            }

            return Common.Response(res, true, "Operation created successfully", data?.data?.insert_operations_one);
        } catch (error) {
            return Common.Response(res, false, error.message);
        }
    }

    public static async updateOperation(req: any, res: any): Promise<any> {
        try {
            const {  id, name } = req.body.input || req.body;

            if (name !== 'create' || name !== 'read' || name !== 'update' || name !== 'delete') {
                return Common.Response(res, false, "Invalid operation name", null);
            }

            const feature = await Common.GQLRequest({
                variables: { id: id },
                query: operationQueries.getFeatureNameByOperationId,
                }
            );

            if (feature?.data?.errors) {
                return Common.Response(res, false, feature?.data?.errors[0].message, null);
            }

            const featureName = feature?.data?.data?.operations_by_pk?.feature?.name;

            //


            const { data } = await Common.GQLRequest({
                variables: { id: id, name: name },
                query: operationQueries.updateOpertaionName,
            })

            if (data?.errors) {
                return Common.Response(res, false, data?.errors[0].message, null);
            }
            
            return Common.Response(res, true, "Operation updated successfully", data?.data?.update_operations_by_pk);
        } catch (error) {
            return Common.Response(res, false, error.message);
        }
    }
}

export default OperationController;