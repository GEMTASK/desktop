import { View, Text } from "..";
import type { Delegate } from "../../types/Delegate";

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
  round,
  bold = true,
  fontWeight,
  children,
  ...props
}: Delegate<{
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
      as="button"
      type="button"
      padding="8px 16px"
      align="middle center"
      cornerRadius={round ? "max" : "2px"}
      fillColor={fillColor}
      className={buttonClassName}
      {...props}
    >
      <Text bold={bold} fontWeight={fontWeight} textColor={textColor}>
        {children}
      </Text>
    </View>
  );
}

export default Button;
