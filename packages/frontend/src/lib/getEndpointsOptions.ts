import { Endpoint } from "@/types/endpoint";
import { EndpointOption } from "@/types/EndpointOption";

export const getEndpointOptions = (
  permissions: Endpoint[]
): EndpointOption[] => {
  return permissions.flatMap((permission) => {
    const endpoints: EndpointOption[] = [];

    const routeName = permission.routeName;
    const routePath = `/${routeName?.toLowerCase()}`;

    if (permission.read) {
      endpoints.push({
        route: routePath,
        method: "GET",
        label: `Get ${permission.routeName}`,
      });
    }

    if (permission.create) {
      endpoints.push({
        route: routePath,
        method: "POST",
        label: `Create ${permission.routeName}`,
      });
    }

    if (permission.update) {
      endpoints.push({
        route: routePath,
        method: "PUT",
        label: `Edit ${permission.routeName}`,
      });
    }

    if (permission.delete) {
      endpoints.push({
        route: routePath,
        method: "DELETE",
        label: `Delete ${permission.routeName}`,
      });
    }

    return endpoints;
  });
};
