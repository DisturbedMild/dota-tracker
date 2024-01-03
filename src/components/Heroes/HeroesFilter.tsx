import SearchIcon from "../ui/icons/SearchIcon";
import type { Hero } from "./HeroesList";

type HeroesFilterProps = {
  setFilteredHeroes: React.Dispatch<React.SetStateAction<any>>;
  heroes: Hero[] | undefined;
};

function HeroesFilter(props: HeroesFilterProps) {
  
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredHeroes = props.heroes?.filter((hero: Hero): Hero[] => hero.localized_name.toLowerCase().includes(e.target.value.toLowerCase()));
    props.setFilteredHeroes(filteredHeroes);
  }

  return (
    <div className="mb-8 pl-3 pr-2 py-2 w-72 h-12 bg-gray-800 flex items-center">
      <SearchIcon/>
      <input 
        type="text"
        className="ml-4 py-1 px-2 w-10/12 h-7 bg-gray-800 outline-none	focus:bg-slate-500"
        onChange={onChangeHandler}
        />
    </div>
  )
}

export default HeroesFilter;