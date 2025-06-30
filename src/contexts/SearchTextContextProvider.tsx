import { useState } from "react";
import { SearchTextContext } from "./SearchTextContext";
import { useDebounce } from "../lib/hooks";

export default function SearchTextContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 250);
  const handleChangeSearchText = (newSearchText: string) => {
    setSearchText(newSearchText);
  };
  return (
    <SearchTextContext.Provider
      value={{
        searchText,
        debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchTextContext.Provider>
  );
}
