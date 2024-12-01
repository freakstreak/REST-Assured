import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const ApiPlayground = () => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [requestBody, setRequestBody] = useState<string>("");
  const [responseBody, setResponseBody] = useState<string>("");

  const handleApiCall = async () => {
    try {
      const response = await fetch(`http://localhost:3010${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: method !== "GET" && method !== "DELETE" ? requestBody : undefined,
      });

      const data = await response.json();

      setResponseBody(JSON.stringify(data));
    } catch (error) {
      console.error(error);
      setResponseBody(JSON.stringify(error));
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white shadow rounded">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Endpoint Details</h3>

        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Select
              defaultValue={method}
              onValueChange={(value) => setMethod(value)}
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
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold">Request Body (JSON format)</h3>

        <Textarea
          value={requestBody}
          onChange={(e) => setRequestBody(e.target.value)}
          placeholder="Enter your JSON body here"
          rows={5}
          className="border border-gray-300 rounded p-2 bg-gray-50 text-gray-900 font-mono"
        />
      </div>

      <Button onClick={handleApiCall}>Send Request</Button>

      <div className="space-y-4">
        <h3 className="font-semibold">Response Body</h3>

        <pre className="whitespace-normal">{responseBody}</pre>
      </div>
    </div>
  );
};

export default ApiPlayground;
