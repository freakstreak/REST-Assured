import React from "react";

import { Feature } from "@/types/feature";

type Props = {
  features: Feature[];
};

const FeatureList = ({ features }: Props) => {
  return (
    <div className="flex flex-col gap-y-2 bg-gray-100 rounded-lg p-4 mx-4">
      {features.map((feature, i) => (
        <div
          key={feature.application_id}
          data-last={i === features.length - 1}
          className="pb-2 border-b  data-[last=true]:border-b-0"
        >
          <h3 className="font-medium">{feature.name}:</h3>
          <p className="pl-2">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureList;
