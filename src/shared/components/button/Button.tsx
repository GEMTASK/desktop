import type { Delegate } from "../../types/Delegate";

import { View, Text, Icon } from "..";

import styles from "./Button.module.scss";
import { useContext } from "react";
import { ViewContext } from "../view/View";

type ButtonStyle = {
  solid?: boolean,
  primary?: boolean,
  hover?: boolean,
  selected?: boolean
};

const getFillColor = ({ parentFillColor, solid, primary, hover, selected }: ButtonStyle & ViewContext) => {
  switch (true) {
    case selected:
      return "selected";
    case !hover && solid && primary:
      return "primary";
    case solid:
      return parentFillColor === "panel" ? "divider" : "panel";
    case hover:
      return undefined;
  }

  return undefined;
};

const getTextColor = ({ primary, solid }: ButtonStyle) => {
  switch (true) {
    case solid && primary:
      return "content";
    case primary:
      return "primary";
  }

  return undefined;
};

function Button({
  solid,
  primary,
  hover,
  //
  icon,
  rightIcon,
  round,
  bold = true,
  fontWeight,
  selected,
  //
  children,
  ...props
}: Delegate<{
  icon?: React.ComponentProps<typeof Icon>["icon"],
  rightIcon?: React.ComponentProps<typeof Icon>["icon"],
  round?: boolean,
  bold?: boolean,
  fontWeight?: React.ComponentProps<typeof Text<"div">>["fontWeight"],
  selected?: boolean
} & ButtonStyle, typeof View<"button">>) {
  const buttonClassName = [
    styles.Button,
    solid && styles.solid,
    primary && styles.primary,
    hover && styles.hover
  ].filter(className => className).join(" ");

  const { parentFillColor } = useContext(ViewContext);

  const fillColor = getFillColor({ parentFillColor, solid, primary, hover, selected });
  const textColor = getTextColor({ solid, primary, hover, selected });

  return (
    <View
      horizontal
      as="button"
      type="button"
      padding={children ? "8px 16px" : "8px"}
      spacing="8px"
      align="middle center"
      cornerRadius={round ? "max" : "2px"}
      fillColor={fillColor}
      className={buttonClassName}
      {...props}
    >
      {icon && (
        <Icon icon={icon} size={16} color={textColor} style={{ strokeWidth: 2.5, marginTop: -2, marginBottom: -2, marginLeft: children ? -3 : -2, marginRight: -2 }} />
      )}
      {typeof children !== "string" ? children : (
        <Text bold={bold} fontWeight={fontWeight} textColor={textColor}>
          {children}
        </Text>
      )}
      {rightIcon && (
        <View flex align="middle right">
          <Icon icon={rightIcon} size={16} color={textColor} style={{ strokeWidth: 2.5, marginTop: -2, marginBottom: -2, marginRight: children ? -3 : 0, justifySelf: "flex-end" }} />
        </View>
      )}
    </View>
  );
}

export default Button;
