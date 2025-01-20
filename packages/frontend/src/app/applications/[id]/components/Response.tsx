import React from "react";

type Props = {
  responseBody: string;
};

const Response = ({ responseBody }: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Response</h3>

      <pre className="whitespace-normal">{responseBody}</pre>
    </div>
  );
};

export default Response;
