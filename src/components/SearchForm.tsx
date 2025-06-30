import { useSearchTextContext } from "../lib/hooks";

export default function SearchForm() {
  const { searchText, handleChangeSearchText: OnChangeSearchText } =
    useSearchTextContext();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    OnChangeSearchText("");
  };

  return (
    <form onSubmit={handleSubmit} action="#" className="search">
      <button type="submit">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>

      <input
        onChange={(e) => {
          OnChangeSearchText(e.target.value);
        }}
        value={searchText}
        spellCheck="false"
        type="text"
        required
        placeholder="Find remote developer jobs..."
      />
    </form>
  );
}
