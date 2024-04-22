import Title from "./title/Title";
import SearchBar from "./search_bar/SearchBar";

export default function Header() {
  return (
    <header className="fixed top-[100px]">
      <Title />
      <SearchBar />
    </header>
  );
}
