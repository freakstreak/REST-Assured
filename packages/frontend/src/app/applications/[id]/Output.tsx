import React, { useCallback, useMemo, useState } from "react";

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
import { getSchemas } from "@/services/schemaServices";

type Props = {
  applicationId: string | undefined;
  status: Step;
};

const Output = ({ applicationId, status }: Props) => {
  const [feedback, setFeedback] = useState("");
  const queryClient = useQueryClient();

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
    enabled: !!applicationId && status === Step.SCHEMA,
    queryFn: () => getSchemas(applicationId as string),
  });

  const { mutate: updateStatusMutation, isPending } = useMutation({
    mutationFn: updateStatus,
  });

  const activeData = useMemo(() => {
    switch (status) {
      case Step.FEATURES_GENERATION:
        return draftSchemas?.json;
      case Step.SCHEMA:
        return schemas;
    }
  }, [status, draftSchemas, schemas]);

  const RenderedContent = useCallback(() => {
    switch (status) {
      case Step.FEATURES_GENERATION:
        return (
          <FeatureList
            loading={isUpdatingDraftSchema}
            features={draftSchemas?.json}
          />
        );
      case Step.SCHEMA:
        return <SchemaView loading={isUpdatingDraftSchema} schemas={schemas} />;
    }
  }, [status, draftSchemas, isUpdatingDraftSchema, schemas]);

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(e.target.value);
  };

  const handleProceed = () => {
    const steps = Object.values(Step);
    const nextStep = steps[steps.indexOf(status) + 1];

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

  return (
    <div className="relative flex flex-col gap-y-3 pt-5 border-l border-gray-200 max-h-screen overflow-auto">
      {activeData && activeData.length > 0 ? (
        <RenderedContent />
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

      {activeData && (
        <div className="flex flex-col gap-y-2 items-center justify-between bg-white w-full sticky bottom-0 mt-auto z-10 py-4 border-t border-gray-200">
          <Button
            onClick={handleProceed}
            disabled={isPending}
            className="self-center group"
          >
            Proceed
            <Image
              src={ArrowRightIcon}
              alt="arrow-right"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </Button>

          {status !== Step.SCHEMA && (
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
