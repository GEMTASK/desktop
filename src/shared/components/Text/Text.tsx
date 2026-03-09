import View from "../View/View";

import type { Color } from "../../types/Color";

import styles from "./Text.module.css";
import fontSizeStyles from "../../styles/fontSize.module.scss";
import fontWeightStyles from "../../styles/fontWeight.module.scss";
import textColorStyles from "../../styles/textColor.module.scss";

function Text<TDelegate extends React.ElementType = "div">({
  as,
  children,
  light,
  fontSize,
  fontWeight,
  textColor,
  ...props
}: {
  as?: TDelegate;
  light?: boolean;
  fontSize?: "12px" | "14px" | "32px";
  fontWeight?: "500" | "600" | "700";
  textColor?: Color;
} & React.ComponentProps<typeof View<TDelegate>>) {
  const textClassName = [
    styles.Text,
    light && styles.light,
    fontSize && fontSizeStyles[`_${fontSize}`] || fontSizeStyles._14px,
    fontWeight && fontWeightStyles[`_${fontWeight}`],
    textColor && textColorStyles[textColor] || textColorStyles["gray-7"]
  ].filter(className => className).join(" ");

  return (
    <View as={as as React.ElementType} {...props}>
      <span className={textClassName}>
        {children}
      </span>
    </View>
  );
}

export default Text;
