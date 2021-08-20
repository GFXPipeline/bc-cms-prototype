// SVG assets imported as React components
import { ReactComponent as info } from "../assets/noun-info.svg";

// Asset map
const svgIcons = {
  "noun-info.svg": info,
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
