import { useState, useEffect } from "react";
import SearchIcon from "../../ui/icons/SearchIcon";
import type { HeroesFilterProps } from "./types";
import type { Hero } from "../../../global-types/types";

function HeroesFilter(props: HeroesFilterProps) {
  const [searchedHero, setSearchedHero] = useState("");

  useEffect(() => {
    const getHero = setTimeout(() => {
      const filteredHeroes = props.heroes?.filter((hero: Hero): Hero[] => hero.localized_name.toLowerCase().includes(searchedHero));
      props.setFilteredHeroes(filteredHeroes);
    }, 500)

    return () => clearTimeout(getHero);
  }, [searchedHero])

  return (
    <div className="mb-8 pl-3 pr-2 py-2 w-72 h-12 bg-gray-800 flex items-center">
      <SearchIcon />
      <input
        type="text"
        className="ml-4 py-1 px-2 w-10/12 h-7 bg-gray-800 outline-none	focus:bg-slate-500"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchedHero(e.target.value.toLowerCase())}
      />
    </div>
  )
}

export default HeroesFilter;