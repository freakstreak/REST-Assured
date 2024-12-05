import React, { useCallback } from "react";

import Schema from "@/app/applications/[id]/components/Schema";
import Features from "@/app/applications/[id]/components/Features";
import Endpoints from "@/app/applications/[id]/components/Endpoints";
import Deployment from "@/app/applications/[id]/components/Deployment";
import Playground from "@/app/applications/[id]/components/Playground";

import { Step } from "@/types/step";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateStatus } from "@/services/applicationService";

type Props = {
  applicationId: string | undefined;
  status: Step;
};

const Output = ({ applicationId, status }: Props) => {
  const queryClient = useQueryClient();

  const { mutateAsync: updateStatusMutation, isPending } = useMutation({
    mutationFn: updateStatus,
  });

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

  const RenderedContent = useCallback(() => {
    switch (status) {
      case Step.FEATURES_GENERATION:
        return (
          <Features
            applicationId={applicationId}
            viewOnly={false}
            isActive={status === Step.FEATURES_GENERATION}
            handleNext={handleProceed}
            isLoading={isPending}
          />
        );
      case Step.SCHEMA:
        return (
          <Schema
            applicationId={applicationId}
            viewOnly={false}
            isActive={status === Step.SCHEMA}
            handleNext={handleProceed}
            isLoading={isPending}
          />
        );
      case Step.ENDPOINTS:
        return (
          <Endpoints
            applicationId={applicationId}
            viewOnly={false}
            handleNext={handleProceed}
            isLoading={isPending}
          />
        );
      case Step.DEPLOYMENT:
        return (
          <Deployment
            applicationId={applicationId}
            viewOnly={false}
            handleNext={handleProceed}
            isLoading={isPending}
          />
        );
      case Step.PLAYGROUND:
        return <Playground applicationId={applicationId} />;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, applicationId]);

  return (
    <div className="relative flex flex-col gap-y-3 pt-5 border-l border-gray-200 max-h-[90vh] overflow-auto">
      <RenderedContent />
    </div>
  );
};

export default Output;
