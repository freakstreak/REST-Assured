import React from "react";

import { Button } from "@/components/ui/button";

type Props = {
  schema: string[];
};

const Schema = ({}: Props) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Schema has not been generated yet.
      </p>

      <Button>Generate Schema</Button>
    </div>
  );
};

export default Schema;
