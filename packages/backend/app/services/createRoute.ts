import path from "path";
import { createFolder } from "../helpers";

const createRoute = async (appPath, schema) => {
  const destination = path.join(appPath, "backend", "controllers");

  const routePath = path.join(destination, schema);
  await createFolder(routePath);
  return;
};

export default createRoute;
