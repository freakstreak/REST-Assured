import React, { useEffect, useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Details from "@/app/applications/[id]/components/Details";
import Schema from "@/app/applications/[id]/components/Schema";
import Endpoints from "@/app/applications/[id]/components/Endpoints";
import Deployment from "@/app/applications/[id]/components/Deployment";
import Features from "@/app/applications/[id]/components/Features";

import { Step } from "@/types/step";

type Props = {
  applicationId: string | undefined;
  name: string | undefined;
  description: string | null | undefined;
  status: Step;
};

const AccordionContainer = ({
  applicationId,
  name,
  description,
  status,
}: Props) => {
  const [openItems, setOpenItems] = useState([status]);

  const getAccordionContent = (step: Step) => {
    switch (step) {
      case Step.DETAILS:
        return <Details name={name} description={description} />;

      case Step.FEATURES_GENERATION:
        return (
          <Features
            applicationId={applicationId}
            viewOnly={true}
            isActive={status === Step.FEATURES_GENERATION}
          />
        );

      case Step.SCHEMA:
        return (
          <Schema
            applicationId={applicationId}
            viewOnly={true}
            isActive={status === Step.SCHEMA}
          />
        );

      case Step.ENDPOINTS:
        return <Endpoints applicationId={applicationId} viewOnly={true} />;

      case Step.DEPLOYMENT:
        return <Deployment applicationId={applicationId} viewOnly={true} />;

      case Step.PLAYGROUND:
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              Test your API endpoints with the playground.
            </p>
          </div>
        );
    }
  };

  useEffect(() => {
    setOpenItems([status]);
  }, [status]);

  return (
    <Accordion
      type="multiple"
      className="w-full px-4 max-h-[90vh] overflow-auto"
      value={openItems}
      onValueChange={(value) => setOpenItems(value as unknown as Step[])}
    >
      {Object.values(Step).map((step) => (
        <AccordionItem value={step} key={step}>
          <AccordionTrigger className="text-lg font-semibold">
            {step}
          </AccordionTrigger>

          <AccordionContent>{getAccordionContent(step)}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default AccordionContainer;
