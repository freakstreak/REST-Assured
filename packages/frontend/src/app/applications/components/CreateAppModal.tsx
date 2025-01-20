"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createApplication } from "@/services/applicationService";

import { useMutation } from "@tanstack/react-query";

const CreateAppModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const { mutate: createApp, isPending } = useMutation({
    mutationFn: createApplication,
  });

  const isDisabled = isPending || !name || !description;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  const handleSubmit = () => {
    createApp(
      { name, description },
      {
        onSuccess: (data) => {
          const { id } = data.data;

          router.push(`/applications/${id}`);

          setName("");
          setDescription("");
        },
      }
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-3 sm:px-auto" title="New Application">
          <span className="sm:hidden">+</span>
          <span className="hidden sm:inline">+ New Application</span>
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Application</DialogTitle>
        </DialogHeader>

        <div className="space-y-1">
          <Label className="font-medium required" htmlFor="name">
            Application Name
          </Label>

          <Input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name of the application"
          />
        </div>

        <div className="space-y-1">
          <Label className="font-medium required" htmlFor="description">
            Description
          </Label>

          <Textarea
            id="description"
            name="description"
            rows={5}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Brief overview of the application"
          />
        </div>

        <div className="flex justify-end gap-x-3">
          <Button disabled={isDisabled} onClick={handleSubmit}>
            {isPending ? "Creating..." : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppModal;
