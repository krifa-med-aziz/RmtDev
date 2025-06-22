import { useEffect, useState } from "react";
import type { JobItem, TJobItemContent } from "./types";
import { BASE_API_URL } from "./constants";

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
export function useJobItems(searchText: string) {
  const [jobItems, setJobItems] = useState<JobItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const totalNumberOfResults = jobItems.length;
  const jobItemsSliced = jobItems.slice(0, 7);
  useEffect(() => {
    if (!searchText) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${BASE_API_URL}?search=${searchText}`);
        const data = await response.json();
        setIsLoading(false);
        setJobItems(data.jobItems);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [searchText]);
  return { jobItemsSliced, totalNumberOfResults, isLoading } as const;
}
export function useJobItem(id: number | null) {
  const [jobItem, setJobItem] = useState<TJobItemContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (!id) return;
    const fetchItem = async () => {
      setIsLoading(true);
      const response = await fetch(`${BASE_API_URL}/${id}`);
      const data = await response.json();
      setIsLoading(false);
      setJobItem(data.jobItem);
    };
    fetchItem();
  }, [id]);
  return { jobItem, isLoading } as const;
}
