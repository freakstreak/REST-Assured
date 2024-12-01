import React from "react";

import { Button } from "@/components/ui/button";
import EndpointsTable from "@/app/applications/[id]/components/EndpointsTable";

import { Endpoint } from "@/types/endpoint";

export const endpoints: Endpoint[] = [
  {
    name: "users",
    create: true,
    read: true,
    update: true,
    delete: true,
  },
  {
    name: "products",
    create: true,
    read: true,
    update: true,
    delete: false,
  },
  {
    name: "orders",
    create: true,
    read: true,
    update: false,
    delete: false,
  },
  {
    name: "categories",
    create: true,
    read: true,
    update: false,
    delete: false,
  },
];

type Props = {
  isDisabled: boolean;
  isGenerated: boolean;
};

const Endpoints = ({ isDisabled, isGenerated }: Props) => {
  // toast

  // query

  // mutation

  // create handler

  return (
    <div className="space-y-3">
      {!isGenerated ? (
        <>
          <p className="text-sm text-gray-500">
            Endpoints have not been selected yet.
          </p>

          <Button disabled={isDisabled}>Generate Endpoints</Button>
        </>
      ) : (
        <EndpointsTable endpoints={endpoints} viewOnly={true} />
      )}
    </div>
  );
};

export default Endpoints;
