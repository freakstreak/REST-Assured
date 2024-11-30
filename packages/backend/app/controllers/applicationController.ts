import { Common } from "../common";
import { toKebabCase, copyFolder } from "../helpers";
import applicationQueries from "../repositories/applicationQueries";
import * as path from "path";

class ApplicationController {
  public static async createApplication(req: any, res: any): Promise<any> {
    try {
      const { name, description } = req.body.input || req.body;
      const applicationName = toKebabCase(name);

      // Use environment variables for paths
      const templateDir =
        process.env.TEMPLATE_DIR ||
        path.resolve(__dirname, "../../../../template");
      const usersApplicationDir =
        process.env.USERS_APPLICATION_DIR ||
        path.resolve(__dirname, "../../../../user-applications");

      const copyResult = copyFolder({
        sourceDir: templateDir,
        targetDir: usersApplicationDir,
        folderName: applicationName,
      });

      if (!copyResult.success) {
        return Common.Response(res, false, copyResult.message, null);
      }

      // graphql query
      const { data } = await Common.GQLRequest({
        variables: {
          name,
          description,
          user_id: req.user.id,
          filePath: usersApplicationDir + "/" + applicationName,
        },
        query: applicationQueries.createApplication,
      });

      if (data?.errors) {
        return Common.Response(res, false, data?.errors[0].message, null);
      }

      return Common.Response(
        res,
        true,
        "Application created successfully",
        data?.data?.insert_applications_one
      );
    } catch (error) {
      return Common.Response(res, false, error.message);
    }
  }
}

export default ApplicationController;
