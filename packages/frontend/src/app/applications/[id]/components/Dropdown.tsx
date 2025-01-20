import React from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import ApplicationsIcon from "@/public/icons/applications.svg";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import { useQuery } from "@tanstack/react-query";
import { getUserApplications } from "@/services/applicationService";

import { useAuth } from "@/contexts/AuthContext";

type Props = {
  name: string | undefined;
  id: string | undefined;
};

const Dropdown = ({ name, id }: Props) => {
  const { user } = useAuth();
  const userId = user?.id;

  const router = useRouter();

  const { data: applications } = useQuery({
    queryKey: ["applications"],
    enabled: !!userId,
    queryFn: () => getUserApplications(userId || "", ""),
  });

  return (
    <div className="flex flex-1 items-center gap-x-5">
      <div className="flex items-center gap-x-2">
        <Image src={ApplicationsIcon} alt="applications" className="w-5 h-5" />

        {name && id ? (
          <Select
            value={id}
            onValueChange={(value) => router.push(`/applications/${value}`)}
          >
            <SelectTrigger className="w-auto flex items-center gap-x-1 ring-0 focus:ring-0">
              <span className="pb-0.5">{name}</span>
            </SelectTrigger>

            <SelectContent>
              {applications?.map((application) => (
                <SelectItem key={application.id} value={application.id}>
                  {application.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Skeleton className="w-20 h-5" />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
