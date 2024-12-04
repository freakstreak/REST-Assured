import React from "react";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { startDeployment } from "@/services/applicationService";

type Props = {
  applicationId: string | undefined;
  viewOnly: boolean;
  isLoading?: boolean;
  handleNext?: () => void;
};

const Deployment = ({ applicationId, viewOnly, handleNext }: Props) => {
  const { mutate: deployment, isPending } = useMutation({
    mutationFn: startDeployment,
  });

  const { toast } = useToast();

  const handleDeployment = async () => {
    if (!applicationId) return;

    deployment(applicationId, {
      onSuccess: () => {
        toast({
          title: "Deployment started successfully",
        });

        if (handleNext) {
          handleNext();
        }
      },
    });
  };

  return (
    <div className="space-y-3 h-full  flex flex-col items-center justify-center">
      <p
        data-view-only={viewOnly}
        className="text-sm text-gray-500 data-[view-only=true]:mr-auto"
      >
        Deployment has not been started yet.{" "}
        {!viewOnly && (
          <span className="text-blue-500">Start deployment to continue.</span>
        )}
      </p>

      {!viewOnly && (
        <Button onClick={handleDeployment} disabled={viewOnly || isPending}>
          {isPending ? "Deploying..." : "Start Deployment"}
        </Button>
      )}
    </div>
  );
};

export default Deployment;
