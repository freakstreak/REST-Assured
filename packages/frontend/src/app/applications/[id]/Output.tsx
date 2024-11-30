import React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import FeatureList from "@/app/applications/[id]/FeatureList";

import Image from "next/image";
import ArrowRightIcon from "@/public/icons/arrow-right-light.svg";
import SendIcon from "@/public/icons/send.svg";
import EmptyIcon from "@/public/icons/empty.svg";

import { Step } from "@/types/step";

type Props = {
  status: Step;
  output: string | null;
};

const Output = ({ status, output }: Props) => {
  return (
    <div className="relative flex flex-col gap-y-3 pt-5 border-l border-gray-200 max-h-screen overflow-auto">
      <div className="flex flex-col flex-1 gap-y-4 justify-center items-center px-8">
        <Image src={EmptyIcon} alt="empty" className="w-48 h-48" />

        <p className="text-center">
          You have not yet completed the{" "}
          <span className="font-semibold">{status}</span> step. Go to the{" "}
          <span className="font-semibold">{status}</span> section to proceed.
        </p>
      </div>

      {output && (
        <div className="flex flex-col gap-y-2 items-center justify-between bg-white w-full sticky bottom-0 mt-auto z-10 py-4 border-t border-gray-200">
          <Button className="self-center group">
            Proceed
            <Image
              src={ArrowRightIcon}
              alt="arrow-right"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            />
          </Button>

          <span className="text-sm text-gray-500 self-center">OR</span>

          <div className="w-full px-4 flex items-center gap-x-2">
            <Input placeholder="Suggest changes" />

            <Button>
              <Image src={SendIcon} alt="send" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Output;
