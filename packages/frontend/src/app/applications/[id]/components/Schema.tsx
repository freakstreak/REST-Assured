import React from "react";

import { Button } from "@/components/ui/button";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSchema,
  generateSchema,
  getSchemas,
} from "@/services/schemaServices";

import { useToast } from "@/hooks/use-toast";
import SchemaView from "@/app/applications/[id]/components/SchemaView";

import Image from "next/image";
import EmptyIcon from "@/public/icons/empty.svg";
import ArrowRightIcon from "@/public/icons/arrow-right-light.svg";

type Props = {
  applicationId: string | undefined;
  viewOnly: boolean;
  isActive: boolean;
  isLoading?: boolean;
  handleNext?: () => void;
};

const Schema = ({
  applicationId,
  viewOnly,
  isActive,
  isLoading,
  handleNext,
}: Props) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: schemas } = useQuery({
    queryKey: ["schemas", applicationId?.toString()],
    enabled: !!applicationId,
    queryFn: () => getSchemas(applicationId as string),
  });

  const { mutate: createSchemaMutation, isPending } = useMutation({
    mutationFn: createSchema,
  });

  const { mutate: generateSchemaMutation, isPending: isGeneratingSchema } =
    useMutation({
      mutationFn: generateSchema,
    });

  const isGenerated = schemas?.length && schemas?.length > 0;
  const displaySchema = viewOnly ? !isActive && isGenerated : isGenerated;

  const handleCreateSchema = () => {
    if (!applicationId) return;

    createSchemaMutation(applicationId, {
      onSuccess: () => {
        toast({
          title: "Schema created successfully",
        });

        queryClient.invalidateQueries({
          queryKey: ["schemas", applicationId?.toString()],
        });
      },
    });
  };

  const handleProceed = () => {
    if (!applicationId) return;

    generateSchemaMutation(applicationId, {
      onSuccess: () => {
        toast({
          title: "Schema generated successfully",
        });

        if (handleNext) {
          handleNext();
        }
      },
    });
  };

  return (
    <div className="space-y-3 h-full">
      {!displaySchema ? (
        <div className="flex flex-col items-center justify-center gap-y-5 h-full">
          <Image src={EmptyIcon} alt="empty" className="w-48 h-48" />

          <p className="text-sm text-gray-500">
            Schema has not been generated yet.{" "}
            {!viewOnly && (
              <span className="text-blue-500">
                Generate schema to continue.
              </span>
            )}
          </p>

          {!viewOnly && (
            <Button onClick={handleCreateSchema} disabled={isPending}>
              {isPending ? "Generating..." : "Generate Schema"}
            </Button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-y-3 h-full">
          <SchemaView loading={isPending} schemas={schemas} />

          {!viewOnly && (
            <div className="flex flex-col gap-y-2 items-center justify-between bg-background w-full sticky bottom-0 mt-auto z-10 py-4 border-t border-gray-200">
              <Button
                onClick={handleProceed}
                disabled={isPending || isGeneratingSchema || isLoading}
                data-loading={isPending || isGeneratingSchema || isLoading}
                className="self-center group data-[loading='true']:animate-pulse"
              >
                {isPending
                  ? "Creating Schema"
                  : isGeneratingSchema
                  ? "Generating Schema"
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

export default Schema;
