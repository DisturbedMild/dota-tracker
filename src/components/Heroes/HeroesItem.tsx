import { Link } from "react-router-dom";

import type { Hero } from "./HeroesList";

import "./HeroItem.css";

type HeroProps = {
  itemInfo: Hero
}

const imageSrc = "/heroes-icons/";
const attrSrc = '/heroes-attributes';

function HeroesItem(props: HeroProps) {
  const imageName = props.itemInfo.localized_name.replaceAll(" ", "_").toLowerCase();

  return <div className="group relative bordered hero-item">
    <Link to={imageName.replaceAll("_", "")}>
      <img className="w-full group-hover:scale-110 transition-all" src={`${imageSrc}${imageName}.png`} alt={props?.itemInfo.localized_name} />
      <div className="absolute left-0 bottom-0 hidden group-hover:flex items-center gap-2">
        <img className="w-7 h-7" src={`${attrSrc}/${props.itemInfo.primary_attr}.png`} alt={props.itemInfo.primary_attr} />
        <span className="text-1.5xl font-bold	uppercase text-left">{props?.itemInfo.localized_name}</span>
      </div>
    </Link>
  </div>
}

export default HeroesItem;