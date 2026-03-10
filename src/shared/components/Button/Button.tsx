import type { Delegate } from "../../types/Delegate";

import { View, Text, Icon } from "..";

import styles from "./Button.module.scss";

type ButtonStyle = {
  solid?: boolean;
  primary?: boolean;
  hover?: boolean;
};

const getFillColor = ({ solid, primary, hover }: ButtonStyle) => {
  switch (true) {
    case !hover && solid && primary:
      return "primary";
    case solid:
      return "gray-1";
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
  icon,
  rightIcon,
  round,
  bold = true,
  fontWeight,
  children,
  ...props
}: Delegate<{
  icon?: React.ComponentProps<typeof Icon>["icon"];
  rightIcon?: React.ComponentProps<typeof Icon>["icon"];
  round?: boolean;
  bold?: boolean;
  fontWeight?: React.ComponentProps<typeof Text<"div">>["fontWeight"];
} & ButtonStyle, typeof View<"button">>) {
  const buttonClassName = [
    styles.Button,
    solid && styles.solid,
    primary && styles.primary,
    hover && styles.hover,
  ].filter(className => className).join(" ");

  const fillColor = getFillColor({ solid, primary, hover });
  const textColor = getTextColor({ solid, primary, hover });

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
        <Icon icon={icon} size={16} color={textColor} style={{ strokeWidth: 2.5, marginTop: -2, marginBottom: -2, marginLeft: children ? -3 : 0 }} />
      )}
      {children && (
        <Text bold={bold} fontWeight={fontWeight} textColor={textColor}>
          {children}
        </Text>
      )}
      {rightIcon && (
        <Icon icon={rightIcon} size={16} color={textColor} style={{ strokeWidth: 2.5, marginTop: -2, marginBottom: -2, marginRight: children ? -3 : 0 }} />
      )}
    </View>
  );
}

export default Button;
