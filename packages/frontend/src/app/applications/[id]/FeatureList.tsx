import React from "react";

import { DraftSchema } from "@/types/draftSchema";
import { titleCase } from "@/lib/titleCase";

import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  features: DraftSchema["json"] | undefined;
  loading: boolean;
};

const FeatureList = ({ features, loading }: Props) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-lg font-medium px-4">Features/Models</h2>

      <div className="flex flex-col gap-y-2 bg-gray-100 rounded-lg p-4 mx-4">
        {loading ? (
          <Skeleton className="w-full h-72">
            <div className="flex flex-col justify-between gap-y-5">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-8" />
            </div>
          </Skeleton>
        ) : (
          features?.map((feature, i) => (
            <div
              key={feature.schemaName}
              data-last={i === features.length - 1}
              className="pb-2 border-b  data-[last=true]:border-b-0"
            >
              <h3 className="font-medium">
                {titleCase(feature.schemaName.replace("/", ""))}:
              </h3>

              <p className="pl-2">{feature.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeatureList;
