import { createContext } from "react";

type SearchTextContextType = {
  searchText: string;
  debouncedSearchText: string;
  handleChangeSearchText: (newSearchText: string) => void;
};
export const SearchTextContext = createContext<SearchTextContextType | null>(
  null
);
