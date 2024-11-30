import React from "react";

type Props = {
  name: string;
  description: string;
};

const Details = ({ name, description }: Props) => {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <p className="text-sm font-medium">Name</p>
        <p className="text-sm border rounded-md p-1.5 bg-gray-50">{name}</p>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium">Description</p>
        <p className="text-sm border rounded-md p-1.5 bg-gray-50">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Details;
