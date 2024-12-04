import React, { useMemo, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import RequestDetails from "@/app/applications/[id]/components/RequestDetails";
import RequestBody from "@/app/applications/[id]/components/RequestBody";
import Response from "@/app/applications/[id]/components/Response";

import { useQuery } from "@tanstack/react-query";

import { getEndpoints } from "@/services/endpointService";

import { getEndpointOptions } from "@/lib/getEndpointsOptions";

type Props = {
  applicationId: string | undefined;
};

const Playground = ({ applicationId }: Props) => {
  const [method, setMethod] = useState("GET");
  const [url, setUrl] = useState("");
  const [responseBody, setResponseBody] = useState<string>("");
  const [formFields, setFormFields] = useState<
    Array<{ key: string; value: string }>
  >([{ key: "", value: "" }]);

  const { data: endpoints } = useQuery({
    queryKey: ["endpoints"],
    enabled: !!applicationId,
    queryFn: () => getEndpoints(applicationId as string),
  });

  const endpointOptions = useMemo(() => {
    return getEndpointOptions(endpoints ?? []);
  }, [endpoints]);

  const handleEndpointChange = (value: string) => {
    const [route, method] = value.split(" ");

    setUrl(route);
    setMethod(method);
  };

  const handleFormFieldChange = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newFields = [...formFields];
    newFields[index][field] = value;
    setFormFields(newFields);
  };

  const addField = () => {
    setFormFields([...formFields, { key: "", value: "" }]);
  };

  const removeField = (index: number) => {
    const newFields = formFields.filter((_, i) => i !== index);
    setFormFields(newFields);
  };

  const handleApiCall = async () => {
    try {
      const requestData = formFields.reduce((acc, field) => {
        if (field.key.trim()) {
          acc[field.key] = field.value;
        }
        return acc;
      }, {} as Record<string, string>);

      const response = await fetch(`http://localhost:3010${url}`, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body:
          method !== "GET" && method !== "DELETE"
            ? JSON.stringify(requestData)
            : undefined,
      });

      const data = await response.json();
      setResponseBody(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error(error);
      setResponseBody(JSON.stringify(error, null, 2));
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white shadow rounded">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select an Endpoint</h3>

        {/* dropdown for selecting the endpoint */}
        <Select onValueChange={handleEndpointChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select an endpoint" />
          </SelectTrigger>

          <SelectContent>
            {endpointOptions.map((option) => (
              <SelectItem
                key={option.route}
                value={`${option.route} ${option.method}`}
              >
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <RequestDetails
        method={method}
        handleMethodChange={setMethod}
        url={url}
        handleUrlChange={setUrl}
      />

      <RequestBody
        formFields={formFields}
        addField={addField}
        removeField={removeField}
        handleFormFieldChange={handleFormFieldChange}
      />

      <Button onClick={handleApiCall}>Send Request</Button>

      {responseBody && <Response responseBody={responseBody} />}
    </div>
  );
};

export default Playground;
