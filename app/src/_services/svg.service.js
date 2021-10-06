// SVG assets imported as React components
import { ReactComponent as arrowBack } from "../assets/ionic-ios-arrow-back.svg";
import { ReactComponent as arrowDown } from "../assets/ionic-ios-arrow-down.svg";
import { ReactComponent as arrowForward } from "../assets/ionic-ios-arrow-forward.svg";
import { ReactComponent as arrowUp } from "../assets/ionic-ios-arrow-up.svg";
import { ReactComponent as calendar } from "../assets/noun-calendar.svg";
import { ReactComponent as phone } from "../assets/fa-phone.svg";
import { ReactComponent as info } from "../assets/noun-info.svg";
import { ReactComponent as copy } from "../assets/fa-copy.svg";
import { ReactComponent as eye } from "../assets/fa-eye.svg";
import { ReactComponent as link } from "../assets/fa-link.svg";
import { ReactComponent as list } from "../assets/fa-list.svg";
import { ReactComponent as lock } from "../assets/fa-lock.svg";
import { ReactComponent as plus } from "../assets/fa-plus.svg";
import { ReactComponent as trash } from "../assets/fa-trash.svg";
import { ReactComponent as undo } from "../assets/fa-undo-solid.svg";
import { ReactComponent as redo } from "../assets/fa-redo-solid.svg";

// Asset map
const svgIcons = {
  "fa-copy.svg": copy,
  "fa-eye.svg": eye,
  "fa-phone.svg": phone,
  "fa-link.svg": link,
  "fa-list.svg": list,
  "fa-lock.svg": lock,
  "fa-plus.svg": plus,
  "fa-trash.svg": trash,
  "fa-undo-solid.svg": undo,
  "fa-redo-solid.svg": redo,
  "ionic-ios-arrow-back.svg": arrowBack,
  "ionic-ios-arrow-down.svg": arrowDown,
  "ionic-ios-arrow-forward.svg": arrowForward,
  "ionic-ios-arrow-up.svg": arrowUp,
  "noun-calendar.svg": calendar,
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
