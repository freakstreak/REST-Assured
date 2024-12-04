import React from "react";
import Link from "next/link";

import { format } from "date-fns";

import Image from "next/image";
import ArrowRight from "@/public/icons/arrow-right.svg";
import DeleteIcon from "@/public/icons/delete.svg";

import { deleteApplication } from "@/services/applicationService";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";

type Props = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

const Application = ({ id, name, description, createdAt }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: deleteApp } = useMutation({
    mutationFn: deleteApplication,
  });

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    deleteApp(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["applications"] });

        toast({
          title: "Application deleted successfully",
          
        });
      },
    });
  };

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

        <Button variant="ghost" className="px-1.5 py-1" onClick={handleDelete}>
          <Image src={DeleteIcon} alt="delete" className="w-4 h-4" />
        </Button>
      </div>
    </Link>
  );
};

export default Application;
