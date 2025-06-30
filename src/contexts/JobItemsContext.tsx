import { createContext } from "react";
import type { JobItem, PageDirection, SortBy } from "../lib/types";

type JobItemsContextType = {
  jobItems: JobItem[] | undefined;
  jobItemsSortedAndSliced: JobItem[];
  isLoading: boolean;
  currentPage: number;
  totalNumberOfPages: number;
  totalNumberOfResults: number;
  sortBy: SortBy;
  handleChangePage: (page: PageDirection) => void;
  handleChangeSortBy: (sortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContextType | null>(null);
