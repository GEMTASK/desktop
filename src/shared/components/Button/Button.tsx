import { View, Text } from "..";

import styles from "./Button.module.scss";

const getFillColor = ({ primary, hover }: { primary?: boolean; hover?: boolean; }) => {
  switch (true) {
    case primary:
      return "blue-5";
    case hover:
      return undefined;
  }

  return "gray-1";
};

const getTextColor = ({ primary }: { primary?: boolean; hover?: boolean; }) => {
  switch (true) {
    case primary:
      return "white";
  }

  return undefined;
};

function Button({
  primary,
  hover,
  children,
  ...props
}: {
  primary?: boolean;
  hover?: boolean;
} & React.ComponentProps<typeof View<"button">>) {
  const buttonClassName = [
    styles.Button,
    hover && styles.hover,
  ].filter(className => className).join(" ");

  return (
    <View
      as="button"
      type="button"
      padding="8px 16px"
      align="middle center"
      cornerRadius="2px"
      fillColor={getFillColor({ primary, hover })}
      className={buttonClassName}
      {...props}
    >
      <Text textColor={getTextColor({ primary, hover })}>
        {children}
      </Text>
    </View>
  );
}

export default Button;
