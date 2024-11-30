import React from "react";

import { Button } from "@/components/ui/button";

type Props = {
  operations: string[];
};

const Operations = ({}: Props) => {
  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        Operations have not been selected yet.
      </p>

      <Button>Select Operations</Button>
    </div>
  );
};

export default Operations;
