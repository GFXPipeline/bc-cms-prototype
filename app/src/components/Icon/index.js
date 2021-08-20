import { svgService } from "../../_services/svg.service";

function Icon({ id, ...props }) {
  const Icon = svgService.getSvg(id);

  if (Icon) {
    return <Icon {...props} />;
  } else {
    return null;
  }
}

export default Icon;
