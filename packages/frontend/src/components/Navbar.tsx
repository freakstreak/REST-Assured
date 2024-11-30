import React from "react";

import Profile from "@/components/Profile";

type Props = {
  children: React.ReactNode;
};

const Navbar = ({ children }: Props) => {
  return (
    <div className="flex items-center justify-between gap-x-4 sticky top-0 bg-white shadow-sm p-4 z-10">
      {children}

      <Profile />
    </div>
  );
};

export default Navbar;
