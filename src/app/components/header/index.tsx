import Title from "./title/Title";
import SearchBar from "./search_bar/SearchBar";

export default function Header() {
  return (
    <header className="xl:mt-[60px] lg:mt-[80px] md:mt-[100px] sm:mt-[100px] mt-[100px]">
      <Title />
      <SearchBar />
    </header>
  );
}
