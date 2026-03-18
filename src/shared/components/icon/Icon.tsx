import { Camera as CameraIcon } from "lucide-react";

import textColorStyles from "../../styles/textColor.module.scss";

function Icon({
  icon: Component = CameraIcon,
  color = "gray-7",
  size,
  ...props
}: {
  icon: typeof CameraIcon,
  color?: React.ComponentProps<typeof CameraIcon>["color"],
  size?: React.ComponentProps<typeof CameraIcon>["size"]
} & React.ComponentProps<typeof CameraIcon>) {
  const iconClassName = [
    color && textColorStyles[color]
  ].filter(className => className).join(" ");

  return (
    <Component size={size} className={iconClassName} {...props} />
  );
}

export default Icon;
