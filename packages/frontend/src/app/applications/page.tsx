"use client";

import React, { useState } from "react";

import Application from "@/app/applications/components/Application";
import CreateAppModal from "@/app/applications/components/CreateAppModal";
import Search from "@/app/applications/components/Search";
import Navbar from "@/components/Navbar";

import Image from "next/image";
import ApplicationsIcon from "@/public/icons/applications.svg";
import EmptyIcon from "@/public/icons/empty.svg";

import { useQuery } from "@tanstack/react-query";

import { getUserApplications } from "@/services/applicationService";

import { useAuth } from "@/contexts/AuthContext";
import { useDebounce } from "@/hooks/useDebounce";

const Applications = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { user } = useAuth();

  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications", debouncedSearchTerm],
    enabled: !!user,
    queryFn: () => getUserApplications(user?.id || "", debouncedSearchTerm),
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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

          <Search searchTerm={searchTerm} handleSearch={handleSearch} />
        </div>

        <CreateAppModal />
      </Navbar>

      {/* cards for applications */}
      {applications?.length || isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-4">
          {applications?.map((application) => (
            <Application
              key={application.id}
              id={application.id}
              name={application.name}
              description={application.description || ""}
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
