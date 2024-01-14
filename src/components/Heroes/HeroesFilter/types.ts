import type { Hero } from "../../../global-types/types";

export type HeroesFilterProps = {
  setFilteredHeroes: React.Dispatch<React.SetStateAction<any>>;
  heroes: Hero[] | undefined;
};