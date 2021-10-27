// SVG assets imported as React components
import { ReactComponent as arrowBack } from "../assets/ionic-ios-arrow-back.svg";
import { ReactComponent as arrowDown } from "../assets/ionic-ios-arrow-down.svg";
import { ReactComponent as arrowForward } from "../assets/ionic-ios-arrow-forward.svg";
import { ReactComponent as arrowUp } from "../assets/ionic-ios-arrow-up.svg";
import { ReactComponent as bookReader } from "../assets/fa-book-reader.svg";
import { ReactComponent as calendar } from "../assets/noun-calendar.svg";
import { ReactComponent as chartLine } from "../assets/fa-chart-line.svg";
import { ReactComponent as cog } from "../assets/fa-cog.svg";
import { ReactComponent as copy } from "../assets/fa-copy.svg";
import { ReactComponent as cycle } from "../assets/fa-cycle.svg";
import { ReactComponent as envelope } from "../assets/fa-envelope.svg";
import { ReactComponent as eye } from "../assets/fa-eye.svg";
import { ReactComponent as fileFind } from "../assets/md-file-find.svg";
import { ReactComponent as files } from "../assets/metro-files-empty.svg";
import { ReactComponent as filter } from "../assets/fa-filter.svg";
import { ReactComponent as gripVertical } from "../assets/fa-grip-vertical.svg";
import { ReactComponent as info } from "../assets/noun-info.svg";
import { ReactComponent as link } from "../assets/fa-link.svg";
import { ReactComponent as list } from "../assets/fa-list.svg";
import { ReactComponent as lock } from "../assets/fa-lock.svg";
import { ReactComponent as mapMarker } from "../assets/fa-map-marker.svg";
import { ReactComponent as phone } from "../assets/fa-phone.svg";
import { ReactComponent as plus } from "../assets/fa-plus.svg";
import { ReactComponent as pushpin } from "../assets/noun-pushpin.svg";
import { ReactComponent as rateReview } from "../assets/md-rate-review.svg";
import { ReactComponent as redo } from "../assets/fa-redo-solid.svg";
import { ReactComponent as times } from "../assets/fa-times.svg";
import { ReactComponent as tools } from "../assets/fa-tools.svg";
import { ReactComponent as trash } from "../assets/fa-trash.svg";
import { ReactComponent as trashRestore } from "../assets/fa-trash-restore.svg";
import { ReactComponent as undo } from "../assets/fa-undo-solid.svg";
import { ReactComponent as unlink } from "../assets/metro-unlink.svg";
import { ReactComponent as user } from "../assets/fa-user.svg";

// Asset map
const svgIcons = {
  "fa-book-reader.svg": bookReader,
  "fa-chart-line.svg": chartLine,
  "fa-cog.svg": cog,
  "fa-copy.svg": copy,
  "fa-cycle.svg": cycle,
  "fa-envelope.svg": envelope,
  "fa-eye.svg": eye,
  "fa-filter.svg": filter,
  "fa-grip-vertical.svg": gripVertical,
  "fa-phone.svg": phone,
  "fa-link.svg": link,
  "fa-list.svg": list,
  "fa-lock.svg": lock,
  "fa-map-marker.svg": mapMarker,
  "fa-plus.svg": plus,
  "fa-times.svg": times,
  "fa-tools.svg": tools,
  "fa-trash.svg": trash,
  "fa-trash-restore.svg": trashRestore,
  "fa-undo-solid.svg": undo,
  "fa-user.svg": user,
  "fa-redo-solid.svg": redo,
  "ionic-ios-arrow-back.svg": arrowBack,
  "ionic-ios-arrow-down.svg": arrowDown,
  "ionic-ios-arrow-forward.svg": arrowForward,
  "ionic-ios-arrow-up.svg": arrowUp,
  "metro-files-empty.svg": files,
  "metro-unlink.svg": unlink,
  "md-file-find.svg": fileFind,
  "md-rate-review.svg": rateReview,
  "noun-calendar.svg": calendar,
  "noun-info.svg": info,
  "noun-pushpin.svg": pushpin,
};

function getSvg(id) {
  if (svgIcons[id]) {
    return svgIcons[id];
  } else {
    return null;
  }
}

function getContactSvgId(optionId) {
  switch (optionId) {
    case "2336e5ba-3ea7-407e-967b-13d1841396cf":
    case "bb29754e-381c-4716-883e-794bec296ab6":
    case "1e570d72-5d71-48b5-8edd-a2c0e0cf1c06":
    case "868a015e-ee23-48f2-9030-864ccf72aa21":
    case "6431320b-b097-481e-91b6-344c5c802cb5":
      return "fa-phone.svg";
    case "e03013ae-67f0-4a3f-9d27-80d81bcf8d02":
    case "1b3dbe10-2d2b-4da5-bce0-4c669f9e31dc":
    case "1543b3fc-b727-48b9-800e-4eb1d98e8e14":
    case "c420620b-d8ea-4962-9495-42dbea21237e":
    case "7fa1f92b-c765-4c6c-9206-6f31c36ee80a":
    case "e850508e-76bc-4058-8cb0-6c0c9c41fe81":
    case "4f75ebcf-f75c-495a-b973-b20baeb29365":
    case "5248cce0-553d-4930-8e46-cb36491c068b":
      return "fa-map-marker.svg";
    case "ecc76fca-f04d-40e9-93f8-f8d317d76128":
      return "fa-envelope.svg";
    case "d3c9186d-d781-49f0-aa15-dc2c6547220a":
      return "fa-link.svg";
    default:
      return null;
  }
}

export const svgService = {
  getSvg,
  getContactSvgId,
};
