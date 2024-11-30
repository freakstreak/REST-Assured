import React from "react";

import { Input } from "@/components/ui/input";
import Application from "@/app/applications/Application";
import CreateAppModal from "@/app/applications/CreateAppModal";

import Navbar from "@/components/Navbar";

import Image from "next/image";
import ApplicationsIcon from "@/public/icons/applications.svg";
import EmptyIcon from "@/public/icons/empty.svg";

const applications = [
  {
    id: 1,
    user_id: 1,
    name: "Project Management System",
    description:
      "A comprehensive tool for managing projects, tasks, and teams. A comprehensive tool for managing projects, tasks, and teams. A comprehensive tool for managing projects, tasks, and teams.",
    status: "active",
    created_at: "2024-01-15 10:00:00",
    updated_at: "2024-01-15 10:00:00",
  },
  {
    id: 2,
    user_id: 1,
    name: "E-commerce Platform",
    description:
      "An online store for selling products with secure payment options.",
    status: "inactive",
    created_at: "2023-12-01 12:00:00",
    updated_at: "2023-12-01 12:00:00",
  },
  {
    id: 3,
    user_id: 1,
    name: "Social Media App",
    description: "A platform to connect people and share updates.",
    status: "active",
    created_at: "2024-02-10 14:30:00",
    updated_at: "2024-02-10 14:30:00",
  },
  {
    id: 4,
    user_id: 1,
    name: "Food Delivery App",
    description:
      "An app for ordering food from local restaurants and having it delivered.",
    status: "active",
    created_at: "2024-03-05 09:15:00",
    updated_at: "2024-03-05 09:15:00",
  },
];

const Applications = () => {
  return (
    <div className="flex flex-col gap-y-4 min-h-screen">
      <Navbar>
        <div className="flex flex-1 items-center gap-x-5">
          <div className="flex items-center gap-x-1">
            <Image
              src={ApplicationsIcon}
              alt="applications"
              className="w-6 h-6"
            />

            <h1 className="text-xl font-semibold">Applications</h1>
          </div>

          <Input placeholder="Search" className="w-auto" />
        </div>

        <CreateAppModal />
      </Navbar>

      {/* cards for applications */}
      {applications.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
          {applications.map((application) => (
            <Application
              key={application.id}
              name={application.name}
              description={application.description}
              status={application.status}
              createdAt={application.created_at}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-6 flex-1">
          <Image src={EmptyIcon} alt="empty" className="w-56 h-56" />

          <h1 className="text-xl font-medium">No applications found</h1>

          <CreateAppModal />
        </div>
      )}
    </div>
  );
};

export default Applications;
