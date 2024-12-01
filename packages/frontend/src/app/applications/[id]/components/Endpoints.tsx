import React from "react";

import EndpointsTable from "@/app/applications/[id]/components/EndpointsTable";

import { getEndpoints } from "@/services/endpointService";

import { useQuery } from "@tanstack/react-query";

type Props = {
  applicationId: string | undefined;
  isGenerated: boolean;
};

const Endpoints = ({ applicationId, isGenerated }: Props) => {
  const { data: operations, isLoading: isLoadingOperations } = useQuery({
    queryKey: ["operations", applicationId?.toString()],
    enabled: !!isGenerated,
    queryFn: () => getEndpoints(applicationId as string),
  });

  return (
    <div className="space-y-3">
      {!isGenerated ? (
        <>
          <p className="text-sm text-gray-500">
            Endpoints have not been selected yet.
          </p>

          {/* <Button disabled={isDisabled}>Generate Endpoints</Button> */}
        </>
      ) : (
        <EndpointsTable
          selectedEndpoints={operations || []}
          loading={isLoadingOperations}
          endpoints={operations || []}
          viewOnly={true}
        />
      )}
    </div>
  );
};

export default Endpoints;
