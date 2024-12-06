import React, { useState } from "react";

import EndpointsTable from "@/app/applications/[id]/components/EndpointsTable";
import { Button } from "@/components/ui/button";

import {
  createOperationEndpoints,
  createOperations,
  getEndpoints,
} from "@/services/endpointService";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { Endpoint } from "@/types/endpoint";

import Image from "next/image";
import EmptyIcon from "@/public/icons/empty.svg";
import ArrowRightIcon from "@/public/icons/arrow-right-light.svg";
import { getSchemas } from "@/services/schemaServices";

type Props = {
  applicationId: string | undefined;
  viewOnly: boolean;
  isLoading?: boolean;
  handleNext?: () => void;
};

const Endpoints = ({
  applicationId,
  viewOnly,
  isLoading,
  handleNext,
}: Props) => {
  const [selectedEndpoints, setSelectedEndpoints] = useState<Endpoint[]>([]);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: endpoints, isLoading: isLoadingEndpoints } = useQuery({
    queryKey: ["endpoints", applicationId?.toString()],
    enabled: !!applicationId,
    queryFn: () => getEndpoints(applicationId as string),
  });

  const { data: schemas } = useQuery({
    queryKey: ["schemas", applicationId?.toString()],
    enabled: !!applicationId,
    queryFn: () => getSchemas(applicationId as string),
  });

  const showTable = endpoints && (endpoints?.length > 0 || !viewOnly);

  const { mutate: createEndpoints, isPending } = useMutation({
    mutationFn: createOperations,
  });

  const {
    mutate: createOperationEndpointsMutation,
    isPending: isCreatingOperationEndpoints,
  } = useMutation({
    mutationFn: createOperationEndpoints,
  });

  const getInitialEndpoints = () => {
    if (!endpoints?.length) {
      const endpoints = schemas?.map((schema) => ({
        name: schema.name,
        create: false,
        read: false,
        update: false,
        delete: false,
        applicationSchemaId: schema.id,
      }));

      return endpoints;
    }

    return endpoints;
  };

  const handleProceed = () => {
    createEndpoints(selectedEndpoints, {
      onSuccess: () => {
        createOperationEndpointsMutation(applicationId as string, {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["endpoints", applicationId?.toString()],
            });

            toast({
              title: "Endpoints generated successfully",
            });

            if (handleNext) {
              handleNext();
            }
          },
        });
      },
    });
  };

  return (
    <div className="space-y-3 h-full">
      {!showTable ? (
        <div className="flex flex-col items-center justify-center gap-y-5 h-full">
          <Image src={EmptyIcon} alt="empty" className="w-48 h-48" />

          <p className="text-sm text-gray-500">
            Endpoints have not been selected yet.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-y-3 h-full mx-4">
          <EndpointsTable
            loading={isLoadingEndpoints}
            endpoints={getInitialEndpoints() || []}
            viewOnly={viewOnly}
            selectedEndpoints={selectedEndpoints}
            setSelectedEndpoints={setSelectedEndpoints}
          />

          {!viewOnly && (
            <div className="flex flex-col gap-y-2 items-center justify-between bg-background w-full sticky bottom-0 mt-auto z-10 py-4 border-t border-gray-200">
              <Button
                onClick={handleProceed}
                disabled={
                  isPending || isCreatingOperationEndpoints || isLoading
                }
                data-loading={
                  isPending || isCreatingOperationEndpoints || isLoading
                }
                className="self-center group data-[loading='true']:animate-pulse"
              >
                {isPending
                  ? "Selecting Endpoints"
                  : isCreatingOperationEndpoints
                  ? "Generating Endpoints"
                  : "Proceed"}

                <Image
                  src={ArrowRightIcon}
                  alt="arrow-right"
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Endpoints;
