import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import FeatureList from "@/app/applications/[id]/FeatureList";
import { Input } from "@/components/ui/input";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  generateFeatures,
  getDraftSchemas,
  updateDraftSchema,
} from "@/services/draftSchemaService";

import { useToast } from "@/hooks/use-toast";

import Image from "next/image";
import EmptyIcon from "@/public/icons/empty.svg";
import ArrowRightIcon from "@/public/icons/arrow-right-light.svg";
import SendIcon from "@/public/icons/send.svg";

type Props = {
  applicationId: string | undefined;
  viewOnly: boolean;
  isActive: boolean;
  isLoading?: boolean;
  handleNext?: () => void;
};

const Features = ({
  applicationId,
  viewOnly,
  isActive,
  isLoading,
  handleNext,
}: Props) => {
  const [feedback, setFeedback] = useState("");

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: draftSchemas } = useQuery({
    queryKey: ["draftSchemas", applicationId?.toString()],
    enabled: !!applicationId,
    queryFn: () => getDraftSchemas(applicationId as string),
  });

  const { mutate: generateFeaturesMutation, isPending } = useMutation({
    mutationFn: generateFeatures,
  });

  const {
    mutate: updateDraftSchemaMutation,
    isPending: isUpdatingDraftSchema,
  } = useMutation({
    mutationFn: updateDraftSchema,
  });

  const isGenerated =
    draftSchemas?.json && Object.keys(draftSchemas?.json).length > 0;
  const displayFeatures = viewOnly ? !isActive && isGenerated : isGenerated;

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeedback(e.target.value);
  };

  const handleGenerateFeatures = () => {
    if (!applicationId) return;

    generateFeaturesMutation(applicationId, {
      onSuccess: () => {
        toast({
          title: "Features generated successfully",
        });

        queryClient.invalidateQueries({
          queryKey: ["draftSchemas", applicationId.toString()],
        });
      },
    });
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

  const handleProceed = () => {
    if (handleNext) {
      handleNext();
    }
  };

  return (
    <div className="space-y-3 h-full">
      {!displayFeatures ? (
        <div className="flex flex-col items-center justify-center gap-y-5 h-full">
          <Image src={EmptyIcon} alt="empty" className="w-48 h-48" />

          <p className="text-sm text-gray-500">
            Features have not been generated yet.{" "}
            {!viewOnly && (
              <span className="text-blue-500">
                Generate features to continue.
              </span>
            )}
          </p>

          {!viewOnly && (
            <Button onClick={handleGenerateFeatures} disabled={isPending}>
              {isPending ? "Generating..." : "Generate Features"}
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-y-3 h-full">
          <FeatureList
            loading={isPending || isUpdatingDraftSchema}
            features={draftSchemas?.json}
          />

          {!viewOnly && (
            <div className="flex flex-col gap-y-2 items-center justify-between bg-white w-full sticky bottom-0 mt-auto z-10 py-4 border-t border-gray-200">
              <Button
                onClick={handleProceed}
                disabled={isPending || isLoading}
                data-loading={isPending || isLoading}
                className="self-center group data-[loading='true']:animate-pulse"
              >
                {isPending ? "Generating Features" : "Proceed"}

                <Image
                  src={ArrowRightIcon}
                  alt="arrow-right"
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                />
              </Button>

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
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Features;
