import React from "react";

import { Button } from "@/components/ui/button";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSchema, getSchemas } from "@/services/schemaServices";

import { useToast } from "@/hooks/use-toast";
import SchemaView from "@/app/applications/[id]/components/SchemaView";

type Props = {
  applicationId: string | undefined;
  isGenerated: boolean;
  isDisabled: boolean;
};

const Schema = ({ applicationId, isGenerated, isDisabled }: Props) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const { data: schemas } = useQuery({
    queryKey: ["schemas", applicationId?.toString()],
    queryFn: () => getSchemas(applicationId as string),
  });

  const { mutate: createSchemaMutation, isPending } = useMutation({
    mutationFn: createSchema,
  });

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

  return (
    <div className="space-y-3">
      {!isGenerated ? (
        <>
          <p className="text-sm text-gray-500">
            Schema has not been generated yet.
          </p>

          <Button
            onClick={handleCreateSchema}
            disabled={isPending || isDisabled}
          >
            {isPending ? "Generating..." : "Generate Schema"}
          </Button>
        </>
      ) : (
        <SchemaView loading={isPending} schemas={schemas} />
      )}
    </div>
  );
};

export default Schema;
