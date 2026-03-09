import type { Align } from "../../types/Align";
import type { Padding } from "../../types/Padding";

import type { Delegate } from "../../types/Delegate";
import type { Color } from "../../types/Color";

import styles from "./View.module.css";
import fillColorStyles from "../../styles/fillColor.module.scss";
import paddingStyles from "../../styles/padding.module.scss";
import spacingStyles from "../../styles/spacing.module.scss";
import borderStyles from "../../styles/border.module.scss";
import cornerRadiusStyles from "../../styles/conerRadius.module.scss";
import alignHorizontalStyles from "../../styles/alignHorizontal.module.scss";
import alignVerticalStyles from "../../styles/alignVertical.module.scss";
import borderColorStyles from "../../styles/borderColor.module.scss";

function View<TDelegate extends React.ElementType = "div">({
  as,
  flex,
  absolute,
  horizontal,
  shadow,
  padding,
  spacing,
  border,
  align,
  fillColor,
  borderColor,
  cornerRadius,
  style,
  className,
  children,
  ...props
}: Delegate<{
  as?: TDelegate;
  flex?: boolean;
  absolute?: boolean;
  horizontal?: boolean;
  shadow?: boolean;
  padding?: Padding;
  spacing?: Padding;
  border?: true | "bottom";
  align?: Align;
  fillColor?: Color;
  borderColor?: Color;
  cornerRadius?: "2px" | "4px" | "max";
}, TDelegate>) {
  const Component = as ?? "div";

  const viewClassName = [
    styles.View,
    flex && styles.flex,
    absolute && styles.absolute,
    horizontal && styles.horizontal,
    shadow && styles.shadow,
    padding && paddingStyles[`_${padding.replace(/ /, "_")}`],
    spacing && spacingStyles[`_${spacing.replace(/ /, "_")}`],
    border && borderStyles[border === true ? "top right bottom left" : border],
    align && (
      horizontal
        ? alignHorizontalStyles[align.replace(/ /, "_")]
        : alignVerticalStyles[align.replace(/ /, "_")]
    ),
    fillColor && fillColorStyles[fillColor],
    cornerRadius && cornerRadiusStyles[`_${cornerRadius}`],
    borderColor && borderColorStyles[borderColor],
    className
  ].filter(className => className).join(" ");

  const viewStyle = {
    ...style,
  };

  return (
    <Component className={viewClassName} style={viewStyle} {...props}>
      {children}
    </Component>
  );
}

export default View;
