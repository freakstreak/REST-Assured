import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import DeleteIcon from "@/public/icons/delete.svg";

type Props = {
  formFields: { key: string; value: string }[];
  addField: () => void;
  removeField: (index: number) => void;
  handleFormFieldChange: (
    index: number,
    field: "key" | "value",
    value: string
  ) => void;
};

const RequestBody = ({
  formFields,
  addField,
  removeField,
  handleFormFieldChange,
}: Props) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Request Body</h3>

        <Button variant="outline" size="sm" onClick={addField}>
          + Add Field
        </Button>
      </div>

      <div className="space-y-2">
        {formFields.map((field, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input
              placeholder="Field name"
              value={field.key}
              onChange={(e) =>
                handleFormFieldChange(index, "key", e.target.value)
              }
              className="flex-1"
            />
            <Input
              placeholder="Value"
              value={field.value}
              onChange={(e) =>
                handleFormFieldChange(index, "value", e.target.value)
              }
              className="flex-1"
            />

            {formFields.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeField(index)}
                className="text-red-500"
              >
                <Image src={DeleteIcon} alt="Delete" className="w-4 h-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestBody;
