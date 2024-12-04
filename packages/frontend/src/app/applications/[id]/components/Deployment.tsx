import React from "react";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { startDeployment, updateStatus } from "@/services/applicationService";
import { Step } from "@/types/step";
type Props = {
  isDisabled: boolean;
  applicationId: string | undefined;
  isGenerated: boolean;
};

const Deployment = ({ isDisabled, applicationId }: Props) => {
  const { mutate: deployment, isPending } = useMutation({
    mutationFn: startDeployment,
  });

  const { toast } = useToast();

  const [isDeploying, setIsDeploying] = React.useState(false);

  const queryClient = useQueryClient();

  const { mutateAsync: updateStatusMutation, isPending: isUpdatingStatus } =
    useMutation({
      mutationFn: updateStatus,
    });

  const handleDeployment = async () => {
    if (!applicationId) return;

    deployment(applicationId, {
      onSuccess: () => {
        toast({
          title: "Deployment started successfully",
        });

        setIsDeploying(true);

        updateStatusMutation(
          { id: applicationId as string, status: Step.PLAYGROUND },
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
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Deployment has not been started yet.
      </p>

      <Button
        onClick={handleDeployment}
        disabled={isDisabled || isPending || isDeploying || isUpdatingStatus}
      >
        Start Deployment
      </Button>
    </div>
  );
};

export default Deployment;
