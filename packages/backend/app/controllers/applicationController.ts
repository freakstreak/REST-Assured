import { Common } from "../common";
import applicationQueries from "../repositories/applicationQueries";

class ApplicationController {
    public static async createApplication(req: any, res: any): Promise<any> {
        try {
            const { name, description } = req.body.input || req.body;

            // graphql query
            const { data } = await Common.GQLRequest({
                variables: { name, description, user_id: req.user.id },
                query: applicationQueries.createApplication,
            });

            if (data?.errors) {
                return Common.Response(res, false, data?.errors[0].message, null);
            }

            return Common.Response(res, true, "Application created successfully", data?.data?.insert_applications_one);
        } catch (error) {
            return Common.Response(res, false, error.message);
        }
    }
}

export default ApplicationController;