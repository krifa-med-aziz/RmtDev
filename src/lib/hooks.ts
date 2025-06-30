import { useContext, useEffect, useState } from "react";
import type { JobItem, TJobItemContent } from "./types";
import { BASE_API_URL } from "./constants";
import { useQueries, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { BookmarksContext } from "../contexts/BookmarksContext";
import { ActiveIdContext } from "../contexts/ActiveIdContext";
import { SearchTextContext } from "../contexts/SearchTextContext";
import { JobItemsContext } from "../contexts/JobItemsContext";

// -----------------------------------------------------
export function useActiveId() {
  const [activeId, setActiveId] = useState<number | null>(null);
  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.slice(1);
      setActiveId(id);
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);
  return activeId;
}
// -----------------------------------------------------
type JobItemsApiResponse = {
  public: boolean;
  sorted: boolean;
  jobItems: JobItem[];
};
const fetchJobItems = async (
  searchText: string
): Promise<JobItemsApiResponse> => {
  const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.description);
  }
  return data;
};
export function useSearchQuery(searchText: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["job-items", searchText],
    queryFn: () => fetchJobItems(searchText),
    staleTime: 1000 * 60 * 60, // 1h
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!searchText,
  });
  useEffect(() => {
    if (isError && error) toast.error(error.message);
  }, [isError, error]);
  return { jobItems: data?.jobItems, isLoading } as const;
}
// -----------------------------------------------------
export function useJobItems(ids: number[]) {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["job-item", id],
      queryFn: () => fetchJobItem(id),
      staleTime: 1000 * 60 * 60, // 1h
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!id,
    })),
  });
  const jobItems = results
    .map((res) => {
      return res.data?.jobItem;
    })
    .filter((item) => item !== undefined);
  const isLoading = results.some((res) => res.isLoading);
  return { jobItems, isLoading } as const;
}
// -----------------------------------------------------
export function useDebounce<T>(value: T, delay = 500): T {
  const [deboucedSearchText, setDebouncedSearchText] = useState(value);
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchText(value);
    }, delay);
    return () => clearTimeout(timerId);
  }, [value, delay]);
  return deboucedSearchText;
}
// -----------------------------------------------------
type JobItemApiResponse = {
  public: boolean;
  jobItem: TJobItemContent;
};
const fetchJobItem = async (id: number): Promise<JobItemApiResponse> => {
  const response = await fetch(`${BASE_API_URL}/${id}`);
  const data = await response.json();
  return data;
};
export function useJobItem(id: number | null) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["job-item", id],
    queryFn: () => fetchJobItem(id!),
    staleTime: 1000 * 60 * 60, // 1h
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });
  useEffect(() => {
    if (isError && error)
      toast.error("Something went wrong! please try again.");
  }, [error, isError]);
  return { jobItem: data?.jobItem, isLoading } as const;
}
// -----------------------------------------------------
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() =>
    JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue))
  );
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);
  return [value, setValue] as const;
}
// -----------------------------------------------------
export function useBookmarksContext() {
  const context = useContext(BookmarksContext);
  if (!context)
    throw new Error(
      "BookmarkIcon must be used within a BookmarksContextProvider"
    );
  return context;
}

export function useActiveIdContext() {
  const context = useContext(ActiveIdContext);
  if (!context)
    throw new Error(
      "useActiveIdContext must be used within a ActiveIdContextProvider"
    );
  return context;
}
export function useSearchTextContext() {
  const context = useContext(SearchTextContext);
  if (!context)
    throw new Error(
      "useSearchTextContext must be used within a SearchTextContextProvider"
    );
  return context;
}
export function useJobItemsContext() {
  const context = useContext(JobItemsContext);
  if (!context)
    throw new Error(
      "useJobItemsContext must be used within a JobItemsContextProvider"
    );
  return context;
}

// -----------------------------------------------------
export function useOnClickOutside(
  refs: React.RefObject<HTMLElement>[],
  handler: () => void
) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (refs.every((ref) => !ref.current?.contains(e.target as Node)))
        handler();
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [refs, handler]);
}
