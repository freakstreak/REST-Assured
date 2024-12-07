import React from "react";

import { Input } from "@/components/ui/input";

type Props = {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({ searchTerm, handleSearch }: Props) => {
  return (
    <Input
      placeholder="Search"
      className="w-auto hidden md:block"
      value={searchTerm}
      onChange={handleSearch}
    />
  );
};

export default Search;
