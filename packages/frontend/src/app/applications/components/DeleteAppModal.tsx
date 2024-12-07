"use client";

import React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { deleteApplication } from "@/services/applicationService";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

import Image from "next/image";
import DeleteIcon from "@/public/icons/delete.svg";

type Props = {
  id: string;
  name: string;
};

const DeleteAppModal = ({ id, name }: Props) => {
  const queryClient = useQueryClient();

  const { mutate: deleteApp, isPending } = useMutation({
    mutationFn: deleteApplication,
  });

  const handleSubmit = () => {
    deleteApp(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["applications"] });

        toast({
          title: "Application deleted successfully",
        });
      },
    });
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div onClick={handleClick}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" className="px-1.5 py-1">
            <Image src={DeleteIcon} alt="delete" className="w-4 h-4" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Application</DialogTitle>
          </DialogHeader>

          <p className="text-sm text-gray-500">
            Are you sure you want to delete <strong>{name}</strong>?
          </p>

          <div className="flex justify-end">
            <Button disabled={isPending} onClick={handleSubmit}>
              {isPending ? "Deleting..." : "Yes, Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DeleteAppModal;
