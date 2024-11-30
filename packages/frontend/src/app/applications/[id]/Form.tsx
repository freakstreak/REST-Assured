import React from "react";
// import { useParams } from "next/navigation";

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
import Operations from "@/app/applications/[id]/components/Operations";

import { Step } from "@/types/step";

const Form = () => {
  // const { id } = useParams();

  const name = "Test Application";
  const description = "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.";

  const getAccordionContent = (step: Step) => {
    switch (step) {
      case Step.DETAILS:
        return <Details name={name} description={description} />;
      case Step.FEATURES_GENERATION:
        return <Features features={[]} />;
      case Step.SCHEMA:
        return <Schema schema={[]} />;
      case Step.ENDPOINTS:
        return <Endpoints endpoints={[]} />;
      case Step.OPERATION_SELECTION:
        return <Operations operations={[]} />;
      case Step.DEPLOYMENT:
        return <Deployment status="pending" />;
    }
  };

  return (
    <Accordion type="multiple" className="w-full px-4">
      {Object.values(Step).map((step) => (
        <AccordionItem value={step} key={step}>
          <AccordionTrigger className="text-xl font-semibold">
            {step}
          </AccordionTrigger>

          <AccordionContent>{getAccordionContent(step)}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default Form;
