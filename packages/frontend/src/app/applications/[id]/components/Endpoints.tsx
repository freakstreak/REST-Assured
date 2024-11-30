import React from "react";

import { Button } from "@/components/ui/button";

type Props = {
  endpoints: string[];
};

const Endpoints = ({}: Props) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Endpoints have not been generated yet.
      </p>

      <Button>Generate Endpoints</Button>
    </div>
  );
};

export default Endpoints;
