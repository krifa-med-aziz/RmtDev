import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import type { PageDirection } from "../lib/types";

type PaginationControlsProps = {
  currentPage: number;
  handleChangePage: (text: PageDirection) => void;
  totalNumberOfPages: number;
};
export default function PaginationControls({
  handleChangePage,
  currentPage,
  totalNumberOfPages,
}: PaginationControlsProps) {
  return (
    <section className="pagination">
      {currentPage > 1 && (
        <PaginationButton
          onClick={() => handleChangePage("previous")}
          direction="previous"
          currentPage={currentPage}
        />
      )}
      {currentPage < totalNumberOfPages && (
        <PaginationButton
          onClick={() => handleChangePage("next")}
          direction="next"
          currentPage={currentPage}
        />
      )}
    </section>
  );
}
type PaginationButtonProps = {
  direction: PageDirection;
  currentPage: number;
  onClick: () => void;
};

function PaginationButton({
  direction,
  currentPage,
  onClick,
}: PaginationButtonProps) {
  return (
    <button
      onClick={(e) => {
        onClick();
        e.currentTarget.blur();
      }}
      className={`pagination__button pagination__button--${direction}`}
    >
      {direction === "previous" && (
        <>
          <ArrowLeftIcon />
          Page {currentPage - 1}
        </>
      )}
      {direction === "next" && (
        <>
          <ArrowRightIcon />
          Page {currentPage + 1}
        </>
      )}
    </button>
  );
}
