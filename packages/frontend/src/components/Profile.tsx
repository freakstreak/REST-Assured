"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/contexts/AuthContext";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import Logout from "@/public/icons/logout.svg";

const Profile = () => {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex items-center gap-x-2">
      <Avatar>
        <AvatarFallback className="bg-orange-400 text-white h-auto">
          {user?.name.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <Button variant="ghost" size="icon" title="Logout" onClick={handleLogout}>
        <Image src={Logout} alt="logout" className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default Profile;
