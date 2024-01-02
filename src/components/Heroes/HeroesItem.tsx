import { Link } from "react-router-dom";

import type { Hero } from "./HeroesList";

type HeroProps = {
  itemInfo: Hero
}

const imageSrc = "/heroes-icons/";

function HeroesItem(props: HeroProps) {
  const imageName = props.itemInfo.localized_name.replaceAll(" ", "_").toLowerCase();
  console.log(imageName)

  return <div className="bordered">
    <Link to={imageName}>
      <img className="w-full" src={`${imageSrc}${imageName}.png`} alt={props?.itemInfo.localized_name} />
    </Link>
  </div>
}

export default HeroesItem;