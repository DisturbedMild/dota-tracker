import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

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
  const heroesItems: HTMLElement[] = gsap.utils.toArray('.hero-item');

  const { isPending, error, data } = useQuery({
    queryKey: ["Heroes"],
    queryFn: () => fetch('https://api.opendota.com/api/heroes').then((res) => res.json()).then(res => sortHeroesByAlphabet(res))
  });

  if (isPending) "Wait for it....";

  if (error) console.log(error)

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

  useEffect(() => {
    setFilteredHeroes(data)
  }, [data])


  // Adding GSAP smooth filter animation
  useGSAP(() => {
    const heroesState = Flip.getState(heroesItems);
    // const startHeight = gsap.getProperty(".heroes", "height");

    const filteredHeroesArray = filteredHeroes?.map((item: Hero) => {
      return item.localized_name;
    })

    heroesItems.forEach(item => {
      if (filteredHeroesArray?.includes(item.getAttribute('data-id'))) {
        item.classList.remove("hidden");
        item.classList.add("block")
      } else {
        item.classList.remove("block");
        item.classList.add("hidden")
      }
    })

    // const endHeight = gsap.getProperty(".heroes", "height");

    Flip.from(heroesState, {
      duration: 0.5,
      scale: true,
      ease: "power1.inOut",
      stagger: 0.01,
      absolute: true,
      onEnter: elements => gsap.fromTo(elements, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5 }),
      onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0, duration: 0.7 })
    });

    // Flip.fromTo(".heroes", {
    //   height: startHeight
    // }, {
    //   height: endHeight,
    //   clearProps: "height",
    //   duration: 0.7
    // }, 0);

  }, {dependencies: [filteredHeroes]})

  return (
    <section className='mt-8'>
      <h2 className='mb-4 text-left text-3xl'>Heroes</h2>
      <HeroesFilter heroes={data} setFilteredHeroes={setFilteredHeroes} />
      <div className='grid grid-cols-5 gap-4 heroes'>
        {data?.map((item: Hero) => {
          return <HeroesItem key={item.id} itemInfo={item} />
        })}

      </div>
    </section>
  )
}

export default HeroesList;