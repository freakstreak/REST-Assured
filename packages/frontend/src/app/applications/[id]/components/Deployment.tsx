import React from "react";

import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

import { useToast } from "@/hooks/use-toast";
import { startDeployment } from "@/services/applicationService";
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

  const handleDeployment = async () => {
    if (!applicationId) return;

    deployment(applicationId, {
      onSuccess: () => {
        toast({
          title: "Deployment started successfully",
        });

        setIsDeploying(true);
      },
    });
  };

  // read and show deployment.log file

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Deployment has not been started yet.
      </p>

      <Button
        onClick={handleDeployment}
        disabled={isDisabled || isPending || isDeploying}
      >
        Start Deployment
      </Button>

      {/* read deplyment file  */}
    </div>
  );
};

export default Deployment;
