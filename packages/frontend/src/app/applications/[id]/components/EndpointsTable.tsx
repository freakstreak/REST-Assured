import React, { useEffect } from "react";

import { Endpoint } from "@/types/endpoint";
import { titleCase } from "@/lib/titleCase";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  loading: boolean;
  endpoints: Endpoint[] | undefined;
  viewOnly: boolean;
  selectedEndpoints: Endpoint[];
  setSelectedEndpoints?: React.Dispatch<React.SetStateAction<Endpoint[]>>;
};

const EndpointsTable = ({
  loading,
  endpoints,
  viewOnly,
  selectedEndpoints,
  setSelectedEndpoints,
}: Props) => {
  const handleCheck = (
    name: string,
    action: "create" | "read" | "update" | "delete",
    schemaId: string
  ) => {
    if (!setSelectedEndpoints) return;

    // if the name is not present in selected endpoints, add it
    const isExisting = selectedEndpoints.find((e) => e.name === name);

    if (isExisting) {
      setSelectedEndpoints((prev) => {
        return prev.map((e) =>
          e.name === name
            ? {
                ...e,
                [action]: !e[action],
              }
            : e
        );
      });
    } else {
      const newEndpoint: Endpoint = {
        name,
        [action]: true,
        applicationSchemaId: schemaId,
      };

      setSelectedEndpoints((prev) => [...prev, newEndpoint]);
    }
  };

  useEffect(() => {
    if (endpoints && viewOnly && setSelectedEndpoints) {
      setSelectedEndpoints(endpoints);
    }
  }, [endpoints, viewOnly, setSelectedEndpoints]);

  return (
    <div className="space-y-3 rounded-md">
      <h2 className="text-lg font-medium">Endpoints</h2>

      {loading ? (
        <Skeleton className="w-full h-72" />
      ) : (
        <Table className="border-collapse border rounded-md">
          <TableHeader>
            <TableRow className="font-medium bg-gray-100">
              <TableHead align="center">Endpoint</TableHead>
              <TableHead align="center" className="text-center">
                Create
              </TableHead>
              <TableHead align="center" className="text-center">
                Read
              </TableHead>
              <TableHead align="center" className="text-center">
                Update
              </TableHead>
              <TableHead align="center" className="text-center">
                Delete
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {endpoints?.map((endpoint) => {
              const selected = selectedEndpoints.find((e) => {
                const name = e.name || e.routeName;

                return name === (endpoint.name || endpoint.routeName);
              });

              const name = endpoint.name || endpoint.routeName;

              return (
                <TableRow key={endpoint.name}>
                  <TableCell>{titleCase(name || "")}</TableCell>

                  <TableCell align="center" className="my-auto">
                    <input
                      type="checkbox"
                      className="text-sm"
                      checked={!!selected?.create}
                      onChange={() =>
                        handleCheck(
                          name || "",
                          "create",
                          endpoint.applicationSchemaId || ""
                        )
                      }
                      name={`${name}-create`}
                      disabled={viewOnly}
                    />
                  </TableCell>

                  <TableCell align="center" className="my-auto">
                    <input
                      type="checkbox"
                      className="text-sm"
                      checked={!!selected?.read}
                      onChange={() =>
                        handleCheck(
                          name || "",
                          "read",
                          endpoint.applicationSchemaId || ""
                        )
                      }
                      name={`${name}-read`}
                      disabled={viewOnly}
                    />
                  </TableCell>

                  <TableCell align="center" className="my-auto">
                    <input
                      type="checkbox"
                      className="text-sm"
                      checked={!!selected?.update}
                      onChange={() =>
                        handleCheck(
                          name || "",
                          "update",
                          endpoint.applicationSchemaId || ""
                        )
                      }
                      name={`${name}-update`}
                      disabled={viewOnly}
                    />
                  </TableCell>

                  <TableCell align="center" className="my-auto">
                    <input
                      type="checkbox"
                      className="text-sm"
                      checked={!!selected?.delete}
                      onChange={() =>
                        handleCheck(
                          name || "",
                          "delete",
                          endpoint.applicationSchemaId || ""
                        )
                      }
                      name={`${name}-delete`}
                      disabled={viewOnly}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default EndpointsTable;
