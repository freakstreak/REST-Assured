import React from "react";

import { Button } from "@/components/ui/button";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateFeatures } from "@/services/draftSchemaService";

import { useToast } from "@/hooks/use-toast";

type Props = {
  applicationId: string | undefined;
  features: string[];
};

const Features = ({ applicationId }: Props) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { mutate: generateFeaturesMutation, isPending } = useMutation({
    mutationFn: generateFeatures,
  });

  const handleGenerateFeatures = () => {
    if (!applicationId) return;

    generateFeaturesMutation(applicationId, {
      onSuccess: () => {
        toast({
          title: "Features generated successfully",
          description: "Features have been generated successfully",
        });

        queryClient.invalidateQueries({
          queryKey: ["draftSchemas", applicationId.toString()],
        });
      },
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Features have not been generated yet.
      </p>

      <Button onClick={handleGenerateFeatures} disabled={isPending}>
        {isPending ? "Generating..." : "Generate Features"}
      </Button>
    </div>
  );
};

export default Features;
