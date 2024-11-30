import React from "react";

import { Button } from "@/components/ui/button";
type Props = {
  status: "pending" | "deploying" | "deployed";
};

const Deployment = ({}: Props) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Deployment has not been started yet.
      </p>

      <Button>Start Deployment</Button>
    </div>
  );
};

export default Deployment;
