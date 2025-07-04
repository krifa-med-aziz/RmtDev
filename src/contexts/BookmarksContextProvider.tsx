import { useJobItems, useLocalStorage } from "../lib/hooks";
import { BookmarksContext } from "./BookmarksContext";

export default function BookmarksContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
    "bookmarkedIds",
    []
  );
  const { jobItems: bookmarkedJobItems, isLoading } =
    useJobItems(bookmarkedIds);
  const handleToggleBookmark = (id: number) => {
    if (bookmarkedIds.includes(id))
      setBookmarkedIds((prev) => prev.filter((item) => item !== id));
    else setBookmarkedIds((prev) => [...prev, id]);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarkedIds,
        handleToggleBookmark,
        bookmarkedJobItems,
        isLoading,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}
