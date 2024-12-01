import { validationResult } from "express-validator";
import { Common } from "../common";
import applicationQueries from "../repositories/applicationQueries";
import { Request } from "express";
import path from "path";
import { copyFile } from "../helpers/fs-copy";
import { spawn } from "child_process";
import { appendfile } from "../helpers";
import deploymentQueries from "../repositories/deploymentQueries";

class DeploymentController {
  public static async create(req: Request, res: any): Promise<any> {
    try {
      const { applicationId } = req.body;

      if (!applicationId) {
        return Common.Response(res, false, "Application ID is required");
      }

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

      const filePath = application.file_path;

      // Copy .env.example to .env
      const applicationPath = path.join(filePath, "backend");
      const envExamplePAth = path.join(applicationPath, ".env.example");
      const backendPath = path.join(applicationPath);
      await copyFile(envExamplePAth, backendPath, ".env");

      const child = spawn("podman", ["compose", "up"], {
        cwd: backendPath,
        stdio: ["pipe", "pipe", "pipe"], // Ensure we capture both stdout and stderr
      });

      const logFile = path.join(backendPath, "deployment.log");

      child.stdout.on("data", async (data) => {
        await appendfile(logFile, `[STDOUT]: ${data.toString()}`);
      });

      child.stderr.on("data", async (data) => {
        await appendfile(logFile, `[STDERR]: ${data.toString()}`);
      });

      child.on("error", async (error) => {
        await appendfile(logFile, `[ERROR]: ${JSON.stringify(error)}`);
      });

      child.on("exit", async (code) => {
        const message =
          code === 0
            ? "Deployment successful"
            : `Deployment failed with code ${code}`;
        await appendfile(logFile, `[EXIT]: ${message}`);
      });

      const { data: deploymentData } = await Common.GQLRequest({
        variables: {
          applicationId: applicationId,
        },
        query: deploymentQueries.createDeployment,
      });

      const deployment = deploymentData?.data?.insert_deployments_one;

      if (!deployment) {
        return Common.Response(res, false, "Failed to create deployment");
      }

      return Common.Response(res, true, "Deployment started successfully");
    } catch (error) {
      return Common.Response(res, false, error?.message);
    }
  }
}

export default DeploymentController;
