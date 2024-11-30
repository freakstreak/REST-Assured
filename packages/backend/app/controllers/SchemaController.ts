import { Request } from "express";
import { validationResult } from "express-validator";
import { Common } from "../common";
import applicationQueries from "../repositories/applicationQueries";
import OpenAIService from "../services/openai";
import SchemaQueries from "../repositories/schemaQueries";
import createRoute from "../services/createRoute";

class SchemaController {
  public static async createModelAndMigration(
    req: Request,
    res: any
  ): Promise<any> {
    try {
      const { applicationId } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return Common.ValidationErrorResponse(res, errors.array());
      }

      const { data: applicationData } = await Common.GQLRequest({
        variables: { id: applicationId },
        query: applicationQueries.getApplicationById,
      });

      const application = applicationData?.data?.applications_by_pk;

      if (!application) {
        return Common.Response(res, false, "Application not found");
      }

      if (
        !application?.application_schemas ||
        !application?.application_schemas.length
      ) {
        return Common.Response(
          res,
          false,
          "Application schema not generated yet"
        );
      }

      const schemas = application?.application_schemas;

      return Common.Response(res, false, "Not Implemented");
    } catch (err: any) {
      return Common.Response(res, false, err?.message);
    }
  }

  public static async create(req: Request, res: any): Promise<any> {
    try {
      const { applicationId } = req.body;

      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return Common.ValidationErrorResponse(res, errors.array());
      }

      const { data: applicationData } = await Common.GQLRequest({
        variables: { id: applicationId },
        query: applicationQueries.getApplicationById,
      });

      const application = applicationData?.data?.applications_by_pk;

      if (!application) {
        return Common.Response(res, false, "Application not found");
      }

      if (
        !application?.application_draft_schema ||
        !application?.application_draft_schema.json
      ) {
        return Common.Response(
          res,
          false,
          "Draft schema does not exists for this application"
        );
      }

      const draftSchema = application?.application_draft_schema.json;

      const prompt = `Based on the following schemas, generate a JSON object that includes key-value pairs for attributes for each schema. The description of the application is: "${
        application.description
      }"

      We have following schemas for the application:
      {
        "schemas": ${JSON.stringify(draftSchema)}
      } 
      
      Expected Output JSON format:
      {
        "schemas": [
          {
            "schemaName": "schema-name",
            "description": "Description of the Schema.",
            "attributes": [
              {name: "attributeName", "type": "string", ...otherProperties... },
              ...
            ]
          },
          ...
        ]
      }

      Don't add -schema suffix to the schemaName.
      Ensure the response is valid JSON, concise, and relevant to the provided description.
      Include at least 3 schemas in the JSON.
      Don't include more than 10 schemas in the JSON.
      Only provide the JSON, without any introductory or explanatory text outside the JSON structure.
      `;

      const openAIService = new OpenAIService();

      const response = await openAIService.prompt([
        { role: "system", content: "You are good at creating schemas." },
        { role: "user", content: prompt },
      ]);

      const jsonResponse = response.choices[0].message.content;

      const schemaJson = JSON.parse(jsonResponse)?.schemas;

      if (!schemaJson) {
        return Common.Response(res, false, "Invalid JSON response from OpenAI");
      }

      console.log(schemaJson);
      const variableObject = [];
      schemaJson.forEach(async (schemaInfo) => {
        variableObject.push({
          application_id: applicationId,
          name: schemaInfo.schemaName,
          json: schemaInfo,
          route_name: schemaInfo.schemaName,
        });

        // create routes for each schema
        await createRoute(application.file_path, schemaInfo.schemaName);
      });

      const { data: createdSchemas } = await Common.GQLRequest({
        variables: { objects: variableObject },
        query: SchemaQueries.createApplicationSchemas,
      });

      if (createdSchemas?.errors) {
        return Common.Response(res, false, createdSchemas?.errors[0].message);
      }

      if (!createdSchemas?.data?.insert_application_schemas?.returning) {
        return Common.Response(
          res,
          false,
          "Draft schemas not created, Error Occured!"
        );
      }

      return Common.Response(
        res,
        true,
        "Draft schemas created successfully",
        createdSchemas?.data?.insert_application_schemas?.returning
      );
    } catch (error) {
      return Common.Response(res, false, error?.message);
    }
  }
}

export default SchemaController;
