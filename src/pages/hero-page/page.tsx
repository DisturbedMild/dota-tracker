import { useLoaderData } from "react-router-dom";

import type { Hero } from "../../types/types";

import "./index.css";
import MeleeAttackTypeIcon from "../../components/ui/icons/MeleeAttackTypeIcon";
import RangeAttackTypeIcon from "../../components/ui/icons/RangeAttackTypeIcon";

// CONSTANTS
const DEFAULT_HP_PER_STR = 22;
const DEFAULT_MANA_PER_INT = 12;

// paths
const attrSrc = '/heroes-attributes';
const statsSrc = '/heroes-stats';

function heroFilteredInfo(data: any) {
  const { fetchedHeroesStats, heroId } = data;

  const filteredHero = fetchedHeroesStats.filter((hero: Hero) => hero.id === Number(heroId));
  return filteredHero
}

function HeroPage() {
  const heroInfo = useLoaderData();
  const [heroData] = heroFilteredInfo(heroInfo);
  console.log(heroData)

  const startHealth = heroData.base_health + (heroData.base_str * DEFAULT_HP_PER_STR);
  const startMana = heroData.base_mana + (heroData.base_int * DEFAULT_MANA_PER_INT);
  const startHealthRegen = (heroData.base_health_regen + (heroData.base_str * 0.09)).toFixed(1);
  const startManaRegen = (heroData.base_mana_regen + (heroData.base_int * 0.05)).toFixed(1);
  const startArmor = (heroData.base_armor + (heroData.base_agi * 0.167)).toFixed(1);
  const startDamage = heroData.primary_attr === "all" ?
    Math.ceil((heroData.base_str * 0.7) + (heroData.base_agi * 0.7) + (heroData.base_int * 0.7)) :
    null;
  const damageRange = heroData.base_attack_max - heroData.base_attack_min;

  return (
    <article className="mt-16">
      <section className="hero">
        <div className="container">
          <h1 className="text-4xl mb-20 text-center">{heroData.localized_name}</h1>
          <div className="flex justify-between gap-4 hero-description">
            <div className="w-1/3 hero-description__group">
              <div className="mb-6 text-1.5xl text-center hero-description__group-title">
                ATTRIBUTES
              </div>
              <div className="flex items-center gap-12 card__inner">
                <div className="card w-8/12 text-center">
                  <div className="w-full">
                    <img className="w-full" src={`https://cdn.cloudflare.steamstatic.com/${heroData.img}`} alt={`${heroData.localized_name}`} />
                    <div className="bars w-full">
                      <div className="relative health">
                        <span>{startHealth}</span>
                        <span className="absolute top-1 right-4 text-sm font-medium card__substat">+{startHealthRegen}</span>
                      </div>
                      <div className="relative mana">
                        <span>{startMana}</span>
                        <span className="absolute top-1 right-4 text-sm font-medium card__substat">+{startManaRegen}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="flex items-center gap-2 hero-attributes__group">
                    <img className="w-7 h-7" src={`${attrSrc}/str.png`} alt={heroData.primary_attr} />
                    <span className="text-1.5xl">{heroData.base_str}</span><span className="text-sm attr-gain">+{heroData.str_gain}</span>
                  </div>
                  <div className="flex items-center gap-2 hero-attributes__group mt-4">
                    <img className="w-7 h-7" src={`${attrSrc}/agi.png`} alt={heroData.primary_attr} />
                    <span className="text-1.5xl">{heroData.base_agi}</span><span className="text-sm attr-gain">+{heroData.agi_gain}</span>
                  </div>
                  <div className="flex items-center gap-2 hero-attributes__group mt-4">
                    <img className="w-7 h-7" src={`${attrSrc}/int.png`} alt={heroData.primary_attr} />
                    <span className="text-1.5xl">{heroData.base_int}</span><span className="text-sm attr-gain">+{heroData.int_gain}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-1/4 hero-description__group px-8 border-l border-r border-white">
              <div className="mb-6 text-1.5xl text-center hero-description__group-title">
                ROLES
              </div>
              {heroData.roles.map((role: string) => {
                return (
                  <div className="hero-roles__group mb-4" key={role}>
                    <div className="hero-roles__group-name mb-1 uppercase">
                      {role}
                    </div>
                    <div className="w-full h-2 bg-white hero-roles__group-bar"></div>
                  </div>
                )
              })}

            </div>
            <div className="w-1/3 hero-description__group">
              <div className="mb-2 text-1.5xl text-center hero-description__group-title">
                STATS
              </div>
              <div className="hero__inner flex justify-between">
                <div className="flex flex-col items-center w-1/3 px-1 hero-stats__group">
                  <div className="mb-4 text-center hero-stats__group-title">
                    ATTACK
                  </div>
                  <ul>
                    <li className="flex items-center gap-4 mt-2 text-xl">
                      <img className="w-7 h-7" src={`${statsSrc}/icon_damage.png`} alt="#" />
                      <div className="flex flex-col">
                        <div>{heroData.attack_type === "Melee" ? "Melee" : "Range"}</div>
                        {/* <div>{startDamage} - {startDamage + damageRange}</div> */}
                      </div>
                    </li>
                    <li className="flex items-center gap-4 mt-2 text-xl"><img className="w-7 h-7" src={`${statsSrc}/icon_attack_time.png`} alt="#" />{heroData.attack_rate}</li>
                    <li className="flex items-center gap-4 mt-2 text-xl"><img className="w-7 h-7" src={`${statsSrc}/icon_attack_range.png`} alt="#" />{heroData.attack_range}</li>
                    { heroData.projectile_speed &&
                      <li className="flex items-center gap-4 mt-2 text-xl"><img className="w-7 h-7" src={`${statsSrc}/icon_projectile_speed.png`} alt="#" />{heroData.projectile_speed}</li>
                    }
                  </ul>
                </div>
                <div className="flex flex-col items-center w-1/3 px-1 hero-stats__group">
                  <div className="mb-4 text-center hero-stats__group-title">
                    DEFENSE
                  </div>
                  <ul>
                    <li className="flex items-center gap-4 text-xl"><img className="w-7 h-7" src={`${statsSrc}/icon_armor.png`} alt="#" />{startArmor}</li>
                    <li className="flex items-center gap-4 mt-2 text-xl"><img className="w-7 h-7" src={`${statsSrc}/icon_magic_resist.png`} alt="#" />{heroData.base_mr}%</li>
                  </ul>
                </div>
                <div className="flex flex-col items-center w-1/3 px-1 hero-stats__group">
                  <div className="mb-4 text-center hero-stats__group-title">
                    MOBILITY
                  </div>
                  <ul>
                    <li className="flex items-center gap-4 text-xl"><img className="w-7 h-7" src={`${statsSrc}/icon_movement_speed.png`} alt="#" />{heroData.move_speed}</li>
                    {heroData.turn_rate &&
                      <li className="flex items-center gap-4 mt-2 text-xl"><img className="w-7 h-7" src={`${statsSrc}/icon_turn_rate.png`} alt="#" />{heroData.turn_rate ? heroData.turn_rate : 0}</li>
                    }
                    <li className="flex items-center gap-4 mt-2 text-xl"><img className="w-7 h-7" src={`${statsSrc}/icon_vision.png`} alt="#" />{heroData.day_vision} / {heroData.night_vision}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </article>
  )
}

export default HeroPage;