import React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type Props = {
  method: string;
  handleMethodChange: (method: string) => void;
  url: string;
  handleUrlChange: (url: string) => void;
};

const RequestDetails = ({
  method,
  handleMethodChange,
  url,
  handleUrlChange,
}: Props) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Request Details</h3>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <Select
            value={method}
            onValueChange={(value) => handleMethodChange(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="HTTP Method" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Input
          type="text"
          className="flex-1 border border-gray-300 rounded p-2"
          placeholder="Endpoint URL"
          value={url}
          onChange={(e) => handleUrlChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RequestDetails;
