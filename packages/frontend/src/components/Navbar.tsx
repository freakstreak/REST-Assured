import React from "react";

import Profile from "@/components/Profile";

type Props = {
  children: React.ReactNode;
};

const Navbar = ({ children }: Props) => {
  return (
    <nav className="flex items-center justify-between gap-x-4 sticky top-0 bg-white backdrop-blur-sm bg-opacity-80 shadow p-4 z-10 h-[10vh]">
      {children}

      <Profile />
    </nav>
  );
};

export default Navbar;
