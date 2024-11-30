"use client";

import React, { useState } from "react";

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

const CreateAppModal = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ New Application</Button>
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
          <Button variant="outline">Cancel</Button>
          <Button>Create</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAppModal;
