import { useActiveId } from "../lib/hooks";
import type { JobItem } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

type JobListPrps = {
  jobItems: JobItem[];
  isLoading: boolean;
};

export function JobList({ jobItems, isLoading }: JobListPrps) {
  const activeId = useActiveId();
  return (
    <ul className="job-list">
      {isLoading ? <Spinner /> : null}
      {!isLoading &&
        jobItems.map((jobItem) => (
          <JobListItem
            key={jobItem.id}
            jobItem={jobItem}
            isActive={jobItem.id === activeId ? true : false}
          />
        ))}
    </ul>
  );
}

export default JobList;
