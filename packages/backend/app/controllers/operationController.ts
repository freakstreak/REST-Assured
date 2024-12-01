import { Common } from "../common";
import operationQueries from "../repositories/operationQueries";
import {
  createOperationFile,
  deleteOperationFile,
} from "../helpers/fs-write-operations";
import * as path from "path";
import applicationQueries from "../repositories/applicationQueries";
import OpenAIService from "../services/openai";
import parseTypeScript from "../helpers/parse-typescript";
import getEndpointPrompt from "../prompts/generateEndpoint";
import { readfile, writefile } from "../helpers";

class OperationController {
  public static async create(req: any, res: any): Promise<any> {
    try {
      const { data } = req.body;

      // check if data is an array
      if (!Array.isArray(data)) {
        return Common.Response(res, false, "Invalid data type", null);
      }

      // check if data is empty
      if (!data.length) {
        return Common.Response(res, false, "Data cannot be empty", null);
      }

      const generatedQuery = [];
      data.forEach((operation: any) => {
        if (operation.create) {
          generatedQuery.push({
            name: "create",
            application_schema_id: operation.applicationSchemaId,
          });
        }
        if (operation.read) {
          generatedQuery.push({
            name: "read",
            application_schema_id: operation.applicationSchemaId,
          });
        }
        if (operation.update) {
          generatedQuery.push({
            name: "update",
            application_schema_id: operation.applicationSchemaId,
          });
        }
        if (operation.delete) {
          generatedQuery.push({
            name: "delete",
            application_schema_id: operation.applicationSchemaId,
          });
        }
      });

      const { data: insertionData } = await Common.GQLRequest({
        variables: { objects: generatedQuery },
        query: operationQueries.bulInsertOperations,
      });

      if (insertionData?.errors) {
        return Common.Response(res, false, insertionData?.errors[0].message);
      }

      if (!insertionData?.data?.insert_operations?.returning) {
        return Common.Response(res, false, "Operations not created");
      }

      return Common.Response(
        res,
        true,
        "Operations created successfully",
        insertionData?.data?.insert_operations?.returning
      );
    } catch (error) {
      return Common.Response(res, false, error.message);
    }
  }

  public static async createOperationEndpoint(
    req: any,
    res: any
  ): Promise<any> {
    try {
      const { applicationId } = req.body;

      // Fetch application details
      const { data: application } = await Common.GQLRequest({
        variables: { id: applicationId },
        query: applicationQueries.getApplicationById,
      });

      if (application?.errors) {
        console.log(application);
        return Common.Response(res, false, application?.errors[0].message);
      }

      // Fetch operations by application ID
      const { data: applicationSchemaOperation } = await Common.GQLRequest({
        variables: { applicationId },
        query: operationQueries.getOperationsByApplicationId,
      });

      if (applicationSchemaOperation?.errors) {
        return Common.Response(
          res,
          false,
          applicationSchemaOperation?.errors[0].message
        );
      }

      const operations = applicationSchemaOperation?.data?.operations;

      if (!operations || !operations.length) {
        return Common.Response(res, true, "No operations found");
      }

      const appFilePath = application?.data?.applications_by_pk?.file_path;
      const appDescription = application?.data?.applications_by_pk?.description;
      const prismaFilePath = path.join(
        appFilePath,
        "backend",
        "prisma",
        "schema.prisma"
      );

      const prismaContent = await readfile(prismaFilePath);

      // Process operations concurrently
      const operationPromises = operations.map(async (operation: any) => {
        const routeName = operation?.application_schema?.route_name;
        const operationName = operation?.name;

        const filePath = path.join(
          appFilePath,
          "backend",
          "controllers",
          routeName,
          `${operationName}.ts`
        );

        const prompt = getEndpointPrompt(
          appDescription,
          prismaContent,
          routeName,
          operationName
        );

        const openAIService = new OpenAIService();

        const response = await openAIService.prompt([
          {
            role: "system",
            content:
              "You are good at writing business logic using typescript for CRUD operations",
          },
          { role: "user", content: prompt },
        ]);

        const prismaFile = response.choices[0].message.content;
        const parsedData = await parseTypeScript(prismaFile);

        if (parsedData) {
          await writefile(filePath, parsedData);
        }
      });

      // Await all operations
      await Promise.all(operationPromises);
      console.log("Done generating endpoints");
      return Common.Response(res, true, "Endpoints created successfully");
    } catch (error: any) {
      return Common.Response(res, false, error.message);
    }
  }

