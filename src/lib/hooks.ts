import { useEffect, useState } from "react";
import type { JobItem, TJobItemContent } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
export function useJobItems(searchText: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["job-items", searchText],
    queryFn: () => fetchJobItems(searchText),
    staleTime: 1000 * 60 * 60, // 1h
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!searchText,
  });
  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);
  return { jobItems: data?.jobItems, isLoading } as const;
}
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
  const { data, isLoading } = useQuery({
    queryKey: ["job-item", id],
    queryFn: () => fetchJobItem(id!),
    staleTime: 1000 * 60 * 60, // 1h
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
  });
  return { jobItem: data?.jobItem, isLoading } as const;
}
