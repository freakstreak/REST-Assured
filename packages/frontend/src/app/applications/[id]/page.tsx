"use client";

import React from "react";

import Form from "@/app/applications/[id]/Form";
import Output from "@/app/applications/[id]/Output";

import { Step } from "@/types/step";

const Application = () => {
  const status = Step.SCHEMA;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grid grid-cols-2 flex-1">
        {/* left */}
        <Form />

        {/* right */}
        <Output status={status} output={null} />
      </div>
    </div>
  );
};

export default Application;
