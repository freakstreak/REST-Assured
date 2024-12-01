import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FeatureList from "@/app/applications/[id]/FeatureList";
import SchemaView from "@/app/applications/[id]/components/SchemaView";

import Image from "next/image";
import ArrowRightIcon from "@/public/icons/arrow-right-light.svg";
import SendIcon from "@/public/icons/send.svg";
import EmptyIcon from "@/public/icons/empty.svg";

import { Step } from "@/types/step";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  getDraftSchemas,
  updateDraftSchema,
} from "@/services/draftSchemaService";
import { updateStatus } from "@/services/applicationService";
import { getSchemas, generateSchema } from "@/services/schemaServices";

import { useToast } from "@/hooks/use-toast";
import { useApplicationContext } from "@/contexts/ApplicationContext";
import {
  createOperationEndpoints,
  createOperations,
  getEndpoints,
} from "@/services/endpointService";
import EndpointsTable from "@/app/applications/[id]/components/EndpointsTable";
import Playground from "@/app/applications/[id]/components/Playground";

import { Endpoint } from "@/types/endpoint";

type Props = {
  applicationId: string | undefined;
  status: Step;
};

const Output = ({ applicationId, status }: Props) => {
  const [feedback, setFeedback] = useState("");
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [selectedEndpoints, setSelectedEndpoints] = useState<Endpoint[]>([]);

  const { loadingFeatures, loadingSchema } = useApplicationContext();

  //  draft schemas
  const { data: draftSchemas } = useQuery({
    queryKey: ["draftSchemas", applicationId?.toString()],
    enabled: !!applicationId && status === Step.FEATURES_GENERATION,
    queryFn: () => getDraftSchemas(applicationId as string),
  });

  const {
    mutate: updateDraftSchemaMutation,
    isPending: isUpdatingDraftSchema,
  } = useMutation({
    mutationFn: updateDraftSchema,
  });

  // schemas
  const { data: schemas } = useQuery({
    queryKey: ["schemas", applicationId?.toString()],
    enabled:
      !!applicationId && (status === Step.SCHEMA || status === Step.ENDPOINTS),
    queryFn: () => getSchemas(applicationId as string),
  });

  const { mutateAsync: updateStatusMutation, isPending } = useMutation({
    mutationFn: updateStatus,
  });

  const { mutate: generateSchemaMutation, isPending: isGeneratingSchema } =
    useMutation({
      mutationFn: generateSchema,
    });

  // endpoints
  const { data: endpoints, isPending: isLoadingEndpoints } = useQuery({
    queryKey: ["operations", applicationId?.toString()],
    enabled: !!applicationId,
    queryFn: () => getEndpoints(applicationId as string),
  });

  const { mutate: createEndpoints } = useMutation({
    mutationFn: createOperations,
  });

  const {
    mutate: createOperationEndpointsMutation,
    isPending: isCreatingOperationEndpoints,
  } = useMutation({
    mutationFn: createOperationEndpoints,
  });

  const activeData = useMemo(() => {
    switch (status) {
      case Step.FEATURES_GENERATION:
        return draftSchemas?.json;
      case Step.SCHEMA:
        return schemas;
      case Step.ENDPOINTS:
        return endpoints;
    }
  }, [status, draftSchemas, schemas, endpoints]);

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(e.target.value);
  };

  const handleProceed = () => {
    const steps = Object.values(Step);
    const nextStep = steps[steps.indexOf(status) + 1];

    if (status === Step.SCHEMA) {
      generateSchemaMutation(applicationId as string, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["schemas", applicationId?.toString()],
          });

          toast({
            title: "Schema generated successfully",
          });

          updateStatusMutation(
            { id: applicationId as string, status: nextStep },
            {
              onSuccess: () => {
                queryClient.invalidateQueries({
                  queryKey: ["application", applicationId?.toString()],
                });
              },
            }
          );
        },
      });
    } else if (status === Step.ENDPOINTS) {
      createEndpoints(selectedEndpoints, {
        onSuccess: () => {
          createOperationEndpointsMutation(applicationId as string, {
            onSuccess: () => {
              updateStatusMutation(
                { id: applicationId as string, status: nextStep },
                {
                  onSuccess: () => {
                    queryClient.invalidateQueries({
                      queryKey: ["operations", applicationId?.toString()],
                    });

                    queryClient.invalidateQueries({
                      queryKey: ["application", applicationId?.toString()],
                    });

                    toast({
                      title: "Endpoints generated successfully",
                    });
                  },
                }
              );
            },
          });
        },
      });
    } else {
      updateStatusMutation(
        { id: applicationId as string, status: nextStep },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ["application", applicationId?.toString()],
            });
          },
        }
      );
    }
  };

  const handleUpdateDraftSchema = () => {
    setFeedback("");

    updateDraftSchemaMutation(
      {
        draftSchemaId: draftSchemas?.id?.toString() as string,
        feedback: feedback,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["draftSchemas", applicationId?.toString()],
          });
        },
      }
    );
  };

  const RenderedContent = useCallback(() => {
    switch (status) {
      case Step.FEATURES_GENERATION:
        return (
          <FeatureList
            loading={isUpdatingDraftSchema || loadingFeatures}
            features={draftSchemas?.json}
          />
        );
      case Step.SCHEMA:
        return (
          <SchemaView
            loading={isUpdatingDraftSchema || loadingSchema}
            schemas={schemas}
          />
        );
    }
  }, [
    status,
    draftSchemas,
    isUpdatingDraftSchema,
    schemas,
    loadingFeatures,
    loadingSchema,
  ]);

  const RenderedEndpoints = useCallback(() => {
    const getEndpoints = () => {
      if (!endpoints) {
        const endpoints = schemas?.map((schema) => ({
          name: schema.name,
          create: false,
          read: false,
          update: false,
          delete: false,
        }));

        return endpoints;
      }

      return endpoints;
    };

    return (
      <EndpointsTable
        loading={isLoadingEndpoints}
        endpoints={getEndpoints()}
        viewOnly={false}
        selectedEndpoints={selectedEndpoints}
        setSelectedEndpoints={setSelectedEndpoints}
      />
    );
  }, [endpoints, selectedEndpoints, isLoadingEndpoints, schemas]);

  useEffect(() => {
    if (schemas) {
      const points = schemas?.map((schema) => ({
        name: schema.name,
        applicationSchemaId: schema.id,
        create: false,
        read: false,
        update: false,
        delete: false,
      }));

      setSelectedEndpoints(points);
    }
  }, [schemas]);

  return (
    <div className="relative flex flex-col gap-y-3 pt-5 border-l border-gray-200 max-h-screen overflow-auto">
      {(activeData && activeData.length > 0) ||
      loadingSchema ||
      loadingFeatures ? (
        <RenderedContent />
      ) : status === Step.ENDPOINTS ? (
        <div className="mx-4">
          <RenderedEndpoints />
        </div>
      ) : status === Step.PLAYGROUND ? (
        <Playground />
      ) : (
        <div className="flex flex-col flex-1 gap-y-4 justify-center items-center px-8">
          <Image src={EmptyIcon} alt="empty" className="w-48 h-48" />

          <p className="text-center">
            You have not yet completed the{" "}
            <span className="font-semibold">{status}</span> step. Go to the{" "}
            <span className="font-semibold">{status}</span> section to proceed.
          </p>
        </div>
      )}

      {/*  */}
      {((activeData && activeData.length > 0) ||
        (selectedEndpoints && selectedEndpoints.length > 0)) && (
        <div className="flex flex-col gap-y-2 items-center justify-between bg-white w-full sticky bottom-0 mt-auto z-10 py-4 border-t border-gray-200">
          <Button
            onClick={handleProceed}
            disabled={
              isPending || isGeneratingSchema || isCreatingOperationEndpoints
            }
            data-loading={isGeneratingSchema || isCreatingOperationEndpoints}
            className="self-center group data-[loading='true']:animate-pulse"
          >
            {isGeneratingSchema
              ? "Generating Schema"
              : isCreatingOperationEndpoints
              ? "Creating Endpoints"
              : "Proceed"}

            <Image
              src={ArrowRightIcon}
              alt="arrow-right"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </Button>

          {status === Step.FEATURES_GENERATION && (
            <>
              <span className="text-sm text-gray-500 self-center">OR</span>

              <div className="w-full px-4 flex items-center gap-x-2">
                <Input
                  value={feedback}
                  onChange={handleFeedbackChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUpdateDraftSchema();
                    }
                  }}
                  placeholder="Suggest changes"
                />

                <Button
                  disabled={
                    isUpdatingDraftSchema || !feedback.trim() || isPending
                  }
                  onClick={handleUpdateDraftSchema}
                >
                  <Image src={SendIcon} alt="send" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Output;
