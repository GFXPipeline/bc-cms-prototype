// SVG assets imported as React components
import { ReactComponent as calendar } from "../assets/noun-calendar.svg";
import { ReactComponent as info } from "../assets/noun-info.svg";
import { ReactComponent as copy } from "../assets/fa-copy.svg";
import { ReactComponent as eye } from "../assets/fa-eye.svg";
import { ReactComponent as link } from "../assets/fa-link.svg";
import { ReactComponent as list } from "../assets/fa-list.svg";
import { ReactComponent as lock } from "../assets/fa-lock.svg";
import { ReactComponent as trash } from "../assets/fa-trash.svg";
import { ReactComponent as undo } from "../assets/fa-undo-solid.svg";
import { ReactComponent as redo } from "../assets/fa-redo-solid.svg";

// Asset map
const svgIcons = {
  "noun-calendar.svg": calendar,
  "noun-info.svg": info,
  "fa-copy.svg": copy,
  "fa-eye.svg": eye,
  "fa-link.svg": link,
  "fa-list.svg": list,
  "fa-lock.svg": lock,
  "fa-trash.svg": trash,
  "fa-undo-solid.svg": undo,
  "fa-redo-solid.svg": redo,
};

function getSvg(id) {
  if (svgIcons[id]) {
    return svgIcons[id];
  } else {
    return null;
  }
}

export const svgService = {
  getSvg,
};
