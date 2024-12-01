import React from "react";

import { Button } from "@/components/ui/button";
type Props = {
  isDisabled: boolean;
};

const Deployment = ({ isDisabled }: Props) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Deployment has not been started yet.
      </p>

      <Button disabled={isDisabled}>Start Deployment</Button>
    </div>
  );
};

export default Deployment;
