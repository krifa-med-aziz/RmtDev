import { createContext } from "react";
import type { JobItem } from "../lib/types";

type BookmarksContextType = {
  bookmarkedIds: number[];
  handleToggleBookmark: (id: number) => void;
  bookmarkedJobItems: JobItem[];
  isLoading: boolean;
};
export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);
