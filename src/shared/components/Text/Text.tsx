import View from "../View/View";

import styles from "./Text.module.css";
import fontSizeStyles from "../../styles/fontSize.module.scss";
import fontWeightStyles from "../../styles/fontWeight.module.scss";
import textColorStyles from "../../styles/textColor.module.scss";

function Text<TDelegate extends React.ElementType = "div">({
  as,
  children,
  fontSize,
  fontWeight,
  ...props
}: {
  as?: TDelegate;
  fontSize?: "14px",
  fontWeight?: "500" | "600" | "700"
} & React.ComponentProps<typeof View<TDelegate>>) {
  const textClassName = [
    styles.Text,
    fontSize && fontSizeStyles[fontSize] || fontSizeStyles._14px,
    fontWeight && fontWeightStyles[`_${fontWeight}`],
    textColorStyles["gray-7"]
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
