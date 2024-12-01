import React, { useState } from "react";

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

type Props = {
  endpoints: Endpoint[];
  viewOnly: boolean;
};

const EndpointsTable = ({ endpoints, viewOnly }: Props) => {
  const [selectedEndpoints, setSelectedEndpoints] =
    useState<Endpoint[]>(endpoints);

  const handleCheck = (
    name: string,
    action: "create" | "read" | "update" | "delete"
  ) => {
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
    <Table className="border-collapse border">
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
        {endpoints.map((endpoint, i) => (
          <TableRow key={endpoint.name}>
            <TableCell>{titleCase(endpoint.name)}</TableCell>

            <TableCell align="center" className="my-auto">
              <input
                type="checkbox"
                className="text-sm"
                checked={selectedEndpoints[i].create}
                onChange={() => handleCheck(endpoint.name, "create")}
                name={`${endpoint.name}-create`}
                disabled={viewOnly}
              />
            </TableCell>

            <TableCell align="center" className="my-auto">
              <input
                type="checkbox"
                className="text-sm"
                checked={selectedEndpoints[i].read}
                onChange={() => handleCheck(endpoint.name, "read")}
                name={`${endpoint.name}-read`}
                disabled={viewOnly}
              />
            </TableCell>

            <TableCell align="center" className="my-auto">
              <input
                type="checkbox"
                className="text-sm"
                checked={selectedEndpoints[i].update}
                onChange={() => handleCheck(endpoint.name, "update")}
                name={`${endpoint.name}-update`}
                disabled={viewOnly}
              />
            </TableCell>

            <TableCell align="center" className="my-auto">
              <input
                type="checkbox"
                className="text-sm"
                checked={selectedEndpoints[i].delete}
                onChange={() => handleCheck(endpoint.name, "delete")}
                name={`${endpoint.name}-delete`}
                disabled={viewOnly}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EndpointsTable;
