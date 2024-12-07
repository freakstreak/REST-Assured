import React from "react";
import Link from "next/link";

import { format } from "date-fns";

import Image from "next/image";
import ArrowRight from "@/public/icons/arrow-right.svg";

import DeleteAppModal from "@/app/applications/components/DeleteAppModal";

type Props = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

const Application = ({ id, name, description, createdAt }: Props) => {
  return (
    <Link
      href={`/applications/${id}`}
      className="flex flex-col justify-between gap-y-3 p-4 border rounded-lg cursor-pointer hover:shadow-md hover:bg-slate-50 transition-all duration-300 group"
    >
      <div className="flex items-center justify-between">
        <h1 className="text-sm font-semibold">{name}</h1>

        <Image
          src={ArrowRight}
          alt="arrow-right"
          className="w  -4 h-4 group-hover:translate-x-1 transition-transform duration-300"
        />
      </div>

      <p className="text-xs text-gray-500">
        {description.length > 100
          ? `${description.slice(0, 100)}...`
          : description}
      </p>

      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {format(new Date(createdAt), "MMM d, yyyy")}
        </p>

        <DeleteAppModal id={id} name={name} />
      </div>
    </Link>
  );
};

export default Application;