  public static async createOperation(req: any, res: any): Promise<any> {
    try {
      const { name, applicationSchemaId } = req.body.input || req.body;

      if (
        name !== "create" ||
        name !== "read" ||
        name !== "update" ||
        name !== "delete"
      ) {
        return Common.Response(res, false, "Invalid operation name", null);
      }

      const getFeatureId = await Common.GQLRequest({
        variables: { id: applicationSchemaId },
        query: operationQueries.getFeatureIdByModelId,
      });

      if (getFeatureId?.data?.errors) {
        return Common.Response(
          res,
          false,
          getFeatureId?.data?.errors[0].message,
          null
        );
      }

      if (!getFeatureId?.data?.data?.model_by_pk?.feature_id) {
        return Common.Response(res, false, "Model not found", null);
      }

      const featureId = getFeatureId?.data?.data?.application_schemas_by_pk?.id;
      const featureName =
        getFeatureId?.data?.data?.application_schemas_by_pk?.name;

      // Create operation file with specified content
      const operationFileResult = createOperationFile({
        featureName,
        operationName: name,
        baseDir: path.resolve(
          __dirname,
          "../../../../user-applications/backend"
        ),
      });

      if (!operationFileResult.success) {
        return Common.Response(res, false, operationFileResult.message, null);
      }

      const { data } = await Common.GQLRequest({
        variables: { application_schema_id: applicationSchemaId, name: name },
        query: operationQueries.addOperationId,
      });

      if (data?.errors) {
        return Common.Response(res, false, data?.errors[0].message, null);
      }

      return Common.Response(
        res,
        true,
        "Operation created successfully",
        data?.data?.insert_operations_one
      );
    } catch (error) {
      return Common.Response(res, false, error.message);
    }
  }

  public static async updateOperation(req: any, res: any): Promise<any> {
    try {
      const { id, name } = req.body.input || req.body;

      if (
        name !== "create" ||
        name !== "read" ||
        name !== "update" ||
        name !== "delete"
      ) {
        return Common.Response(res, false, "Invalid operation name", null);
      }

      const feature = await Common.GQLRequest({
        variables: { id: id },
        query: operationQueries.getFeatureNameByOperationId,
      });

      if (feature?.data?.errors) {
        return Common.Response(
          res,
          false,
          feature?.data?.errors[0].message,
          null
        );
      }

      const featureName =
        feature?.data?.data?.operations_by_pk?.application_schema?.name;

      // create operation file

      const operationFileResult = createOperationFile({
        featureName,
        operationName: name,
        baseDir: path.resolve(
          __dirname,
          "../../../../user-applications/backend"
        ),
      });

      if (!operationFileResult.success) {
        return Common.Response(res, false, operationFileResult.message, null);
      }

      const { data } = await Common.GQLRequest({
        variables: { id: id, name: name },
        query: operationQueries.updateOpertaionName,
      });

      if (data?.errors) {
        return Common.Response(res, false, data?.errors[0].message, null);
      }

      return Common.Response(
        res,
        true,
        "Operation updated successfully",
        data?.data?.update_operations_by_pk
      );
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
      });

      if (feature?.data?.errors) {
        return Common.Response(
          res,
          false,
          feature?.data?.errors[0].message,
          null
        );
      }

      const featureName =
        feature?.data?.data?.operations_by_pk?.application_schema?.name;
      const operationName = feature?.data?.data?.operations_by_pk?.name;

      // delete operation file

      const operationFileResult = deleteOperationFile({
        featureName,
        operationName,
        baseDir: path.resolve(
          __dirname,
          "../../../../user-applications/backend"
        ),
      });

      if (!operationFileResult.success) {
        return Common.Response(res, false, operationFileResult.message, null);
      }

      const { data } = await Common.GQLRequest({
        variables: { id: id },
        query: operationQueries.deleteOperation,
      });

      return Common.Response(
        res,
        true,
        "Operation deleted successfully",
        data?.data?.delete_operations_by_pk
      );
    } catch (error) {
      return Common.Response(res, false, error.message);
    }
  }
}

export default OperationController;
