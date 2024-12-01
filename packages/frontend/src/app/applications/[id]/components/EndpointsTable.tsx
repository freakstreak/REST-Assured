import React from "react";

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
    action: "create" | "read" | "update" | "delete"
  ) => {
    if (!setSelectedEndpoints) return;

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
  };

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-medium">Endpoints</h2>

      {loading ? (
        <Skeleton className="w-full h-72" />
      ) : (
        <Table className="border-collapse border ">
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
            {endpoints?.map((endpoint, i) => (
              <TableRow key={endpoint.name}>
                <TableCell>
                  {titleCase(endpoint.name || endpoint.routeName || "")}
                </TableCell>

                <TableCell align="center" className="my-auto">
                  <input
                    type="checkbox"
                    className="text-sm"
                    checked={selectedEndpoints[i]?.create}
                    onChange={() =>
                      handleCheck(
                        endpoint.name || endpoint.routeName || "",
                        "create"
                      )
                    }
                    name={`${endpoint.name}-create`}
                    disabled={viewOnly}
                  />
                </TableCell>

                <TableCell align="center" className="my-auto">
                  <input
                    type="checkbox"
                    className="text-sm"
                    checked={selectedEndpoints[i]?.read}
                    onChange={() =>
                      handleCheck(
                        endpoint.name || endpoint.routeName || "",
                        "read"
                      )
                    }
                    name={`${endpoint.name}-read`}
                    disabled={viewOnly}
                  />
                </TableCell>

                <TableCell align="center" className="my-auto">
                  <input
                    type="checkbox"
                    className="text-sm"
                    checked={selectedEndpoints[i]?.update}
                    onChange={() =>
                      handleCheck(
                        endpoint.name || endpoint.routeName || "",
                        "update"
                      )
                    }
                    name={`${endpoint.name}-update`}
                    disabled={viewOnly}
                  />
                </TableCell>

                <TableCell align="center" className="my-auto">
                  <input
                    type="checkbox"
                    className="text-sm"
                    checked={selectedEndpoints[i]?.delete}
                    onChange={() =>
                      handleCheck(
                        endpoint.name || endpoint.routeName || "",
                        "delete"
                      )
                    }
                    name={`${endpoint.name}-delete`}
                    disabled={viewOnly}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default EndpointsTable;
