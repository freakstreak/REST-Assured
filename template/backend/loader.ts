import express from "express";
import fs from "fs";
import path from "path";

// Dynamically load route handler using import
async function loadRoute(routeFile, action) {
  return import(routeFile);
}

const router = express.Router();

// Function to handle dynamic loading of routes for GET, POST, PUT, DELETE
async function routeHandler(routesPath, basePath = "") {
  const folders = fs.readdirSync(routesPath, { withFileTypes: true });

  for (const folder of folders) {
    const fullPath = path.join(routesPath, folder.name);

    if (folder.isDirectory()) {
      let routePath = path.join(basePath, folder.name);

      // Automatically check for CRUD operations in each folder
      for (const action of ["read", "create", "update", "delete"]) {
        const routeFile = path.join(fullPath, `${action}.ts`);

        if (fs.existsSync(routeFile)) {
          const routeHandler = await loadRoute(routeFile, action);
          switch (action) {
            case "read":
              router.get("/" + routePath, routeHandler.default);
              break;
            case "create":
              router.post("/" + routePath, routeHandler.default);
              break;
            case "update":
              router.put("/" + routePath, routeHandler.default);
              break;
            case "delete":
              router.delete("/" + routePath, routeHandler.default);
              break;
            default:
              break;
          }
        }
      }

      // Recursively load nested routes
      await routeHandler(fullPath, routePath);
    }
  }

  return router;
}

(async () => {
  await routeHandler(__dirname + "/controllers");
})();

export default router;
