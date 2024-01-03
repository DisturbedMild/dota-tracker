import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Components
import HeroesItem from './HeroesItem';
import HeroesFilter from './HeroesFilter';

export type Hero = {
  id: number,
  name: string,
  localized_name: any,
  primary_attr: string,
  attack_type: string,
  roles: string[]
}


function HeroesList() {
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>();
  const { isPending, error, data } = useQuery({
    queryKey: ["Heroes"],
    queryFn: () => fetch('https://api.opendota.com/api/heroes').then((res) => res.json()).then(res => sortHeroesByAlphabet(res))
  });

  if (isPending) "Wait for it....";

  if (error) console.log(error)

  const sortHeroesByAlphabet = (heroes: Hero[]): Hero[] => heroes.sort((a: any, b: any) => {
    if (a.localized_name < b.localized_name) {
      return -1
    }
    if (a.localized_name > b.localized_name) {
      return 1;
    }
    return 0
  });

  useEffect(() => {
    setFilteredHeroes(data)
  }, [data])

  return (
    <section className='mt-8'>
      <h2 className='mb-4 text-left text-3xl'>Heroes</h2>
      <HeroesFilter heroes={data} setFilteredHeroes={setFilteredHeroes} />
      <div className='grid grid-cols-5 gap-4'>
        {filteredHeroes?.map((item: Hero) => {
          return <HeroesItem key={item.id} itemInfo={item} />
        })}

      </div>
    </section>
  )
}

export default HeroesList;