import { Link } from "react-router-dom";

// Types
import type { HeroProps } from "./types";

// Styles
import "./styles.css";

const attrSrc = '/heroes-attributes';

function heroImageHandler(name: string): string {
  return name.replaceAll(" ", "_").replaceAll("-", "_").replaceAll("'", "").toLowerCase();
}

function HeroesItem(props: HeroProps) {
  const imageName = heroImageHandler(props.itemInfo.localized_name);

  return <div className="group relative bordered hero-item" data-id={props.itemInfo.localized_name}>
    <Link to={`${imageName.replaceAll("_", "")}?id=${props.itemInfo.id}`} state={{ heroId: props.itemInfo.id }}>
      <img className="w-full group-hover:scale-110 transition-all" src={`https://cdn.cloudflare.steamstatic.com/${props.itemInfo.img}`} alt={props?.itemInfo.localized_name} />
      <div className="absolute left-0 bottom-0 hidden group-hover:flex items-center gap-2">
        <img className="w-7 h-7" src={`${attrSrc}/${props.itemInfo.primary_attr}.png`} alt={props.itemInfo.primary_attr} />
        <span className="text-1.5xl font-bold	uppercase text-left">{props?.itemInfo.localized_name}</span>
      </div>
    </Link>
  </div>
}

export default HeroesItem;