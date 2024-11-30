import { Common } from "../common";
import operationQueries from "../repositories/operationQueries";
import { createOperationFile, deleteOperationFile } from '../helpers/fs-write-operations';
import * as path from 'path';

class OperationController {
    public static async createOperation(req: any, res: any): Promise<any> {
        try {
            const { name, applicationSchemaId } = req.body.input || req.body;

            if (name !== 'create' || name !== 'read' || name !== 'update' || name !== 'delete') {
                return Common.Response(res, false, "Invalid operation name", null);
            }

            const getFeatureId = await Common.GQLRequest({
                variables: { id: applicationSchemaId },
                query: operationQueries.getFeatureIdByModelId,
            });

            if (getFeatureId?.data?.errors) {
                return Common.Response(res, false, getFeatureId?.data?.errors[0].message, null);
            }

            if (!getFeatureId?.data?.data?.model_by_pk?.feature_id) {
                return Common.Response(res, false, "Model not found", null);
            }

            const featureId = getFeatureId?.data?.data?.application_schemas_by_pk?.id;
            const featureName = getFeatureId?.data?.data?.application_schemas_by_pk?.name;

            // Create operation file with specified content
            const operationFileResult = createOperationFile({
                featureName,
                operationName: name,
                baseDir: path.resolve(__dirname, '../../../../user-applications/backend')
            });

            if (!operationFileResult.success) {
                return Common.Response(res, false, operationFileResult.message, null);
            }

            const { data } = await Common.GQLRequest({
                variables: { application_schema_id: applicationSchemaId, name: name },
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

            const featureName = feature?.data?.data?.operations_by_pk?.application_schema?.name;

            // create operation file

            const operationFileResult = createOperationFile({
                featureName,
                operationName: name,
                baseDir: path.resolve(__dirname, '../../../../user-applications/backend')
            });

            if (!operationFileResult.success) {
                return Common.Response(res, false, operationFileResult.message, null);
            }

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

    public static async deleteOperation(req: any, res: any): Promise<any> {
        try {
            const { id } = req.body.input || req.body;

            const feature = await Common.GQLRequest({
                variables: { id: id },
                query: operationQueries.getFeatureNameByOperationId,
                }
            );

            if (feature?.data?.errors) {
                return Common.Response(res, false, feature?.data?.errors[0].message, null);
            }

            const featureName = feature?.data?.data?.operations_by_pk?.application_schema?.name;
            const operationName = feature?.data?.data?.operations_by_pk?.name;

            // delete operation file

            const operationFileResult = deleteOperationFile({
                featureName,
                operationName,
                baseDir: path.resolve(__dirname, '../../../../user-applications/backend')
            });

            if (!operationFileResult.success) {
                return Common.Response(res, false, operationFileResult.message, null);
            }

            const { data } = await Common.GQLRequest({
                variables: { id: id },
                query: operationQueries.deleteOperation,
            })

            return Common.Response(res, true, "Operation deleted successfully", data?.data?.delete_operations_by_pk);
        } catch (error) {
            return Common.Response(res, false, error.message);
        }
    }
}

export default OperationController;