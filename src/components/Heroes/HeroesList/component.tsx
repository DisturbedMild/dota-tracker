import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Flip } from 'gsap/Flip';
import type { Hero } from '../../../global-types/types';

gsap.registerPlugin(Flip);

// Components
import HeroesItem from '../HeroesItem/component';
import HeroesFilter from '../HeroesFilter/component';

function HeroesList() {
  const [filteredHeroes, setFilteredHeroes] = useState<Hero[]>();
  const [isFilteredHeroExist, setIsFilteredHeroExist] = useState<boolean>(true);
  const heroesItems: HTMLElement[] = gsap.utils.toArray('.hero-item');

  const { isPending, error, data } = useQuery({
    queryKey: ['Heroes'],
    queryFn: () => fetch('https://api.opendota.com/api/constants/heroes').then((res) => res.json()).then(res => sortHeroesByAlphabet(Object.values(res)))
  });

  if (isPending) 'Wait for it....';

  if (error) console.log(error)

  useEffect(() => {
    setFilteredHeroes(data)
  }, [])

  // Sort fetched data by Alphabet
  const sortHeroesByAlphabet = (heroes: Hero[]): Hero[] => heroes.sort((a: any, b: any) => {
    if (a.localized_name < b.localized_name) {
      return -1
    }
    if (a.localized_name > b.localized_name) {
      return 1;
    }
    return 0
  });


  // Smooth GSAP filter animation
  useGSAP(() => {
    const heroesState = Flip.getState(heroesItems);

    const filteredHeroesArray = filteredHeroes?.map((item: Hero) => {
      return item.localized_name;
    })

    heroesItems.forEach(item => {
      if (filteredHeroesArray?.includes(item.getAttribute('data-id'))) {
        item.classList.remove('hidden');
        item.classList.add('block');
        // setIsFilteredHeroExist(true);
      } else {
        item.classList.remove('block');
        item.classList.add('hidden');
        // setIsFilteredHeroExist(false);
      }
    })

    Flip.from(heroesState, {
      duration: 0.5,
      scale: true,
      ease: 'power1.inOut',
      stagger: 0.01,
      absolute: true,
      onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5 }),
      onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0, duration: 0.5 })
    });

  }, { dependencies: [filteredHeroes] })

  return (
    <section className='mt-8'>
      <div className='container'>
        <h2 className='mb-4 text-left text-3xl'>Heroes</h2>
        <HeroesFilter heroes={data} setFilteredHeroes={setFilteredHeroes} />
        <div className='grid grid-cols-7 gap-4 heroes'>
          {data?.map((item: Hero) => {
            return <HeroesItem key={item.id} itemInfo={item} />
          })}
          {!isFilteredHeroExist && <p>Filtered Hero not Exist!</p>}
        </div>
      </div>
    </section>
  )
}

export default HeroesList;