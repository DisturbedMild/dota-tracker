import { useLoaderData } from "react-router-dom";

function HeroPage() {
  const { fetchedHeroes, fetchedHeroesStats, fetchedHeroItemPopularity, fetchedItems, heroId } = useLoaderData();
  console.log(fetchedHeroes, fetchedHeroesStats, fetchedHeroItemPopularity, fetchedItems, Number(heroId))

  return <h1>Hero Page</h1>
}

export default HeroPage;