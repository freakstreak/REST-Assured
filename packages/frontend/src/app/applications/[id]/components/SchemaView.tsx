import React from "react";

import Mermaid from "react-mermaid2";

import { Schema } from "@/types/schema";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  loading: boolean;
  schemas: Schema[] | undefined;
};

const SchemaView = ({ loading, schemas }: Props) => {
  function generateMermaidDiagram(
    schemaName: string,
    attributes: { name: string; type: string }[]
  ) {
    let diagram = `%%{init: {"theme": "default", "themeVariables": {"fontSize": "18px"}, "er": {"diagramPadding": 20}}}%%\n`;

    diagram += `erDiagram\n  ${schemaName} {\n`;
    attributes.forEach(({ name, type }) => {
      const sanitizedName = name.replace(/\s+/g, "_");
      diagram += `    ${type} ${sanitizedName}\n`;
    });

    diagram += "  }\n";
    return diagram;
  }

  return (
    <div className="flex flex-col gap-y-2">
      <h2 className="text-lg font-medium px-4">Schema</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-2 bg-gray-100 rounded-lg p-4 mx-4">
        {loading ? (
          <Skeleton className="w-full h-72 md:col-span-3" />
        ) : (
          <>
            {schemas?.map((schema) => {
              const diagram = generateMermaidDiagram(
                schema.name,
                schema.json.attributes
              );

              return <Mermaid key={schema.id} chart={diagram} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default SchemaView;
