import React from "react";

import { Button } from "@/components/ui/button";

type Props = {
  isDisabled: boolean;
};

const Operations = ({ isDisabled }: Props) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Operations have not been generated yet.
      </p>

      <Button disabled={isDisabled}>Select Operations</Button>
    </div>
  );
};

export default Operations;
