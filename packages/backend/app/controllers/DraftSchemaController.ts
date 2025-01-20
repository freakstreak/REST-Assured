import { Request } from "express";
import { Common } from "../common";
import ApplicationQueries from "../repositories/applicationQueries";
import OpenAIService from "../services/openai";
import DraftSchemaQueries from "../repositories/draftSchemaQueries";
import { validationResult } from "express-validator";

class DraftSchemaController {
  public static async update(req: Request, res: any): Promise<any> {
    const { draftSchemaId, feedback } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return Common.ValidationErrorResponse(res, errors.array());
    }

    // get previous schema from database
    const { data: draftSchemaData } = await Common.GQLRequest({
      variables: { id: draftSchemaId },
      query: DraftSchemaQueries.getDraftSchemaById,
    });

    if (
      !draftSchemaData?.data?.application_draft_schemas_by_pk ||
      draftSchemaData.errors
    ) {
      return Common.Response(
        res,
        false,
        "Draft schema not found or Error Occured!"
      );
    }

    const draftSchema = draftSchemaData?.data?.application_draft_schemas_by_pk;

    const appDescription = draftSchema?.application?.description;
    const previousSchema = draftSchema?.json;

    // add schema and previous schema to the prompt
    const prompt = `Generate a JSON object for schemas for following application. The description of the application is: "${appDescription}"

    The JSON should have the following structure:
    {
        "schemas": [
          {
            "schemaName": "/schema",
            "description": "Description of the Schema."
          }
        ]
    }

    Previous schema:
    ${JSON.stringify(previousSchema)}
      
    Feedback: In the previous schema please keep this in mind: "${feedback}"
    
    Don't add -schema suffix to the schemaName.
    Ensure the response is valid JSON, concise, and relevant to the provided description.
    Include at least 3 schemas in the JSON.
    Don't include more than 10 schemas in the JSON.
    Only provide the JSON, without any introductory or explanatory text outside the JSON structure.`;

    const openAIService = new OpenAIService();
    const response = await openAIService.prompt([
      { role: "system", content: "You are good at creating schemas." },
      { role: "user", content: prompt },
    ]);

    const jsonResponse = response.choices[0].message.content;

    console.log(jsonResponse);
    const schemaJson = JSON.parse(jsonResponse)?.schemas;

    const { data: updatedSchema } = await Common.GQLRequest({
      variables: {
        id: draftSchemaId,
        json: schemaJson,
        status: "draft",
      },
      query: DraftSchemaQueries.updateDraftSchema,
    });

    if (updatedSchema?.errors) {
      return Common.Response(res, false, updatedSchema?.errors[0].message);
    }

    if (!updatedSchema?.data?.update_application_draft_schemas_by_pk) {
      return Common.Response(
        res,
        false,
        "Draft schema not updated, Error Occured!"
      );
    }

    return Common.Response(
      res,
      true,
      "Draft schema updated successfully",
      updatedSchema?.data?.update_application_draft_schemas_by_pk
    );
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
        query: ApplicationQueries.getApplicationById,
      });

      console.log(applicationData);

      const application = applicationData?.data?.applications_by_pk;

      if (!application) {
        return Common.Response(res, false, "!Application not found");
      }

      if (application?.application_draft_schema) {
        return Common.Response(
          res,
          false,
          "Draft schema already exists for this application"
        );
      }

      const prompt = `Generate a JSON object for schemas for following application. The description of the application is: "${application.description}"
      The JSON should have the following structure:
      {
        "schemas": [
          {
            "schemaName": "/schema",
            "description": "Description of the Schema."
          }
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

      const { data: createdSchema } = await Common.GQLRequest({
        variables: {
          applicationId: applicationId,
          json: schemaJson,
          status: "draft",
        },
        query: DraftSchemaQueries.createDraftSchema,
      });

      if (createdSchema?.errors) {
        return Common.Response(res, false, createdSchema?.errors[0].message);
      }

      if (!createdSchema?.data?.insert_application_draft_schemas_one) {
        return Common.Response(
          res,
          false,
          "Draft schema not created, Error Occured!"
        );
      }

      return Common.Response(
        res,
        true,
        "Draft schema created successfully",
        createdSchema?.data?.insert_application_draft_schemas_one
      );
    } catch (error) {
      return Common.Response(res, false, error?.message);
    }
  }
}

export default DraftSchemaController;
