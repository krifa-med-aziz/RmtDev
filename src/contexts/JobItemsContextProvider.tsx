import { useCallback, useMemo, useState } from "react";
import { JobItemsContext } from "./JobItemsContext";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { RESULTS_PER_PAGE } from "../lib/constants";
import type { PageDirection, SortBy } from "../lib/types";

export default function JobItemsContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // dependency on other contexts
  const { debouncedSearchText } = useSearchTextContext();

  //   State
  const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortBy>("relevant");

  //   Derived state
  const jobItemsSorted = useMemo(
    () =>
      [...(jobItems || [])].sort((a, b) => {
        if (sortBy === "relevant") {
          return b.relevanceScore - a.relevanceScore;
        } else {
          return a.daysAgo - b.daysAgo;
        }
      }),
    [sortBy, jobItems]
  );
  const jobItemsSortedAndSliced = useMemo(
    () =>
      jobItemsSorted?.slice(
        currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE
      ) || [],
    [jobItemsSorted, currentPage]
  );
  const totalNumberOfResults = jobItems?.length || 0;
  const totalNumberOfPages = Math.ceil(totalNumberOfResults / RESULTS_PER_PAGE);

  // events
  const handleChangePage = useCallback((direction: PageDirection) => {
    if (direction === "next") {
      setCurrentPage((prev) => prev + 1);
    } else if (direction === "previous") {
      setCurrentPage((prev) => prev - 1);
    }
  }, []);
  const handleChangeSortBy = useCallback((newSortBy: SortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  }, []);
  return (
    <JobItemsContext.Provider
      value={{
        jobItems: jobItemsSortedAndSliced,
        jobItemsSortedAndSliced,
        isLoading,
        currentPage,
        totalNumberOfPages,
        totalNumberOfResults,
        sortBy,
        handleChangePage,
        handleChangeSortBy,
      }}
    >
      {children}
    </JobItemsContext.Provider>
  );
}
