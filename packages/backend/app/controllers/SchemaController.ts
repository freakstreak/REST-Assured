import { Request } from "express";
import { validationResult } from "express-validator";
import { Common } from "../common";

class SchemaController {
  public static async update(req: Request, res: any): Promise<any> {}

  public static async create(req: Request, res: any): Promise<any> {
    try {
        const { applicationId, draftSchemaId } = req.body;
    
        const errors = validationResult(req);
    
        if (!errors.isEmpty()) {
            return Common.ValidationErrorResponse(res, errors.array());
        }
    
        const { data: applicationData } = await Common.GQLRequest({
            variables: { id: applicationId },
            query: ApplicationQueries.getApplicationById,
        });
    
        const application = applicationData?.data?.applications_by_pk;
    
        console.log(applicationData);
        if (!application) {
            return Common.Response(res, false, "!Application not found");
        }
    
        if (application?.application_draft_schema) {
            return Common.Response(
            res,
            false,
            "Draft schema already exists for this application
    }
  }
}

export default DraftSchemaController;
