// SVG assets imported as React components
import { ReactComponent as calendar } from "../assets/noun-calendar.svg";
import { ReactComponent as info } from "../assets/noun-info.svg";
import { ReactComponent as undo } from "../assets/fa-undo-solid.svg";
import { ReactComponent as redo } from "../assets/fa-redo-solid.svg";

// Asset map
const svgIcons = {
  "noun-calendar.svg": calendar,
  "noun-info.svg": info,
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
